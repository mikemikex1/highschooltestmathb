const YEARS=['115','114','113','112','111'];
const app=document.querySelector('#app');
const esc=(v)=>typeof renderMathText==='function'?renderMathText(v):String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const link=(name)=>`../數學B/${encodeURIComponent(name).replaceAll('%2F','/')}`;
function list(items,cls=''){return `<ul class="${cls}">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`}
function canonicalQuestion(y,n){return window.questionBank?.[`${y}-Q${n}`] || null}
function questionImageUrl(src){return src ? `../數學B快速複習/${src.split('/').map((part,i)=>i===0?part:encodeURIComponent(part)).join('/')}` : ''}
function optionText(canonical,index,q){return canonical?.options?.[index-1] ?? q.options?.[index-1]?.label ?? `選項 ${index}`}
function normalizeQuizYear(value){const year=String(value??'');return YEARS.includes(year)?year:'115'}
function parseQuizHash(){
  const raw=location.hash.replace(/^#/,'');
  const legacy=raw.match(/^q-(111|112|113|114|115)-(\d+)$/);
  const params=new URLSearchParams(raw);
  const year=normalizeQuizYear(legacy?.[1]||params.get('year'));
  const requested=Number(legacy?.[2]||params.get('question'));
  const max=EXAMS[year]?.questions?.length||20;
  const question=Number.isInteger(requested)&&requested>=1&&requested<=max?requested:null;
  const canonical=question?`#year=${year}&question=${question}`:`#year=${year}`;
  return {year,question,canonical,valid:!raw||raw===canonical.slice(1)};
}
function updateQuizHash(year,question,replace){
  const hash=question?`#year=${year}&question=${question}`:`#year=${year}`;
  if(location.hash===hash)return;
  const method=replace?'replaceState':'pushState';
  history[method]({year,question},'',hash);
}
function buildAnswerPanel(card){
  const id=card.dataset.questionId, c=window.questionBank?.[id], type=card.dataset.type;
  if(!c) return;
  const answer=Array.isArray(c.officialAnswer)?c.officialAnswer.map(String):String(c.officialAnswer??'');
  const selected=type==='multiple'
    ? [...card.querySelectorAll('.answer-option.is-selected')].map(x=>x.dataset.option).sort()
    : [card.querySelector('.answer-option.is-selected')?.dataset.option].filter(Boolean);
  const correct=Array.isArray(answer)?answer.slice().sort():[answer];
  card.querySelectorAll('.answer-option').forEach(btn=>{
    const value=String(btn.dataset.option);
    const isCorrect=correct.includes(value), wasSelected=selected.includes(value);
    btn.classList.remove('is-selected','is-correct','is-incorrect');
    if(wasSelected) btn.classList.add('is-selected');
    if(isCorrect) btn.classList.add('is-correct');
    else if(wasSelected) btn.classList.add('is-incorrect');
    btn.setAttribute('aria-pressed',wasSelected?'true':'false');
  });
  const input=card.querySelector('[data-answer-input]');
  let answerText='';
  let isCorrect=false;
  if(type==='fill'){
    answerText=String(input?.value??'').trim();
    isCorrect=answerText===String(c.officialAnswer??'').trim();
    input?.classList.toggle('is-correct',isCorrect);
    input?.classList.toggle('is-incorrect',!isCorrect);
  }else if(type==='non-selection'){
    answerText=String(card.querySelector('[data-response]')?.value??'').trim();
    isCorrect=null;
  }else{
    isCorrect=selected.length===correct.length && selected.every((v,i)=>v===correct[i]);
  }
  card.dataset.submitted='true';
  card.querySelectorAll('.answer-option,[data-answer-input],[data-response]').forEach(control=>{control.disabled=true});
  const feedback=card.querySelector('[data-feedback]');
  if(feedback){feedback.hidden=false;feedback.innerHTML=type==='non-selection'?'已提交自我作答，現在可以查看官方評分重點與參考答案。':`<strong>${isCorrect?'作答正確':'請訂正'}</strong>　官方答案：${esc(Array.isArray(c.officialAnswer)?c.officialAnswer.join('、'):c.officialAnswer)}`;}
  const reveal=card.querySelectorAll('[data-reveal]'); reveal.forEach(b=>b.disabled=false);
}
function renderAnalysis(card){
  const c=window.questionBank?.[card.dataset.questionId], box=card.querySelector('[data-analysis]');
  if(!c||!box||card.dataset.submitted!=='true') return;
  const entries=Object.entries(c.optionAnalysis||{});
  box.hidden=false;
  const analysis=entries.map(([k,v])=>`<div class="analysis-item"><b>選項 ${esc(k)}：${v.verdict?'正確':'錯誤'}</b><p>${esc(v.reason||'')}</p>${v.calculation?`<p class="calculation">${esc(v.calculation)}</p>`:''}</div>`).join('');
  box.innerHTML=entries.length?`<h4>逐選項解析</h4>${analysis}`:'<p>本題沒有選項解析。</p>';
}
function renderQuestion(q,y){
  const canonicalTeaching=canonicalQuestion(y,q.number)?.teaching||{};
  const canonicalType=canonicalQuestion(y,q.number)?.type;
  const canonicalTypeLabel={single:'單選',multiple:'多選',fill:'選填','non-selection':'非選'}[canonicalType]||q.type;
  const c=canonicalQuestion(y,q.number), type=c?.type||({'單選':'single','多選':'multiple','選填':'fill','非選':'non-selection'}[q.type]||'fill');
  const labels=q.diagramLabels?`<div class="mini-block"><h4>圖形／代號補充</h4>${list(Object.entries(q.diagramLabels).map(([k,v])=>`${k}：${v}`))}</div>`:'';
  const image=c?.questionImage?`<figure class="official-question"><figcaption>官方原題</figcaption><img src="${questionImageUrl(c.questionImage)}" alt="${y} 學測數學 B 第 ${q.number} 題官方原題" loading="lazy"></figure>`:'';
  const options=(type==='single'||type==='multiple')&&c?.options?.length?`<div class="answer-area" data-answer-area><h4>先自己作答</h4><div class="option-list">${c.options.map((o,i)=>`<button type="button" class="answer-option" aria-pressed="false" data-option="${esc(String(i+1))}">${esc(o)}</button>`).join('')}</div><p class="answer-hint">${type==='multiple'?'可複選；提交前不顯示正誤。':'請選一個；提交前不顯示正誤。'}</p></div>`:'';
  const fill=type==='fill'?`<div class="answer-area"><label>先填答案 <input data-answer-input type="text" inputmode="numeric" autocomplete="off" aria-label="${y} 第 ${q.number} 題作答欄"></label><p class="answer-hint">只提供必要格式提示；提交前不顯示答案。</p></div>`:'';
  const nonselect=type==='non-selection'?`<div class="answer-area"><label for="response-${y}-${q.number}">先寫你的解題過程</label><textarea id="response-${y}-${q.number}" data-response rows="5" placeholder="請先寫出列式、推理與結論"></textarea></div>`:'';
  const review=type==='non-selection'?`<div class="review-actions"><button type="button" data-reveal="scoring" disabled>查看官方評分重點</button><button type="button" data-reveal="answer" disabled>查看參考答案與解析</button><div data-reveal-panel hidden></div></div>`:`<div data-analysis hidden></div>`;
  const submit=`<div class="answer-actions"><button type="button" class="submit-answer" data-submit>提交作答</button><button type="button" class="reset-answer" data-reset>重設</button><span data-feedback hidden></span></div>`;
  const summary=c?.questionSummaryStatus==='TRANSCRIBED_FROM_OFFICIAL_IMAGE' ? `<div class="question-text"><h4>題目摘要</h4><p>${esc(c.questionSummary)}</p></div>` : `<p class="question-caption">題目完整內容已保留在上方官方原題圖，請直接依圖作答。</p>`;
  return `<details class="question-card" id="q-${y}-${q.number}" data-question-id="${y}-Q${q.number}" data-type="${type}"><summary>第 ${q.number} 題｜${esc(canonicalTypeLabel)}｜${esc(q.topic)}｜${'★'.repeat(q.difficulty)}</summary><div class="question-body">${image}<div class="meta"><span class="chip">主要考點：${esc(q.topic)}</span><span class="chip">核心能力：${esc(q.skill)}</span></div>${summary}${labels}<p><b>題目在考什麼：</b>${esc(c?.questionSummary||'')}</p>${options}${fill}${nonselect}${submit}${review}<div class="solution-block" data-solution hidden><div class="mini-block"><h4>完整解答</h4><div class="solution">${esc(canonicalTeaching.fullSolution||'')}</div></div><div class="mini-block"><h4>考場最快解法</h4><div class="solution">${esc(canonicalTeaching.fastestSolution||'')}</div></div><div class="mini-block"><h4>常見錯誤</h4>${list(canonicalTeaching.commonMistakes||[])}</div><div class="mini-block"><h4>一句話必記</h4><div class="warning">${esc(canonicalTeaching.takeaway||'')}</div></div></div></div></details>`;
}
function render(y,focusQuestion=null){
  y=normalizeQuizYear(y);
  const d=EXAMS[y];
  document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.year===y));
  const map=d.questions.map(q=>{const c=canonicalQuestion(y,q.number);const typeLabel={single:'單選',multiple:'多選',fill:'選填','non-selection':'非選'}[c?.type]||q.type;return `<tr><td><a href="#q-${y}-${q.number}">第 ${q.number} 題</a></td><td>${esc(typeLabel)}</td><td>${esc(q.topic)}</td><td class="difficulty">${'★'.repeat(q.difficulty)}</td><td>${esc(q.reminder)}</td></tr>`}).join('');
  const focus=d.focus.map(n=>{const q=d.questions.find(x=>x.number===n);const c=canonicalQuestion(y,n)||{};const t=c.teaching||{};return `<article class="focus-card"><h3>★ 第 ${n} 題｜${esc(q.topic)}</h3><p><span class="label">先看題目：</span>${esc(c.questionSummary||'')}</p><p><span class="label">考場提示：</span>${esc(t.fastestSolution||'')}</p><p class="error"><span class="label">易錯：</span>${esc(t.commonMistakes?.[0]||'')}</p><a href="#q-${y}-${n}">開題目並作答 →</a></article>`}).join('');
  const details=d.questions.map(q=>renderQuestion(q,y)).join('');
  const lessons=LESSONS.map(x=>`<article class="focus-card"><h3>${esc(x[0])}</h3><p><span class="label">要背：</span>${esc(x[1].replace('要背：',''))}</p><p><span class="label">要理解：</span>${esc(x[2].replace('要理解：',''))}</p></article>`).join('');
  app.innerHTML=`<section class="intro"><h2>${y} 年度特色</h2><p>${esc(d.feature)}</p></section><section class="section"><h2 class="section-title">必看考點</h2><div class="section-body points-grid">${d.points.map(p=>`<div class="point"><strong>${esc(p[0])}</strong><span>${esc(p[1])}</span></div>`).join('')}</div></section><section class="section"><h2 class="section-title">20 題題型地圖</h2><div class="section-body table-scroll"><table class="topic-table"><thead><tr><th>題號</th><th>題型</th><th>考點</th><th>難度</th><th>一句話提醒</th></tr></thead><tbody>${map}</tbody></table></div></section><section class="section"><h2 class="section-title">最值得重看的題</h2><div class="section-body focus-grid">${focus}</div></section><section class="section"><h2 class="section-title">最容易錯的地方</h2><div class="section-body">${list(d.traps)}</div></section><section class="section"><h2 class="section-title">非選題怎麼寫</h2><div class="section-body"><div class="warning">${esc(d.nonselectIntro)}</div>${list(d.nonselectTips)}</div></section><section class="section"><h2 class="section-title">答題紙注意事項</h2><div class="section-body">${list(d.sheet)}</div></section><section class="section"><h2 class="section-title">考前最後 10 分鐘</h2><div class="section-body">${list(d.lastTen,'last-ten')}</div></section><section class="section"><h2 class="section-title details-heading">20 題完整詳解（預設收合）</h2><div class="section-body">${details}</div></section><section class="exam-box"><h2>開始 ${y} 學測數學 B 模擬考</h2><p>100 分鐘｜不可查公式｜不可暫停｜先寫會的｜最後留時間檢查選填格式｜非選一定寫過程</p><div class="exam-actions"><a class="exam-main" href="${link(d.files[0])}" target="_blank" rel="noopener">開始 ${y} 模擬考</a><a class="exam-secondary" href="${link(d.files[1])}" target="_blank" rel="noopener">答案 PDF</a><a class="exam-secondary" href="${link(d.files[2])}" target="_blank" rel="noopener">答題卷 PDF</a><a class="exam-secondary" href="${link(d.files[3])}" target="_blank" rel="noopener">非選評分 PDF</a></div><p class="source-note">資料來源：官方試卷、答案、答題卷及非選擇題評分原則。</p></section>`;
  app.insertAdjacentHTML('afterbegin',`<section class="section"><h2 class="section-title">課綱速讀｜20 堂核心課</h2><div class="section-body focus-grid">${lessons}</div></section>`);
  app.querySelectorAll('[data-answer-option]').forEach(()=>{});
  if(focusQuestion){const target=app.querySelector(`#q-${y}-${focusQuestion}`);if(target){target.open=true;target.scrollIntoView({block:'start'});}}
  window.scrollTo({top:0,behavior:'smooth'});
}
document.addEventListener('click',e=>{
  const option=e.target.closest('.answer-option');
  if(option && option.closest('.question-card')?.dataset.submitted!=='true'){
    const card=option.closest('.question-card');
    if(card.dataset.type==='single') card.querySelectorAll('.answer-option').forEach(x=>x.classList.remove('is-selected'));
    option.classList.toggle('is-selected');
    option.setAttribute('aria-pressed',option.classList.contains('is-selected')?'true':'false');
  }
  const submit=e.target.closest('[data-submit]'); if(submit) { const card=submit.closest('.question-card'); if(!card||card.dataset.submitted==='true')return; buildAnswerPanel(card); submit.disabled=true; card.querySelector('[data-solution]')?.removeAttribute('hidden'); renderAnalysis(card); }
  const reset=e.target.closest('[data-reset]'); if(reset){ const card=reset.closest('.question-card'); if(!card)return; card.dataset.submitted='false'; card.open=false; card.querySelectorAll('.answer-option').forEach(x=>{x.className='answer-option';x.disabled=false;x.setAttribute('aria-pressed','false')}); card.querySelectorAll('input,textarea').forEach(x=>{x.value='';x.disabled=false;x.classList.remove('is-correct','is-incorrect')}); const feedback=card.querySelector('[data-feedback]'); if(feedback){feedback.hidden=true;feedback.replaceChildren()}; const analysis=card.querySelector('[data-analysis]'); if(analysis){analysis.hidden=true;analysis.replaceChildren()}; card.querySelector('[data-solution]')?.setAttribute('hidden',''); card.querySelectorAll('[data-reveal]').forEach(x=>{x.disabled=true;x.setAttribute('aria-expanded','false')}); const panel=card.querySelector('[data-reveal-panel]'); if(panel){panel.hidden=true;panel.replaceChildren()}; card.querySelector('[data-submit]')?.removeAttribute('disabled'); }
  const reveal=e.target.closest('[data-reveal]'); if(reveal){ const card=reveal.closest('.question-card'); if(card?.dataset.submitted!=='true') return; const c=window.questionBank?.[card.dataset.questionId]; const panel=card.querySelector('[data-reveal-panel]'); if(!panel||!c)return; panel.hidden=false; panel.innerHTML=reveal.dataset.reveal==='scoring'?`<h4>官方評分重點</h4>${list(c.officialScoringPoints||[])}<p class="warning">${esc(c.partialCreditNotes||'')}</p>`:`<h4>參考答案與建議寫法</h4><div class="solution">${esc(c.recommendedWriting||c.teaching?.fullSolution||'')}</div>`; }
});
function renderFromQuizHash(){const state=parseQuizHash();render(state.year,state.question);if(!state.valid)history.replaceState({year:state.year,question:state.question},'',state.canonical)}
function init(){const tabs=document.querySelector('#yearTabs');tabs.innerHTML=YEARS.map(y=>`<button class="tab ${y==='115'?'active':''}" data-year="${y}" type="button">${y}</button>`).join('');tabs.addEventListener('click',e=>{const b=e.target.closest('.tab');if(b){const year=normalizeQuizYear(b.dataset.year);render(year);updateQuizHash(year,null,false)}});document.querySelector('#printBtn').onclick=()=>window.print();renderFromQuizHash()}
window.addEventListener('hashchange',renderFromQuizHash);
window.addEventListener('popstate',renderFromQuizHash);
document.addEventListener('DOMContentLoaded',init);
