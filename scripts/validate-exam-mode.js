const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const context = { console, window: {}, globalThis: null };
context.globalThis = context;
vm.createContext(context);
for (const file of ['Math-B-Review/review-presentation-metadata.js', '數學B快速複習/question-bank-115.js', '數學B快速複習/question-bank.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
}
vm.runInContext('globalThis.__EXAMS = EXAMS;', context);
const exams = context.__EXAMS || vm.runInContext('EXAMS', context) || {};
const bank = context.window.questionBank || {};
const years = ['115', '114', '113', '112', '111'];
const all = Object.values(bank);
const checks = [];
const check = (name, pass, detail = '') => checks.push({ name, pass: Boolean(pass), detail });

const examQuestions = year => Array.isArray(exams[year]) ? exams[year] : (exams[year]?.questions || []);
check('years', years.every(year => examQuestions(year).length === 20) && years.length === 5, years.map(year => `${year}:${examQuestions(year).length}`).join(','));
check('questions', all.length === 100 && years.every(year => examQuestions(year).length === 20), `bank=${all.length}`);
const counts = all.reduce((out, q) => (out[q.type] = (out[q.type] || 0) + 1, out), {});
check('type counts', counts.single === 39 && counts.multiple === 25 && counts.fill === 26 && counts['non-selection'] === 10, JSON.stringify(counts));
check('canonical ownership', all.every(q => q.id && q.sourceVerified && q.answerVerified), 'all questions retain canonical identity');
check('official answer mismatch', all.filter(q => q.officialAnswer === undefined || q.officialAnswer === null).length === 0, 'answers are read only from question-bank.js');
check('image completeness', all.filter(q => !q.questionImage || !fs.existsSync(path.join(root, '數學B快速複習', q.questionImage))).length === 0, 'all official question images exist');
const unified = fs.readFileSync(path.join(root, '數學B快速複習/unified-exam.js'), 'utf8');
const index = fs.readFileSync(path.join(root, '數學B快速複習/index.html'), 'utf8');
check('single-view', /renderExamQuestion\(state\)/.test(unified) && !/allQuestions|questions\.map\(renderQuestion/.test(unified), 'one exam-question-card is mounted');
check('valid hash', /mode=exam/.test(index) && /canonicalHash/.test(unified));
check('invalid hash fallback', /YEARS\.includes/.test(unified) && /: '115'/.test(unified) && /normalizeQuestion/.test(unified));
check('reset', /sessions\.delete\(k\)/.test(unified) && /data-exam-reset/.test(unified));
check('state isolation', /key\(year, number\)/.test(unified) && /sessions\.has\(k\)/.test(unified) && /key\(state\.year,n\)/.test(unified));
check('answer leaks', !/officialAnswer|officialScoringPoints|recommendedWriting/.test(unified.match(/return `.*exam-question-card[\s\S]*?`;/)?.[0] || ''), 'pre-submit card template does not include solution fields');
check('single app shell', /data-app-mode="curriculum"/.test(index) && /data-app-mode="exam"/.test(index) && /data-app-mode="supplementary"/.test(index) && !/<meta http-equiv="refresh"/.test(index));
check('no external dependency', !/https?:\/\//.test(unified));
const spot = years.every(year => {
  const types = new Set(all.filter(q => String(q.year) === year).map(q => q.type));
  return types.has('single') && types.has('multiple') && types.has('fill');
});
check('year spot types', spot);

const failed = checks.filter(x => !x.pass);
const result = { pass: failed.length === 0, checks, counts, years: years.length, questions: all.length, timestamp: new Date().toISOString() };
console.log(JSON.stringify(result, null, 2));
if (failed.length) process.exitCode = 1;
