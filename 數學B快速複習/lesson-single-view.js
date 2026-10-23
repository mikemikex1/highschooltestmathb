/* Single View lesson units. Official questions remain references to the canonical bank. */
(function () {
  const escHtml = value => typeof esc === 'function' ? esc(value) : String(value ?? '');
  const unit = (id, type, title, render) => ({ id, type, title, render });
  const listHtml = values => '<ul>' + (values || []).map(value => '<li>' + escHtml(value) + '</li>').join('') + '</ul>';
  const mathHtml = value => typeof renderMathText === 'function' ? renderMathText(String(value ?? '')) : escHtml(value);
  const formulaCardHtml = (data, compact) => {
    if (!data) return '';
    const classes = compact ? 'formula-card formula-compact' : 'formula-card';
    let html = '<section class="' + classes + '"><h4 class="formula-title">' + escHtml(data.name) + '</h4><div class="formula-main" aria-label="公式">' + mathHtml(data.formula) + '</div><div class="formula-meta"><p><strong>什麼時候用：</strong>' + mathHtml(data.use) + '</p>';
    if (!compact) {
      if (data.example) {
        html += '<section class="formula-example"><h5>最簡單例子</h5><p class="formula-example-prompt"><strong>已知／題目：</strong>' + mathHtml(data.example.prompt) + '</p><p class="formula-example-substitution"><strong>代入：</strong>' + mathHtml(data.example.substitution) + '</p><p class="formula-example-calculation"><strong>計算：</strong>' + mathHtml(data.example.calculation) + '</p><p class="formula-example-answer"><strong>答案：</strong>' + mathHtml(data.example.answer) + '</p></section>';
      }
      html += '<p><strong>符號意思：</strong>' + mathHtml(data.symbols) + '</p><p><strong>簡短推導／直覺：</strong>' + mathHtml(data.intuition) + '</p><p class="pitfall"><strong>常見錯法：</strong>' + mathHtml(data.pitfall) + '</p>';
    } else {
      html += '<p><strong>限制／提醒：</strong>' + mathHtml(data.pitfall) + '</p>';
    }
    html += '</div>';
    if (data.compact && data.compact.length) {
      html += '<div class="formula-compact-examples">' + data.compact.map(item => '<div><strong>' + mathHtml(item[0]) + '</strong><span>' + mathHtml(item[1]) + '</span></div>').join('') + '</div>';
    }
    return html + '</section>';
  };
  const lessonFormulaCards = index => (window.LESSON_FORMULAS && window.LESSON_FORMULAS[index + 1]) || [];
  const formulaPage = index => {
    const cards = lessonFormulaCards(index);
    return '<article class="single-unit-card formula-page"><h3>公式頁</h3><p>這一頁把本課會反覆使用的關係式集中整理。先看「什麼時候用」，再回到例題練習代入；公式不是孤立背誦，而是把題目語言轉成可計算的模型。</p>' + cards.map(data => formulaCardHtml(data, false)).join('') + '</article>';
  };
  const compactFormulaHints = index => lessonFormulaCards(index).slice(0, 2).map(data => formulaCardHtml(data, true)).join('');
  const visualHtml = index => {
    if (typeof window.renderLessonVisualModules === 'function') return window.renderLessonVisualModules(index + 1);
    const d = window.BEGINNER_TEACHING[index];
    const image = typeof window.beginnerVisualSvg === 'function' ? window.beginnerVisualSvg(d.visual) : '';
    return '<article class="single-unit-card visual-unit"><h3>看圖建立模型</h3><p>' + escHtml(d.explain) + '</p><figure class="beginner-visual"><figcaption>概念示意圖：' + escHtml(d.title) + '</figcaption>' + image + '</figure><p class="beginner-takeaway"><strong>看圖要抓住：</strong>' + escHtml(d.takeaway) + '</p></article>';
  };
  const beginner = index => window.BEGINNER_TEACHING[index];
  const lessonPracticeFor = lessonId => {
    if (lessonId === 1 && typeof lesson1Exercises !== 'undefined') {
      return lesson1Exercises.map((item, index) => ({
        id: 'L01-P' + String(index + 1).padStart(2, '0'),
        lessonId: 1,
        type: 'short-answer',
        stem: item[1],
        answer: item[2],
        explanation: item[2],
        commonMistake: ''
      }));
    }
    return window.LESSON_PRACTICE && window.LESSON_PRACTICE[lessonId];
  };

  function richConcept(index) {
    const d = richLessons[index];
    return '<article class="single-unit-card"><h3>白話觀念</h3>' + d.concepts.map(c => '<section class="unit-subsection"><h4>' + escHtml(c[0]) + '</h4><p>' + escHtml(c[1]) + '</p><div class="formula">' + escHtml(c[2]) + '</div><p><strong>什麼時候用：</strong>' + escHtml(c[3]) + '</p><p class="pitfall"><strong>常見錯誤：</strong>' + escHtml(c[4]) + '</p><p><strong>小例子：</strong>' + escHtml(c[5]) + '</p></section>').join('') + '</article>';
  }
  function richExamples(index) {
    const d = richLessons[index];
    return '<article class="single-unit-card"><h3>老師示範例題</h3>' + d.examples.map(e => '<section class="unit-subsection"><h4>' + escHtml(e[0]) + '</h4><p><strong>題目：</strong>' + escHtml(e[1]) + '</p><p><strong>完整解法：</strong>' + escHtml(e[2]) + '</p><p><strong>最快解法：</strong>' + escHtml(e[3]) + '</p><p class="pitfall"><strong>易錯點：</strong>' + escHtml(e[4]) + '</p></section>').join('') + '</article>';
  }
  function richPractice(index) {
    const d = richLessons[index];
    return '<article class="single-unit-card"><h3>分層練習</h3><p>先自行作答，再展開單題詳解。</p>' + d.exercises.map(e => '<details class="unit-practice"><summary>' + escHtml(e[0]) + '｜' + escHtml(e[1]) + '</summary><p><strong>詳解：</strong>' + escHtml(e[2]) + '</p></details>').join('') + '</article>';
  }
  function richHistory(index) {
    const wrap = document.createElement('div');
    wrap.innerHTML = richLessonHtml(index);
    const section = [...wrap.querySelectorAll('.overview')].find(node => node.textContent.includes('官方歷屆題解析'));
    return section ? '<article class="single-unit-card official-unit"><h3>官方歷屆題</h3>' + section.innerHTML + '</article>' : '<article class="single-unit-card official-unit"><h3>官方歷屆題</h3><p>請由歷屆題詳解頁依題號查看 canonical 題目、題圖與解析。</p><a class="unit-link" href="../Math-B-Review/index.html">開啟 111～115 歷屆題詳解</a></article>';
  }
  function lessonOneHistory() {
    const wrap = document.createElement('div');
    wrap.innerHTML = lesson1Html();
    const section = [...wrap.querySelectorAll('section')].find(node => node.textContent.includes('歷屆題解析'));
    return section ? '<article class="single-unit-card official-unit"><h3>官方歷屆題</h3>' + section.innerHTML + '</article>' : '<article class="single-unit-card official-unit"><h3>官方歷屆題</h3><a class="unit-link" href="../Math-B-Review/index.html">開啟 111～115 歷屆題詳解</a></article>';
  }

  window.buildLessonUnits = function (index) {
    const d = beginner(index);
    const base = lessons[index];
    const units = [
      unit('intro', 'intro', '這課要懂什麼', () => '<article class="single-unit-card"><h3>這課要懂什麼</h3><p class="beginner-intro">' + escHtml(d.intro) + '</p><p>' + escHtml(base.goal) + '</p><p class="source-note">先建立模型，再進入公式與題目；本頁一次只顯示一個認知單元。</p></article>'),
      unit('concept', 'concept', '白話觀念', () => index >= 1 && index <= 4 ? richConcept(index) : '<article class="single-unit-card"><h3>白話觀念</h3><p>' + escHtml(d.explain) + '</p><div class="formula">' + escHtml(base.formula) + '</div><p><strong>先備知識：</strong></p>' + listHtml(base.prior) + '</article>'),
      unit('visual', 'visual', '視覺圖', () => visualHtml(index)),
      unit('example', 'example', '最基本例子', () => index >= 1 && index <= 4 ? richExamples(index) : '<article class="single-unit-card"><h3>最基本例子</h3><p>' + escHtml(d.example) + '</p><div class="formula">' + escHtml(base.example) + '</div></article>'),
      unit('practice', 'practice', '練習與正式方法', () => index >= 1 && index <= 4 ? richPractice(index) : index === 0 ? '<article class="single-unit-card"><h3>練習與正式方法</h3><div class="step">' + escHtml(base.method) + '</div><p class="practice-missing">第 1 課練習已由本課專屬資料提供。</p></article>' : '<article class="single-unit-card"><h3>正式解題方法</h3><div class="step">' + escHtml(base.method) + '</div><p class="practice-missing">本課目前沒有獨立自編練習題。狀態：NEEDS_MANUAL_PRACTICE_AUTHORING；不以其他課題目或 generic bank 代替。</p></article>'),
      unit('official', 'officialQuestion', '歷屆題', () => index === 0 ? lessonOneHistory() : index >= 1 && index <= 4 ? richHistory(index) : '<article class="single-unit-card official-unit"><h3>官方歷屆題入口</h3><p>本課對應題號：' + escHtml(base.history) + '</p><p>題目、官方題圖、答案與解析由 canonical question bank 提供，不在課程資料中複製。</p><a class="unit-link" href="../Math-B-Review/index.html">開啟 111～115 歷屆題詳解</a></article>'),
      unit('mistake', 'mistake', '常見錯誤', () => '<article class="single-unit-card mistake"><h3>常見錯誤</h3>' + listHtml(base.mistakes) + '<p class="beginner-mistake"><strong>本課初學者提醒：</strong>' + escHtml(d.mistake) + '</p></article>'),
      unit('sop', 'sop', '考場 SOP', () => '<article class="single-unit-card"><h3>考場 SOP</h3><div class="step">' + escHtml(d.sop) + '</div><div class="step">' + escHtml(base.method) + '</div></article>'),
      unit('review', 'review', '考前帶走', () => '<article class="single-unit-card remember"><h3>考前帶走</h3><p class="beginner-takeaway">' + escHtml(d.takeaway) + '</p><p>這課的最後檢查：</p>' + listHtml(base.check) + '</article>')
    ];
    units.splice(2, 0, unit('formula', 'formula', '公式頁', () => formulaPage(index)));
    return units;
  };

  const baseBuildLessonUnits = window.buildLessonUnits;
  window.buildLessonUnits = function (index) {
    const units = baseBuildLessonUnits(index);
    const lessonId = index + 1;
    const exampleUnit = units[4];
    units[4] = unit('example', 'example', exampleUnit.title, () => exampleUnit.render() + '<div class="formula-compact-wrap"><h4>本題用到的公式</h4>' + compactFormulaHints(index) + '</div>');
    const reviewUnit = units[9];
    units[9] = unit('review', 'review', reviewUnit.title, () => reviewUnit.render() + '<div class="formula-quick-read"><h3>本課必背公式</h3>' + lessonFormulaCards(index).slice(0, 4).map(data => formulaCardHtml(data, true)).join('') + '</div>');
    const practice = lessonPracticeFor(lessonId);
    if (practice && practice.length) {
      units[4] = unit('practice', 'practice', '練習與正式方法', () => '<article class="single-unit-card"><h3>分層練習</h3><p>本課專屬 12 題；先自行作答，再展開「查看解答」。</p>' + practice.map(p => '<details class="unit-practice"><summary>' + escHtml(p.id + '｜') + mathHtml(p.stem) + '</summary><p><strong>答案：</strong>' + mathHtml(p.answer) + '</p><p><strong>詳解：</strong>' + mathHtml(p.explanation) + '</p><p><strong>易錯點：</strong>' + mathHtml(p.commonMistake) + '</p></details>').join('') + '</article>');
    }
    if (practice && practice.length) {
      const practiceUnit = units[4];
      const originalUnits = baseBuildLessonUnits(index);
      units[4] = unit('example', 'example', originalUnits[4].title, () => originalUnits[4].render() + '<div class="formula-compact-wrap"><h4>本題用到的公式</h4>' + compactFormulaHints(index) + '</div>');
      units[5] = practiceUnit;
    }
    return units;
  };
})();
