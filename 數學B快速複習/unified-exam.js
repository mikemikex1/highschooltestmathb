(function (root) {
  'use strict';

  const app = {};
  const YEARS = ['115', '114', '113', '112', '111'];
  const sessions = new Map();

  function exams() {
    return typeof EXAMS !== 'undefined' ? EXAMS : {};
  }
  function bank() { return root.questionBank || {}; }
  function esc(value) {
    if (typeof root.esc === 'function') return root.esc(String(value ?? ''));
    return String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  }
  function key(year, number) { return `${year}-Q${number}`; }
  function currentSession(year, number) {
    const k = key(year, number);
    if (!sessions.has(k)) sessions.set(k, { selected: [], fill: '', response: '', submitted: false });
    return sessions.get(k);
  }
  function normalizeYear(value) { return YEARS.includes(String(value)) ? String(value) : '115'; }
  function questionCount(year) {
    const metadata = exams()[year];
    return Array.isArray(metadata) ? metadata.length : (Array.isArray(metadata?.questions) ? metadata.questions.length : 20);
  }
  function normalizeQuestion(year, value) {
    const n = Number(value);
    return Number.isInteger(n) && n >= 1 && n <= questionCount(year) ? n : 1;
  }
  function parseHash() {
    const raw = location.hash.replace(/^#/, '');
    const p = new URLSearchParams(raw);
    let mode = p.get('mode');
    if (!mode && p.has('year')) mode = 'exam';
    if (!mode && p.has('lesson')) mode = 'curriculum';
    if (!mode && new URLSearchParams(location.search).get('mode') === 'supplementary') mode = 'supplementary';
    if (!['curriculum', 'exam', 'supplementary'].includes(mode)) mode = 'curriculum';
    if (mode === 'exam') {
      const year = normalizeYear(p.get('year'));
      return { mode, year, question: normalizeQuestion(year, p.get('question')), group: p.get('group') || null };
    }
    if (mode === 'curriculum') {
      // `lessons` is declared with `const` in script.js, so it is a global
      // lexical binding rather than a window property. Read that binding
      // first so curriculum deep links are not clamped back to L01.
      const curriculumLessons = typeof lessons !== 'undefined' ? lessons : (root.lessons || []);
      const lesson = Math.max(0, Math.min(curriculumLessons.length - 1, (Number(p.get('lesson')) || 1) - 1));
      const units = typeof root.buildLessonUnits === 'function' ? root.buildLessonUnits(lesson) : [];
      const unit = Math.max(0, Math.min(Math.max(units.length - 1, 0), (Number(p.get('unit')) || 1) - 1));
      return { mode, lesson, unit };
    }
    return { mode };
  }
  function canonicalHash(state) {
    if (state.mode === 'exam') return `#mode=exam&year=${state.year}&question=${state.question}${state.group ? `&group=${encodeURIComponent(state.group)}` : ''}`;
    if (state.mode === 'supplementary') return '#mode=supplementary';
    return `#mode=curriculum&lesson=${state.lesson + 1}&unit=${state.unit + 1}`;
  }
  function navigate(state, historyMode) {
    const hash = canonicalHash(state);
    if (location.hash === hash) return;
    const method = historyMode === 'push' ? 'pushState' : 'replaceState';
    history[method]({ unified: state }, '', hash);
  }
  function setModeActive(mode) {
    document.querySelectorAll('[data-app-mode]').forEach(link => link.classList.toggle('active', link.dataset.appMode === mode));
  }
  function renderExamSidebar(state) {
    const sidebar = document.querySelector('#lessonSidebar');
    if (!sidebar) return;
    sidebar.innerHTML = `<div class="exam-sidebar" aria-label="歷屆試題索引"><div class="exam-sidebar-years">${YEARS.map(y => `<a class="exam-year ${y === state.year ? 'active' : ''}" href="#mode=exam&year=${y}&question=1">${y} 年</a>`).join('')}</div><div class="exam-sidebar-questions">${Array.from({ length: questionCount(state.year) }, (_, i) => { const n=i+1; const s=sessions.get(key(state.year,n)); return `<a class="exam-question-link ${n === state.question ? 'active' : ''} ${s?.submitted ? 'answered' : ''}" href="#mode=exam&year=${state.year}&question=${n}"><span>Q${n}</span><span>${s?.submitted ? '已提交' : '未作答'}</span></a>`; }).join('')}</div></div>`;
  }
  function answerSet(value) {
    return new Set((Array.isArray(value) ? value : String(value ?? '').split(',')).map(String).map(v => v.trim()).filter(Boolean));
  }
  function isCorrect(c, session) {
    if (c.type === 'non-selection') return null;
    if (c.type === 'fill') return String(session.fill).trim() === String(c.officialAnswer ?? '').trim();
    const actual = new Set(session.selected.map(String));
    const expected = answerSet(c.officialAnswer);
    return actual.size === expected.size && [...actual].every(v => expected.has(v));
  }
  function solutionHtml(c, session) {
    const result = isCorrect(c, session);
    const resultText = result === null ? '已確認，以下為官方參考資訊。' : (result ? '作答正確' : '作答尚未符合官方答案');
    const points = Array.isArray(c.officialScoringPoints) && c.officialScoringPoints.length ? `<h4>採分點</h4><ul>${c.officialScoringPoints.map(esc).map(x => `<li>${x}</li>`).join('')}</ul>` : '';
    const writing = c.recommendedWriting ? `<h4>作答方向</h4><p>${esc(c.recommendedWriting)}</p>` : '';
    const teaching = c.teaching || {};
    const explanation = teaching.fullSolution || teaching.fastestSolution || teaching.firstThought || '';
    const mistakes = Array.isArray(teaching.commonMistakes) && teaching.commonMistakes.length ? `<h4>常見錯誤</h4><ul>${teaching.commonMistakes.map(esc).map(x => `<li>${x}</li>`).join('')}</ul>` : '';
    return `<section class="exam-result" aria-live="polite"><h3>${resultText}</h3><p class="official-answer"><strong>官方答案：</strong>${esc(Array.isArray(c.officialAnswer) ? c.officialAnswer.join(', ') : c.officialAnswer)}</p>${points}${writing}${explanation ? `<h4>教學解析</h4><p>${esc(explanation)}</p>` : ''}${mistakes}<p class="official-basis">官方依據：沿用 canonical question bank 與既有來源欄位。</p></section>`;
  }
  function renderExamQuestion(state) {
    const id = key(state.year, state.question);
    const c = bank()[id];
    const metadata = Array.isArray(exams()[state.year]) ? exams()[state.year][state.question - 1] : (exams()[state.year]?.questions?.[state.question - 1] || {});
    if (!c) return '<section class="exam-question-card"><h2>找不到題目</h2><p>已自動回到可用題目。</p></section>';
    const session = currentSession(state.year, state.question);
    const image = c.questionImage ? `<div class="exam-media"><img src="${esc(c.questionImage)}" alt="${esc(`${state.year} 年第 ${state.question} 題官方題圖`)}"></div>` : '';
    const options = Array.isArray(c.options) ? `<fieldset class="exam-options"><legend>選項</legend>${c.options.map((option, i) => `<label class="exam-option"><input type="${c.type === 'multiple' ? 'checkbox' : 'radio'}" name="exam-${id}" value="${i + 1}" ${session.selected.includes(String(i + 1)) ? 'checked' : ''}><span>${i + 1}. ${esc(option)}</span></label>`).join('')}</fieldset>` : '';
    const fill = c.type === 'fill' ? `<label class="exam-input-label" for="exam-fill">請輸入答案</label><input id="exam-fill" class="exam-fill" inputmode="decimal" value="${esc(session.fill)}">` : '';
    const response = c.type === 'non-selection' ? `<label class="exam-input-label" for="exam-response">作答區</label><textarea id="exam-response" class="exam-response">${esc(session.response)}</textarea>` : '';
    const submitted = session.submitted;
    return `<article class="exam-question-card" data-question-key="${id}"><div class="exam-question-meta"><span>${state.year} 年</span><span>第 ${state.question} 題</span><span>${esc(c.type)}</span></div><h2>${esc(metadata.topic || c.questionSummary || '歷屆試題')}</h2>${image}<p class="exam-summary">${esc(c.questionSummary || '請依官方題圖作答。')}</p>${options}${fill}${response}<div class="exam-actions"><button type="button" data-exam-submit>${c.type === 'non-selection' ? '確認作答' : '提交答案'}</button><button type="button" data-exam-reset class="secondary">重設本題</button></div>${submitted ? solutionHtml(c, session) : ''}</article>`;
  }
  function renderExam(state) {
    renderExamSidebar(state);
    document.querySelector('#lessonApp').innerHTML = `<section class="lesson-head exam-head"><div class="single-lesson-kicker">Official Exam Mode</div><h2>${state.year} 年歷屆試題</h2><p>單題作答：提交後才顯示判定與延伸說明。</p></section>${renderExamQuestion(state)}`;
  }
  function renderCurriculum(state, historyMode) {
    if (typeof root.renderSingleView === 'function') root.renderSingleView(state.lesson, state.unit, 'pop');
    const canonical = { mode: 'curriculum', lesson: state.lesson, unit: state.unit };
    if (historyMode && location.hash !== canonicalHash(canonical)) navigate(canonical, historyMode);
    if (typeof root.syncLessonSidebar === 'function') root.syncLessonSidebar(state.lesson);
  }
  function renderSupplementary(historyMode) {
    const sidebar = document.querySelector('#lessonSidebar');
    if (sidebar) sidebar.innerHTML = '<div class="exam-sidebar"><p class="sidebar-mode-label">補充教材</p><a class="exam-question-link active" href="#mode=supplementary">36 個補充主題</a><a class="exam-question-link" href="#mode=curriculum&lesson=1&unit=1">回到課綱</a></div>';
    if (typeof root.renderSupplement === 'function') root.renderSupplement();
    if (historyMode && location.hash !== '#mode=supplementary') navigate({ mode: 'supplementary' }, historyMode);
  }
  app.mountFromHash = function (historyMode) {
    const state = parseHash();
    root.__unifiedAppActive = true;
    if (historyMode && location.hash !== canonicalHash(state)) navigate(state, 'replace');
    setModeActive(state.mode);
    if (state.mode === 'exam') renderExam(state);
    else if (state.mode === 'supplementary') renderSupplementary(historyMode);
    else renderCurriculum(state, historyMode);
    document.body.classList.toggle('exam-mode', state.mode === 'exam');
  };
  app.goCurriculum = function (lesson, unit) { navigate({ mode: 'curriculum', lesson, unit }, 'push'); app.mountFromHash('pop'); };
  app.init = function () { app.mountFromHash('replace'); };
  document.addEventListener('click', event => {
    const submit = event.target.closest('[data-exam-submit]');
    const reset = event.target.closest('[data-exam-reset]');
    const card = event.target.closest('.exam-question-card');
    if (!card || (!submit && !reset)) return;
    const k = card.dataset.questionKey;
    const match = k.match(/^(\d+)-Q(\d+)$/);
    if (!match) return;
    const session = currentSession(match[1], Number(match[2]));
    const c = bank()[k];
    if (reset) { sessions.delete(k); app.mountFromHash('pop'); return; }
    if (c.type === 'fill') session.fill = card.querySelector('.exam-fill')?.value || '';
    else if (c.type === 'non-selection') session.response = card.querySelector('.exam-response')?.value || '';
    else session.selected = [...card.querySelectorAll('input:checked')].map(input => input.value);
    session.submitted = true;
    app.mountFromHash('pop');
  });
  root.UNIFIED_APP = app;
})(window);
