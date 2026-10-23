/*
 * Math B visual registry (Phase 7.6 Part 1).
 *
 * This is a data-only planning/lookup layer. It deliberately does not replace
 * the current renderer yet; Part 2 will add assets and an adapter one module at
 * a time. L14's approved matrix asset is registered as the quality baseline.
 */
(function () {
  const roles = ['CONCEPT', 'STEP', 'COMPARE', 'CONTEXT', 'MISTAKE'];
  const module = (id, unit, role, title, purpose, teachingGoal, decision, priority, asset) => ({
    id, unit, role, title, purpose, teachingGoal, decision, priority,
    asset: asset || `assets/visuals/${id.split('-')[0]}/${id}.svg`,
    status: asset ? 'EXISTING_BASELINE' : 'PLANNED_PART_2'
  });

  const lessons = {
    1: { title: '數線、絕對值與不等式', current: 'inline number-line SVG', currentDecision: 'REDRAW', modules: [
      module('l01-absolute-value-distance', 4, 'CONCEPT', '絕對值是距離', '以數線標出中心、左右端點與距離。', '把 |x-a| 讀成到中心 a 的距離。', 'REDRAW', 'P0'),
      module('l01-inequality-interval-steps', 5, 'STEP', '絕對值不等式轉區間', '分鏡顯示內側與外側兩種條件。', '理解嚴格不等號與端點。', 'ADD', 'P0'),
      module('l01-interval-endpoint-compare', 8, 'COMPARE', '開區間與閉區間', '比較空心點、實心點與解集。', '用端點圖形檢查不等式答案。', 'ADD', 'P1'),
      module('l01-percent-change-context', 5, 'CONTEXT', '誤差範圍情境', '把百分比誤差轉成數線區間。', '建立 Math B 的估計模型。', 'ADD', 'P1')
    ]},
    2: { title: '指數與對數 I', current: 'inline inverse-curves SVG', currentDecision: 'REPLACE', modules: [
      module('l02-exponent-log-inverse', 4, 'CONCEPT', '指數與對數互逆', '以交換座標的曲線說明反函數關係。', '看懂指數式與對數式的雙向翻譯。', 'REPLACE', 'P0'),
      module('l02-log-domain-step', 5, 'STEP', '對數定義域檢查', '逐步標出底數與真數限制。', '先檢查 a>0、a≠1、真數>0。', 'ADD', 'P0'),
      module('l02-log-law-compare', 8, 'COMPARE', '可拆與不可拆的對數式', '比較乘法與加法輸入的圖示。', '避免把 log(x+y) 錯拆。', 'ADD', 'P1')
    ]},
    3: { title: '指數與對數 II：成長模型', current: 'inline growth curve SVG', currentDecision: 'REDRAW', modules: [
      module('l03-growth-model-concept', 4, 'CONCEPT', '固定倍率成長', '以階梯點列與曲線對照固定百分比。', '辨認乘法累積模型。', 'REDRAW', 'P0'),
      module('l03-growth-step-model', 5, 'STEP', '從初值到第 n 期', '逐期標示倍率與期數。', '把情境翻成 A=A₀(1+r)ⁿ。', 'ADD', 'P0'),
      module('l03-growth-linear-vs-exponential', 8, 'COMPARE', '固定增加與固定倍率', '並排比較線性與指數成長。', '避免把百分比成長當固定差。', 'ADD', 'P1')
    ]},
    4: { title: '函數圖形與變換', current: 'inline graph-transform SVG', currentDecision: 'REPLACE', modules: [
      module('l04-graph-transform-concept', 4, 'CONCEPT', '圖形平移與鏡射', '同座標系展示原圖與變換後圖。', '連結式子變化與點的位置變化。', 'REPLACE', 'P0'),
      module('l04-graph-transform-step', 5, 'STEP', '關鍵點逐點搬移', '展示頂點、截距與對應點。', '用點追蹤取代盲目展開。', 'ADD', 'P0'),
      module('l04-transform-compare', 8, 'COMPARE', '括號內外符號', '比較左右平移、上下平移與鏡射。', '分辨 x 內外符號的方向。', 'ADD', 'P0'),
      module('l04-function-context', 5, 'CONTEXT', '拋物線路徑模型', '以簡單拋物線情境連結頂點。', '理解函數圖形的情境意義。', 'ADD', 'P1')
    ]},
    5: { title: '多項式', current: 'inline sign-chart SVG', currentDecision: 'REDRAW', modules: [
      module('l05-polynomial-zero-concept', 4, 'CONCEPT', '零點與因式', '數線標出零點與圖形穿越位置。', '理解 f(a)=0 對應 x-a。', 'REDRAW', 'P0'),
      module('l05-remainder-theorem-step', 5, 'STEP', '代根求餘式', '顯示除式、代入與餘式的流程。', '把除法問題化成代值。', 'ADD', 'P0'),
      module('l05-sign-change-compare', 8, 'COMPARE', '奇重根與偶重根', '以曲線穿越／反彈比較變號。', '判斷符號表何時變號。', 'ADD', 'P1')
    ]},
    6: { title: '等差、等比數列', current: 'inline sequence SVG', currentDecision: 'REPLACE', modules: [
      module('l06-sequence-concept', 4, 'CONCEPT', '等差與等比的差異', '數線點列與倍率箭頭並排。', '用相鄰關係辨認模型。', 'REPLACE', 'P0'),
      module('l06-sequence-term-step', 5, 'STEP', '從首項走到第 n 項', '標示 n-1 次加法或乘法。', '理解通項中的 n-1。', 'ADD', 'P0'),
      module('l06-sequence-sum-compare', 8, 'COMPARE', '通項與前 n 項和', '比較單一項與累積區域。', '知道何時使用通項、何時使用總和。', 'ADD', 'P1')
    ]},
    7: { title: '週期、遞迴與動態模型', current: 'inline cycle SVG', currentDecision: 'REDRAW', modules: [
      module('l07-cycle-state-concept', 4, 'CONCEPT', '狀態循環', '狀態節點與回到起點的有向圖。', '辨認週期與初始狀態。', 'REDRAW', 'P0'),
      module('l07-recurrence-step', 5, 'STEP', '由 aₙ 推到 aₙ₊₁', '逐格列出前幾項。', '避免索引錯一位。', 'ADD', 'P0'),
      module('l07-periodic-compare', 8, 'COMPARE', '週期規律與線性規律', '並排比較循環箭頭與直線成長。', '避免把週期序列當成等差。', 'ADD', 'P1')
    ]},
    8: { title: '排列組合 I', current: 'inline choice-tree SVG', currentDecision: 'REPLACE', modules: [
      module('l08-counting-choice-concept', 4, 'CONCEPT', '順序是否重要', '同一組人以隊伍與座位兩種結果比較。', '選擇 P 或 C 的第一個判斷。', 'REPLACE', 'P0'),
      module('l08-product-rule-step', 5, 'STEP', '乘法原理分層選擇', '樹狀分支標示每層選擇數。', '看懂分步計數的乘法。', 'ADD', 'P0'),
      module('l08-permutation-combination-compare', 8, 'COMPARE', '排列與組合', '以交換位置是否改變結果作對照。', '避免把 P、C 混用。', 'ADD', 'P0')
    ]},
    9: { title: '排列組合 II', current: 'inline block-method SVG', currentDecision: 'REDRAW', modules: [
      module('l09-restricted-arrangement-concept', 4, 'CONCEPT', '限制條件先處理', '將相鄰元素框成區塊。', '知道綁塊、插空與補集的角色。', 'REDRAW', 'P0'),
      module('l09-block-method-step', 5, 'STEP', '綁塊法流程', '區塊內外分兩層計數。', '避免漏乘區塊內排列。', 'ADD', 'P0'),
      module('l09-gap-method-compare', 8, 'COMPARE', '插空與補集', '比較可用空格與全體減違規。', '依限制選方法。', 'ADD', 'P0')
    ]},
    10: { title: '機率 I', current: 'inline probability-tree SVG', currentDecision: 'REDRAW', modules: [
      module('l10-probability-sample-space', 4, 'CONCEPT', '樣本空間與事件', '以結果樹標示全集與事件集合。', '先說清楚分母。', 'REDRAW', 'P0'),
      module('l10-probability-tree-step', 5, 'STEP', '路徑相乘再相加', '逐路徑標機率與合併。', '理解多階段試驗。', 'ADD', 'P0'),
      module('l10-probability-independent-compare', 8, 'COMPARE', '互斥與獨立', '以不能同時發生與互不影響作對照。', '避免混用兩種關係。', 'ADD', 'P0')
    ]},
    11: { title: '機率 II：條件機率', current: 'inline conditional-overlap SVG', currentDecision: 'REPLACE', modules: [
      module('l11-conditional-probability-concept', 4, 'CONCEPT', '縮小後的樣本空間', '以 B 圓圈內標示 A∩B。', '理解條件事件是新分母。', 'REPLACE', 'P0'),
      module('l11-conditional-tree-step', 5, 'STEP', '條件機率路徑', '從已知條件沿樹走到交集。', '讀懂 P(A|B) 的方向。', 'ADD', 'P0'),
      module('l11-conditional-compare', 8, 'COMPARE', 'P(A|B) 與 P(B|A)', '兩個分母用不同框線標示。', '避免反向條件錯誤。', 'ADD', 'P0'),
      module('l11-bayes-context', 5, 'CONTEXT', '檢測結果情境', '用分類表呈現反向推理。', '將條件機率連到真實判讀。', 'ADD', 'P1')
    ]},
    12: { title: '統計', current: 'inline boxplot SVG', currentDecision: 'REPLACE', modules: [
      module('l12-statistics-center-spread', 4, 'CONCEPT', '中心與散布', '資料點、平均、中位數與散布同圖。', '分辨中心量與散布量。', 'REPLACE', 'P0'),
      module('l12-boxplot-step', 5, 'STEP', '五數摘要', '逐步標最小值、Q1、中位數、Q3、最大值。', '讀箱型圖位置。', 'ADD', 'P0'),
      module('l12-outlier-compare', 8, 'COMPARE', '極端值對平均與中位數', '加入離群值前後並排比較。', '理解平均數較易受極端值影響。', 'ADD', 'P0'),
      module('l12-data-transform-context', 5, 'CONTEXT', '資料轉換', '平移／縮放前後資料線段對照。', '連結平均與標準差變化。', 'ADD', 'P1')
    ]},
    13: { title: '相關與迴歸', current: 'inline scatter SVG', currentDecision: 'REPLACE', modules: [
      module('l13-correlation-scatter-concept', 4, 'CONCEPT', '散布圖方向與強弱', '以同座標軸呈現正、負、無明顯相關。', '先看圖再解讀 r。', 'REPLACE', 'P0'),
      module('l13-regression-step', 5, 'STEP', '由迴歸線做預測', '標示觀測 x、垂線與預測 y。', '知道代入位置與預測意義。', 'ADD', 'P0'),
      module('l13-correlation-compare', 8, 'COMPARE', 'r 接近 1、-1、0', '三組點雲用相同尺度比較。', '理解方向、強弱與線性。', 'ADD', 'P0'),
      module('l13-correlation-context', 5, 'CONTEXT', '相關不等於因果', '以第三變因情境圖示提醒。', '避免把相關說成因果。', 'ADD', 'P0')
    ]},
    14: { title: '矩陣', current: 'assets/matrix-linear-transformation.svg', currentDecision: 'KEEP', modules: [
      module('l14-matrix-linear-transformation', 4, 'CONCEPT', '矩陣作用在平面', '保留已 QA 通過的座標、網格、正方形到平行四邊形。', '建立矩陣是作用而非抽象方塊的理解。', 'KEEP', 'P0', 'assets/matrix-linear-transformation.svg'),
      module('l14-matrix-linearity-step', 5, 'STEP', 'A(u+v)=Au+Av', '用向量箭頭與平行四邊形逐步展示線性。', '看懂向量和的兩條等價路徑。', 'ADD', 'P0'),
      module('l14-matrix-ab-ba-compare', 8, 'COMPARE', 'AB 與 BA 的順序', '雙流程圖標示先作用誰與結果。', '避免矩陣乘法順序顛倒。', 'ADD', 'P0'),
      module('l14-matrix-context', 5, 'CONTEXT', '線性變換情境', '以縮放／剪切網格連到座標變化。', '把元素計算連回幾何結果。', 'ADD', 'P1')
    ]},
    15: { title: '向量', current: 'inline vector-arrow SVG', currentDecision: 'REDRAW', modules: [
      module('l15-vector-coordinate-concept', 4, 'CONCEPT', '向量是有方向的箭頭', '同一向量平移後保持方向與長度。', '區分點與向量。', 'REDRAW', 'P0'),
      module('l15-vector-addition-step', 5, 'STEP', '首尾相接與平行四邊形', '逐段展示向量加法。', '理解分量相加與幾何加法。', 'ADD', 'P0'),
      module('l15-vector-dot-compare', 8, 'COMPARE', '內積正負與垂直', '比較銳角、直角、鈍角三種箭頭。', '用內積判斷角度關係。', 'ADD', 'P0'),
      module('l15-vector-context', 5, 'CONTEXT', '位移與路徑', '以平面位移路徑合成總位移。', '建立向量在情境中的意義。', 'ADD', 'P1')
    ]},
    16: { title: '直線與坐標', current: 'inline line-slope SVG', currentDecision: 'REPLACE', modules: [
      module('l16-slope-rise-run', 4, 'CONCEPT', '斜率是升除以跑', '座標格線標示垂直與水平變化。', '讀懂斜率正負與大小。', 'REPLACE', 'P0'),
      module('l16-line-equation-step', 5, 'STEP', '兩點到點斜式', '逐步求斜率、代點、寫方程。', '把幾何資訊轉成式子。', 'ADD', 'P0'),
      module('l16-parallel-perpendicular-compare', 8, 'COMPARE', '平行、垂直、水平、鉛直', '以線型與斜率標籤比較。', '不把鉛直線誤當成有限斜率。', 'ADD', 'P0'),
      module('l16-line-context', 5, 'CONTEXT', '交點與距離', '兩線交會與點到線距離示意。', '連結方程與幾何位置。', 'ADD', 'P1')
    ]},
    17: { title: '圓與坐標', current: 'inline circle SVG', currentDecision: 'REPLACE', modules: [
      module('l17-circle-center-radius', 4, 'CONCEPT', '圓心到圓周等距', '標出圓心、半徑與圓周點。', '從幾何定義讀標準式。', 'REPLACE', 'P0'),
      module('l17-circle-equation-step', 5, 'STEP', '標準式與配方', '逐步由一般式整理平方和。', '正確讀取圓心符號。', 'ADD', 'P0'),
      module('l17-tangent-compare', 8, 'COMPARE', '半徑與切線', '以直角標記比較相交與切線。', '理解切線垂直半徑。', 'ADD', 'P0'),
      module('l17-circle-line-context', 5, 'CONTEXT', '圓與直線位置', '展示相離、相切、相交三種情形。', '用距離判斷位置關係。', 'ADD', 'P1')
    ]},
    18: { title: '三角', current: 'inline unit-circle SVG', currentDecision: 'REPLACE', modules: [
      module('l18-triangle-ratios', 4, 'CONCEPT', '對邊鄰邊斜邊', '直角三角形標籤三邊與角。', '建立 sin、cos、tan 的對應。', 'REPLACE', 'P0'),
      module('l18-special-angles-step', 5, 'STEP', '特殊角三角比', '以 30、45、60 度三角形分鏡。', '看懂特殊值來源。', 'ADD', 'P0'),
      module('l18-quadrant-sign-compare', 8, 'COMPARE', '象限與正負', '單位圓四象限以符號標示。', '避免只背數值而漏判正負。', 'ADD', 'P0'),
      module('l18-triangle-context', 5, 'CONTEXT', '仰角與距離', '地面、視線、高度組成直角三角形。', '把三角比用於估距。', 'ADD', 'P1')
    ]},
    19: { title: '平面、空間與球面', current: 'inline sphere SVG', currentDecision: 'REPLACE', modules: [
      module('l19-solid-geometry-concept', 4, 'CONCEPT', '長度、面積、體積', '同一立體用三種量綱標示。', '分辨單位與幾何量。', 'REPLACE', 'P0'),
      module('l19-solid-volume-step', 5, 'STEP', '截面到體積', '長方體、圓柱、圓錐逐步標底面與高。', '知道公式各符號放在哪裡。', 'ADD', 'P0'),
      module('l19-solid-formula-compare', 8, 'COMPARE', '球體積與表面積', '同半徑比較 r² 與 r³ 的量綱。', '避免半徑、直徑與次方混淆。', 'ADD', 'P0'),
      module('l19-sphere-context', 5, 'CONTEXT', '球面截線與緯線', '以球心截面解釋球面距離。', '把三維問題降成二維截面。', 'ADD', 'P1')
    ]},
    20: { title: '圓錐曲線、透視與綜合建模', current: 'inline conic SVG', currentDecision: 'REPLACE', modules: [
      module('l20-conic-concept', 4, 'CONCEPT', '拋物線與焦點準線', '標示焦點、準線、等距點與開口。', '用定義辨識圖形。', 'REPLACE', 'P0'),
      module('l20-perspective-step', 5, 'STEP', '單點透視收斂', '平行線沿觀看方向收斂到消失點。', '理解圖上比例與消失點。', 'ADD', 'P0'),
      module('l20-model-compare', 8, 'COMPARE', '圖上比例與實際比例', '並排比較縮放前後長度。', '分辨模型比例與實際量。', 'ADD', 'P0'),
      module('l20-conic-context', 5, 'CONTEXT', '座標與情境建模', '用簡單拋物線／透視情境連結方程與圖。', '整合圖形、比例與函數判讀。', 'ADD', 'P0')
    ]}
  };

  ['l01-interval-endpoint-compare','l05-sign-change-compare','l08-permutation-combination-compare','l11-conditional-compare','l12-outlier-compare','l13-correlation-compare','l18-quadrant-sign-compare'].forEach((id) => {
    Object.values(lessons).forEach((lesson) => lesson.modules.forEach((item) => {
      if (item.id === id) item.role = 'MISTAKE';
    }));
  });

  window.MATH_VISUAL_REGISTRY = {
    version: 'phase-7.6-part-1',
    roles,
    assetRoot: 'assets/visuals/',
    baseline: { lessonId: 14, asset: 'assets/matrix-linear-transformation.svg' },
    lessons
  };
})();
