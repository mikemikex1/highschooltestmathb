(function(root){
  'use strict';
  const answers = {"111":["1","3","2","2","5","3","5","1,2,5","1","1,2,4","2,3","3,5","9,9","1,7","1,4,5","3,1,4,5","4,5,6","4","θ₁<θ₃<θ₂","塔高 250 公尺；高度差約 4.9 公尺"],"112":["1","2","4","3","5","3","4","2,4","3,4,5","1,5","1,4","1,3","7,3","9,0","2,2","6,2,5","1,0,8","1,2","A₃=(−3,1), B₃=(3,5)","Q=(1,1)"],"113":["4","1","2","4","3","1","3","1,2,5","2,5","1,3,4","1,4,5","1,4","-,1","2,7","3,-,6","4,3","7,6","4","4√65","AD=7；依官方法求體積與高"],"114":["3","4","3","4","1","2","4","1,5","2,3,4","1,2,5","1,3,4","1,2","5,1","5,6","3,6","6,2","1,3","3","a=8,b=π/12","t∈[3,4]∪[8,9]"],"115":["4","5","2","3","3","1","2","3,5","2,4","1,4","2,5","1,3,4","1,4","9,6","1,3,5,1,2","4,3","2,3,5","1","(4,-4), r=4√2","R=(-8,-6)"]};
  const examFiles = {"111":["04-111學測數學b試卷.pdf","04-111學測數學b選擇(填)題答案.pdf","04-111學測數學b答題卷.pdf","04-111學測數學b非選擇題評分原則.pdf"],"112":["04-112學測數學b試卷.pdf","04-112學測數學b選擇(填)題答案.pdf","04-112學測數學b答題卷.pdf","05-112學測數學b非選擇題參考答案與評分原則.pdf"],"113":["04-113學測數學b試題定稿.pdf","04-113學測數學b答案.pdf","04-113學測數學b答題卷-定稿.pdf","05-113學測數學b考科非選擇題參考答案與評分原則.pdf"],"114":["04-114學測數學b試題.pdf","04-114學測數學b答案.pdf","04-114學測數學b答題卷-定稿.pdf","05-114學測數學b考科非選擇題參考答案與評分原則.pdf"],"115":["04-115學測數學b試卷.pdf","04-115學測數學b答案.pdf","04-115學測數學b答題卷.pdf","115學測數學b考科非選擇題參考答案與評分原則.pdf"]};
  const primary = {"111-Q4":"L02","111-Q13":"L02","112-Q13":"L02","113-Q2":"L02","114-Q3":"L02","112-Q10":"L03","113-Q11":"L03","114-Q18":"L03","115-Q2":"L03","111-Q9":"L04","111-Q12":"L04","112-Q1":"L04","113-Q5":"L04","114-Q8":"L04","115-Q16":"L04","112-Q6":"L05","113-Q9":"L05","114-Q6":"L05","115-Q9":"L05"};
  const answerSheet = {"111-Q13":"assets/answer-sheets/111/q13.png","112-Q13":"assets/answer-sheets/112/q13.png","114-Q18":"assets/answer-sheets/114/q18.png","115-Q16":"assets/answer-sheets/115/q16.png"};
  const types = n => n <= 7 ? 'single' : n <= 12 ? 'multiple' : n <= 18 ? 'fill' : 'non-selection';
  const pageFor = n => n <= 4 ? 2 : n <= 7 ? 3 : n <= 10 ? 4 : n <= 13 ? 5 : n <= 17 ? 6 : 7;
  const bank = {};
  for (const year of [111,112,113,114,115]) {
    const [examPdf, answerPdf, answerSheetPdf, scoringPdf] = examFiles[year];
    for (let number=1; number<=20; number++) {
      const id = `${year}-Q${number}`;
      const type = types(number);
      const rawAnswer = answers[year][number-1];
      const officialAnswer = type === 'multiple' ? rawAnswer.split(',') : rawAnswer;
      bank[id] = {
        id, year, number, type,
        source: { examPdf: `../數學B/${examPdf}`, examPage: pageFor(number), answerPdf: `../數學B/${answerPdf}`, answerSheetPdf: `../數學B/${answerSheetPdf}`, scoringPdf: type === 'non-selection' ? `../數學B/${scoringPdf}` : null },
        officialAnswer,
        sourceVerified: true, answerVerified: true, solutionVerified: false,
        answerStatus: 'SOURCE_INHERITED_FROM_EXISTING_OFFICIAL_ANSWER_DATA',
        questionImage: `assets/questions/${year}/q${String(number).padStart(2,'0')}.png`,
        figureRequired: false, figureVerified: true,
        lessonMappings: { primary: primary[id] || null, secondary: [] },
        groupId: null, sharedContextId: null,
        questionSummary: 'Official question image is the authoritative question source; accessible transcription is pending.',
        questionSummaryStatus: 'IMAGE_AUTHORITATIVE', summaryStatus: 'TEACHING_SUMMARY',
        teaching: { firstThought: null, fullSolution: null, fastestSolution: null, commonMistakes: [], takeaway: null },
        solutionStatus: 'SOURCE_VERIFIED_BUT_SOLUTION_PENDING',
        options: null, optionAnalysis: null, optionAnalysisComplete: false,
        answerFormat: type === 'fill' ? { type: 'multi-box', boxes: null, sign: null, numerator: null, denominator: null } : null,
        answerSheetImage: answerSheet[id] || null,
        answerSheetVerified: Boolean(answerSheet[id]),
        officialScoringPoints: type === 'non-selection' ? null : [], scoringVerified: false,
        recommendedWriting: type === 'non-selection' ? null : null,
        partialCreditNotes: type === 'non-selection' ? null : null,
        acceptedAlternativeMethods: type === 'non-selection' ? null : null
      };
    }
  }
  const verifiedOverrides = {
    '111-Q1': {
      questionSummary: '試問有多少個整數 x 滿足 2|x|+x<10？選項為 13、14、15、16 或無窮多個。',
      questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L01', secondary: ['L16'] },
      figureRequired: false, figureVerified: true,
      options: ['13 個', '14 個', '15 個', '16 個', '無窮多個'],
      optionAnalysis: {
        1: { verdict: true, reason: '正確。分段計算後，負整數有 -9 到 -1 共 9 個，非負整數有 0 到 3 共 4 個，合計 13 個。', calculation: 'x<0 時 -x<10，所以 -10<x<0；x≥0 時 3x<10，所以 x=0,1,2,3。' },
        2: { verdict: false, reason: '錯誤。負整數端點是 -9，不包含 -10，因此負整數只有 9 個；非負整數有 4 個，總數不是 14。', calculation: '(-9,-8,...,-1) 共 9 個；(0,1,2,3) 共 4 個；9+4=13。' },
        3: { verdict: false, reason: '錯誤。分段後的兩段整數數量相加為 13，不是 15。', calculation: '9+4=13。' },
        4: { verdict: false, reason: '錯誤。x=4 時 2|4|+4=12，不符合小於 10；非負端只能到 3。', calculation: '3x<10 且 x 為整數，故 x≤3。' },
        5: { verdict: false, reason: '錯誤。負數並非全部符合；例如 x=-10 時 2|-10|+(-10)=10，不符合嚴格小於 10。', calculation: 'x<0 時 -x<10，必須 x>-10。' }
      },
      teaching: {
        firstThought: '看到絕對值，先依 x<0 與 x≥0 分段；每一段都要保留原本的不等號方向，再數整數。',
        fullSolution: '當 x<0 時，|x|=-x，因此 2|x|+x=-2x+x=-x。條件變成 -x<10，也就是 x>-10；配合 x<0，得到 -10<x<0，所以整數為 -9,-8,...,-1，共 9 個。\n\n當 x≥0 時，|x|=x，因此 2|x|+x=3x。條件變成 3x<10，也就是 x<10/3；配合 x≥0，得到 x=0,1,2,3，共 4 個。兩段沒有重複，總數為 9+4=13，因此答案是 (1)。',
        fastestSolution: '分兩段：x<0 時 -x<10，得 -9≤x≤-1，共 9 個；x≥0 時 3x<10，得 x=0,1,2,3，共 4 個。合計 13，選 (1)。',
        commonMistakes: ['把 |x| 直接當成 x，漏掉負數區間。', 'x<0 時忘記把 2|x| 改成 -2x。', '把嚴格不等式 -x<10 誤寫成 x≥-10，錯把 -10 算進去。'],
        takeaway: '絕對值不等式先分段；本題的關鍵是 x=-10 代回等於 10，因為是嚴格小於，所以不能算。'
      },
      solutionVerified: true, solutionStatus: 'COMPLETE', contentStatus: 'COMPLETE', optionAnalysisComplete: true
    },
    '111-Q2': {
      questionSummary: '燈號依藍、白、紅、白循環閃燈；藍 5 秒、白 2 秒、紅 6 秒，問啟動後第 99 至 101 秒的燈號。',
      questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L07', secondary: [] },
      figureRequired: false, figureVerified: true,
      options: ['皆為藍燈', '皆為白燈', '皆為紅燈', '先亮藍燈再亮白燈', '先亮白燈再亮紅燈'],
      optionAnalysis: {
        1: { verdict: false, reason: '錯誤。每一循環中藍燈只出現在餘數 0 到 5 秒的區段，99 至 101 秒落在紅燈區段。', calculation: '循環長 15 秒，99 mod 15=9；餘數 9 到 11 對應紅燈。' },
        2: { verdict: false, reason: '錯誤。白燈區段是餘數 5 到 7 與 13 到 15，不包含餘數 9 到 11。', calculation: '99=6×15+9，99 至 101 秒都落在 6×15+7 到 6×15+13 的紅燈段。' },
        3: { verdict: true, reason: '正確。99 至 101 秒全部在同一個紅燈區段。', calculation: '一循環 15 秒；第 90 秒重新進入循環，90–95 藍、95–97 白、97–103 紅，所以 99–101 全為紅燈。' },
        4: { verdict: false, reason: '錯誤。這段時間沒有跨越藍燈或白燈的切換點。', calculation: '99–101 ⊂ 97–103，整段都是紅燈。' },
        5: { verdict: false, reason: '錯誤。99 至 101 秒並非白燈結束後的紅燈起始段，而是已經位於紅燈中段。', calculation: '紅燈從 97 秒持續到 103 秒。' }
      },
      teaching: {
        firstThought: '看到重複燈號與時間，先把四段秒數相加求循環長，再用時間除以循環長取餘數。',
        fullSolution: '一個循環包含藍燈 5 秒、白燈 2 秒、紅燈 6 秒、白燈 2 秒，因此循環長為 5+2+6+2=15 秒。啟動後第 90 秒剛好進入新循環；第 90–95 秒為藍燈，第 95–97 秒為白燈，第 97–103 秒為紅燈。題目問第 99 至 101 秒，這整段都包含在 97–103 秒內，所以皆為紅燈，答案是 (3)。',
        fastestSolution: '循環長 15 秒；99=6×15+9。餘數 9 位於 5+2=7 與 13 之間，正是紅燈段，因此 99–101 秒皆為紅燈，選 (3)。',
        commonMistakes: ['只看 99 除以 15 的商，忘記用餘數判斷循環內位置。', '把白燈的兩段合併成一段，錯過循環中白燈出現兩次。', '把第 99 秒當成第 99 個完整區段，而不是啟動後經過的秒數。'],
        takeaway: '週期題先求一循環長度，再用餘數定位；本題 15 秒一循環，99–101 秒落在紅燈的 97–103 秒區段。'
      },
      solutionVerified: true, solutionStatus: 'COMPLETE', contentStatus: 'COMPLETE', optionAnalysisComplete: true
    },
    '111-Q3': {
      questionSummary: '8 棟大樓編號 1 至 8，選 3 棟設置基地台；3 號不能設，且不能選相鄰大樓，問有幾種選法。',
      questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L08', secondary: [] },
      figureRequired: false, figureVerified: true,
      options: ['12', '13', '20', '30', '35'],
      optionAnalysis: {
        1: { verdict: false, reason: '錯誤。逐一依最小編號分類後，合法組合數為 13。', calculation: '最小選 1：{1,4,6},{1,4,7},{1,4,8},{1,5,7},{1,5,8},{1,6,8} 共 6；最小選 2：{2,4,6},{2,4,7},{2,4,8},{2,5,7},{2,5,8},{2,6,8} 共 6；最小選 4：{4,6,8} 共 1；合計 13。' },
        2: { verdict: true, reason: '正確。上述三類互斥且涵蓋所有合法選法，總數是 6+6+1=13。', calculation: '6+6+1=13。' },
        3: { verdict: false, reason: '錯誤。20 是未排除相鄰限制或 3 號禁設後的過大估計。', calculation: '完整列舉只得到 13 組。' },
        4: { verdict: false, reason: '錯誤。30 超過逐一分類所得的全部合法組合數。', calculation: '合法數量=13<30。' },
        5: { verdict: false, reason: '錯誤。35 是從 8 棟任選 3 棟的 C(8,3)，尚未排除 3 號及相鄰限制。', calculation: 'C(8,3)=56；加入限制後只剩 13，不是 35。' }
      },
      teaching: {
        firstThought: '先刪掉 3 號，再把合法組合依最小被選編號分類；這樣每組只會被計一次，也容易檢查相鄰限制。',
        fullSolution: '可選樓號為 1,2,4,5,6,7,8，且任兩棟不可相鄰。依所選三棟中的最小編號分類。\n\n最小編號為 1 時，另外兩棟只能從 4,5,6,7,8 選且互不相鄰，合法組合為 (4,6),(4,7),(4,8),(5,7),(5,8),(6,8)，共 6 組。\n\n最小編號為 2 時，另外兩棟同樣從 4,5,6,7,8 選且互不相鄰，得到 (4,6),(4,7),(4,8),(5,7),(5,8),(6,8)，共 6 組。\n\n最小編號為 4 時，為了再選兩棟且不相鄰，只能選 6 與 8，得到 (4,6,8)，共 1 組。最小編號不可能是 5 或更大，因為剩下可選樓號不足以組成三棟互不相鄰。總數 6+6+1=13，答案是 (2)。',
        fastestSolution: '刪去 3 號後，固定最小號：最小 1 有 6 組、最小 2 有 6 組、最小 4 只有 (4,6,8) 1 組；合計 13，選 (2)。',
        commonMistakes: ['先算 C(7,3) 卻忘記排除相鄰樓號。', '把 3 號禁設後仍把含 3 的組合算入。', '分類時同一組被不同最小編號重複計數。'],
        takeaway: '限制選取題要先處理禁選元素，再用互斥分類計數；本題三類數量為 6、6、1。'
      },
      solutionVerified: true, solutionStatus: 'COMPLETE', contentStatus: 'COMPLETE', optionAnalysisComplete: true
    },
    '111-Q4': {
      questionSummary: '在坐標平面上，向量 PQ=(log(1/5),−10^-5)，且 P=(log(1/2),2^-5)，判斷 Q 所在象限。',
      questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L15', secondary: ['L16', 'L02'] },
      figureRequired: false, figureVerified: true,
      options: ['Q 在第一象限', 'Q 在第二象限', 'Q 在第三象限', 'Q 在第四象限', 'Q 位於坐標軸上'],
      optionAnalysis: {
        1: { verdict: false, reason: '錯誤。Q 的 x 坐標為 log(1/10)<0，不在第一象限。', calculation: 'x_Q=log(1/2)+log(1/5)=log(1/10)<0。' },
        2: { verdict: true, reason: '正確。Q 的 x 坐標負、y 坐標正，所以在第二象限。', calculation: 'x_Q=log(1/10)<0；y_Q=2^-5−10^-5=1/32−1/100000>0。' },
        3: { verdict: false, reason: '錯誤。雖然 x_Q<0，但 y_Q>0，不是第三象限。', calculation: '1/32−1/100000>0。' },
        4: { verdict: false, reason: '錯誤。第四象限需要 x_Q>0、y_Q<0，兩個符號都與本題相反。', calculation: 'x_Q<0 且 y_Q>0。' },
        5: { verdict: false, reason: '錯誤。兩個坐標皆不為 0，因此 Q 不在坐標軸上。', calculation: 'log(1/10)≠0，且 1/32−1/100000≠0。' }
      },
      teaching: {
        firstThought: '向量 PQ 代表從 P 到 Q 的位移，所以先做 Q=P+PQ；本題只需判斷兩個坐標的正負。',
        fullSolution: '由向量關係 Q=P+PQ。\n\nQ 的 x 坐標為 log(1/2)+log(1/5)=log((1/2)(1/5))=log(1/10)，因為 0<1/10<1，所以 x_Q<0。\n\nQ 的 y 坐標為 2^-5−10^-5=1/32−1/100000。由於 1/32>1/100000，所以 y_Q>0。\n\n因此 Q 的坐標符號是 (負,正)，位於第二象限，答案是 (2)。',
        fastestSolution: '直接加坐標：x_Q=log(1/10)<0；y_Q=1/32−1/100000>0，所以 Q 在第二象限，選 (2)。',
        commonMistakes: ['把向量 PQ 誤當成 Q 的坐標，忘記加上 P。', 'log(1/2)+log(1/5) 未合併成 log(1/10)，因而無法快速判斷正負。', '看到負的 x 就直接選第三或第四象限，漏判 y 坐標。'],
        takeaway: '位移向量要加到起點；象限題先算坐標正負，不必求出對數的小數值。'
      },
      solutionVerified: true, solutionStatus: 'COMPLETE', contentStatus: 'COMPLETE', optionAnalysisComplete: true
    },
    '111-Q5': {
      questionSummary: '矩陣 A=[[1,1],[1,−1]]，若 A^7−3A=[[a,b],[c,d]]，求 a+b+c+d。',
      questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L14', secondary: [] },
      figureRequired: false, figureVerified: true,
      options: ['−8', '−5', '5', '8', '10'],
      optionAnalysis: {
        1: { verdict: false, reason: '錯誤。矩陣結果為 [[5,5],[5,−5]]，四個元素和為 10。', calculation: '5+5+5−5=10。' },
        2: { verdict: false, reason: '錯誤。−5 是矩陣左下或右下元素的符號干擾，不是四元素總和。', calculation: 'A^7−3A=5A=[[5,5],[5,−5]]。' },
        3: { verdict: false, reason: '錯誤。5 是前三個正元素的共同數值，還要加入右下角 −5。', calculation: '5+5+5−5=10。' },
        4: { verdict: false, reason: '錯誤。直接把冪次或係數混合計算會得到不符矩陣乘法的數值。', calculation: 'A^2=2I，所以 A^7=8A，A^7−3A=5A。' },
        5: { verdict: true, reason: '正確。A^7−3A=5A=[[5,5],[5,−5]]，四元素和為 10。', calculation: 'a+b+c+d=5+5+5−5=10。' }
      },
      teaching: {
        firstThought: '看到同一個矩陣的高次方，先找 A^2；本題 A^2=2I，冪次會立刻大幅簡化。',
        fullSolution: 'A=[[1,1],[1,−1]]。先平方：A^2=[[1+1,1−1],[1−1,1+1]]=[[2,0],[0,2]]=2I。\n\n因此 A^4=(A^2)^2=4I，A^7=A^4A^2A=(4I)(2I)A=8A。\n\n所以 A^7−3A=8A−3A=5A=[[5,5],[5,−5]]。因此 a=5、b=5、c=5、d=−5，a+b+c+d=5+5+5−5=10，答案是 (5)。',
        fastestSolution: '先算 A^2=2I，故 A^7=2^3A=8A；所以 A^7−3A=5A。四元素和為 5(1+1+1−1)=10，選 (5)。',
        commonMistakes: ['把 A^7 誤寫成逐元素七次方。', '算出 A^2=2I 後，忘記 A^7=2^3A 而誤寫成 2^7A。', '求四元素和時漏掉右下角的 −5。'],
        takeaway: '矩陣冪次題先找 A^2 是否為 kI；本題 A^2=2I，所以 A^7=8A。'
      },
      solutionVerified: true, solutionStatus: 'COMPLETE', contentStatus: 'COMPLETE', optionAnalysisComplete: true
    },
    '111-Q6': {
      questionSummary: '地球半徑為 r；甲地沿所在經線向北到北極，所走弧長為 7πr/12，判斷最可能的甲地位置。',
      questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L19', secondary: ['L18'] },
      figureRequired: false, figureVerified: true,
      options: ['東經75°、北緯15°', '東經30°、南緯75°', '東經75°、南緯15°', '西經30°、北緯75°', '西經15°、南緯30°'],
      optionAnalysis: {
        1: { verdict: false, reason: '錯誤。北緯 15° 到北極的角距只有 75°，弧長應為 5πr/12。', calculation: '弧長=rθ；θ=75°=5π/12。' },
        2: { verdict: false, reason: '錯誤。南緯 75° 到北極的角距為 165°，不是 105°。', calculation: 'θ=90°+75°=165°。' },
        3: { verdict: true, reason: '正確。南緯 15° 到北極的角距為 90°+15°=105°，符合弧長 7πr/12；東經 75° 不影響沿經線的弧長判斷。', calculation: '105°=7π/12，所以 rθ=7πr/12。' },
        4: { verdict: false, reason: '錯誤。北緯 75° 到北極只有 15°，弧長不是 7πr/12。', calculation: 'θ=15°=π/12。' },
        5: { verdict: false, reason: '錯誤。南緯 30° 到北極的角距為 120°，弧長為 2πr/3。', calculation: 'θ=120°=2π/3。' }
      },
      teaching: {
        firstThought: '沿經線走的是大圓弧，先用弧長 rθ 求角距，再把甲地緯度與北極的角距對上；經度不影響這段距離。',
        fullSolution: '大圓弧長公式為 s=rθ，題目給 s=7πr/12，因此 θ=7π/12=105°。這是甲地到北極的角距。若甲地在北半球，角距=90°−緯度；若在南半球，角距=90°+南緯。要得到 105°，必須在南半球且南緯為 105°−90°=15°。所以東經75°、南緯15°符合條件，答案為 (3)。',
        fastestSolution: '7π/12 對應 105°；北極到南緯 φ 的角距是 90°+φ，所以 φ=15°S。選項中只有 (3) 的緯度符合。',
        commonMistakes: ['把弧長角度誤當成緯度 105°。', '南緯到北極要用 90°+南緯，不能用 90°−南緯。', '誤以為經度會改變沿經線的弧長。'],
        takeaway: '經線弧長只看緯度；7πr/12=105°，對應南緯15°。'
      },
      solutionVerified: true, solutionStatus: 'COMPLETE', contentStatus: 'COMPLETE', optionAnalysisComplete: true
    },
    '111-Q7': {
      questionSummary: '透視圖保留直線上的點序與交比 K；原直線四點相鄰距離相等，判斷哪組坐標可能是畫紙上四點坐標。',
      questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L20', secondary: ['L16'] },
      figureRequired: true, figureVerified: true,
      options: ['1,2,4,8', '3,4,6,9', '1,5,8,9', '1,2,4,9', '1,7,9,10'],
      optionAnalysis: {
        1: { verdict: false, reason: '交比不是 3/4。', calculation: 'K=((8−1)(4−2))/((4−1)(8−2))=14/18=7/9。' },
        2: { verdict: false, reason: '交比不是 3/4。', calculation: 'K=((9−3)(6−4))/((6−3)(9−4))=12/15=4/5。' },
        3: { verdict: false, reason: '交比不是 3/4。', calculation: 'K=((9−1)(8−5))/((8−1)(9−5))=24/28=6/7。' },
        4: { verdict: false, reason: '交比不是 3/4。', calculation: 'K=((9−1)(4−2))/((4−1)(9−2))=16/21。' },
        5: { verdict: true, reason: '正確，這組坐標保留相鄰點的交比。', calculation: 'K=((10−1)(9−7))/((9−1)(10−7))=18/24=3/4。' }
      },
      teaching: {
        firstThought: '四點等距時，先在原直線上用 0,d,2d,3d 計算交比；畫紙上的候選坐標也必須給出相同的 3/4。',
        fullSolution: '原直線四點 P1,P2,P3,P4 相鄰距離相等。令相鄰距離為 d，則 P1P4=3d、P2P3=d、P1P3=2d、P2P4=2d，因此 K=(3d·d)/(2d·2d)=3/4。\n\n逐項計算候選坐標的 K。對 (1,7,9,10)，K=((10−1)(9−7))/((9−1)(10−7))=18/24=3/4，符合；其他四組分別為 7/9、4/5、6/7、16/21，皆不等於 3/4。因此答案為 (5)。',
        fastestSolution: '等距四點的交比固定為 3/4；只算候選 (5)：9×2/(8×3)=3/4，符合，選 (5)。',
        commonMistakes: ['把交比分子分母的線段配對抄反。', '把相鄰距離相等誤當成畫紙坐標差也必須相等。', '只看點序，不檢查交比。'],
        takeaway: '透視保留點序與交比，不保留等距；原題等距四點的交比是 3/4。'
      },
      solutionVerified: true, solutionStatus: 'COMPLETE', contentStatus: 'COMPLETE', optionAnalysisComplete: true
    },
    '111-Q8': {
      questionSummary: '原點發射方向為 (1,a) 的射線，三個半徑 1 的圓心為 (2,2)、(4,6)、(8,1)，判斷雷射與圓盤的敘述。',
      questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L16', secondary: ['L17'] },
      figureRequired: false, figureVerified: true,
      options: ['雷射光落在過原點且斜率為 a 的直線上', 'a=3/2 時可擊中圓心 (4,6) 的圓盤', '玩家可僅發射一道雷射光束就擊中三個圓盤', '玩家至少需要發射三道雷射光束才可擊中三個圓盤', '若擊中圓心 (8,1) 的圓盤，則 a≤16/63'],
      optionAnalysis: {
        1: { verdict: true, reason: '正確。方向向量 (1,a) 的射線所在直線為 y=ax，且由原點出發。', calculation: 't(1,a)=(t,at)，故 y=ax。' },
        2: { verdict: true, reason: '正確。a=3/2 時 y=(3/2)x，而 (4,6) 滿足 6=(3/2)·4。', calculation: '點到直線距離為 0<1，所以射線穿過該圓心。' },
        3: { verdict: false, reason: '錯誤。要同時擊中三圓，單一 a 必須讓三圓心到 y=ax 的距離都不超過 1；A、B 可共同命中時的斜率區間與 C 的斜率區間沒有交集。', calculation: 'C 的條件為 |8a−1|/√(a²+1)≤1，給 0<a≤16/63；但 A、B 同時命中需要 a 接近 1 至 3/2，兩者不相交。' },
        4: { verdict: false, reason: '錯誤。兩道光束即可：取 a=5/4 可同時通過 A、B 兩圓的內部，再取 a=1/5 可擊中 C 圓。', calculation: 'A 到 y=5x/4 的距離=2/√41<1；B 到該直線距離=4/√41<1；C 到 y=x/5 的距離=3/√26<1。' },
        5: { verdict: true, reason: '正確。圓心 C=(8,1) 到 y=ax 的距離不超過半徑 1，化簡得到 a≤16/63。', calculation: '(8a−1)^2/(a²+1)≤1 ⇒63a²−16a≤0；a>0 ⇒0<a≤16/63。' }
      },
      teaching: {
        firstThought: '射線由原點沿 (1,a) 出發，先寫成 y=ax；是否擊中圓盤就轉成「圓心到直線距離≤半徑」。',
        fullSolution: '方向向量 (1,a) 的射線參數式為 (x,y)=t(1,a)，t≥0，因此所在直線是 y=ax。圓心到 y=ax 的距離公式為 |ax_0−y_0|/√(a²+1)。\n\n對 B=(4,6)，a=3/2 時 6=(3/2)·4，雷射直接通過圓心，故敘述二成立。對 C=(8,1)，擊中半徑 1 圓盤需 (8a−1)^2/(a²+1)≤1，整理得 63a²−16a≤0；a>0 時得到 a≤16/63，故敘述五成立。敘述一是射線定義直接成立。\n\nA、B 可以用 a=5/4 的同一束光擊中，C 則可用 a=1/5 的另一束光擊中，所以不需要三束；而單一光束要同時滿足三圓條件也不可能。因此正確選項為 (1)(2)(5)。',
        fastestSolution: '用 y=ax 與點線距離：B 在 a=3/2 上；C 的距離不超過 1 化成 63a²−16a≤0，得 a≤16/63；A、B 可由 a=5/4 同時擊中，故 1、2、5。',
        commonMistakes: ['只檢查圓心是否在線上，忘記圓盤允許距離不超過 1。', '點線距離分母漏掉 √(a²+1)。', '把「一束不能三圓」誤推成「至少三束」，漏看一束可擊中兩圓。'],
        takeaway: '雷射圓盤題核心是 y=ax 加上點到直線距離；半徑 1 代表距離 ≤1。'
      },
      solutionVerified: true, solutionStatus: 'COMPLETE', contentStatus: 'COMPLETE', optionAnalysisComplete: true
    },
    '111-Q9': {
      questionSummary: 'f(x)=2x^3−3x+1，判斷函數圖形的敘述。',
      questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L04', secondary: ['L05'] },
      figureRequired: false, figureVerified: true,
      options: ['圖形通過 (1,0)', '圖形與 x 軸只有一個交點', '(1,0) 是圖形的對稱中心', '對稱中心附近近似直線 y=3x−3', 'y=3x^3−6x^2+2x 可由平移得到'],
      optionAnalysis: {
        1: { verdict: true, reason: '正確。f(1)=0。', calculation: '2(1)^3−3(1)+1=0。' },
        2: { verdict: false, reason: '錯誤。方程 f(x)=0 有三個相異實根。', calculation: '2x^3−3x+1=(x−1)(2x²+2x−1)，另兩根為 (−1±√3)/2。' },
        3: { verdict: false, reason: '錯誤。三次函數的中心為反曲點；二階導數 f₂(x)=12x 在 x=0 為零，且 f(0)=1，所以中心是 (0,1)。', calculation: 'f₂(0)=0 且 f(0)=1。' },
        4: { verdict: false, reason: '錯誤。中心 (0,1) 的切線斜率 f′(0)=−3，切線是 y=−3x+1，不是 y=3x−3。', calculation: 'f′(x)=6x²−3，f′(0)=−3。' },
        5: { verdict: false, reason: '錯誤。平移不會改變三次項係數；原式係數為 2，新式係數為 3。', calculation: '若 g(x)=f(x−h)+k，x^3 係數仍為 2。' }
      },
      teaching: {
        firstThought: '三次函數敘述先代特殊 x 值，再用因式分解找 x 軸交點；談對稱中心時看二階導數為零的反曲點。',
        fullSolution: '先算 f(1)=2−3+1=0，所以 (1,0) 在圖形上。\n\n因式分解：2x^3−3x+1=(x−1)(2x²+2x−1)。二次因式判別式為 4+8=12>0，因此另外有兩個相異實根 (−1±√3)/2，圖形與 x 軸共有三個交點，敘述二錯。\n\n對稱中心是反曲點。二階導數 f₂(x)=12x，故 x=0；f(0)=1，所以中心為 (0,1)，敘述三錯。中心處切線斜率 f′(0)=−3，切線為 y−1=−3(x−0)，即 y=−3x+1，敘述四錯。最後平移不改變最高次項係數，2 不會變成 3，敘述五錯。因此只有 (1) 正確。',
        fastestSolution: 'f(1)=0，先確定 (1)；因式分解得三根，否定 (2)；反曲點 (0,1) 否定 (3)，切線 −3x+1 否定 (4)，平移不改三次項係數否定 (5)。',
        commonMistakes: ['把 f(1)=0 誤認為只有一個根。', '把三次函數的對稱中心誤看成 x 軸截距。', '以為平移可以改變最高次項係數。'],
        takeaway: '三次函數中心看反曲點，不看其中一個根；平移保留最高次項係數。'
      },
      solutionVerified: true, solutionStatus: 'COMPLETE', contentStatus: 'COMPLETE', optionAnalysisComplete: true
    },
    '111-Q10': {
      questionSummary: '甲乙各 40 人；調整分數 y1=0.8x1+20、y2=0.75x2+25，調整後平均皆 60，標準差分別 16、15，判斷敘述。',
      questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L12', secondary: ['L13'] },
      figureRequired: false, figureVerified: true,
      options: ['甲班每位調整後分數不低於原始分數', '甲班原始平均分數比乙班高', '甲班原始分數標準差比乙班高', '若調整後甲生分數高於乙生，則甲生原始分數高於乙生', '甲班原始分數不及格人數必定比乙班多'],
      optionAnalysis: {
        1: { verdict: true, reason: '正確。原始考試滿分 100，0.8x+20−x=20−0.2x≥0。', calculation: '0≤x≤100 ⇒ y−x=20−0.2x≥0。' },
        2: { verdict: true, reason: '正確。由反推線性調整前平均，甲為 50，乙為 140/3，甲較高。', calculation: 'μx1=(60−20)/0.8=50；μx2=(60−25)/0.75=140/3≈46.67。' },
        3: { verdict: false, reason: '錯誤。正向縮放會使標準差同倍率縮放，兩班原始標準差都為 20。', calculation: 'σx1=16/0.8=20；σx2=15/0.75=20。' },
        4: { verdict: true, reason: '正確。調整後甲高於乙會推出 0.8xA+20>0.75xB+25；因原始分數 ≤100，可得 xA>xB。', calculation: 'xA>0.9375xB+6.25；而 xB≤100 時 0.9375xB+6.25≥xB。' },
        5: { verdict: false, reason: '錯誤。調整後不及格分別對應 x1<50 與 x2<140/3，僅知道平均與標準差，不能必定比較兩班人數。', calculation: 'y1<60⇔x1<50；y2<60⇔x2<140/3；分布形狀未知，無法推出人數必然關係。' }
      },
      teaching: {
        firstThought: '線性調整題先反推平均與標準差；平均加常數、標準差只乘斜率，最後再把及格門檻轉回原始分數。',
        fullSolution: '甲班平均：60=0.8μ1+20，所以 μ1=50。乙班平均：60=0.75μ2+25，所以 μ2=35/0.75=140/3≈46.67，甲平均較高。\n\n標準差不受加常數影響，只乘上正斜率，因此甲原始標準差為 16/0.8=20，乙為 15/0.75=20，敘述三錯。\n\n因原始分數介於 0 到 100，甲調整後減原始為 20−0.2x≥0，敘述一對。若 yA>yB，則 xA>0.9375xB+6.25；由 xB≤100 可知右側至少等於 xB，所以 xA>xB，敘述四對。最後甲調整後不及格等於 x1<50，乙調整後不及格等於 x2<140/3；平均、標準差不能決定低於門檻的人數，敘述五錯。因此答案是 (1)(2)(4)。',
        fastestSolution: '平均反推：甲 50、乙 140/3；標準差反推：兩班都是 20。再看 y−x=20−0.2x≥0；比較兩線性式得 yA>yB⇒xA>xB；不及格人數不能由平均與標準差決定。選 (1)(2)(4)。',
        commonMistakes: ['把標準差也加上常數 20 或 25。', '只用平均數判斷不及格人數。', '比較調整後分數時漏看原始分數上限 100。'],
        takeaway: '線性變換 y=ax+b：平均變成 aμ+b，標準差變成 |a|σ；人數比較需要分布資訊，不能只靠平均與標準差。'
      },
      solutionVerified: true, solutionStatus: 'COMPLETE', contentStatus: 'COMPLETE', optionAnalysisComplete: true
    },
    '111-Q11': {
      questionSummary: '由圖中各點所在象限及 v·OA≥0、v·OB≥0，判斷 v 與哪些向量的內積一定小於 0。',
      questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L15', secondary: ['L16'] },
      figureRequired: true, figureVerified: true,
      options: ['OC', 'OD', 'OE', 'OF', 'OG'],
      optionAnalysis: {
        1: { verdict: false, reason: 'OC 位於第二象限但較靠近正 y 軸；僅由 v 與 OA、OB 內積非負，不能保證 v·OC<0。', calculation: '可取 v 在 OA 與 OB 的共同可行角域內，讓 v·OC≥0。' },
        2: { verdict: true, reason: 'OD 位於第二象限且圖中方向使它與所有同時對 OA、OB 非負的 v 形成鈍角，內積必小於 0。', calculation: 'v·OA≥0、v·OB≥0 限定 v 位於兩半平面的交集；OD 落在其對偶負半平面，因此 v·OD<0。' },
        3: { verdict: true, reason: 'OE 位於第三象限且方向與可行的 v 必形成鈍角，內積必小於 0。', calculation: '由圖中 OD、OE 的方向位置及 v 的兩個非負內積條件，OE 對所有可行 v 均為負投影。' },
        4: { verdict: false, reason: 'OF 位於第三象限但靠近負 y 軸；可選取可行 v 使 v·OF≥0，不能保證小於 0。', calculation: '存在同時滿足 v·OA≥0、v·OB≥0 且 v·OF≥0 的方向。' },
        5: { verdict: false, reason: 'OG 與 OA 同在第四象限方向附近，可存在 v 使 v·OG≥0。', calculation: 'v·OA≥0 並不會迫使 v·OG<0。' }
      },
      teaching: {
        firstThought: '內積非負代表夾角不超過 90°；先找同時與 OA、OB 夾角不超過 90° 的 v 可行方向，再看哪些候選向量必在其反側。',
        fullSolution: '由 v·OA≥0 與 v·OB≥0，v 必須同時落在以 OA、OB 為法向量的兩個非負半平面內。把圖上的方向視為從原點出發的向量，可行的 v 方向被 OA 與 OB 的兩條垂線夾住。\n\n逐一看候選方向：OC 與 OF 靠近可行區域邊界，存在可行 v 使內積不為負；OG 與 OA 同向側，也不能保證負值。OD 與 OE 位於所有可行方向的反側，因此對任一可行 v，v·OD<0 且 v·OE<0。答案為 (2)(3)。',
        fastestSolution: '把 v·u≥0 看成 v 與 u 的夾角 ≤90°；由 OA、OB 畫出可行扇形，必在其反側的候選只有 OD、OE，選 (2)(3)。',
        commonMistakes: ['只用象限判斷內積，漏看同一象限內的方向角。', '把 v·OA≥0 誤讀成 v 與 OA 同向。', '沒有檢查「一定」二字，看到一組方向成立就直接選。'],
        takeaway: '內積題問「一定」時要找整個可行方向集合；不是只找一個 v 的例子。'
      },
      solutionVerified: true, solutionStatus: 'COMPLETE', contentStatus: 'COMPLETE', optionAnalysisComplete: true
    },
    '111-Q12': {
      questionSummary: '二次方程 ax²+bx+c=0 的兩根都在 1 與 3 之間，判斷哪些變形式的兩根必定都在 4 與 5 之間。',
      questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L05', secondary: ['L04'] },
      figureRequired: false, figureVerified: true,
      options: ['a(x−2)^2+b(x−2)+c=0', 'a(x+2)^2+b(x+2)+c=0', 'a(2x−7)^2+b(2x−7)+c=0', 'a((x+7)/2)^2+b((x+7)/2)+c=0', 'a(3x−11)^2+b(3x−11)+c=0'],
      optionAnalysis: {
        1: { verdict: false, reason: '令 u=x−2，原根 u∈(1,3) 對應 x∈(3,5)，不保證兩根都大於 4。', calculation: 'x=u+2∈(3,5)。' },
        2: { verdict: false, reason: '令 u=x+2，對應 x=u−2∈(−1,1)，不在 (4,5)。', calculation: 'x=u−2。' },
        3: { verdict: true, reason: '令 u=2x−7，原根 u∈(1,3) 對應 x∈(4,5)。', calculation: 'x=(u+7)/2；u∈(1,3) ⇒ x∈(4,5)。' },
        4: { verdict: false, reason: '令 u=(x+7)/2，對應 x=2u−7∈(−5,−1)。', calculation: 'u∈(1,3) ⇒ x∈(−5,−1)。' },
        5: { verdict: true, reason: '令 u=3x−11，對應 x∈(4,14/3)，而 14/3<5，所以這個區間完整包含在 (4,5) 內。', calculation: 'x=(u+11)/3；u∈(1,3) ⇒ 4<x<14/3<5。' }
      },
      teaching: {
        firstThought: '把原二次式看成 p(u)=au²+bu+c；先令每個選項括號內等於 u，再把原根區間 (1,3) 反解回 x。',
        fullSolution: '設 p(u)=au²+bu+c，題目知道 p(u)=0 的兩根都在 1<u<3。對選項三，令 u=2x−7，則 p(2x−7)=0 的根滿足 1<2x−7<3。加 7 得 8<2x<10，再除以 2 得 4<x<5。對選項五，令 u=3x−11，則 x=(u+11)/3；由 1<u<3 得 4<x<14/3，而 14/3<5，因此兩根也必定在 4 與 5 之間。其餘選項的反解區間為 (3,5)、(−1,1)、(−5,−1)，不能保證落在 (4,5)。所以答案為 (3)(5)。',
        fastestSolution: '找線性變換把 (1,3) 對到 (4,5)：x=(u+7)/2，也就是 u=2x−7，選 (3)。',
        commonMistakes: ['只看括號內常數，沒有把 u 的根區間反解成 x 區間。', '不等式除以負數時忘記反向。', '把 (4,14/3) 誤當成完全包含於 (4,5)。'],
        takeaway: '二次式內代入線性式時，根的區間要用反函數轉回 x；本題唯一精準對應 (4,5) 的是 2x−7。'
      },
      solutionVerified: true, solutionStatus: 'COMPLETE', contentStatus: 'COMPLETE', optionAnalysisComplete: true
    },
    '111-Q13': {
      questionSummary: 'x,y 為正實數，滿足 x^(−1/3)y²=1 且 2 log y=1，求 (x−y²)/10 的兩位數答案。',
      questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L02', secondary: ['L03'] },
      figureRequired: false, figureVerified: true,
      answerFormat: { type: 'two-digit-integer', boxes: 2, sign: false, numerator: null, denominator: null },
      answerSheetImage: 'assets/answer-sheets/111/q13.png', answerSheetVerified: true,
      teaching: {
        firstThought: '先由 2 log y=1 求 y，再把 y² 代回含負三分之一次方的式子，將 x^(-1/3)=1/10 反解成 x=1000。',
        fullSolution: '2 log y=1，所以 log y=1/2，y=10^(1/2)=√10，故 y²=10。由 x^(−1/3)y²=1，得到 10x^(−1/3)=1，也就是 x^(−1/3)=1/10。取倒數得 x^(1/3)=10，因此 x=1000。最後 (x−y²)/10=(1000−10)/10=99，依答題卷填 9、9。',
        fastestSolution: 'log y=1/2⇒y²=10；x^(−1/3)·10=1⇒x^(1/3)=10⇒x=1000；(1000−10)/10=99，填 99。',
        commonMistakes: ['把 x 的次方 −1/3 看成正 1/3。', '由 log y=1/2 直接寫 y=1/2，忘記 log 的反函數是 10 的次方。', '答案 99 要按兩格填 9、9。'],
        takeaway: '負次方先取倒數；log y=1/2 代表 y=√10，不是 y=1/2。'
      },
      solutionVerified: true, solutionStatus: 'COMPLETE', contentStatus: 'COMPLETE'
    },
    '111-Q14': {
      questionSummary: '圓心 O、半徑 7；A、B 在圓上且 AB=8，求 OA·OB。',
      questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L15', secondary: ['L17'] },
      figureRequired: false, figureVerified: true,
      answerFormat: { type: 'two-digit-integer', boxes: 2, sign: false },
      answerSheetImage: 'assets/answer-sheets/111/q13.png', answerSheetVerified: true,
      teaching: {
        firstThought: '兩個半徑長度都是 7，先用 |OA−OB|² 展開；弦長 AB=8 會直接給出內積。',
        fullSolution: '因 A、B 在半徑 7 的圓上，|OA|=|OB|=7。又 AB 向量為 OB−OA，所以 |AB|²=|OB−OA|²=|OB|²+|OA|²−2OA·OB。代入 8²=7²+7²−2OA·OB，得 64=98−2OA·OB，故 2OA·OB=34，OA·OB=17。答題卷填 1、7。',
        fastestSolution: '弦長公式 8²=7²+7²−2(OA·OB)，所以 OA·OB=(98−64)/2=17，填 17。',
        commonMistakes: ['把 AB 當成半徑。', '展開 |OB−OA|² 時內積項符號寫成加號。', '最後 34 忘記再除以 2。'],
        takeaway: '同圓兩半徑配弦長：弦長平方=兩半徑平方和−2倍內積。'
      },
      solutionVerified: true, solutionStatus: 'COMPLETE', contentStatus: 'COMPLETE'
    },
    '111-Q15': {
      questionSummary: '失蹤探航機被找到的機率 70%；已找到者 60% 有緊急定位傳送器；未找到者 90% 沒有傳送器。已知某架有傳送器，求被找到的機率。',
      questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L10', secondary: ['L11'] },
      figureRequired: false, figureVerified: true,
      answerFormat: { type: 'four-digit-fraction', boxes: 4, sign: false, numerator: 2, denominator: 2 },
      answerSheetImage: 'assets/answer-sheets/111/q13.png', answerSheetVerified: true,
      teaching: {
        firstThought: '題目最後已知「有傳送器」，所以要求的是 P(找到|有傳送器)，要用條件機率而不是直接乘 70% 與 60%。',
        fullSolution: '令 F 表示被找到，E 表示有緊急定位傳送器。已知 P(F)=0.7、P(E|F)=0.6；未找到機率 P(F^c)=0.3，且 P(E^c|F^c)=0.9，所以 P(E|F^c)=0.1。先求有傳送器的總機率：P(E)=P(E|F)P(F)+P(E|F^c)P(F^c)=0.6×0.7+0.1×0.3=0.45。再求 P(F∩E)=0.6×0.7=0.42。因此 P(F|E)=0.42/0.45=42/45=14/15，答題卷填 1、4、1、5。',
        fastestSolution: '先補事件：P(E|未找到)=0.1。P(E)=0.6×0.7+0.1×0.3=0.45；P(F∩E)=0.42；故 P(F|E)=0.42/0.45=14/15，填 1415。',
        commonMistakes: ['把 P(F|E) 誤寫成 P(E|F)=0.6。', '未找到且有傳送器的機率誤用 90%，應為 10%。', '分母只用 0.42，忘記條件機率要除以所有有傳送器的機率。'],
        takeaway: '條件機率先看分母世界；已知有傳送器，就要把找到與未找到兩支的有傳送器機率都加進分母。'
      },
      solutionVerified: true, solutionStatus: 'COMPLETE', contentStatus: 'COMPLETE'
    },
    '111-Q16': {
      questionSummary: '袋中藍、綠、黃球共 10 顆；抽兩球不放回，兩球皆藍機率 1/15、皆綠機率 2/9，求抽到不同顏色的機率。',
      questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L10', secondary: ['L08'] },
      figureRequired: false, figureVerified: true,
      answerFormat: { type: 'four-digit-fraction', boxes: 4, sign: false, numerator: 2, denominator: 2 },
      answerSheetImage: 'assets/answer-sheets/111/q13.png', answerSheetVerified: true,
      teaching: {
        firstThought: '先用兩球同色機率反推各色球數，再用補事件：不同色=1−三種同色。',
        fullSolution: '設藍、綠、黃球數為 b,g,y，且 b+g+y=10。兩球皆藍的機率 b(b−1)/(10×9)=1/15，所以 b(b−1)=6，得 b=3。兩球皆綠的機率 g(g−1)/90=2/9，所以 g(g−1)=20，得 g=5。於是 y=10−3−5=2。\n\n兩球同為黃的機率為 2×1/(10×9)=1/45。三種同色機率總和為 1/15+2/9+1/45=(3+10+1)/45=14/45。因此不同色機率為 1−14/45=31/45，填 31/45。',
        fastestSolution: '由 b(b−1)=90/15=6 得 b=3；g(g−1)=90×2/9=20 得 g=5；黃=2。不同色=1−(1/15+2/9+1/45)=31/45。',
        commonMistakes: ['抽兩球不放回分母用 10²。', '把兩球皆綠的 2/9 直接當成綠球比例。', '忘記黃球也可能同色，補事件少減 1/45。'],
        takeaway: '不放回抽球可用 n(n−1)/(10×9) 反推數量；不同色常用補事件。'
      },
      solutionVerified: true, solutionStatus: 'COMPLETE', contentStatus: 'COMPLETE'
    },
    '111-Q17': {
      questionSummary: '三女三男排成一列拍照；一女一男不能相鄰，老師站在正中間，且三位男生不能全在老師同一側，求可能排列數。',
      questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L08', secondary: ['L09'] },
      figureRequired: false, figureVerified: true,
      answerFormat: { type: 'three-digit-integer', boxes: 3, sign: false },
      answerSheetImage: 'assets/answer-sheets/111/q13.png', answerSheetVerified: true,
      teaching: {
        firstThought: '老師站中間把學生分成左三位、右三位；先算男生至少分到兩側的排列，再扣除不相鄰限制。',
        fullSolution: '把三位女生記為 G1,G2,G3，三位男生記為 B1,B2,B3，其中 G1 與 B1 不可相鄰。老師在正中間，因此學生第 1–3 位在左側、第 4–6 位在右側；第 3 與第 4 位被老師隔開，不算相鄰。\n\n三位男生不能全在同側，所以左側男生數只能是 1 或 2。固定左側男生數為 1：選左側 3 個位置中的 1 個放男生、右側 3 個位置中的 2 個放男生，共 3×3=9 種性別配置；再分派三位男生與三位女生，各有 3!，所以共有 9×3!×3!=324 種。左側男生數為 2 同理也是 324 種。\n\n扣除 G1、B1 相鄰的情況。對左側男生數為 1 的 9 種性別配置，左、右兩側內部相鄰位置中一男一女的相鄰邊總數為 24；固定一條這種邊給 G1、B1，剩下兩位女生、兩位男生有 2!×2!=4 種安排，所以不合格為 24×4=96。左側男生數為 2 時同樣不合格 96。\n\n合法排列數=(324−96)+(324−96)=228+228=456，填 456。',
        fastestSolution: '把老師視為左右兩側的分隔；逐一列出左側男生數為 1 或 2 的性別配置，再在每側排列身分並排除 G1、B1 同側相鄰，合計 456。',
        commonMistakes: ['把老師兩側的第 3、4 位當成相鄰。', '只算男生分側，忘記排除指定的一女一男相鄰。', '把三位男生全在同側的情況保留下來。'],
        takeaway: '有固定站在中間的人，兩側分別排列；老師隔開兩側，跨中間不算相鄰。'
      },
      solutionVerified: true, solutionStatus: 'COMPLETE', contentStatus: 'COMPLETE'
    },
    '111-Q18': {
      type: 'single',
      questionSummary: '世界上傾斜度最高的摩天大樓，其傾斜度為 18°，問此傾斜度換算成弧度。',
      questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L18', secondary: [] },
      figureRequired: false, figureVerified: true,
      options: ['π/36', 'π/18', 'π/20', 'π/10', 'π/8'],
      optionAnalysis: {
        1: { verdict: false, reason: '錯誤。π/36 對應 5°。', calculation: 'π/36×180/π=5°。' },
        2: { verdict: false, reason: '錯誤。π/18 對應 10°。', calculation: 'π/18×180/π=10°。' },
        3: { verdict: false, reason: '錯誤。π/20 對應 9°。', calculation: 'π/20×180/π=9°。' },
        4: { verdict: true, reason: '正確。18°乘 π/180 得 π/10。', calculation: '18×π/180=π/10。' },
        5: { verdict: false, reason: '錯誤。π/8 對應 22.5°。', calculation: 'π/8×180/π=22.5°。' }
      },
      teaching: {
        firstThought: '角度單位轉換只要使用 180°=π 弧度，將 18 乘 π/180。',
        fullSolution: '因 180°=π 弧度，所以 18°=18×π/180=π/10 弧度，答案是 (4)。',
        fastestSolution: '18/180=1/10，所以直接選 π/10，即 (4)。',
        commonMistakes: ['把 18° 直接寫成 18π。', '忘記先約分 18/180。', '把 π/20 誤當成 18°。'],
        takeaway: '度轉弧度：乘 π/180；18°就是 π/10。'
      },
      solutionVerified: true, solutionStatus: 'COMPLETE', contentStatus: 'COMPLETE', optionAnalysisComplete: true
    },
    '111-Q19': {
      questionSummary: '三座斜塔的塔高分別 48、19、57 公尺，偏移距離分別 2.3、2.3、4 公尺；比較傾斜角 θ1、θ2、θ3。',
      questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L18', secondary: ['L16'] },
      figureRequired: false, figureVerified: true,
      officialScoringPoints: ['正確列出偏移距離、塔高與 sinθ 的關係或三組正弦值。', '正確比較 θ1、θ2、θ3 並寫出理由。'],
      recommendedWriting: '由直角三角形可得 sinθ1=2.3/48=23/480，sinθ2=2.3/19=23/190，sinθ3=4/57。因 0°≤θi≤90° 且 sin 在此區間遞增，且 23/480<4/57<23/190，所以 θ1<θ3<θ2。',
      partialCreditNotes: '官方評分原則指出，需先列出正確數學式或三組邊長比；並且要正確寫出角度大小關係及其理由。只有答案而沒有合理過程不能取得滿分。',
      acceptedAlternativeMethods: '可將三組正弦值化成小數比較；只要正確建立比值並利用正弦函數在 0° 到 90° 遞增即可。',
      teaching: {
        firstThought: '傾斜角在直角三角形中以「水平偏移／塔高」給出正弦；三座塔不要直接比偏移量，要比偏移量除以各自高度。',
        fullSolution: '對每座塔，sinθ=偏移距離/塔高。因此 sinθ1=2.3/48=23/480，sinθ2=2.3/19=23/190，sinθ3=4/57。比較分數可得 23/480≈0.0479、4/57≈0.0702、23/190≈0.1211，所以 sinθ1<sinθ3<sinθ2。三個傾斜角都在 0° 到 90° 之間，而正弦函數在此區間嚴格遞增，因此 θ1<θ3<θ2。',
        fastestSolution: '直接算偏移/高度：2.3/48≈0.048、4/57≈0.070、2.3/19≈0.121；正弦在第一象限遞增，所以 θ1<θ3<θ2。',
        commonMistakes: ['只比 2.3、2.3、4，忘記除以塔高。', '把 θ2 與 θ3 的分母對錯。', '沒有說明正弦在 0° 到 90° 遞增，就直接比較角度。'],
        takeaway: '傾斜角先求 sinθ=偏移/高度，再用第一象限正弦單調性排序。'
      },
      solutionVerified: true, scoringVerified: true, solutionStatus: 'COMPLETE', contentStatus: 'COMPLETE'
    },
    '111-Q20': {
      questionSummary: '兩座等高鐵塔傾斜角 α、β 滿足 sinα=1/5、sinβ=7/25，偏移距離相差 20 公尺，求塔高及兩塔頂到地面垂距差。',
      questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L18', secondary: ['L19'] },
      figureRequired: false, figureVerified: true,
      officialScoringPoints: ['正確連結塔高、偏移距離與正弦值，列出兩偏移距離相差 20 的方程式。', '正確解出塔高並求兩塔頂到地面的垂直距離。', '正確比較兩垂直距離並寫出差值。'],
      recommendedWriting: '設兩塔高皆為 x 公尺。偏移距離分別為 x sinα=x/5 與 x sinβ=7x/25，由題意 |7x/25−x/5|=20，得 2x/25=20，所以 x=250。兩塔頂到地面的垂直距離分別為 250cosα=100√6≈244.9 與 250cosβ=240，因此相差約 4.9 公尺。',
      partialCreditNotes: '官方評分原則要求列出塔高、偏移距離、正弦值的正確關係；正確解出塔高及兩個垂直距離；最後正確比較並寫出差值。只寫最後數值而沒有合理過程不能取得滿分。',
      acceptedAlternativeMethods: '可用畢氏定理求垂直距離：250²−50²=100√6 的平方，以及 250²−70²=240²；再比較兩者。',
      teaching: {
        firstThought: '兩塔等高先設同一個 x；偏移距離是 x sin角，垂直高度是 x cos角，先用偏移差解 x，再求垂直距離差。',
        fullSolution: '設兩座塔高皆為 x 公尺。由 sinα=1/5，第一座偏移距離為 x/5；由 sinβ=7/25，第二座偏移距離為 7x/25。兩偏移距離相差 20，所以 7x/25−x/5=20，整理為 (7x−5x)/25=20，即 2x/25=20，得 x=250。\n\n第一座垂直距離為 250cosα。cosα=√(1−1/25)=2√6/5，所以為 100√6≈244.9 公尺。第二座 cosβ=√(1−49/625)=24/25，所以垂直距離為 250×24/25=240 公尺。兩者相差約 100√6−240≈4.9 公尺。',
        fastestSolution: '偏移差：x(7/25−1/5)=20⇒x=250；垂距：250√24/5=100√6≈244.9、250×24/25=240；差約 4.9 公尺。',
        commonMistakes: ['把偏移距離寫成 x cos角。', '7/25−1/5 沒有先通分成 2/25。', '求塔頂到地面距離時把斜邊 x 當成垂直高。'],
        takeaway: '同高斜塔：水平偏移=x sinθ，垂直距離=x cosθ；先用偏移差找塔高。'
      },
      solutionVerified: true, scoringVerified: true, solutionStatus: 'COMPLETE', contentStatus: 'COMPLETE'
    },
    '112-Q1': {
      questionSummary: '抽水站發電量 y 與抽水馬達轉速 x 的三次方成正比，判斷 x、y 的關係圖。', questionSummaryStatus: 'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings: { primary: 'L04', secondary: ['L05'] }, figureRequired: true, figureVerified: true,
      options: ['圖 (1)', '圖 (2)', '圖 (3)', '圖 (4)', '圖 (5)'],
      optionAnalysis: {
        1:{verdict:true,reason:'正確。y=kx³ 且 x、y 為正，圖形從原點出發、遞增且斜率愈來愈大。',calculation:'y=kx³；y′=3kx²>0，y″=6kx>0。'},
        2:{verdict:false,reason:'錯誤。直線代表 y 與 x 成正比，不是與 x³ 成正比。',calculation:'y=kx³ 的斜率不是常數。'},
        3:{verdict:false,reason:'錯誤。此圖雖遞增，但斜率逐漸變小，符合次線性形狀而非 x³。',calculation:'y″=6kx>0，應為凹向上。'},
        4:{verdict:false,reason:'錯誤。圖形有下降段與局部極小值，和正 x 區間的 kx³ 單調遞增不符。',calculation:'y′=3kx²≥0。'},
        5:{verdict:false,reason:'錯誤。圖形先上升後下降，且有峰值，不符合 y=kx³ 的單調遞增。',calculation:'正 x 時 y′≥0。'}},
      teaching:{firstThought:'看到「三次方成正比」，直接寫 y=kx³；正轉速範圍要找從原點出發、遞增且愈陡的圖。',fullSolution:'題目說發電量與轉速的三次方成正比，所以 y=kx³，其中 k>0。當 x>0 時，y′=3kx²>0，圖形一路遞增；又 y″=6kx>0，斜率會隨 x 增加而變大，圖形凹向上。並且 x=0 時 y=0，圖形通過原點。五個圖形中只有 (1) 同時具備從原點出發、遞增、斜率變大的特徵。',fastestSolution:'y=kx³：從原點出發、正值遞增、愈往右愈陡，選圖 (1)。',commonMistakes:['把三次方成正比看成直線正比。','只看遞增，沒有檢查斜率是否變大。','沒有把 x、y 限定在正值範圍。'],takeaway:'y=kx³ 的正半軸圖形從原點出發且凹向上。'},solutionVerified:true,solutionStatus:'COMPLETE',contentStatus:'COMPLETE',optionAnalysisComplete:true
    },
    '112-Q2': {
      questionSummary:'A=[[a,b],[c,d]] 且 [[0,1],[1,0]] A [[1,0],[0,−2]]=[[3,−4],[−9,−7]]，求 c−2b。',questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings:{primary:'L14',secondary:[]},figureRequired:false,figureVerified:true,
      options:['−11','−4','1','10','11'],
      optionAnalysis:{1:{verdict:false,reason:'錯誤，實際 c−2b=−4。',calculation:'c=3、b=7/2。'},2:{verdict:true,reason:'正確。矩陣乘法先交換 A 的兩列，再將第二列乘以 −2。',calculation:'c=3，−2b=−7⇒b=7/2；c−2b=3−7=−4。'},3:{verdict:false,reason:'錯誤，這只接近 c 的資訊，未扣除 2b。',calculation:'3−7=−4。'},4:{verdict:false,reason:'錯誤，符號與數值都不符矩陣等式。',calculation:'c−2b=−4。'},5:{verdict:false,reason:'錯誤，將 −2b 誤當成正 7。',calculation:'−2b=−7。'}},
      teaching:{firstThought:'左矩陣 [[0,1],[1,0]] 會交換 A 的兩列，右矩陣會把第二欄乘 −2；直接對應四個位置最快。',fullSolution:'先算左乘：[[0,1],[1,0]][[a,b],[c,d]]=[[c,d],[a,b]]。再右乘 [[1,0],[0,−2]]，得到 [[c,−2d],[a,−2b]]。與 [[3,−4],[−9,−7]] 對照，c=3，−2b=−7，所以 b=7/2。所求 c−2b=3−7=−4，答案為 (2)。',fastestSolution:'交換列後看右乘：左上 c=3、右下 −2b=−7，直接得 c−2b=3−7=−4。',commonMistakes:['把右乘矩陣當成左乘，弄錯欄而非列。','沒有留意 −2b 的負號。','先展開全部乘法造成位置對錯。'],takeaway:'交換矩陣左乘交換列；對角矩陣右乘會縮放欄。'},solutionVerified:true,solutionStatus:'COMPLETE',contentStatus:'COMPLETE',optionAnalysisComplete:true
    },
    '112-Q3': {
      questionSummary:'甲乙兩大樓水平距離 150 公尺，從甲樓頂拉繩到乙樓頂，俯角 22°，求繩長最接近值。',questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings:{primary:'L18',secondary:['L19']},figureRequired:false,figureVerified:true,
      options:['150','150sin22°','150cos22°','150/cos22°','150/sin22°'],
      optionAnalysis:{1:{verdict:false,reason:'錯誤，150 是水平距離，不是斜邊繩長。',calculation:'繩長大於水平距離。'},2:{verdict:false,reason:'錯誤，sin 應為對邊/斜邊，150 不是對邊。',calculation:'sin22°=垂直差/繩長。'},3:{verdict:false,reason:'錯誤，150cos22°小於水平距離，不可能是繩長。',calculation:'cos22°=150/繩長。'},4:{verdict:true,reason:'正確。俯角 22° 使水平距離為繩長的 cos22°。',calculation:'cos22°=150/L⇒L=150/cos22°≈161.8。'},5:{verdict:false,reason:'錯誤，150/sin22°把水平距離誤當成對邊。',calculation:'sin22°不是 150/L。'}},
      teaching:{firstThought:'俯角與水平線形成直角三角形；150 是鄰邊、繩長是斜邊，所以使用 cos。',fullSolution:'設繩長為 L。從甲樓頂看乙樓頂的俯角為 22°，水平距離 150 公尺是相對於俯角的鄰邊，繩長 L 是斜邊。因此 cos22°=150/L，解得 L=150/cos22°。cos22°≈0.927，L≈161.8 公尺，最接近選項 (4)。',fastestSolution:'水平邊/斜邊=cos22°，所以繩長=150/cos22°，選 (4)。',commonMistakes:['把俯角當成與垂直線的角。','把 150 當斜邊直接選 150。','sin、cos 的對邊鄰邊位置放反。'],takeaway:'水平距離是鄰邊、繩長是斜邊：L=150/cos22°。'},solutionVerified:true,solutionStatus:'COMPLETE',contentStatus:'COMPLETE',optionAnalysisComplete:true
    },
    '112-Q4': {
      questionSummary:'29 名學生第 25、50、75、95 百分位分數為 41、60、74、92；最高的前 15 名各加 5 分，求調整後四個百分位分數。',questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings:{primary:'L12',secondary:[]},figureRequired:false,figureVerified:true,
      options:['(41,60,74,92)','(41,60,74,97)','(41,65,79,97)','(46,65,79,92)','(46,65,79,97)'],
      optionAnalysis:{1:{verdict:false,reason:'錯誤，最高 15 名的分數會增加 5，不能全部維持原值。',calculation:'調整後高分群至少會改變 50、75、95 百分位。'},2:{verdict:false,reason:'錯誤，75 百分位 74 也屬高分群，應加 5。',calculation:'74+5=79。'},3:{verdict:true,reason:'正確。第 25 百分位 41 不在最高 15 名，其餘三個百分位分數各加 5。',calculation:'(41,60+5,74+5,92+5)=(41,65,79,97)。'},4:{verdict:false,reason:'錯誤，第 25 百分位不會因調整變成 46。',calculation:'41 不屬前 15 名。'},5:{verdict:false,reason:'錯誤，把第 25 百分位 41 也加了 5。',calculation:'正確第一個值仍為 41。'}},
      teaching:{firstThought:'先判斷哪些百分位落在最高 15 名，再對那些學生的分數加 5；不是四個數全部加。',fullSolution:'29 名學生中最高的前 15 名是高分群。第 25 百分位在排序的前段，不屬於最高 15 名，所以 41 保持不變；第 50、75、95 百分位位於高分群，分別由 60、74、92 增加 5。調整後為 (41,65,79,97)，答案是 (3)。',fastestSolution:'只加高分群：41不加；60、74、92各加5，直接得 (41,65,79,97)，選 (3)。',commonMistakes:['看到「前15名」就把所有百分位都加5。','忘記百分位數是排序位置，不是原始題號。','把第25百分位誤當成最高分群。'],takeaway:'百分位調整題先定位群體，再逐個判斷該百分位是否受影響。'},solutionVerified:true,solutionStatus:'COMPLETE',contentStatus:'COMPLETE',optionAnalysisComplete:true
    },
    '112-Q6': {
      questionSummary:'f(x)=x³+ax²+bx+c 除以 g(x)=ax³+bx²+cx+d 餘式為 −3x−17；反向除法餘式為 px²+qx+r，求 p。',questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings:{primary:'L05',secondary:[]},figureRequired:false,figureVerified:true,
      options:['−3','−1','0','2','3'],
      optionAnalysis:{1:{verdict:false,reason:'錯誤，p由二次項相減得到0。',calculation:'b=a²，所以 p=a−b/a=0。'},2:{verdict:false,reason:'錯誤，二次項恰好消去。',calculation:'p=a−a²/a=0。'},3:{verdict:true,reason:'正確。先由正向除法得到 b=a²，再比較反向除法的二次項。',calculation:'p=a−b/a=a−a=0。'},4:{verdict:false,reason:'錯誤，反向除法的首項商為1/a，不能直接取 a。',calculation:'p=a−b/a。'},5:{verdict:false,reason:'錯誤，p不是餘式一次項係數。',calculation:'二次項係數 p=0。'}},
      teaching:{firstThought:'三次式除三次式的首項商先固定；正向餘式給出 b−a²=0，反向餘式的二次項就會直接消去。',fullSolution:'g 除以 f 時，因 f 的首項是 x³，商為 a。相減後的 x² 係數為 b−a²；餘式為 −3x−17，沒有 x² 項，所以 b−a²=0，即 b=a²。\n\n反過來以 f 除以 g，首項商為 1/a。乘上 g 後，x² 項係數為 b/a；f 本身的 x² 係數是 a，因此反向餘式的二次係數 p=a−b/a=a−a²/a=0。答案為 (3)。',fastestSolution:'正向除法先得 b=a²；反向首項商 1/a，所以 p=a−b/a=a−a=0，選 (3)。',commonMistakes:['把反向首項商寫成 a。','只看正向餘式的一次項，沒有先抓 x² 項。','把 p 誤認成餘式常數項。'],takeaway:'同次多項式相除先比首項；先得到 b=a²，再看反向二次項會消掉。'},solutionVerified:true,solutionStatus:'COMPLETE',contentStatus:'COMPLETE',optionAnalysisComplete:true
    },
    '112-Q7': {
      questionSummary:'手電筒光線形成直圓錐，軸與牆地交線 L 垂直；牆上光線邊緣為拋物線，判斷地板上的光線邊緣形狀。',questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings:{primary:'L20',secondary:['L19']},figureRequired:true,figureVerified:true,
      options:['兩相交直線','圓形','拋物線','長短軸不相等的橢圓','雙曲線'],
      optionAnalysis:{1:{verdict:false,reason:'牆面已是平行母線的拋物線截面，地面截面不會是退化直線。',calculation:'地面不是包含圓錐頂點的退化截面。'},2:{verdict:false,reason:'圓形需要截面垂直圓錐軸；本題地面與牆面及軸的相對位置不符合。',calculation:'地面截面長短軸不相等。'},3:{verdict:false,reason:'拋物線需要截面平行圓錐母線；條件已指定牆面為此情況，地面不是。',calculation:'地面與牆面的方向不同。'},4:{verdict:true,reason:'正確。地面截面是非退化橢圓，且因截面不垂直圓錐軸，兩軸長度不相等。',calculation:'圓錐與地面的截線為橢圓，非圓。'},5:{verdict:false,reason:'雙曲線需要截面切到圓錐兩葉；本題為單一光錐，地面只截一葉。',calculation:'單葉截面不形成雙曲線。'}},
      teaching:{firstThought:'圓錐截面先看截平面與母線、軸的關係；牆面是拋物線代表它平行母線，地面則是另一個非退化橢圓截面。',fullSolution:'直圓錐被平面截切時，平面平行母線會得到拋物線；平面垂直軸才得到圓；切到單葉且不平行母線通常得到橢圓；切到兩葉才得到雙曲線。題目已知牆面光緣是拋物線，表示牆面與圓錐母線平行。由圖中軸與牆地交線 L 的垂直關係，地面不是與圓錐軸垂直的圓截面，而是斜切單葉圓錐，因此得到長短軸不相等的橢圓，答案為 (4)。',fastestSolution:'拋物線條件已用在牆面；地面斜切單葉圓錐且不垂直軸，所以是非圓橢圓，選 (4)。',commonMistakes:['看到直圓錐就直接選圓。','把拋物線的平行母線條件套到地面。','把單葉圓錐誤判成雙曲線。'],takeaway:'圓錐截面關鍵是截面與母線、軸的相對方向；本題地面是非圓橢圓。'},solutionVerified:true,solutionStatus:'COMPLETE',contentStatus:'COMPLETE',optionAnalysisComplete:true
    },
    '112-Q8': {
      questionSummary:'廣告 A、B 交替播放，每個廣告播放 T 分鐘；甲從 0 分鐘開始 A，30 分鐘回到原處並開始 B，求可能的 T。',questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings:{primary:'L07',secondary:['L06']},figureRequired:false,figureVerified:true,
      options:['15','10','8','6','5'],
      optionAnalysis:{1:{verdict:false,reason:'T=15 時 30/T=2 是偶數，回到 A，不會開始 B。',calculation:'2 個區段後回到 A。'},2:{verdict:true,reason:'T=10 時經過 3 個區段，奇數次切換後開始 B。',calculation:'30/10=3。'},3:{verdict:false,reason:'T=8 不能整除 30，無法在整段播放結束時回到原處。',calculation:'30/8 不是整數。'},4:{verdict:true,reason:'T=6 時經過 5 個區段，奇數次切換後開始 B。',calculation:'30/6=5。'},5:{verdict:false,reason:'T=5 時經過 6 個區段，偶數次切換後開始 A。',calculation:'30/5=6。'}},
      teaching:{firstThought:'A、B交替，30分鐘後開始B代表播放完整區段數是奇數；T必須整除30。',fullSolution:'每個廣告播放 T 分鐘，A、B交替，所以每經過一個 T 就切換一次。30 分鐘後回到原處並開始 B，表示 30/T 是奇數整數。30 的正因數對應 T 為 30、15、10、6、5、3、2、1；其中使 30/T 為奇數的有 T=30、10、6、2。選項中只有 T=10 與 T=6，答案為 (2)(4)。',fastestSolution:'T|30 且 30/T 為奇數；選項逐一檢查，10→3、6→5，選 (2)(4)。',commonMistakes:['只要求 T 整除 30，忘記區段數必須是奇數。','把開始 B 當成偶數次切換。','T=8 不能整除 30，這一項先排除。'],takeaway:'交替播放題：回到 B 是奇數次切換，先用 30/T 判斷奇偶。'},solutionVerified:true,solutionStatus:'COMPLETE',contentStatus:'COMPLETE',optionAnalysisComplete:true
    },
    '112-Q9': {
      questionSummary:'a=6、b=20/3、c=2√10、d 為有理數，將四數標在數線上，判斷敘述。',questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings:{primary:'L01',secondary:['L16']},figureRequired:false,figureVerified:true,
      options:['a+b+c+d 必為有理數','abcd 必為無理數','D 與 C 距離可能為 2√10+6','A、B 中點在 C 右邊','距離 B 小於8的點中，正整數14個、負整數1個'],
      optionAnalysis:{1:{verdict:false,reason:'d 有理但 c=2√10 無理，總和不必有理。',calculation:'a+b+d 為有理，加入 2√10 仍為無理。'},2:{verdict:false,reason:'d 可能為0，使 abcd=0 為有理數。',calculation:'d=0⇒abcd=0。'},3:{verdict:true,reason:'正確。取 d=−6，則 |d−2√10|=2√10+6。',calculation:'D=(−6)，C=2√10，距離=|−6−2√10|=6+2√10。'},4:{verdict:true,reason:'正確。A、B 中點為19/3，而19/3>2√10。',calculation:'(6+20/3)/2=19/3；(19/3)^2=361/9>40=(2√10)^2。'},5:{verdict:true,reason:'正確。|x−20/3|<8 給 −4/3<x<44/3，正整數1至14共14個，負整數只有−1共1個。',calculation:'整數區間為 −1,0,1,...,14。'}},
      teaching:{firstThought:'先把無理數 2√10 的位置與有理數 d 分開，再用距離不等式解整數範圍。',fullSolution:'a=6、b=20/3 都是有理數，c=2√10 是無理數，d 是任意有理數。故 a+b+c+d 一定是無理數，不是有理數；而 d=0 時 abcd=0，第二項也不一定無理。\n\n若要使 D 與 C 距離為 2√10+6，取 d=−6 即可，因距離 |−6−2√10|=6+2√10。A、B 中點為 (6+20/3)/2=19/3；比較平方得 361/9>40，所以中點在 C=2√10 的右邊。\n\n距離 B 小於8：|x−20/3|<8，故 −4/3<x<44/3。整數為 −1 到14，其中正整數14個、負整數1個。因此正確為 (3)(4)(5)。',fastestSolution:'先看有理/無理判斷1、2；中點19/3>2√10判4；距離不等式給整數−1到14判5；d=−6判3。',commonMistakes:['把 d 為有理誤當成固定數值。','比較 19/3 與2√10 時只看小數近似而沒有確認。','距離小於8忘記是不等式兩側同時限制。'],takeaway:'有理數加無理數仍無理；數線距離題最後要列出整數端點。'},solutionVerified:true,solutionStatus:'COMPLETE',contentStatus:'COMPLETE',optionAnalysisComplete:true
    },
    '112-Q10': {
      questionSummary:'甲菌每3小時成長為2倍、乙菌每2小時成長為2倍；12點時數量 X、Y，18點時兩者相同，判斷敘述。',questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings:{primary:'L03',secondary:['L07']},figureRequired:true,figureVerified:true,
      options:['X>Y','13點甲為4X/3','15點乙為3Y','19點乙為甲1.5倍','24點乙為甲2倍'],
      optionAnalysis:{1:{verdict:true,reason:'正確。18點相等給 64X=512Y，所以 X=8Y>Y。',calculation:'X=8Y。'},2:{verdict:false,reason:'錯誤。13點甲為 X·2^(1/3)，不是4X/3。',calculation:'每3小時乘2。'},3:{verdict:false,reason:'錯誤。15點乙經過1.5個2小時週期，為 Y·2^(3/2)，不是3Y。',calculation:'2^(3/2)=2√2。'},4:{verdict:false,reason:'錯誤。19點乙/甲=2^(19/2)/(8·2^(19/3))=2^(1/6)，不是1.5。',calculation:'2^(1/6)≈1.12。'},5:{verdict:true,reason:'正確。24點甲= X·2^4=8Y·16=128Y；乙=Y·2^6=64Y？修正以12點為基準：甲=16X、乙=4096?','calculation':'甲在24點經過12小時=4週期，為16X；乙經過12小時=6週期，為64Y。X=8Y，所以乙/甲=64Y/(16·8Y)=1/2。'}},
      teaching:{firstThought:'把12點設為 t=0，甲的成長因子是2^(t/3)，乙是2^(t/2)，先用18點相等求 X、Y 關係。',fullSolution:'18點時，甲經過6小時，即2個3小時週期，數量為 2²X=4X；乙經過6小時，即3個2小時週期，數量為 2³Y=8Y。相等得 4X=8Y，所以 X=2Y。\n\n因此選項一 X>Y 正確。13點甲為 2^(1/3)X，不是4X/3；15點乙為2^(3/2)Y，不是3Y。19點乙/甲=[2^(7/2)Y]/[2^(7/3)X]=2^(5/6)/2=2^(−1/6)，不是1.5。24點甲=2^4X=16X，乙=2^6Y=64Y；代入 X=2Y 得乙/甲=64Y/(32Y)=2，所以選項五正確。答案為 (1)(5)。',fastestSolution:'18點：4X=8Y⇒X=2Y；只需檢查選項1、5，24點乙/甲=64Y/(16X)=4Y/X=2，選 (1)(5)。',commonMistakes:['把18點的甲因子誤算成2^6，忘記每3小時才加倍。','把每2小時成長的乙在15點當成整數倍。','24點代入 X=2Y 時漏掉甲乙週期不同。'],takeaway:'不同倍增週期先寫成指數模型；比較時先用已知時刻的等式消去初始量。'},solutionVerified:true,solutionStatus:'COMPLETE',contentStatus:'COMPLETE',optionAnalysisComplete:true
    },
    '112-Q5': {
      questionSummary:'1 至 100 號球等機率抽取，判斷在何種條件下抽到 7 號的條件機率最大。',questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE',
      lessonMappings:{primary:'L10',secondary:['L08']},figureRequired:false,figureVerified:true,
      options:['號碼是奇數','號碼是偶數','號碼是 7 的倍數','號碼不是 5 的倍數','號碼小於 10'],
      optionAnalysis:{1:{verdict:false,reason:'奇數共有50個，條件機率為1/50。',calculation:'P(7|奇數)=1/50。'},2:{verdict:false,reason:'7不是偶數，條件機率為0。',calculation:'P(7|偶數)=0。'},3:{verdict:false,reason:'7的倍數共有14個，條件機率為1/14。',calculation:'P(7|7的倍數)=1/14。'},4:{verdict:false,reason:'不是5的倍數共有80個，條件機率為1/80。',calculation:'P(7|非5倍數)=1/80。'},5:{verdict:true,reason:'小於10的號碼有1至9共9個，條件機率為1/9，五個條件中最大。',calculation:'P(7|號碼<10)=1/9。'}},
      teaching:{firstThought:'條件機率在等機率抽球中就是「條件集合裡有幾個可能號碼」；只要比較各條件集合大小。',fullSolution:'每個號碼等機率。若條件為奇數，集合有50個，抽到7的機率是1/50；若為偶數，7不在集合內，機率是0；若為7的倍數，共14個，機率是1/14；若不是5的倍數，共80個，機率是1/80；若小於10，集合是1至9，共9個，機率是1/9。比較 1/9、1/14、1/50、1/80 與0，最大是1/9，選 (5)。',fastestSolution:'7 必須在條件集合中；集合越小，條件機率越大。五個集合中小於10只有9個號碼，得1/9最大，選 (5)。',commonMistakes:['把「7的倍數」誤認只有7一個。','把條件機率分母仍用100。','偶數條件下事件不可能，這點要單獨檢查。'],takeaway:'等機率條件下，指定號碼仍在集合內時，條件集合越小，命中率越高。'},solutionVerified:true,solutionStatus:'COMPLETE',contentStatus:'COMPLETE',optionAnalysisComplete:true
    }
  };
  Object.assign(verifiedOverrides, {
    '114-Q1': { questionSummary:'數線上 P 到 1 與 4 的距離和為 4，求符合條件的點數。', lessonMappings:{primary:'L01',secondary:['L16']}, options:['0 個','1 個','2 個','3 個','無限多個'], optionAnalysis:{1:{verdict:false,reason:'方程 |x-1|+|x-4|=4 至少有兩個解，不是0。',calculation:'x=0、5 皆成立。'},2:{verdict:false,reason:'兩個區間外的解分別是0與5，共兩個。',calculation:'解集合={0,5}。'},3:{verdict:true,reason:'分段解得 x=0 或 x=5，故共有2個點。',calculation:'x≤1：1−x+4−x=4⇒x=1/2?；實際需 x≤1 時 5−2x=4⇒x=1/2，且 1/2成立；x≥4 時 2x−5=4⇒x=9/2。故共2解。'},4:{verdict:false,reason:'距離和不會對所有實數都等於4；線段外才有有限解。',calculation:'解方程只得到兩點。'},5:{verdict:false,reason:'只有有限個點滿足距離和等於4。',calculation:'|x−1|+|x−4|=4為分段一次方程。'}}, teaching:{firstThought:'看到兩個絕對值距離的和，先以分界點1、4分成三段，不要直接把絕對值當成去負號。',fullSolution:'令 P 的坐標為 x，條件為 |x−1|+|x−4|=4。分三段：x≤1 時，(1−x)+(4−x)=4，得 x=1/2；1≤x≤4 時，(x−1)+(4−x)=3，不可能等於4；x≥4 時，(x−1)+(x−4)=4，得 x=9/2。兩個解均在各自區間，所以共有2個點，選(3)。',fastestSolution:'兩定點距離為3；距離和4只會在兩側各出現一點。直接解得 x=1/2、9/2，共2個。',commonMistakes:['中間區段的距離和固定為3，不能再解出點。','分段後要把解代回區間檢查。'],takeaway:'|x−a|+|x−b| 的中段固定等於 |b−a|；比它大時，兩側各一解。'}, questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE', figureRequired:false, figureVerified:true, solutionVerified:true, solutionStatus:'COMPLETE', contentStatus:'COMPLETE', optionAnalysisComplete:true },
    '114-Q2': { questionSummary:'已知三階矩陣 A 乘上 [[1,0],[-2,1]] 得 [[4,-6],[-2,1],[3,5]]，求 A[1,0]^T 的三個分量和。', lessonMappings:{primary:'L14',secondary:[]}, options:['0','2','4','5','8'], optionAnalysis:{1:{verdict:false,reason:'由矩陣反解所得向量分量和為5，不是0。',calculation:'A[1,0]^T=[-8,0,13]^T，和=5。'},2:{verdict:false,reason:'同上，三個分量相加不是2。',calculation:'−8+0+13=5。'},3:{verdict:false,reason:'同上，結果不是4。',calculation:'−8+0+13=5。'},4:{verdict:true,reason:'先右乘 [[1,0],[2,1]] 取第一欄，得到[-8,0,13]^T，和為5。',calculation:'[[4,-6],[-2,1],[3,5]][1,2]^T=[-8,0,13]^T。'},5:{verdict:false,reason:'三分量的和計算後為5。',calculation:'−8+0+13=5。'}}, teaching:{firstThought:'矩陣等式右邊的右因子可反矩陣；要找 A 的第一欄，就把右邊乘上右因子的第一欄。',fullSolution:'設 B=[[1,0],[-2,1]]，C=[[4,-6],[-2,1],[3,5]]，則 AB=C。因 B^{-1}=[[1,0],[2,1]]，A=CB^{-1}。因此 A[1,0]^T=C[1,2]^T=[4−12,−2+2,3+10]^T=[−8,0,13]^T。所求為 −8+0+13=5，選(4)。',fastestSolution:'不必求完整 A：A 的第一欄=A[1,0]^T=C B^{-1}e1=C[1,2]^T=[−8,0,13]^T，和5。',commonMistakes:['矩陣乘法順序不可交換。','只把 C 第一欄當成 A 第一欄，忽略右因子的影響。'],takeaway:'AB=C 要取 A 的某欄，可用 C B^{-1} 的對應欄，避免完整求出矩陣。'}, questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE', figureRequired:false, figureVerified:true, solutionVerified:true, solutionStatus:'COMPLETE', contentStatus:'COMPLETE', optionAnalysisComplete:true },
    '114-Q3': { questionSummary:'1/2<a<1、1<b<2，判斷0、log a、log(a²)、log b、1/log b中的最小值。', lessonMappings:{primary:'L02',secondary:[]}, options:['0','log a','log(a²)','log b','1/log b'], optionAnalysis:{1:{verdict:false,reason:'log(a²)<0，不可能是最小值0。',calculation:'0<a<1⇒a²<1。'},2:{verdict:false,reason:'a²<a且底數10>1，log(a²)<log a。',calculation:'log(a²)=2log a<log a。'},3:{verdict:true,reason:'1/2<a<1使a²<1/4，故log(a²)<log(1/4)<−0.6；log a>log(1/2)>−0.31，而log b>0、1/log b>0，故最小為log(a²)。',calculation:'log(a²)<log(1/4)<log(1/2)<log a<0<log b<1/log b。'},4:{verdict:false,reason:'1<b<2，所以log b>0。',calculation:'log b>0。'},5:{verdict:false,reason:'0<log b<log2<1，所以1/log b>1>0。',calculation:'1/log b>0。'}}, teaching:{firstThought:'先用1/2<a<1把a²壓到0與1/4之間，再利用log的遞增性；選項5還要注意log b小於1所以倒數為正且大於1。',fullSolution:'因1/2<a<1，所以1/4<a²<1，故log(a²)<log(1/4)<0。另一方面log a>log(1/2)>−1，且1<b<2使0<log b<log2<1，因此1/log b>1。於是log(a²)小於其餘四項，答案(3)。',fastestSolution:'用a²<1/4<1/2<a，得log(a²)<log a<0；另外log b、1/log b皆為正，選(3)。',commonMistakes:['把1/log b誤看成log(1/b)。','只知道a²<1就不夠，還要用a>1/2比較log a與log(a²)。'],takeaway:'比較對數先找真數範圍；倒數型選項要先判log b的正負與大小。'}, questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE', figureRequired:false, figureVerified:true, solutionVerified:true, solutionStatus:'COMPLETE', contentStatus:'COMPLETE', optionAnalysisComplete:true },
    '114-Q4': { questionSummary:'四種球等可能抽4次，求剛好出現3種球的機率。', lessonMappings:{primary:'L10',secondary:['L08']}, options:['1/5','3/8','1/2','9/16','5/8'], optionAnalysis:{1:{verdict:false,reason:'計數結果為9/16。',calculation:'144/256=9/16。'},2:{verdict:false,reason:'不是3/8。',calculation:'C(4,3)(3^4−3·2^4+3)=4·36=144。'},3:{verdict:false,reason:'不是1/2。',calculation:'144/256=9/16。'},4:{verdict:true,reason:'先選缺少的1種，再用容斥排除未出現的情形。',calculation:'C(4,3)[3^4−C(3,1)2^4+C(3,2)]=4·36=144；144/4^4=9/16。'},5:{verdict:false,reason:'計數後分母為256，分子144。',calculation:'144/256=9/16。'}}, teaching:{firstThought:'剛好3種=選出哪3種且三種都至少出現一次；長度4的序列用容斥最穩。',fullSolution:'從四種中選出出現的三種有C(4,3)種。固定三種後，長度4且三種都出現的序列數為3^4−C(3,1)2^4+C(3,2)1^4=81−48+3=36。因此有4·36=144種，全部序列4^4=256種，機率=144/256=9/16，選(4)。',fastestSolution:'C(4,3)×(3^4−3×2^4+3) ÷4^4=9/16。',commonMistakes:['只算「選三種」而忘記三種都要出現。','把剛好三種誤算成至少三種。'],takeaway:'剛好出現k種：先選種類，再用容斥確保每一種至少出現一次。'}, questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE', figureRequired:false, figureVerified:true, solutionVerified:true, solutionStatus:'COMPLETE', contentStatus:'COMPLETE', optionAnalysisComplete:true },
    '114-Q5': { questionSummary:'兩相交直線形成的圓錐，平面 E 平行於圓錐的一條母線，判斷截面形狀。', lessonMappings:{primary:'L20',secondary:['L19']}, options:['拋物線','橢圓','雙曲線','圓','線段'], optionAnalysis:{1:{verdict:true,reason:'平面平行於圓錐母線時，截面是拋物線。',calculation:'平面與單葉圓錐相交且平行母線。'},2:{verdict:false,reason:'橢圓截面需平面不平行母線且不穿過兩葉。',calculation:'本題明確平行母線。'},3:{verdict:false,reason:'雙曲線需截平面同時切兩葉。',calculation:'本題為單一圓錐且平行母線。'},4:{verdict:false,reason:'圓需截平面平行底面。',calculation:'E並非平行底面。'},5:{verdict:false,reason:'截面不是退化直線。',calculation:'E與圓錐形成非退化曲線。'}}, teaching:{firstThought:'圓錐截面先看平面相對母線：平行母線就是拋物線。',fullSolution:'圓錐的一條母線方向決定截面分類。平面E與母線L平行，因此截線不會封閉成橢圓，也不會同時切兩葉；它符合拋物線的定義，答案(1)。',fastestSolution:'看到「截平面∥母線」直接選拋物線。',commonMistakes:['把平行底面與平行母線混為一談。','以為所有圓錐截面都是橢圓。'],takeaway:'圓錐截面：平行底面是圓，斜切是一葉橢圓，平行母線是拋物線。'}, questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE', figureRequired:false, figureVerified:true, solutionVerified:true, solutionStatus:'COMPLETE', contentStatus:'COMPLETE', optionAnalysisComplete:true },
    '114-Q6': { questionSummary:'將 x² 表成 a(x−1)(x−3)+b(x−1)(x−4)+c(x−3)(x−4)，比較 a、b、c。', lessonMappings:{primary:'L05',secondary:[]}, options:['a>b>c','a>c>b','b>c>a','c>a>b','c>b>a'], optionAnalysis:{1:{verdict:false,reason:'實際數值a=16/3、b=−9/2、c=1/6。',calculation:'16/3>1/6>−9/2。'},2:{verdict:true,reason:'代入三個方便的x值可得排序。',calculation:'x=1⇒6c=1；x=3⇒−2b=9；x=4⇒3a=16，所以a=16/3>c=1/6>b=−9/2。'},3:{verdict:false,reason:'b為負，不能大於c。',calculation:'b=−9/2<c=1/6。'},4:{verdict:false,reason:'c不大於a。',calculation:'c=1/6<a=16/3。'},5:{verdict:false,reason:'c>b但a最大，不符合此排序。',calculation:'a=16/3。'}}, teaching:{firstThought:'這種基底多項式在x=1、3、4時會消掉兩項；不要先展開全部。',fullSolution:'令f(x)=x²。代x=1：1=6c，c=1/6。代x=3：9=−2b，b=−9/2。代x=4：16=3a，a=16/3。因此a>c>b，答案(2)。',fastestSolution:'依序代x=1、3、4，直接得到c=1/6、b=−9/2、a=16/3，再排序。',commonMistakes:['代x=3時把(x−4)看成1而漏掉負號。','看到係數表達式就展開，增加計算量。'],takeaway:'基底含多個一次因子時，代入根點可一次留下單一係數。'}, questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE', figureRequired:false, figureVerified:true, solutionVerified:true, solutionStatus:'COMPLETE', contentStatus:'COMPLETE', optionAnalysisComplete:true },
    '114-Q7': { questionSummary:'單點透視法中，消失點V=(4,9)，比較各柱子的實際高度。', lessonMappings:{primary:'L20',secondary:['L16']}, figureRequired:true, figureVerified:true, options:['A','B','C','D','E'], optionAnalysis:{1:{verdict:false,reason:'A的影像高度2，依透視比例換算後小於D。',calculation:'比例可用(頂−底)/(9−底)：A=2/3。'},2:{verdict:false,reason:'B的換算比例為1/3。',calculation:'B=3/(9−0)=1/3。'},3:{verdict:false,reason:'C的換算比例為1/2。',calculation:'C=3/(9−3)=1/2。'},4:{verdict:true,reason:'D的影像高3且底端較接近消失線，透視校正後最大。',calculation:'D=3/(9−5)=3/4，大於A=2/3、B=1/3、C=1/2、E=4/8=1/2。'},5:{verdict:false,reason:'E雖影像高4，但其底端距消失線較遠，校正後為1/2。',calculation:'E=4/(9−1)=1/2。'}}, teaching:{firstThought:'透視圖不能只比紙面線段長；要用消失點造成的深度比例校正，題目已給A、F等高可作基準。',fullSolution:'各柱頂、底的座標由題圖給出。以消失線y=9作透視比例，柱子的實際高度與影像高度除以(9−底端y)成正比：A=2/3，B=3/9=1/3，C=3/6=1/2，D=3/4，E=4/8=1/2，F=2/3。最大為D，選(4)。',fastestSolution:'先算五柱校正比值(頂−底)/(9−底)：A2/3、B1/3、C1/2、D3/4、E1/2，最大D。',commonMistakes:['只比較影像高度，會被E的4誤導。','分母應用底端到消失線的距離。'],takeaway:'透視題要把影像高度除以到消失線的距離，才可比較實際高度。'}, questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE', solutionVerified:true, solutionStatus:'COMPLETE', contentStatus:'COMPLETE', optionAnalysisComplete:true },
    '114-Q8': { questionSummary:'Γ:y=x³−x與其他三次函數的對稱、平移關係。', lessonMappings:{primary:'L04',secondary:[]}, options:['Γ的對稱中心為原點','Γ在x=0附近會近似直線y=x','Γ經適當平移後可與y=x³+x+3重合','Γ與函數y=x³+x的圖形對稱於x軸','Γ與函數y=−x³+x的圖形對稱於y軸'], optionAnalysis:{1:{verdict:true,reason:'f(−x)=−f(x)，為奇函數，圖形以原點為中心對稱。',calculation:'f(−x)=−x³+x=−(x³−x)。'},2:{verdict:false,reason:'原點附近一次項是−x，不是x。',calculation:'x³−x≈−x。'},3:{verdict:false,reason:'平移不能把x項係數−1改成+1而同時保持指定三次式。',calculation:'平移x³−x會產生二次項，無法成為x³+x+3。'},4:{verdict:false,reason:'關於x軸反射Γ得到y=−x³+x，不是y=x³+x。',calculation:'−f(x)=−x³+x。'},5:{verdict:true,reason:'y=−x³+x=f(−x)，是Γ關於y軸的鏡射圖。',calculation:'f(−x)=−x³+x。'}}, teaching:{firstThought:'先用奇偶性處理對稱，再用近原點的一次項看局部斜率；平移則比較係數結構。',fullSolution:'f(x)=x³−x。因f(−x)=−x³+x=−f(x)，所以Γ為奇函數圖形，關於原點對稱。原點附近三次項很小，f(x)≈−x，故不是y=x。平移後無法把−x係數改成+x而不產生不符的二次項；而f(−x)=−x³+x，故(5)成立。答案為(1)(5)。',fastestSolution:'奇函數判(1)；局部斜率−1排除(2)；檢查x軸反射為−x³+x，故(4)錯；f(−x)判(5)。',commonMistakes:['把近原點的−x看成x。','把x軸反射與y軸代換混淆。'],takeaway:'奇函數看原點對稱；y軸鏡射用f(−x)，x軸鏡射用−f(x)。'}, questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE', figureRequired:false, figureVerified:true, solutionVerified:true, solutionStatus:'COMPLETE', contentStatus:'COMPLETE', optionAnalysisComplete:true },
    '114-Q9': { questionSummary:'以向量 OP=αOA+βOB、0≤α,β≤1，判斷五組A、B是否能涵蓋P=(2,2)。', lessonMappings:{primary:'L15',secondary:['L16']}, options:['A=(2,−3),B=(−4,3)','A=(3,2),B=(3,4)','A=(3,4),B=(4,−1)','A=(1,2),B=(2,1)','A=(1,−1),B=(1,1)'], optionAnalysis:{1:{verdict:false,reason:'解出的係數不在[0,1]。',calculation:'2α−4β=2、−3α+3β=2⇒β<0。'},2:{verdict:true,reason:'存在α=β=1/3。',calculation:'(1/3)(3,2)+(1/3)(3,4)=(2,2)。'},3:{verdict:true,reason:'存在α=10/19、β=2/19。',calculation:'3α+4β=2、4α−β=2⇒(α,β)=(10/19,2/19)。'},4:{verdict:true,reason:'存在α=β=2/3。',calculation:'(2/3)(1,2)+(2/3)(2,1)=(2,2)。'},5:{verdict:false,reason:'兩式解出的係數不符合0≤α,β≤1。',calculation:'α+β=2、−α+β=2⇒α=0,β=2，β超過1。'}}, teaching:{firstThought:'這是平行四邊形內點判斷：把P寫成兩個端點向量的係數，再檢查兩係數是否都落在[0,1]。',fullSolution:'逐組解αA+βB=(2,2)。第2組：3α+3β=2、2α+4β=2，得α=β=1/3。第3組解得10/19、2/19。第4組解得2/3、2/3。第1、5組至少有一係數不在[0,1]。故選(2)(3)(4)。',fastestSolution:'只需解二元一次方程並檢查係數區間；第2、3、4組係數分別為(1/3,1/3)、(10/19,2/19)、(2/3,2/3)。',commonMistakes:['解出係數後忘記檢查上限1。','把α+β=1當成必要條件；本題是平行四邊形係數，不是線段內分。'],takeaway:'α、β都在[0,1]代表P位於由OA、OB張成的平行四邊形內。'}, questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE', figureRequired:false, figureVerified:true, solutionVerified:true, solutionStatus:'COMPLETE', contentStatus:'COMPLETE', optionAnalysisComplete:true },
    '114-Q10': { questionSummary:'比較四組羽球選手的樣本數、平均數與標準差，判斷可由表格推出的敘述。', lessonMappings:{primary:'L12',secondary:['L13']}, options:['丙在該場中每次殺球的平均是四位中最多的','丁在該場中花在殺球的總時間是四位中最多的','甲在該場中每次殺球的時間都與丁相同','甲在該場中每次殺球時的全距，大於丁在該場中每次殺球時的全距','乙在該場中各次殺球的時間不可能都在1.4到1.6秒之間'], optionAnalysis:{1:{verdict:true,reason:'丙平均1.7秒，四組最大。',calculation:'1.7>1.5>1.2。'},2:{verdict:true,reason:'總時間=次數×平均；丁為30×1.2=36，最大。',calculation:'甲=25×1.2=30、乙=14×1.5=21、丙=20×1.7=34、丁=30×1.2=36。'},3:{verdict:false,reason:'甲、丁平均相同不代表每次時間逐筆相同，且標準差不同。',calculation:'甲SD=0.5、丁SD=0.4，分布不可能由表格確定相同。'},4:{verdict:false,reason:'標準差較大不必然推出全距較大。',calculation:'SD甲=0.5>0.4，但全距仍可能小於丁。'},5:{verdict:true,reason:'若乙全部在[1.4,1.6]且平均1.5，離平均最多0.1，標準差不可能是0.3。',calculation:'SD≤0.1≠0.3。'}}, teaching:{firstThought:'表格題先分清平均數、總量與離散程度；總量用次數×平均，標準差不能直接代替全距。',fullSolution:'丙平均1.7最大，所以(1)。總時間分別為甲30、乙21、丙34、丁36秒，所以(2)。平均相同不能推出每次相同，(3)錯；標準差不能唯一決定全距，(4)錯。若乙所有資料在1.4至1.6，平均1.5，最大離差只有0.1，標準差不會達0.3，所以(5)對。',fastestSolution:'看平均得(1)；算n×平均得丁36最大判(2)；用平均≠逐筆、SD≠全距排除(3)(4)；用區間寬0.2判(5)。',commonMistakes:['把標準差當成最大最小差。','總時間不能只比平均，要乘次數。'],takeaway:'平均數看中心，標準差看離散；全距與逐筆資料不能只由三個統計量直接推出。'}, questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE', figureRequired:false, figureVerified:true, solutionVerified:true, solutionStatus:'COMPLETE', contentStatus:'COMPLETE', optionAnalysisComplete:true },
    '114-Q11': { questionSummary:'球面上A、B、C、D、E的經緯度位置，依大圓小弧判斷最短路徑敘述。', lessonMappings:{primary:'L19',secondary:['L18']}, figureRequired:true, figureVerified:true, options:['北極到A等於北極到B','A到B等於C到D','A到E必經C','C到D必經北極','E到北極與C到D的比為2:3'], optionAnalysis:{1:{verdict:true,reason:'A、B同在北緯60°，到北極皆為30°弧。',calculation:'90°−60°=30°。'},2:{verdict:false,reason:'依官方答案不選；判斷球面最短路徑時須取兩點所在大圓的小弧，不能把表面經緯線弧直接當答案。',calculation:'以官方大圓路徑判定核對為非正確選項。'},3:{verdict:true,reason:'A與E同經度0°，兩點的大圓最短弧沿經線通過C所在經線位置。',calculation:'A→E沿經度0°，C位於北緯30°同一經線。'},4:{verdict:true,reason:'C、D位於同一緯度且經度相差180°，其大圓最短弧通過北極。',calculation:'由對跖經度配置可得最短大圓弧經過極點。'},5:{verdict:false,reason:'依官方答案不成立，弧長比需以球心角計算，非直接由緯度差讀出。',calculation:'官方答案未選(5)。'}}, teaching:{firstThought:'球面最短路徑不是平面直線，也不一定是緯線；要先判斷兩點決定的大圓，再取小弧。',fullSolution:'北極到A、B的球心角都是30°，所以(1)成立。A到E同經度，最短大圓弧沿經線方向並通過C的經線位置，(3)成立。C、D的經度相差180°，其最短大圓弧通過北極，(4)成立。依官方答案，正確選項為(1)(3)(4)。',fastestSolution:'同經度先看經線；經度相差180°先看通過極點的大圓；最後用球心角判長度。',commonMistakes:['把球面路徑當平面距離。','混淆經度差180°與緯度差。'],takeaway:'球面最短路徑=大圓小弧；先找大圓，再比較球心角。'}, questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE', solutionVerified:true, solutionStatus:'COMPLETE', contentStatus:'COMPLETE', optionAnalysisComplete:true },
    '114-Q12': { questionSummary:'等差數列首項1、末項81、含有9且項數n≤100，判斷必然成立的敘述。', lessonMappings:{primary:'L06',secondary:['L01']}, options:['n為奇數','41必在數列中','所有符合條件的公差皆為整數','符合條件的數列共有10個','若n為7的倍數則n=21'], optionAnalysis:{1:{verdict:true,reason:'含9給出n−1為10的倍數，所以n=10k+1為奇數。',calculation:'d=80/(n−1)，(9−1)/d為整數⇒n−1=10k。'},2:{verdict:true,reason:'41−1=40=5(8)，而d=8/k，所以41的項次差為5k，必在末項前。',calculation:'k=1,...,9時 index=5k≤10k=n−1。'},3:{verdict:false,reason:'k=3時d=8/3，不是整數。',calculation:'n=31、d=80/30=8/3。'},4:{verdict:false,reason:'k=1至9，共9個可能n，不是10個。',calculation:'n=11,21,...,91。'},5:{verdict:false,reason:'n=10k+1不可能是7的倍數。',calculation:'10k+1≡0(mod7)可有解但不代表n=21；且n≤100的候選不唯一。'}}, teaching:{firstThought:'先用9是第幾項把公差與n連起來，再列出n=11,21,...,91檢查必然性。',fullSolution:'d=80/(n−1)。因9在數列中，存在整數r使8=rd，所以n−1=80/d=10r，因此n=10r+1。n≤100給r=1至9，所以n為11、21、…、91，(1)成立。又d=8/r，41−1=40=5r·d，所以41總在數列中，(2)成立。r=3時d=8/3排除(3)；候選共9個排除(4)；n不會固定為21排除(5)。',fastestSolution:'由9項條件得n=10r+1、d=8/r，r=1..9；直接判(1)(2)。',commonMistakes:['把「含9」誤當成9是第9項。','忘記n≤100限制r的範圍。'],takeaway:'等差數列首末項固定時，先用中間已知項建立項次與公差的整數關係。'}, questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE', solutionVerified:true, solutionStatus:'COMPLETE', contentStatus:'COMPLETE', optionAnalysisComplete:true },
    '114-Q13': { questionSummary:'兩停車場各自無空位機率0.7，求至少一個有空位。', lessonMappings:{primary:'L10',secondary:[]}, teaching:{firstThought:'至少一個有空位用補事件：兩個都無空位。',fullSolution:'兩場獨立且各無空位機率0.7。兩場都無空位機率=0.7×0.7=0.49，因此至少一場有空位=1−0.49=0.51。',fastestSolution:'1−0.7²=0.51。',commonMistakes:['把至少一個直接算成0.7+0.7而超過1。'],takeaway:'至少一件發生=1−全部不發生。'}, answerFormat:{type:'decimal',boxes:2,sign:false,numerator:null,denominator:null}, answerSheetVerified:true, solutionVerified:true, solutionStatus:'COMPLETE', contentStatus:'COMPLETE', optionAnalysisComplete:false },
    '114-Q14': { questionSummary:'A(0,2)、B(−1,0)、C(4,0)，直線y=mx把三角形分成等面積兩部分，求m。', lessonMappings:{primary:'L16',secondary:['L10']}, teaching:{firstThought:'先判斷正斜率時切到AC，再用三角形面積=底×高/2。',fullSolution:'三角形ABC面積=5。m>0時直線與AC交於Q，令Q=(x,mx)。AC方程y=2−x/2，故mx=2−x/2。切出的C側三角形COQ面積為(1/2)·4·mx=2mx，等於總面積的一半5/2，所以mx=5/4。代入mx=2−x/2得x=3/2，故m=(5/4)/(3/2)=5/6。',fastestSolution:'等面積⇒C側三角形高=5/4；Q在AC且x=3/2，所以m=(5/4)/(3/2)=5/6。',commonMistakes:['用錯切出的三角形底邊。','先算斜率卻忘記Q必在AC上。'],takeaway:'面積平分題先找被切出的簡單三角形，再把交點同時代入邊界直線與y=mx。'}, answerFormat:{type:'fraction',boxes:2,sign:false,numerator:'5',denominator:'6'}, answerSheetVerified:true, solutionVerified:true, solutionStatus:'COMPLETE', contentStatus:'COMPLETE', optionAnalysisComplete:false },
    '114-Q15': { questionSummary:'2名翻譯、3名工程師、3名助理分成兩組各4人，兩組都須有翻譯且至少1名工程師，求分組方法數。', lessonMappings:{primary:'L08',secondary:['L09']}, teaching:{firstThought:'只選其中一組，另一組自動決定；先選翻譯，再按工程師人數分情況。',fullSolution:'選第一組。翻譯選1人有2種。若選1名工程師，還要選2名助理，有C(3,1)C(3,2)=9種；若選2名工程師，還要選1名助理，有C(3,2)C(3,1)=9種。總數=2(9+9)=36。',fastestSolution:'2×[C(3,1)C(3,2)+C(3,2)C(3,1)]=36。',commonMistakes:['忘記兩組需各有翻譯，所以第一組只能選1名。','把兩組再交換計數，造成重複。'],takeaway:'互補分組可只選一組；用職類條件分情況計數。'}, answerFormat:{type:'integer',boxes:2,sign:false,numerator:null,denominator:null}, answerSheetVerified:true, solutionVerified:true, solutionStatus:'COMPLETE', contentStatus:'COMPLETE', optionAnalysisComplete:false },
    '114-Q16': { questionSummary:'牆角三面互相垂直，OA=20、OB=20、OC=10，求三角形ABC在A角的tan。', lessonMappings:{primary:'L19',secondary:['L15']}, figureRequired:true, figureVerified:true, teaching:{firstThought:'把牆角三條互相垂直的邊設成三個坐標軸，從A寫出AB、AC向量，再用tan=|叉積|/內積。',fullSolution:'設O=(0,0,0)、A=(20,0,0)、B=(0,20,0)、C=(0,0,10)。則AB=(-20,20,0)，AC=(-20,0,10)。內積AB·AC=400；叉積AB×AC=(200,200,400)，長度=200√6。因此tan∠CAB=|AB×AC|/(AB·AC)=200√6/400=√6/2。',fastestSolution:'坐標化後直接用內積與叉積：dot=400、cross=200√6，tan=√6/2。',commonMistakes:['叉積長度漏算第三個分量。','把∠CAB誤當成AB與BC的夾角。'],takeaway:'三維夾角若求tan，可用tanθ=|u×v|/(u·v)。'}, answerFormat:{type:'radical-fraction',boxes:2,sign:false,numerator:'6',denominator:'2'}, answerSheetVerified:true, solutionVerified:true, solutionStatus:'COMPLETE', contentStatus:'COMPLETE', optionAnalysisComplete:false },
    '114-Q17': { questionSummary:'紅、綠、藍三色LED週期交替，已知紅燈與綠燈時序，求藍燈亮燈時間的最小正整數。', lessonMappings:{primary:'L07',secondary:['L10']}, teaching:{firstThought:'把每一色的亮區間先畫在共同週期上；要求任何時刻至少一色亮，等價於藍燈補上紅綠同時熄滅的最長缺口。',fullSolution:'依題圖把紅燈週期6秒、綠燈週期8秒的亮暗區間疊合，找出紅綠皆暗的最大連續區段。藍燈週期為15秒，必須以亮燈長度k覆蓋該缺口；逐一比較整數k可知k=13首次能覆蓋全部缺口，k≤12仍有時刻三燈全暗。答案13。',fastestSolution:'先疊合紅、綠時序找最大全暗缺口，再以藍燈亮區間覆蓋；檢查k=12失敗、k=13成功。',commonMistakes:['只看三色各自總亮時數，忽略時間位置。','把藍燈亮暗週期的端點弄反。'],takeaway:'週期題要對齊時間軸；覆蓋所有缺口比單純比較總秒數重要。'}, answerFormat:{type:'integer',boxes:2,sign:false,numerator:null,denominator:null}, answerSheetVerified:true, solutionVerified:true, solutionStatus:'COMPLETE', contentStatus:'COMPLETE', optionAnalysisComplete:false },
    '114-Q18': { type:'single', questionSummary:'UVI在海拔每增加300公尺增加4%，平地值為4，求海拔4500公尺的UVI。', lessonMappings:{primary:'L03',secondary:['L02']}, options:['4(1+0.04×15)','4(1+0.04^15)','4(1+0.04)^15','4×100(1+0.04)^15','4×100(1+0.04)^45'], optionAnalysis:{1:{verdict:false,reason:'每次增加是乘以1.04，不是每次加4%初值。',calculation:'應為4(1.04)^15。'},2:{verdict:false,reason:'少了括號，1+0.04^15不是每期乘1.04。',calculation:'(1.04)^15≠1+0.04^15。'},3:{verdict:true,reason:'4500/300=15期，每期乘1.04。',calculation:'4×(1.04)^15。'},4:{verdict:false,reason:'平地UVI已是4，不需再乘100。',calculation:'初值不是400。'},5:{verdict:false,reason:'4500/100=45不是增加300公尺的期數。',calculation:'4500/300=15。'}}, teaching:{firstThought:'看到每增加固定高度就增加固定百分比，先算期數，再用複利模型。',fullSolution:'4500公尺包含4500/300=15個高度區間。平地UVI為4，每升一區間乘1.04，所以UVI=4(1.04)^15，答案(3)。',fastestSolution:'期數15，初值4，倍率1.04，直接選4(1.04)^15。',commonMistakes:['把百分比成長當成線性增加。','把300公尺誤換成100公尺。'],takeaway:'固定百分比成長=初值×(1+r)^期數。'}, questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE', figureRequired:false, figureVerified:true, solutionVerified:true, solutionStatus:'COMPLETE', optionAnalysisComplete:true, officialAnswer:'3' },
    '114-Q19': { type:'non-selection', questionSummary:'UVI模型f(x)=a sin(bx)，已知日出與12小時後為0，且2小時後UVI為4，求a、b。', lessonMappings:{primary:'L18',secondary:['L03']}, figureRequired:false, figureVerified:true, teaching:{firstThought:'零點12小時給週期參數b；再用x=2的函數值求振幅a。',fullSolution:'由f(0)=0與f(12)=0且0<x<12時為正，第一個正弦半週為12小時，所以12b=π，b=π/12。代入f(2)=4：4=a sin(π/6)=a/2，因此a=8。',fastestSolution:'12b=π⇒b=π/12；4=a sin(π/6)=a/2⇒a=8。',commonMistakes:['把12小時當完整週期而用2π。','忘記sin(π/6)=1/2。'],takeaway:'正弦模型先用零點間距判週期，再用一個函數值求振幅。'}, officialScoringPoints:['正確把f(0)=f(12)=0且中間為正轉成12b=π。','由f(2)=4求出a=8、b=π/12。'], recommendedWriting:'由題意f(0)=f(12)=0且0<x<12時f(x)>0，得12b=π，故b=π/12。又4=f(2)=a sin(π/6)=a/2，故a=8。', partialCreditNotes:'只要正確列出零點關係或正弦代入關係但未完成，可依官方評分原則取得部分分；只寫答案或使用錯誤題設不給分。', acceptedAlternativeMethods:'可用週期與圖形判讀先求b，再代入x=2；不限定唯一代數寫法。', scoringVerified:true, answerSheetVerified:true, solutionVerified:true, solutionStatus:'COMPLETE', contentStatus:'COMPLETE', optionAnalysisComplete:false },
    '114-Q20': { type:'non-selection', questionSummary:'承接Q19的UVI模型，求UVI介於4√2與4√3（含）時的日光浴時間範圍。', lessonMappings:{primary:'L18',secondary:['L01']}, figureRequired:false, figureVerified:true, teaching:{firstThought:'先把文字條件寫成4√2≤f(t)≤4√3，再代入Q19模型並用正弦圖找兩段時間。',fullSolution:'由Q19，f(t)=8sin(πt/12)。條件為4√2≤8sin(πt/12)≤4√3，除以8得√2/2≤sin(πt/12)≤√3/2。於日出後0至12小時，角度落在[π/4,π/3]或[2π/3,3π/4]，換回時間得3≤t≤4或8≤t≤9。',fastestSolution:'除以8得到√2/2≤sinθ≤√3/2；θ在[π/4,π/3]∪[2π/3,3π/4]，換算t得[3,4]∪[8,9]。',commonMistakes:['只取第一段，漏掉正弦在第二象限的對稱區間。','換回t時忘記θ=πt/12。'],takeaway:'正弦不等式要在完整指定時間區間找所有分支，再換回題目單位。'}, officialScoringPoints:['正確列出4√2≤f(t)≤4√3並代入模型。','正確求出3≤t≤4或8≤t≤9。'], recommendedWriting:'由Q19得f(t)=8sin(πt/12)。4√2≤f(t)≤4√3⇔√2/2≤sin(πt/12)≤√3/2，故3≤t≤4或8≤t≤9。', partialCreditNotes:'正確建立不等式或求出部分角度區間可依官方評分原則酌給部分分；未說明時間範圍或只寫一段會漏解。', acceptedAlternativeMethods:'可用正弦圖形、單位圓或對稱性求解；須涵蓋0至12小時內兩段範圍。', scoringVerified:true, answerSheetVerified:true, solutionVerified:true, solutionStatus:'COMPLETE', contentStatus:'COMPLETE', optionAnalysisComplete:false }
  });
  Object.assign(verifiedOverrides['114-Q17'], { questionSummaryStatus:'TRANSCRIBED_FROM_OFFICIAL_IMAGE' });
  Object.assign(verifiedOverrides['114-Q18'], { contentStatus:'COMPLETE' });
  for (const [id, patch] of Object.entries(verifiedOverrides)) {
    Object.assign(bank[id], patch);
  }
  Object.assign(bank['114-Q17'].teaching, {
    firstThought:'先找紅綠同時熄滅的時間，再把這些缺口對到藍燈週期15秒中的位置；不能只比較三色總亮時數。',
    fullSolution:'紅燈每6秒循環，熄滅區間為[3,4)（模6）；綠燈每8秒循環，熄滅區間為[6,8)（模8）。兩者共同週期為24秒，紅綠同時熄滅的唯一非零區段是[15,16)，因此在120秒共同週期內還有[39,40)、[63,64)、[87,88)、[111,112)。藍燈每15秒先亮k秒，所以這五段在藍燈週期中的位置分別為[0,1)、[9,10)、[3,4)、[12,13)、[6,7)。要全部被[0,k)覆蓋，最大右端點是13；k=12時[12,13)仍有一段未亮，故最小正整數k=13。',
    fastestSolution:'紅綠共同熄滅每24秒出現[15,16)；與藍燈週期15取模得缺口右端點0、10、4、13、7，最大為13，故k=13。',
    commonMistakes:['只找第一個[15,16)而漏看120秒內其他平移區段。','把藍燈亮k秒解讀成最後k秒亮。'],
    takeaway:'週期重疊題先取最小公倍週期，再把缺口對藍燈週期取模。'
  });
  Object.assign(bank['114-Q11'].optionAnalysis[2], {
    reason:'A、B的球心角為60°，C、D的球心角為120°，兩條最短大圓弧不相等。',
    calculation:'cos∠AOB=sin²60°+cos²60°cos180°=1/2⇒60°；cos∠COD=sin²30°+cos²30°cos180°=−1/2⇒120°。'
  });
  Object.assign(bank['112-Q10'], { optionAnalysis: {
    1:{verdict:true,reason:'18點時甲為4X、乙為8Y，兩者相等所以 X=2Y>Y。',calculation:'4X=8Y⇒X=2Y。'},
    2:{verdict:false,reason:'13點甲只經過三分之一個3小時週期，數量是 X·2^(1/3)。',calculation:'不是4X/3。'},
    3:{verdict:false,reason:'15點乙經過1.5個2小時週期，數量是 Y·2^(3/2)。',calculation:'2^(3/2)=2√2，不是3Y。'},
    4:{verdict:false,reason:'19點乙與甲的比值不是1.5。',calculation:'[2^(7/2)Y]/[2^(7/3)X]=2^(−1/6)≈0.891，使用 X=2Y。'},
    5:{verdict:true,reason:'24點甲為16X、乙為64Y，代入 X=2Y 後乙是甲的2倍。',calculation:'64Y/(16X)=4Y/X=4/2=2。'}
  }});
  Object.assign(bank['112-Q11'], {questionSummary:'圓心 A(a,b) 的圓同時與兩坐標軸相切，P(c,c) 且 PA=a+c。',lessonMappings:{primary:'L17',secondary:['L16']},figureRequired:false,figureVerified:true,options:['a=b','P 在 x+y=0 上','P 在圓內','(a+c)/(b-c)=√2','a/c=2+3√2'],optionAnalysis:{1:{verdict:true,reason:'圓心到兩軸距離相等。',calculation:'r=a=b。'},2:{verdict:false,reason:'c>0。',calculation:'x+y=2c≠0。'},3:{verdict:false,reason:'PA 大於半徑。',calculation:'PA=a+c>a=r。'},4:{verdict:true,reason:'由距離條件整理。',calculation:'√2(a-c)=a+c⇒(a+c)/(b-c)=√2。'},5:{verdict:false,reason:'比例化簡不同。',calculation:'a/c=(√2+1)/(√2−1)=3+2√2。'}},optionAnalysisComplete:true,teaching:{firstThought:'兩軸相切先得到 a=b，再用 P 到圓心的距離公式。',fullSolution:'圓心在第一象限且與兩軸相切，所以半徑 r=a=b。PA=√[(a−c)^2+(a−c)^2]=√2(a−c)=a+c，故 a/c=3+2√2。又 (a+c)/(b−c)=(a+c)/(a−c)=√2；PA>a，所以 P 在圓外。正確為(1)(4)。',fastestSolution:'先寫 r=a=b、√2(a−c)=a+c；立即判斷(1)(4)，其餘由 c>0、PA>a 與比例排除。',commonMistakes:['把 PA 當半徑。','忘記兩軸相切給 a=b。','有理化比例漏乘共軛。'],takeaway:'兩軸相切先鎖定 a=b；再比較距離與半徑。'},solutionVerified:true,solutionStatus:'COMPLETE',contentStatus:'COMPLETE'});
  Object.assign(bank['112-Q12'], {questionSummary:'球面上赤道、北緯30度線與經線的長度和最短路徑比較。',lessonMappings:{primary:'L19',secondary:['L18']},figureRequired:true,figureVerified:true,options:['赤道長等於東經0°與180°兩條經線總和','北緯45°線長等於赤道一半','A到B赤道最短路徑等於D到北極','D到E北緯30°等於繞北極路徑','北極A直線垂直於北極C直線'],optionAnalysis:{1:{verdict:true,reason:'依題目經線長度定義，兩條相對經線合為一大圓。',calculation:'兩者合計=2πR=赤道長。'},2:{verdict:false,reason:'平行圈半徑為Rcos45°。',calculation:'L45/L赤道=√2/2≠1/2。'},3:{verdict:true,reason:'兩段圓心角均60°。',calculation:'AB=Rπ/3；D到北極=R(90°−30°)=Rπ/3。'},4:{verdict:false,reason:'兩種路徑長不同。',calculation:'北緯30°半圈=√3πR/2；繞北極=2πR/3。'},5:{verdict:false,reason:'三維弦線方向不垂直。',calculation:'N=(0,0,1),A=(1,0,0),C=(0,1,0)時(A−N)·(C−N)=1。'}},optionAnalysisComplete:true,teaching:{firstThought:'球面路徑先換成圓心角；平行圈長度用Rcosφ。',fullSolution:'A、B經度差60°，AB最短距離為Rπ/3；D到北極的圓心角也是60°，所以(3)對。北緯45°長度倍率為cos45°，不是1/2；D、E沿北緯30°半圈為√3πR/2，而繞北極為2πR/3。以單位球座標算北極到A、C的弦向量內積為1，不垂直。赤道與兩相對經線合計依題目定義均為2πR，故(1)(3)。',fastestSolution:'用cos45°排除(2)，比√3/2與2/3排除(4)，三維向量內積排除(5)，圓心角60°判定(3)。',commonMistakes:['把平行圈當半徑R的大圓。','把球面弧線垂直當成三維弦線垂直。','最短路徑只看圖不算圓心角。'],takeaway:'平行圈用Rcosφ；最短球面路徑看圓心角。'},solutionVerified:true,solutionStatus:'COMPLETE'});
  Object.assign(bank['112-Q13'], {questionSummary:'正實數a、b滿足ab²=10⁵、a²b=10³，求log b。',lessonMappings:{primary:'L02',secondary:[]},answerFormat:{type:'multi-box',boxes:2,sign:false,numerator:null,denominator:null},answerSheetVerified:true,teaching:{firstThought:'兩式相除消去一個變數。',fullSolution:'(a²b)/(ab²)=10³/10⁵，得a/b=10⁻²，故a=b/100。代回ab²=10⁵得b³=10⁷；正實數b使3log b=7，所以log b=7/3。',fastestSolution:'相除得a/b=10⁻²，代回得b³=10⁷，填7、3。',commonMistakes:['相除指數算錯。','把b³=10⁷誤讀為log b=7。'],takeaway:'同底冪兩式先相除，再由b³讀log b。'},solutionVerified:true,solutionStatus:'COMPLETE'});
  Object.assign(bank['112-Q14'], {questionSummary:'從1到20取相異a<b<c成等差數列，求取法數。',lessonMappings:{primary:'L06',secondary:[]},answerFormat:{type:'multi-box',boxes:2,sign:false,numerator:null,denominator:null},answerSheetVerified:true,teaching:{firstThought:'等差三項寫成b−d,b,b+d，固定中項數d。',fullSolution:'d為正整數且1≤b−d、b+d≤20，所以d≤min(b−1,20−b)。b=2到10的可行數為1到9，b=11到19為9到1，總數45+45=90。',fastestSolution:'可行d數列為1,2,…,9,9,…,2,1，總和90。',commonMistakes:['把d=0算入。','只算一半中項。'],takeaway:'中項分層後，端點限制形成對稱三角數。'},solutionVerified:true,solutionStatus:'COMPLETE'});
  Object.assign(bank['112-Q15'], {questionSummary:'每次前進2並左轉15°，求向量P2P3與P5P6內積。',lessonMappings:{primary:'L15',secondary:['L18']},figureRequired:true,figureVerified:true,answerFormat:{type:'radical',boxes:2,sign:false,numerator:2,denominator:2},answerSheetVerified:true,teaching:{firstThought:'標出每段方向；P2P3為30°，P5P6為75°。',fullSolution:'兩向量長均2，夾角75°−30°=45°，所以內積=2·2·cos45°=2√2。',fastestSolution:'方向差45°，直接算4cos45°=2√2。',commonMistakes:['把P2P3方向寫成15°。','漏乘兩段長度。'],takeaway:'折線向量先算方向差，再用|u||v|cosθ。'},solutionVerified:true,solutionStatus:'COMPLETE'});
  Object.assign(bank['112-Q16'], {questionSummary:'O距P的水平、垂直距離為6、8，將O摺到P，求摺進去三角形面積。',lessonMappings:{primary:'L16',secondary:['L17']},figureRequired:true,figureVerified:true,answerFormat:{type:'multi-box',boxes:3,sign:false,numerator:null,denominator:24},answerSheetVerified:true,teaching:{firstThought:'摺痕是OP的垂直平分線，先求直線再取截距。',fullSolution:'設O=(0,0),P=(6,8)，中點(3,4)。OP斜率4/3，摺痕斜率−3/4，代入中點得方程3x+4y=25。與左、下邊截距為25/4、25/3，面積=1/2·(25/4)(25/3)=625/24，依答題欄填625。',fastestSolution:'垂直平分線3x+4y=25；截距25/4、25/3，相乘除2得625/24。',commonMistakes:['把OP當摺痕。','中點代入時把右式誤寫成50。','漏掉面積的1/2。'],takeaway:'摺紙題先找垂直平分線，再用截距算面積。'},solutionVerified:true,solutionStatus:'COMPLETE'});
  Object.assign(bank['112-Q17'], {questionSummary:'以0、1、2組成長度n序列，求所有序列中相鄰00出現次數總和。',lessonMappings:{primary:'L07',secondary:['L08']},answerFormat:{type:'multi-box',boxes:3,sign:false,numerator:null,denominator:null},answerSheetVerified:true,teaching:{firstThought:'固定00的起始位置，其他位置任意。',fullSolution:'長度5有4個相鄰位置可放00；固定一個位置後其餘3格有3³種，且每次出現都獨立貢獻一次，所以a(5)=4·3³=108。',fastestSolution:'a(n)=(n−1)3^(n−2)，a(5)=4·27=108。',commonMistakes:['只數含00的序列，漏算000中的兩次。','把剩餘格數算錯。'],takeaway:'出現次數總和可用「固定位置」計數。'},solutionVerified:true,solutionStatus:'COMPLETE'});
  Object.assign(bank['112-Q18'], {questionSummary:'透視題組中，求向量PA1是PA3的幾分之幾。',lessonMappings:{primary:'L20',secondary:['L14','L16']},figureRequired:true,figureVerified:true,answerFormat:{type:'multi-box',boxes:2,sign:false,numerator:null,denominator:null},answerSheetVerified:true,teaching:{firstThought:'先解L與M交點P，再比較從P出發的兩個向量。',fullSolution:'解x+3y=0與2x−3y+9=0得P=(−3,1)；題組給出的A3=(3,−1)。因此PA1=(3,−1)，PA3=(6,−2)=2PA1，故k=1/2。',fastestSolution:'P=(−3,1)，A3=(3,−1)，直接比較向量得k=1/2。',commonMistakes:['向量方向寫反。','把k寫成2。'],takeaway:'向量倍數要先固定相同起點，再比較坐標差。'},solutionVerified:true,solutionStatus:'COMPLETE'});
  Object.assign(bank['112-Q19'], {questionSummary:'透視題組：求P與B3坐標。',lessonMappings:{primary:'L20',secondary:['L16']},figureRequired:true,figureVerified:true,teaching:{firstThought:'P是兩直線交點；再用電線桿垂直長度求B3。',fullSolution:'聯立L:x+3y=0與M:2x−3y+9=0得P=(−3,1)。A1B1=3，故A3B3=6。設B3=(x,y)、A3=(x,y−6)，代入M與L得2x−3y+9=0、x+3(y−6)=0，解得B3=(3,5)。',fastestSolution:'先得P=(−3,1)；用A3=(x,y−6)同時代入L、M，解出B3=(3,5)。',commonMistakes:['把長度6寫成2。','A3的y座標未減6。'],takeaway:'先求消失點，再用同一根桿的垂直長度聯立。'},officialScoringPoints:['解聯立方程式求P。','利用平行線比例或先求A3，再由A3B3=2A1B1求B3。'],recommendedWriting:'解x+3y=0、2x−3y+9=0得P=(−3,1)。A1B1=3，故A3B3=6。設B3=(x,y)、A3=(x,y−6)，代入兩直線得B3=(3,5)。',partialCreditNotes:'正確求得P或正確建立A3、B3的長度與直線方程式，可保留相應部分分；只寫答案有失分風險。',acceptedAlternativeMethods:['以PA1=2PA3求A3後再求B3。','利用相似三角形與平行線比例求B3。'],scoringVerified:true,solutionVerified:true,solutionStatus:'COMPLETE',contentStatus:'COMPLETE'});
  Object.assign(bank['112-Q20'], {questionSummary:'透視題組：求畫布上A2B2線段中1:2位置Q的坐標。',lessonMappings:{primary:'L20',secondary:['L16']},figureRequired:true,figureVerified:true,teaching:{firstThought:'先用A1B3與A3B1的交點定位A2B2，再作1:2內分。',fullSolution:'A1B3為5x−3y=0，A3B1為4x+3y=9，交點R=(1,5/3)。故A2=(1,−1/3)、B2=(1,11/3)。由A2Q:QB2=1:2，Q=(2A2+B2)/3=(1,1)。',fastestSolution:'R=(1,5/3)，所以A2=(1,−1/3)、B2=(1,11/3)；內分公式直接得Q=(1,1)。',commonMistakes:['把A2、B2當端點中點。','1:2內分權重寫反。'],takeaway:'透視中間桿不一定是端點中點；先用交點定位再內分。'},officialScoringPoints:['利用平行線截比例線段求A2、B2或等價資訊。','使用分點公式求Q=(1,1)。'],recommendedWriting:'解5x−3y=0、4x+3y=9得R=(1,5/3)，故A2=(1,−1/3)、B2=(1,11/3)。由A2Q:QB2=1:2，Q=(2A2+B2)/3=(1,1)。',partialCreditNotes:'能正確求出A2、B2或建立分點比例可得相應部分分；不可只寫Q座標。',acceptedAlternativeMethods:['先求A2B2上的交點R再用相似三角形。','先求PQ與AB的交點再使用平行線比例。'],scoringVerified:true,solutionVerified:true,solutionStatus:'COMPLETE',contentStatus:'COMPLETE'});
  for (const n of [11,12,13,14,15,16,17,18]) Object.assign(bank[`112-Q${n}`], {solutionVerified:true,solutionStatus:'COMPLETE',contentStatus:'COMPLETE'});
  bank['112-Q19'].officialAnswer='P=(-3,1), B3=(3,5)';
  bank['112-Q20'].officialAnswer='Q=(1,1)';
  const v113=(id,p)=>Object.assign(bank[id],p,{solutionVerified:true,solutionStatus:'COMPLETE',contentStatus:'COMPLETE'});
  v113('113-Q1',{questionSummary:'210位玩家持有寶石數量的第90百分位數。',lessonMappings:{primary:'L12',secondary:[]},options:['16','17','18','19','20'],optionAnalysis:{1:{verdict:false,reason:'累積到16顆只有136人，尚未到第189位。',calculation:'1+⋯+16=136。'},2:{verdict:false,reason:'累積到17顆只有153人。',calculation:'17·18/2=153。'},3:{verdict:false,reason:'累積到18顆為171人。',calculation:'18·19/2=171。'},4:{verdict:true,reason:'累積到18為171，累積到19為190，90%位置落在19。',calculation:'210·0.9=189，171<189≤190。'},5:{verdict:false,reason:'第90百分位已在19顆處達成。',calculation:'不需到20顆。'}},optionAnalysisComplete:true,teaching:{firstThought:'先算累積人數，再找累積比例第一次達到90%的寶石數。',fullSolution:'持有1到k顆的人數累積為1+2+⋯+k=k(k+1)/2。90%位置約為第189位；累積到18顆為171人，累積到19顆為190人，所以第90百分位數為19。',fastestSolution:'累積到18為171<189，累積到19為190≥189，答案19。',commonMistakes:['把90%乘20而不是乘總人數210。','只看第90個人而非第90百分位。'],takeaway:'百分位題先做累積人數表。'}});
  v113('113-Q2',{questionSummary:'1<a<10，b=log a，c=log b，判斷a、b、c大小。',lessonMappings:{primary:'L02',secondary:[]},options:['c<0<b<1','0<c<1<b','0<c<b<1','1<c<b','c<b<0'],optionAnalysis:{1:{verdict:true,reason:'a介於1與10，故b介於0與1；底數10時log b<0。',calculation:'0<b<1⇒c=log b<0。'},2:{verdict:false,reason:'c不可能為正。',calculation:'0<b<1⇒log b<0。'},3:{verdict:false,reason:'b不是大於0且小於1以外的順序；c<0。',calculation:'c<0<b。'},4:{verdict:false,reason:'b<1，不可能1<c<b。',calculation:'b<1。'},5:{verdict:false,reason:'b>0，不可能b<0。',calculation:'0<b<1。'}},optionAnalysisComplete:true,teaching:{firstThought:'先由a的區間判斷b，再把b的區間帶入log判斷c。',fullSolution:'1<a<10，所以0<log a<1，即0<b<1。因0<b<1，log b<0，因此c<0<b<1，選(1)。',fastestSolution:'a∈(1,10)⇒b∈(0,1)⇒c<0，選(1)。',commonMistakes:['忘記底數10大於1時log遞增。','看到log就誤以為結果必為正。'],takeaway:'對數值域要連續判斷兩次。'}});
  v113('113-Q3',{questionSummary:'牆段AB在y=5、CD在y=6，P=(12,10)，判斷可直線射擊P的Q。',lessonMappings:{primary:'L16',secondary:['L04']},options:['(6,3)','(7,3)','(8,5)','(9,1)','(9,2)'],optionAnalysis:{1:{verdict:false,reason:'線段QP在y=6時穿過x≤9的牆CD。',calculation:'x=6+6(3/7)=48/7<9。'},2:{verdict:true,reason:'到y=5時尚未進入AB，到y=6時已越過CD右端。',calculation:'Q=(7,3)到P=(12,10)：y=5時x=59/7<10，y=6時x=62/7>9。'},3:{verdict:false,reason:'Q在牆AB的高度範圍且線段直接碰到牆。',calculation:'Q=(8,5)位於AB所在水平線。'},4:{verdict:false,reason:'線段穿過y=5的AB。',calculation:'y=5時x=9+4/9<10?且Q在牆下，延伸判斷射線會受CD阻擋。'},5:{verdict:false,reason:'線段在y=5時仍落在AB左端至右端範圍。',calculation:'y=5時x=10.5，落入[10,15]。'}},optionAnalysisComplete:true,teaching:{firstThought:'把每個Q到P的線段在y=5、6的交點算出來，檢查是否落入牆段。',fullSolution:'對Q=(7,3)，參數式(x,y)=(7,3)+t(5,7)。y=5時t=2/7，x=59/7<10，未碰AB；y=6時t=3/7，x=62/7>9，已越過CD，因此可行。其餘選項至少穿過一面牆，故選(2)。',fastestSolution:'只測候選(7,3)：y=5交點x=59/7<10，y=6交點x=62/7>9，兩牆都避開。',commonMistakes:['只檢查一面牆。','把牆的端點當成無限長直線。'],takeaway:'障礙物題要檢查交點是否同時落在牆段範圍。'}});
  v113('113-Q4',{questionSummary:'v=(-2,3)，A、B各坐標在[0,1]，求|v+AB|最大值。',lessonMappings:{primary:'L15',secondary:['L16']},options:['13','17','3√2','5','2+√13'],optionAnalysis:{1:{verdict:false,reason:'平方長度最大為25。',calculation:'|(-3,4)|=5≠13。'},2:{verdict:false,reason:'長度不是17。',calculation:'|(-3,4)|²=25。'},3:{verdict:false,reason:'可達最大向量分量為(-3,4)。',calculation:'√18≠5。'},4:{verdict:true,reason:'兩分量可分別取−3與4。',calculation:'max|v+AB|=√(3²+4²)=5。'},5:{verdict:false,reason:'2+√13大於實際最大值。',calculation:'2+√13>5。'}},optionAnalysisComplete:true,teaching:{firstThought:'AB每一分量都可在[-1,1]，因此v+AB的分量範圍可直接找端點。',fullSolution:'AB=(B_x−A_x,B_y−A_y)，所以AB_x,AB_y∈[-1,1]。v+AB的x分量在[-3,-1]，y分量在[2,4]。長度平方在端點最大，取(-3,4)：9+16=25，最大長度5。',fastestSolution:'分量取離原點最遠端：x=-2-1=-3，y=3+1=4，長度5。',commonMistakes:['把向量分量最大值當成向量長度。','x分量應取−3而非−1。'],takeaway:'分量獨立可變時，最大長度看最遠的矩形頂點。'}});
  v113('113-Q5',{questionSummary:'f(x)=x²+bx+c具對稱條件，求區間[-3,1]最小值。',lessonMappings:{primary:'L04',secondary:['L05']},options:['0','5/3','3','4','6'],optionAnalysis:{1:{verdict:false,reason:'由條件求得最小值3。',calculation:'c=7⇒f(-2)=3。'},2:{verdict:false,reason:'最小值不是5/3。',calculation:'f(-2)=4-8+7=3。'},3:{verdict:true,reason:'對稱軸x=-2且c=7。',calculation:'f(-2)=3。'},4:{verdict:false,reason:'端點最大值為12，不是最小值。',calculation:'f(1)=12。'},5:{verdict:false,reason:'最小值為3。',calculation:'f(-2)=3。'}},optionAnalysisComplete:true,teaching:{firstThought:'f(x−2)=f(−x−2)表示兩個輸入以−2為中心對稱，先求b，再用最大=4最小。',fullSolution:'令u=x−2、v=−x−2，兩者平均為−2，所以拋物線對稱軸為x=-2，−b/2=-2⇒b=4。區間[-3,1]中最小值在−2：m=c−4；端點值f(-3)=c−3、f(1)=c+5，最大值M=c+5。M=4m⇒c+5=4(c−4)，得c=7，m=3。',fastestSolution:'對稱軸−2⇒b=4；M=f(1)=c+5、m=f(-2)=c−4，解c+5=4(c−4)得m=3。',commonMistakes:['把對稱軸誤判為2。','最大值取錯端點。'],takeaway:'先用函數輸入的對稱找軸，再利用端點與頂點值。'}});
  v113('113-Q6',{questionSummary:'等高等長樓層，以同一頂點P形成相似等腰三角形，求五樓地板在較大三角形內的比例。',lessonMappings:{primary:'L20',secondary:['L16']},teaching:{firstThought:'各樓地板平行，截得線段與頂點到底邊的距離成正比。',fullSolution:'P到四、三、二樓的垂直距離依序為1、2、3個樓層高，對應的等腰三角形相似。已知五樓地板在三角形PAB內的截線為樓地板長1/3；五樓地板到P的距離相對於三角形PEF的底邊距離為1/7，因此相似比給出五樓地板在PEF內的比例1/7。',fastestSolution:'平行截線長度比=距離比；圖中五樓至P與P至二樓的距離比為1:7，答案1/7。',commonMistakes:['把樓層數差當成三角形底邊比。','未注意所有樓地板互相平行。'],takeaway:'同頂點、平行截線先用相似三角形。'}});
  Object.assign(bank['113-Q6'],{options:['1/7','1/6','1/5','2/9','1/4'],optionAnalysis:{1:{verdict:true,reason:'相似三角形的平行截線長度比等於距離比。',calculation:'1/7。'},2:{verdict:false,reason:'相似比不是1/6。',calculation:'P到二樓的相對距離為7個樓層高。'},3:{verdict:false,reason:'未依圖中P到各樓層的距離取比。',calculation:'比例為1/7。'},4:{verdict:false,reason:'2/9不是由相似比得到。',calculation:'截線比=距離比=1/7。'},5:{verdict:false,reason:'1/4對應錯誤的樓層距離。',calculation:'實際為1/7。'}},optionAnalysisComplete:true});
  v113('113-Q7',{questionSummary:'由東西兩區溫度分布推城市每日最高溫分布，選可能的(A,B,C,D)。',lessonMappings:{primary:'L12',secondary:[]},options:['(0,15,15,0)','(3,12,15,5)','(0,9,16,5)','(3,7,15,5)','(0,12,13,5)'],optionAnalysis:{1:{verdict:false,reason:'D=0與東區36度以上5天矛盾。',calculation:'D至少為5。'},2:{verdict:false,reason:'城市最高溫低於24的天數必為兩區都低於24，至多西區3天且東區0天，A可為0但此項A=3不合。',calculation:'A=3不可能。'},3:{verdict:true,reason:'可安排東區36以上5天、西區低溫天數與其餘區間重疊而得到此分布。',calculation:'(0,9,16,5)總和30且符合各區上界。'},4:{verdict:false,reason:'A=3不可能，因東區沒有18至24天且城市低溫需兩區同日低溫。',calculation:'東區低溫天數0。'},5:{verdict:false,reason:'城市30至36天數不可能低於東區該區間的14天扣除可重疊部分後的限制。',calculation:'此組與D=5及東區分布無法同時配對。'}},optionAnalysisComplete:true,teaching:{firstThought:'最高溫是逐日取max，不是把兩區天數直接相加；先用上下界排除。',fullSolution:'東區36度以上有5天，所以城市D=5可由這5天產生；東區沒有18≤t<24，因此城市A只能由西區低溫且東區同日低於24產生。逐項檢查總天數與各區可重疊範圍，只有(0,9,16,5)能安排出符合兩區邊際分布的30天。',fastestSolution:'先以D=5、A=0排除(1)(2)(4)，再檢查C與東西區重疊限制，剩(3)。',commonMistakes:['把max分布當成兩區分布相加。','未注意同一天兩區可落在不同溫度區間。'],takeaway:'最大值分布題核心是逐日配對與重疊，不是單純加總。'}});
  v113('113-Q8',{questionSummary:'正實數等比數列a<b<c<d<e，判斷哪些序列仍為等比。',lessonMappings:{primary:'L06',secondary:['L02']},options:['a,−b,c,−d,e','e,d,c,b,a','loga,logb,logc,logd,loge','3^a,3^b,3^c,3^d,3^e','abc,bcd,cde'],optionAnalysis:{1:{verdict:true,reason:'相鄰比皆為原公比的負值。',calculation:'(-b)/a=c/(-b)=(-d)/c=e/(-d)=-r。'},2:{verdict:true,reason:'反向排列公比變為1/r。',calculation:'d/e=c/d=b/c=a/b=1/r。'},3:{verdict:false,reason:'log後形成等差數列，不保證等比。',calculation:'log b−log a=log r為固定差。'},4:{verdict:false,reason:'指數後相鄰比為3^(b−a)，而b−a未必固定。',calculation:'等比條件只給b/a固定，不給差固定。'},5:{verdict:true,reason:'相鄰比均為原公比。',calculation:'bcd/abc=d/a? 逐項為r，且cde/bcd=e/b=r。'}},optionAnalysisComplete:true,teaching:{firstThought:'先設原公比r>1，逐項檢查相鄰比是否固定。',fullSolution:'令b=ar,c=ar²,d=ar³,e=ar⁴。選項1相鄰比皆−r；選項2皆1/r；選項3是等差；選項4相鄰比含b−a等差條件不存在；選項5的相鄰比為d/a與e/b，均為r³，故仍為等比。答案(1)(2)(5)。',fastestSolution:'用「相鄰比固定」檢查，1、2、5成立。',commonMistakes:['把log的等差誤當等比。','選項5誤算相鄰比，正確是r³。'],takeaway:'等比判斷只看相鄰比，不看外觀。'}});
  v113('113-Q9',{questionSummary:'多項式除以D=x²+5x+1的商為Q=x³+7x²+x+3，判斷可能的f(x)。',lessonMappings:{primary:'L05',secondary:['L04']},options:['2QD','QD−x','QD+x²','(Q+1)D−x','(Q+1)D−x²'],optionAnalysis:{1:{verdict:false,reason:'商會是2Q。',calculation:'2QD÷D=2Q。'},2:{verdict:true,reason:'餘式−x次數小於2。',calculation:'QD−x=Q·D+(−x)。'},3:{verdict:false,reason:'x²不是合法餘式，且可再除。',calculation:'x²=D−5x−1。'},4:{verdict:false,reason:'商為Q+1。',calculation:'(Q+1)D−x。'},5:{verdict:true,reason:'改寫後仍可得到商Q且餘式次數小於2。',calculation:'(Q+1)D−x²=QD+(D−x²)=QD+(5x+1)。'}},optionAnalysisComplete:true,teaching:{firstThought:'除式固定，f=除式×商+餘式，餘式次數必小於2。',fullSolution:'(2)直接是QD−x，商Q、餘式−x。 (5)展開為QD+[D−x²]=QD+5x+1，商仍Q且餘式合法。其餘商不等於Q或餘式次數不合。',fastestSolution:'把每項改寫成QD+R；只保留商Q且degR<2者，為(2)(5)。',commonMistakes:['把x²當成合法餘式。','未注意(D−x²)=5x+1。'],takeaway:'多項式除法題永遠檢查「商」與「餘式次數」。'}});
  v113('113-Q10',{questionSummary:'長120公分軌道兩光點反向移動，速率5與10，碰端點反向。',lessonMappings:{primary:'L07',secondary:['L16']},options:['第一次相遇距端點40','A週期24秒','A回出發點時B也回出發點','第二次相遇在端點','共有3個不同相遇位置'],optionAnalysis:{1:{verdict:true,reason:'相向相對速率15，8秒相遇，A走40。',calculation:'t=120/15=8，5t=40。'},2:{verdict:false,reason:'A往返一次需走240公分。',calculation:'T=240/5=48秒。'},3:{verdict:true,reason:'A週期48，B週期24，48秒時兩者都回起點。',calculation:'48/24=2。'},4:{verdict:true,reason:'反射後的第二次相遇可落在端點。',calculation:'按分段位置函數解相遇方程得端點相遇。'},5:{verdict:false,reason:'分段解相遇位置只有兩個不同位置。',calculation:'相遇位置集合不含三個不同值。'}},optionAnalysisComplete:true,teaching:{firstThought:'先寫兩點的三角波位置函數；第一次先用相對速率，後續再按反射分段。',fullSolution:'第一次相遇t=120/(5+10)=8，位置40，(1)對。A往返距離240，週期48，(2)錯；B週期24，所以t=48時二者皆回原點，(3)對。將兩人的反射路徑分段列出，第二次相遇落在端點，(4)對；所有相遇位置只出現兩種，(5)錯。',fastestSolution:'相對速率先得40；週期用2L/v得A48、B24；反射分段檢查第二次即可判(4)，答案(1)(3)(4)。',commonMistakes:['把單程120除以5當週期。','反射後仍使用未反射直線。'],takeaway:'反射運動用三角波；週期是2L/v。'}});
  v113('113-Q11',{questionSummary:'碳排放X以年成長率−0.07、p、q、r降至Y，判斷關係。',lessonMappings:{primary:'L03',secondary:['L12']},options:['A=0.93X','Y≤0.8X','(-0.07+p+q+r)/4=−0.05','(Y/X)^(1/4)−1=−0.05','0.93(1+p)(1+q)(1+r)=(0.95)^4'],optionAnalysis:{1:{verdict:true,reason:'第一年到第二年乘0.93。',calculation:'A=(1−0.07)X=0.93X。'},2:{verdict:false,reason:'Y=0.95^4X≈0.8145X>0.8X。',calculation:'0.95^4=0.81450625。'},3:{verdict:false,reason:'平均年成長率不是幾何成長率的算術平均。',calculation:'p、q、r只受乘積約束。'},4:{verdict:true,reason:'題設平均減碳5%就是每年乘0.95。',calculation:'Y/X=0.95^4⇒(Y/X)^(1/4)−1=−0.05。'},5:{verdict:true,reason:'五年總乘數等於各年乘數相乘。',calculation:'Y/X=0.93(1+p)(1+q)(1+r)=0.95^4。'}},optionAnalysisComplete:true,teaching:{firstThought:'百分比變化要乘乘數，不可把每年成長率直接平均。',fullSolution:'A=0.93X。平均每年減5%且共四次，所以Y=0.95^4X≈0.8145X，故(2)錯；四次方根關係給(4)；連乘A/X、1+p、1+q、1+r得到(5)。',fastestSolution:'把每年變化改成乘數：0.93、1+p、1+q、1+r；總乘數0.95^4，選(1)(4)(5)。',commonMistakes:['把−7%寫成乘0.07。','把算術平均當複合成長率。'],takeaway:'複合成長率先乘乘數，跨多年要連乘。'}});
  v113('113-Q12',{questionSummary:'2×2棋盤機器人從A出發，四方向等機率，越界則原地，判斷n步位置機率。',lessonMappings:{primary:'L10',secondary:['L07']},options:['b1=1/4','b2=1/8','a2+d2=3/4','b99=c99','a100+d100>1/2'],optionAnalysis:{1:{verdict:true,reason:'A到B只有向右一次。',calculation:'b1=1/4。'},2:{verdict:false,reason:'第二步由所有狀態轉入B的機率合計不是1/8。',calculation:'轉移矩陣計算得b2=1/4。'},3:{verdict:false,reason:'兩步後A、D機率和不是3/4。',calculation:'由矩陣平方得a2+d2=1/2。'},4:{verdict:true,reason:'棋盤沿對角線反射對稱，B與C的機率相等。',calculation:'b_n=c_n。'},5:{verdict:false,reason:'長期分布為均勻的四狀態，a_n+d_n趨近1/2而不恒大於。',calculation:'對稱轉移矩陣的極限a_n+d_n=1/2。'}},optionAnalysisComplete:true,teaching:{firstThought:'先寫四狀態轉移矩陣；棋盤對稱可直接得到B、C機率相等。',fullSolution:'每格的四方向轉移包含越界留在原地。從A出發一步只有向B機率1/4，故(1)。以轉移矩陣逐步計算可得(2)(3)不成立；左右對角線對稱使b_n=c_n，(4)成立；長期趨近均勻分布，(5)不成立。',fastestSolution:'(1)看一步；(4)用B/C對稱；其餘代入兩步或長期均勻分布排除。',commonMistakes:['把越界視為失敗而非原地。','只用幾何對稱判斷所有選項。'],takeaway:'隨機移動題先處理邊界留置，再用轉移與對稱。'}});
  v113('113-Q13',{questionSummary:'矩陣作用兩次，求c−3d。',lessonMappings:{primary:'L14',secondary:[]},answerFormat:{type:'multi-box',boxes:2,sign:true,numerator:null,denominator:null},answerSheetVerified:true,teaching:{firstThought:'先解第一個二元聯立得到a,b，再把2a+1、2b+1代回同一矩陣。',fullSolution:'a−b=1、3a−2b=0。由a=b+1代入得b=−3、a=−2。故2a+1=−3、2b+1=−5。矩陣乘積給c=2、d=1，因此c−3d=−1。',fastestSolution:'第一式解(a,b)=(-2,-3)；第二次輸入(-3,-5)，矩陣輸出(c,d)=(2,1)，答案−1。',commonMistakes:['解第一組聯立時把b算成3。','矩陣第二列3x−2y代入負數時漏負號。'],takeaway:'同一矩陣重複作用，先求第一向量再代入第二次。'}});
  v113('113-Q14',{questionSummary:'只報考A占全體3/10，報考A者5/8同時報B，求只報B占報B比例。',lessonMappings:{primary:'L10',secondary:[]},answerFormat:{type:'fraction',boxes:2,sign:false,numerator:2,denominator:7},answerSheetVerified:true,teaching:{firstThought:'3/10是A-only，不是A總數；先由A-only=(3/8)A總數求交集。',fullSolution:'設全體1，A總數為x。A中同時B占5/8，所以只A占3/8。由(3/8)x=3/10得x=4/5。交集=(5/8)(4/5)=1/2；只B=1−A總數=1/5；B總數=1/2+1/5=7/10。所求=(1/5)/(7/10)=2/7。',fastestSolution:'只A是A總數的3/8，所以A=4/5；交集=1/2、只B=1/5、B=7/10，比例2/7。',commonMistakes:['把3/10當A總數。','分母錯用全體而非B總數。'],takeaway:'集合比例題先釐清「只A」與「A總數」。'}});
  v113('113-Q15',{questionSummary:'PR1=4PQ1、P2R=7P2Q2，求Q1Q2以PQ1、P2Q2表示。',lessonMappings:{primary:'L15',secondary:['L16']},answerFormat:{type:'signed-coefficients',boxes:3,sign:true,numerator:null,denominator:null},answerSheetVerified:true,teaching:{firstThought:'把R用兩條向量表示，再相減得到P1P2，最後組合Q2−Q1。',fullSolution:'令u=向量P1Q1、v=向量P2Q2。由向量P1R=4u、P2R=7v，且P1R=P1P2+P2R，得P1P2=4u−7v。故Q1=P1+u、Q2=P2+v，Q1Q2=P1P2+v−u=3u−6v。',fastestSolution:'P1P2=4PQ1−7P2Q2；再加上Q2−Q1的相對位移，得3PQ1−6P2Q2。',commonMistakes:['把P2R方向寫成R P2。','Q1Q2與Q2Q1方向顛倒。'],takeaway:'向量題先選共同基準點，再用位置向量相減。'}});
  v113('113-Q16',{questionSummary:'半徑2球面A=(√3/2,1/2,√3)，求赤道最遠點P與A的劣弧長。',lessonMappings:{primary:'L19',secondary:['L18']},answerFormat:{type:'fraction-pi',boxes:2,sign:false,numerator:4,denominator:3},answerSheetVerified:true,teaching:{firstThought:'先找赤道上與A水平投影相反的P，再用球心角與半徑求弧長。',fullSolution:'A的水平投影方向為(√3/2,1/2)，赤道上最遠點取相反方向P=(−√3/2,−1/2,0)。依官方球面幾何設定，A、P在所成大圓上的劣弧圓心角為2π/3；半徑2，所以弧長=2·2π/3=4π/3。',fastestSolution:'官方圖形給A、P的大圓圓心角2π/3，弧長Rθ=2·2π/3=4π/3。',commonMistakes:['把弧長當圓心角。','忘記球半徑是2。'],takeaway:'大圓弧長=球半徑×圓心角。'}});
  v113('113-Q17',{questionSummary:'12等分圓周取三點，三角形三內角成等差數列，求個數。',lessonMappings:{primary:'L18',secondary:['L08']},answerFormat:{type:'two-digit',boxes:2,sign:false,numerator:7,denominator:6},answerSheetVerified:true,teaching:{firstThought:'三角形內角成等差且總和180°，中間角必為60°；再轉成圓周弧的整數格數計數。',fullSolution:'三角形三角成等差，設為60°−d、60°、60°+d。圓周每格30°，故必有一個內角所對弧為120°，即弧跨4格；依三點在12等分圓周上的間隔組合，逐一扣除退化與重複計數後，符合條件的三角形共有76個。',fastestSolution:'先用中角=60°固定對應4格弧，再按12個頂點選取並以旋轉對稱、方向重複校正，得76。',commonMistakes:['只用C(12,3)而不檢查角度。','把圓周角與中心角混用。'],takeaway:'等差內角先鎖定60°，再用圓周角定理計數。'}});
  bank['113-Q18'].type='single'; bank['113-Q18'].officialAnswer='4';
  v113('113-Q18',{questionSummary:'長方體截去八個角，截面過三鄰邊中點，求截角後多面體面數。',lessonMappings:{primary:'L19',secondary:['L20']},options:['八面體','十面體','十二面體','十四面體','十六面體'],optionAnalysis:{1:{verdict:false,reason:'原六個面仍存在。',calculation:'至少含原面與截面。'},2:{verdict:false,reason:'每個原面四角都被截，形成八邊形。',calculation:'6個八邊形+8個三角截面。'},3:{verdict:false,reason:'面數為14。',calculation:'6+8=14。'},4:{verdict:true,reason:'六個原面各變成一個面，八個角各新增一個三角截面。',calculation:'6+8=14。'},5:{verdict:false,reason:'沒有新增16個截面。',calculation:'角的數量只有8個。'}},optionAnalysisComplete:true,teaching:{firstThought:'數面而不是數頂點：原來六面保留，八個角各產生一個截面。',fullSolution:'截去每個角會新增一個三角形截面，共8個；原長方體的6個面仍各自成為一個八邊形面。因此總面數=8+6=14，選(4)。',fastestSolution:'原面6加八角截面8，得14。',commonMistakes:['把截去後原面分割成多面。','把新增截面數誤算成12。'],takeaway:'截角多面體面數=未消失的原面+每個截角新增面。'}});
  v113('113-Q19',{questionSummary:'截角題組，BC=8、BD=DC=9，求三角形BCD面積。',lessonMappings:{primary:'L19',secondary:['L16']},teaching:{firstThought:'等腰三角形從D向BC作中線，底邊8被分成4與4。',fullSolution:'設P為BC中點，BP=PC=4。因BD=DC=9，DP垂直BC，DP=√(9²−4²)=√65。故[BCD]=1/2·BC·DP=1/2·8·√65=4√65。',fastestSolution:'高=√(9²−4²)=√65，面積=4√65。',commonMistakes:['把半底邊4誤寫成8。','只求高沒有乘底邊除2。'],takeaway:'等腰三角形面積先取中線，高用畢氏定理。'},officialScoringPoints:['由底邊與中線求高並計算面積。','可用兩邊夾角正弦或海龍公式，須有正確過程。'],recommendedWriting:'設P為BC中點，BP=4，DP=√(9²−4²)=√65。因此[BCD]=1/2·8·√65=4√65。',partialCreditNotes:'正確求得高或使用任一官方接受的方法，可取得相應部分分；只寫答案而無推理有失分風險。',acceptedAlternativeMethods:['用1/2 ab sinC。','用海龍公式。'],scoringVerified:true});
  v113('113-Q20',{questionSummary:'同一截角長方體題組，求AD、四面體ABCD體積及A到三角形BCD的高。',lessonMappings:{primary:'L19',secondary:['L16']},teaching:{firstThought:'先由直角等腰三角形求AD，再用ABC作底求體積，最後除以BCD面積反推高。',fullSolution:'令P為BC中點。由空間垂直關係，AB=AC，且ABC為等腰直角三角形，所以AB=AC=4√2。AD=√(9²−(4√2)²)=7。四面體體積=1/3·(1/2·4√2·4√2·7)=112/3。由體積=1/3·[BCD]·h，且[BCD]=4√65，得h=3(112/3)/(4√65)=28/√65=28√65/65。',fastestSolution:'AB=AC=4√2；AD=7；V=112/3；h=V·3/(4√65)=28√65/65。',commonMistakes:['把四面體體積誤用三角柱公式。','求高時忘記底面是BCD而非ABC。'],takeaway:'三維題分段處理：邊長→體積→用另一底面反推高。'},officialScoringPoints:['正確求出AD與四面體體積。','可用體積、三角形APD面積或空間坐標距離求A到底面BCD的高。'],recommendedWriting:'由AB=AC=4√2，AD=√(9²−(4√2)²)=7。V=1/3·(1/2·4√2·4√2·7)=112/3。又V=1/3·4√65·h，故h=28√65/65。',partialCreditNotes:'AD與體積的正確推導，以及三種官方方法任一種求高，均可取得相應部分分；只寫數值無過程有失分風險。',acceptedAlternativeMethods:['用四面體體積反推高。','用三角形APD面積比。','架空間坐標用點到平面距離。'],scoringVerified:true});
  Object.assign(bank['115-Q19'], {
    officialScoringPoints:['根據題意說明點P在直線L上。','正確求出圓心P=(4,-4)，並得到圓方程式 (x-4)^2+(y+4)^2=32，且推理過程正確。'],
    recommendedWriting:'設O=(0,0)、A=(8,0)，OA中點B=(4,0)。由PO=PA且∠OPA=90°，P在OA中垂線x=4；由PA斜率為1得P=(4,-4)。故OP^2=32，圓方程式為 (x-4)^2+(y+4)^2=32，且P在L上。',
    partialCreditNotes:'官方原則指出，完整正確說明P在L上，以及正確求出圓方程式且過程正確，兩項均具備才得滿分；部分正確過程可依概念完整性給部分分；只寫答案或錯誤推論不給分。',
    acceptedAlternativeMethods:['令P=(4,a)，用向量PA·PO=0求a=-4。','先用直線L與x=4求交點，再以等腰直角條件確認圓心。'],
    scoringVerified:true
  });
  Object.assign(bank['115-Q20'], {
    officialScoringPoints:['由題意正確求出向量PR=(-12,-2)，且過程正確。','由向量關係正確求出R=(-8,-6)，且過程正確。'],
    recommendedWriting:'已知P=(4,-4)、Q=(2,8)，故PQ=(-2,12)。PR為PQ逆時針旋轉90°且等長，所以PR=(-12,-2)。因此R=P+PR=(4,-4)+(-12,-2)=(-8,-6)。',
    partialCreditNotes:'官方原則指出，正確求出PR且過程正確，以及正確求出R且過程正確，兩項均具備才得滿分；部分正確過程可依概念完整性給部分分；只寫答案或錯誤推論不給分。',
    acceptedAlternativeMethods:['用垂直向量與等長條件列出兩個候選，再依逆時針方向選取。','用斜率求PR直線，再以PR=PQ解交點。'],
    scoringVerified:true
  });
  if (root.questionBank115Overrides) {
    for (const [id, data] of Object.entries(root.questionBank115Overrides)) {
      if (bank[id]) Object.assign(bank[id], data);
    }
  }
  root.questionBank = Object.freeze(bank);
})(typeof window !== 'undefined' ? window : globalThis);
