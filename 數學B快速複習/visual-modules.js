/* Phase 7.6 Part 2: registry-backed, repository-local teaching visuals. */
(function () {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const t = (x, y, value, cls = '') => `<text x="${x}" y="${y}" class="${cls}">${esc(value)}</text>`;
  const line = (x1, y1, x2, y2, cls = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
  const circle = (cx, cy, r, cls = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" class="${cls}"/>`;
  const rect = (x, y, w, h, cls = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${cls}"/>`;
  const path = (d, cls = '') => `<path d="${d}" class="${cls}"/>`;
  const polygon = (points, cls = '') => `<polygon points="${points}" class="${cls}"/>`;
  const arrow = (x1, y1, x2, y2, cls = 'vector') => line(x1, y1, x2, y2, `${cls} arrow-line`);
  const axes = (ox = 70, oy = 235, x2 = 690, y2 = 35) => line(ox, oy, x2, oy, 'axis') + line(ox, oy, ox, y2, 'axis') + t(x2 - 10, oy + 22, 'x') + t(ox - 24, y2 + 8, 'y');
  const grid = (ox = 70, oy = 235, step = 32, cols = 19, rows = 6) => {
    let out = '';
    for (let i = 0; i <= cols; i++) out += line(ox + i * step, oy - rows * step, ox + i * step, oy, 'grid');
    for (let i = 0; i <= rows; i++) out += line(ox, oy - i * step, ox + cols * step, oy - i * step, 'grid');
    return out;
  };
  const shell = (id, title, desc, body, viewBox = '0 0 760 300') => {
    const titleId = `${id}-title`, descId = `${id}-desc`;
    return `<svg class="math-visual-svg visual-svg" viewBox="${viewBox}" role="img" aria-labelledby="${titleId} ${descId}" preserveAspectRatio="xMidYMid meet"><title id="${titleId}">${esc(title)}</title><desc id="${descId}">${esc(desc)}</desc><defs><marker id="${id}-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" class="arrow-head"/></marker></defs><style>.visual-svg{display:block;width:100%;min-width:620px;height:auto}.visual-svg text{font:600 15px system-ui,sans-serif;fill:#18324a}.visual-svg .small{font-size:12px}.visual-svg .axis{stroke:#18324a;stroke-width:2}.visual-svg .grid{stroke:#d6e2ec;stroke-width:1}.visual-svg .guide{stroke:#6d879d;stroke-width:2;stroke-dasharray:6 5;fill:none}.visual-svg .primary{stroke:#087f72;stroke-width:4;fill:none}.visual-svg .secondary{stroke:#b56b18;stroke-width:4;fill:none}.visual-svg .wrong{stroke:#b42318;stroke-width:3;stroke-dasharray:7 5;fill:none}.visual-svg .point{fill:#087f72;stroke:#fff;stroke-width:2}.visual-svg .accent{fill:#f5c451;stroke:#18324a;stroke-width:2}.visual-svg .panel{fill:#f7fafc;stroke:#b8cbd9;stroke-width:1.5}.visual-svg .vector{stroke:#087f72;stroke-width:4;fill:none;marker-end:url(#${id}-arrow)}.visual-svg .arrow-line{marker-end:url(#${id}-arrow)}.visual-svg .arrow-head{fill:#087f72}.visual-svg .bad{fill:#fde8e7;stroke:#b42318;stroke-width:2}.visual-svg .good{fill:#e6f4f0;stroke:#087f72;stroke-width:2}</style>${body}</svg>`;
  };

  function lessonVisual(id, index) {
    const f = [
      () => shell(id, '絕對值是數線上的距離', '中心 3 到左右端點的距離都是 2；區間顯示絕對值不等式的解。', grid(80, 190, 42, 13, 1) + line(80,190,626,190,'axis') + circle(248,190,7,'point') + circle(332,190,7,'point') + line(248,180,248,200,'axis') + line(332,180,332,200,'axis') + t(238,220,'1') + t(322,220,'5') + t(282,155,'中心 3') + t(260,120,'|x−3|<2：內側') + path('M248 168 Q290 135 332 168','secondary')),
      () => shell(id, '絕對值不等式逐步轉成區間', '先把距離條件畫在數線，再讀出左右端點。', line(70,220,690,220,'axis') + circle(250,220,7,'point') + line(250,210,250,230,'axis') + circle(410,220,7,'point') + line(410,210,410,230,'axis') + t(235,250,'1') + t(395,250,'5') + t(85,55,'|x−3|<2') + arrow(190,80,250,165,'secondary') + t(285,92,'中心 3、半徑 2') + arrow(445,165,410,80,'secondary') + t(470,55,'1<x<5')),
      () => shell(id, '開區間與閉區間', '空心端點表示不包含，實心端點表示包含。', line(80,105,330,105,'axis') + line(430,105,680,105,'axis') + circle(180,105,8,'accent') + circle(260,105,8,'accent') + circle(530,105,8,'point') + circle(610,105,8,'point') + t(135,70,'1<x<3') + t(485,70,'1≤x≤3') + t(158,145,'空心') + t(515,145,'實心')),
      () => shell(id, '不等號翻轉的錯誤對照', '負數乘除會翻轉不等號；正確路徑與錯誤路徑並排。', rect(50,45,310,200,'good') + rect(400,45,310,200,'bad') + t(75,78,'正確') + t(425,78,'錯誤') + t(75,120,'−2x<6') + t(75,160,'除以 −2') + t(75,205,'x>−3') + t(425,120,'−2x<6') + t(425,160,'除以 −2') + t(425,205,'x<−3（未翻轉）'))
    ];
    const l02 = [
      () => shell(id, '指數與對數互逆', '指數式與對數式描述同一件事；圖中標示 2 的 3 次方得到 8。', axes(90,230,670,45) + line(110,210,640,70,'guide') + path('M110 220 C220 210 310 170 390 130 C480 85 560 60 640 52','primary') + path('M110 220 C220 210 310 170 390 130 C480 85 560 60 640 52','secondary') + t(135,80,'2³=8') + t(500,185,'log₂8=3') + t(330,255,'y=x：互逆的鏡射')),
      () => shell(id, '底數不同的指數曲線', '底數大於 1 時遞增，底數介於 0 與 1 時遞減。', axes() + path('M80 225 C180 210 260 150 330 90 C390 45 470 40 670 35','primary') + path('M80 35 C230 50 310 80 390 130 C500 195 580 220 670 225','secondary') + t(480,58,'底數 > 1：遞增') + t(460,212,'0<底數<1：遞減')),
      () => shell(id, '對數定義域檢查', '對數的真數必須大於 0；圖示以數線分開可行與不可行區域。', line(70,165,690,165,'axis') + line(210,150,210,180,'axis') + circle(210,165,7,'point') + t(180,205,'真數 0') + t(80,115,'真數<0：不可用') + t(270,115,'真數>0：可用') + path('M230 165 L670 165','primary'))
    ];
    const l03 = [
      () => shell(id, '線性與指數成長', '固定增加的直線與固定倍率的曲線以相同座標尺度比較。', axes() + path('M80 220 L650 60','secondary') + path('M80 220 C230 218 330 190 430 125 C520 65 600 45 670 35','primary') + t(520,84,'固定倍率') + t(490,150,'固定增加')),
      () => shell(id, '每期倍率時間軸', '每一期都乘以 1.5，數值依序為 2、3、4.5、6.75。', line(90,170,660,170,'axis') + [0,1,2,3].map((n) => circle(130+n*155,170,10,'point') + t(117+n*155,205,['2','3','4.5','6.75'][n]) + (n<3 ? arrow(145+n*155,170,255+n*155,170,'secondary') + t(175+n*155,145,'×1.5') : '')).join('')),
      () => shell(id, '成長與衰減曲線', '相同座標尺度中，成長與衰減的方向相反。', axes() + path('M80 220 C210 215 330 170 430 100 C520 45 600 35 670 30','primary') + path('M80 35 C210 40 330 85 430 150 C520 205 600 220 670 225','secondary') + t(520,65,'成長') + t(520,210,'衰減'))
    ];
    const l04 = [
      () => shell(id, '原函數與平移後的圖形', '同一座標網格展示 y=x² 與右移 2、上移 3 後的拋物線。', grid(380,230,28,11,6) + axes(380,230,690,55) + path('M230 70 Q380 230 530 70','primary') + path('M290 70 Q440 230 590 70','secondary') + circle(380,230,6,'point') + circle(440,230,6,'accent') + t(315,70,'原函數') + t(470,70,'右 2、上 3')),
      () => shell(id, '關鍵點逐點搬移', '三個原圖關鍵點以同一位移向量移動到新位置。', line(80,220,680,220,'axis') + line(380,45,380,250,'axis') + circle(300,180,7,'point') + circle(380,180,7,'point') + circle(460,180,7,'point') + arrow(300,150,380,100,'secondary') + arrow(380,150,460,100,'secondary') + t(270,250,'原圖點') + t(430,250,'變換後點') + t(470,80,'同一位移')),
      () => shell(id, '括號內外符號比較', '左右平移與上下平移用相同基準點對照。', rect(45,50,310,190,'panel') + rect(405,50,310,190,'panel') + t(75,82,'x−2：向右 2') + t(435,82,'x+2：向左 2') + path('M90 185 Q200 90 310 185','primary') + path('M450 185 Q560 90 670 185','secondary') + arrow(180,210,240,210,'secondary') + arrow(575,210,515,210,'secondary')),
      () => shell(id, '對稱與伸縮', '以同一拋物線展示 x 軸對稱、y 軸對稱與尺度改變。', axes(380,220,690,45) + path('M230 190 Q380 70 530 190','primary') + path('M230 50 Q380 170 530 50','secondary') + line(380,45,380,220,'guide') + t(90,70,'原圖') + t(90,100,'x 軸對稱後'))
    ];
    const l05 = [
      () => shell(id, '根是圖形與 x 軸的交點', '根的位置在 x 軸上；曲線是否穿越由重根奇偶決定。', axes(70,220,690,40) + path('M80 205 Q220 70 350 220 Q470 340 660 80','primary') + circle(230,190,6,'point') + circle(470,190,6,'point') + t(205,255,'根 1') + t(445,255,'根 2')),
      () => shell(id, '因式與零點的步驟', '代入根使因式成為 0，代數條件與圖形位置相連。', rect(55,60,190,150,'panel') + t(90,100,'因式 x−2') + t(90,145,'代入 x=2') + t(90,185,'得到 0') + arrow(255,135,365,135,'secondary') + rect(380,60,300,150,'good') + t(420,100,'圖形在 x=2') + line(430,170,635,170,'axis') + circle(535,170,7,'point') + t(515,200,'x 軸交點')),
      () => shell(id, '奇重根與偶重根', '一次穿越與二次碰觸的圖形行為並排比較。', rect(45,45,315,200,'good') + rect(400,45,315,200,'bad') + t(75,78,'奇重根：穿越') + t(430,78,'偶重根：碰觸') + path('M75 190 L150 145 L225 190 L310 95','primary') + path('M430 190 Q535 80 640 190','secondary') + line(75,190,310,190,'axis') + line(430,190,640,190,'axis'))
    ];
    const l06 = [
      () => shell(id, '數列點圖', '等差點列固定增加，等比點列固定乘倍率。', line(80,220,680,220,'axis') + [1,3,5,7].map((v,i)=>circle(130+i*130,220-v*12,7,'point')+t(120+i*130,255,String(v))).join('') + [1,2,4,8].map((v,i)=>circle(130+i*130,120-v*7,7,'accent')+t(115+i*130,90,String(v))).join('') + t(90,55,'上：等差') + t(90,75,'下：等比')),
      () => shell(id, '公差與公比的步驟', '等差每次加 3；等比每次乘 2。', rect(50,55,300,155,'panel') + rect(410,55,300,155,'panel') + t(80,88,'2 → 5 → 8 → 11') + t(80,125,'每次 +3') + arrow(90,170,300,170,'secondary') + t(440,88,'2 → 4 → 8 → 16') + t(440,125,'每次 ×2') + arrow(450,170,660,170,'primary')),
      () => shell(id, '通項與前 n 項和', '單一項是位置；前 n 項和是到該位置的累積。', line(85,220,670,220,'axis') + [0,1,2,3,4].map(i=>rect(120+i*90,220-(i+1)*22,55,(i+1)*22,'accent')).join('') + t(110,55,'單一項：看一個位置') + t(430,55,'前 n 項和：累積面積'))
    ];
    const l07 = [
      () => shell(id, '狀態循環圖', '狀態 1、4、0、3、6、2、5 依箭頭循環回到 1。', circle(140,150,28,'point') + circle(260,80,28,'point') + circle(400,80,28,'point') + circle(520,150,28,'point') + circle(330,235,28,'point') + arrow(160,128,240,98,'secondary') + arrow(288,80,372,80,'secondary') + arrow(428,98,500,128,'secondary') + arrow(500,170,350,220,'secondary') + arrow(305,220,155,170,'secondary') + t(133,155,'1') + t(253,85,'4') + t(393,85,'0') + t(513,155,'3') + t(323,240,'6')),
      () => shell(id, '遞迴時間軸', '每一步都由前一狀態加 3，再取模 7。', line(70,170,690,170,'axis') + [1,4,0,3,6].map((v,i)=>circle(100+i*135,170,8,'point')+t(92+i*135,205,`第 ${i+1} 步：${v}`)+(i<4?arrow(112+i*135,170,210+i*135,170,'secondary')+t(145+i*135,140,'+3 mod 7'):'')).join('')),
      () => shell(id, '週期與線性成長比較', '週期狀態回到原點；線性模型持續往同一方向。', rect(45,45,315,200,'panel') + rect(400,45,315,200,'panel') + t(75,78,'週期：回到原狀態') + t(430,78,'線性：固定增加') + circle(190,155,65,'guide') + path('M190 90 A65 65 0 0 1 250 190','secondary') + path('M430 205 L670 75','primary'))
    ];
    const l08 = [
      () => shell(id, '排列位置槽', '第一、第二名的槽位有順序，因此交換位置會得到不同結果。', rect(90,100,145,70,'panel') + rect(255,100,145,70,'panel') + rect(420,100,145,70,'panel') + t(140,140,'第 1 位') + t(305,140,'第 2 位') + t(470,140,'第 3 位') + arrow(110,205,545,205,'secondary') + t(195,235,'每個槽位都要選一人')),
      () => shell(id, '乘法原理樹狀圖', '第一步 3 種、第二步 2 種，總數為 3×2。', circle(70,150,15,'point') + line(85,150,230,80,'axis') + line(85,150,230,150,'axis') + line(85,150,230,220,'axis') + [80,150,220].map(y=>circle(245,y,12,'accent')).join('') + t(315,95,'每條路徑 2 種') + t(315,150,'3×2=6')),
      () => shell(id, '順序重要與不重要', '同兩人 A、B，排名 AB 與 BA 不同；組隊 AB 與 BA 相同。', rect(45,50,315,195,'good') + rect(400,50,315,195,'panel') + t(75,82,'排列：看順序') + t(75,130,'AB ≠ BA') + t(75,180,'P(5,2)=20') + t(430,82,'組合：不看順序') + t(430,130,'AB = BA') + t(430,180,'C(5,2)=10'))
    ];
    const l09 = [
      () => shell(id, '相鄰元素綁成一塊', 'A、B 必須相鄰時先視為一塊，再乘上區塊內兩種順序。', rect(65,105,90,60,'panel') + rect(170,95,115,80,'accent') + rect(300,105,90,60,'panel') + rect(405,105,90,60,'panel') + t(196,142,'AB／BA') + t(85,142,'C') + t(320,142,'D') + t(425,142,'E') + t(155,210,'外部排列 × 區塊內 2 種')),
      () => shell(id, '不相鄰限制的插空法', '先排其他元素，再把受限元素放進空格。', rect(75,115,55,55,'panel') + rect(150,115,55,55,'panel') + rect(225,115,55,55,'panel') + rect(300,115,55,55,'panel') + t(80,90,'先排 A B C') + t(420,130,'空格：_ A _ B _ C _') + arrow(365,142,405,142,'secondary') + t(80,215,'再選空格放受限元素')),
      () => shell(id, '重複元素避免重複計數', '相同字母交換不產生新排列；重複元素要除以重複階乘。', rect(55,50,310,190,'bad') + rect(400,50,315,190,'good') + t(80,82,'錯：把 A₁、A₂ 當不同') + t(430,82,'對：相同 A 不標身份') + t(85,135,'A A B：重複計數') + t(430,135,'3!/2!=3 種') + t(85,190,'同一排列被算兩次') + t(430,190,'只保留不同結果'))
    ];
    const l10 = [
      () => shell(id, '硬幣樣本空間', '兩次擲公平硬幣的四個等可能結果。', rect(110,65,440,155,'panel') + ['正正','正反','反正','反反'].map((v,i)=>rect(140+(i%2)*190,90+Math.floor(i/2)*70,130,45,'accent')+t(185+(i%2)*190,118+Math.floor(i/2)*70,v)).join('') + t(590,145,'總數 4')),
      () => shell(id, '兩階段機率樹', '每條路徑相乘；互斥路徑再相加。', circle(65,150,14,'point') + line(80,150,220,85,'axis') + line(80,150,220,215,'axis') + line(235,85,390,50,'axis') + line(235,85,390,120,'axis') + line(235,215,390,180,'axis') + line(235,215,390,250,'axis') + t(430,80,'路徑相乘') + t(430,130,'符合事件的路徑相加')),
      () => shell(id, '互斥、獨立與補事件', '互斥事件不能同時發生；獨立事件彼此不改變機率；補事件是全集剩下部分。', rect(45,45,210,200,'panel') + rect(275,45,210,200,'panel') + rect(505,45,210,200,'panel') + t(75,82,'互斥') + circle(125,155,45,'good') + circle(190,155,45,'good') + t(315,82,'獨立') + circle(350,155,42,'primary') + circle(425,155,42,'secondary') + t(545,82,'補事件') + rect(555,120,115,65,'good') + t(574,160,'Aᶜ'))
    ];
    const l11 = [
      () => shell(id, '全部到條件 B 再找交集', '條件機率先把 B 當成新的世界，再找 A 與 B 的交集。', circle(340,150,100,'panel') + circle(375,150,55,'accent') + circle(390,150,20,'point') + t(315,80,'全部') + t(360,125,'B') + t(378,155,'A∩B') + arrow(90,150,220,150,'secondary') + t(80,125,'限制到 B') + arrow(470,150,610,150,'secondary') + t(525,125,'找交集')),
      () => shell(id, '條件機率樹狀步驟', '已知 B 時沿 B 分支，交集機率由條件與 B 相乘。', circle(65,150,14,'point') + line(80,150,215,90,'axis') + line(80,150,215,210,'axis') + t(225,85,'B') + t(225,215,'Bᶜ') + line(230,90,390,55,'axis') + line(230,90,390,125,'axis') + t(405,60,'A∩B') + t(405,130,'Aᶜ∩B') + t(500,190,'P(A∩B)=P(A|B)P(B)')),
      () => shell(id, 'P(A|B) 與 P(B|A)', '兩者交集相同，但分母不同；圖中用不同框線標出分母。', rect(55,55,300,175,'panel') + rect(405,55,300,175,'panel') + t(80,88,'P(A|B)') + t(80,130,'交集 ÷ B') + circle(190,170,35,'accent') + t(430,88,'P(B|A)') + t(430,130,'交集 ÷ A') + circle(540,170,35,'secondary') + t(100,210,'分母是已知條件') + t(455,210,'分母換了，數值可能不同')),
      () => shell(id, '表格到條件機率', '先圈出 B 欄，再用其中的交集格除以 B 的總數。', rect(115,65,360,145,'panel') + line(235,65,235,210,'axis') + line(355,65,355,210,'axis') + line(115,115,475,115,'axis') + t(145,95,'', 'small') + t(155,95,'A') + t(275,95,'Aᶜ') + t(395,95,'合計') + t(130,145,'B') + t(250,145,'12') + t(370,145,'8') + t(430,145,'20') + t(130,185,'Bᶜ') + t(250,185,'18') + t(370,185,'22') + t(430,185,'40') + t(520,145,'P(A|B)=12/20'))
    ];
    const l12 = [
      () => shell(id, '資料中心與散布', '資料點靠近中心表示集中，離中心遠表示分散。', line(80,180,680,180,'axis') + [115,175,230,285,340,395,450].map(x=>circle(x,180-(x%3)*12,7,'point')).join('') + line(340,120,340,220,'secondary') + t(320,95,'平均') + t(500,245,'資料值')),
      () => shell(id, '五數摘要與 IQR', '箱型圖標示最小值、Q1、中位數、Q3、最大值；箱長是 IQR。', line(80,160,680,160,'axis') + line(130,130,130,190,'axis') + line(590,130,590,190,'axis') + line(130,160,220,160,'axis') + line(440,160,590,160,'axis') + rect(220,120,220,80,'accent') + line(330,120,330,200,'secondary') + t(105,225,'最小') + t(205,225,'Q1') + t(315,225,'中位數') + t(430,225,'Q3') + t(560,225,'最大') + t(280,95,'IQR')),
      () => shell(id, '極端值對平均與中位數', '資料 10、11、12、13 加入 100 後，平均數變 29.2，中位數變 12。', line(70,210,690,210,'axis') + [130,190,250,310].map((x,i)=>circle(x,180,7,'point')+t(x-7,245,['10','11','12','13'][i])).join('') + circle(590,210,9,'accent') + t(570,245,'100') + line(100,125,340,125,'secondary') + line(100,155,340,155,'primary') + t(350,130,'平均：11.5→29.2') + t(350,160,'中位數：11.5→12')),
      () => shell(id, '集中與分散的標準差', '相同平均附近，點越散開，標準差越大。', rect(45,45,310,195,'panel') + rect(400,45,315,195,'panel') + t(75,80,'集中：標準差較小') + t(430,80,'分散：標準差較大') + line(75,170,325,170,'axis') + line(430,170,680,170,'axis') + [145,175,205,235,265].map(x=>circle(x,170,6,'point')).join('') + [450,500,560,620,670].map((x,i)=>circle(x,170-(i%2)*55,6,'accent')).join(''))
    ];
    const l13 = [
      () => shell(id, '四種散布圖方向', '資料點圖真實呈現強正、弱正、無明顯與負相關。', rect(35,35,165,105,'panel') + rect(215,35,165,105,'panel') + rect(395,35,165,105,'panel') + rect(575,35,165,105,'panel') + t(58,58,'強正') + t(238,58,'弱正') + t(418,58,'無明顯') + t(598,58,'負') + path('M55 125 L175 55','primary') + path('M235 115 L350 75','secondary') + [430,455,480,515,540].map((x,i)=>circle(x,100-(i%2)*20,4,'point')).join('') + path('M595 55 L715 125','wrong')),
      () => shell(id, '迴歸線與殘差', '觀測點到迴歸線的垂直差是殘差；預測值落在直線上。', axes(80,230,690,45) + path('M90 210 L660 65','secondary') + circle(390,125,7,'point') + line(390,125,390,135,'wrong') + t(400,132,'殘差') + t(520,95,'預測值')),
      () => shell(id, '相關係數絕對值比較', 'r 越接近 1 或 −1，線性關係越強；接近 0 表示無明顯線性關係。', line(90,160,670,160,'axis') + t(75,100,'−1') + t(360,100,'0') + t(645,100,'1') + line(160,145,160,175,'secondary') + line(380,145,380,175,'axis') + line(600,145,600,175,'primary') + t(105,205,'強負') + t(345,205,'弱線性') + t(555,205,'強正')),
      () => shell(id, '相關不等於因果', '兩個變數一起上升不代表其中一個造成另一個；第三變因可能同時影響兩者。', circle(190,145,45,'good') + circle(570,145,45,'good') + t(155,150,'學習時間') + t(535,150,'成績') + arrow(235,145,525,145,'secondary') + circle(380,70,30,'accent') + t(350,75,'第三變因') + arrow(370,95,225,125,'secondary') + arrow(390,95,535,125,'secondary'))
    ];
    const l14 = [
      () => '<div class="matrix-visual-frame"><img class="matrix-visual-svg" src="assets/matrix-linear-transformation.svg" alt="矩陣線性變換：單位正方形變成平行四邊形"></div>',
      () => shell(id, '矩陣保留向量加法結構', '兩條路徑都得到同一個 A(u+v)，箭頭顯示向量和與矩陣作用。', grid(80,230,30,18,6) + axes(80,230,650,45) + arrow(140,200,260,130,'primary') + arrow(140,200,235,205,'secondary') + arrow(235,205,340,130,'primary') + t(125,185,'u') + t(245,122,'Au') + t(230,225,'v') + t(320,122,'Av') + t(420,85,'A(u+v)=Au+Av')),
      () => shell(id, 'AB 與 BA 的作用順序', '列向量由右向左作用：先 B 再 A 是 ABx；先 A 再 B 是 BAx。', rect(45,70,185,90,'panel') + rect(285,70,120,90,'accent') + rect(460,70,185,90,'good') + t(92,125,'x') + arrow(235,115,275,115,'secondary') + t(315,125,'B') + arrow(415,115,450,115,'secondary') + t(525,125,'ABx') + t(70,220,'另一流程：x → A → B → BAx') + arrow(145,190,205,190,'primary'))
    ];
    const l15 = [
      () => shell(id, '向量是有方向的箭頭', '同一向量平移後長度與方向不變；端點是點，箭頭是向量。', grid(80,230,30,18,6) + axes(80,230,650,45) + arrow(140,200,290,120,'primary') + arrow(390,200,540,120,'secondary') + t(195,150,'u') + t(445,150,'同一方向與長度')),
      () => shell(id, '向量分量與加法', '水平、垂直分量形成直角三角形，分量可逐項相加。', line(110,220,330,220,'axis') + line(330,220,330,80,'axis') + arrow(110,220,330,80,'primary') + t(195,240,'水平分量') + t(345,150,'垂直分量') + t(170,125,'(3,2)')),
      () => shell(id, '平行四邊形法則', '兩個向量從同一點出發，對角線是向量和。', grid(80,230,30,16,6) + axes(80,230,620,45) + arrow(150,200,320,130,'primary') + arrow(150,200,250,90,'secondary') + line(320,130,420,20,'guide') + line(250,90,420,20,'guide') + arrow(150,200,420,20,'primary') + t(270,75,'u+v')),
      () => shell(id, '內積、投影與垂直', '投影是向量在另一方向上的分量；內積為 0 時兩個非零向量垂直。', line(90,220,650,220,'axis') + arrow(150,190,500,100,'primary') + line(500,100,500,220,'guide') + arrow(150,190,500,220,'secondary') + t(300,245,'投影') + t(360,90,'原向量') + t(515,160,'垂直分量'))
    ];
    const l16 = [
      () => shell(id, '斜率是 rise 除以 run', '格線上的垂直變化量除以水平變化量得到斜率。', grid(80,230,32,18,6) + axes(80,230,660,45) + line(160,190,320,95,'primary') + line(160,190,320,190,'secondary') + line(320,190,320,95,'secondary') + t(220,210,'run') + t(330,145,'rise') + t(190,120,'m>0')),
      () => shell(id, '兩點求直線', '由兩點先求斜率，再用其中一點寫點斜式。', grid(80,230,32,18,6) + axes(80,230,660,45) + line(180,180,500,80,'primary') + circle(180,180,7,'point') + circle(500,80,7,'point') + t(145,175,'A') + t(510,75,'B') + t(250,120,'m=垂直變化／水平變化')),
      () => shell(id, '平行、垂直、水平、鉛直', '水平線斜率為 0；鉛直線斜率不存在，不能寫成無限大。', rect(45,45,315,195,'panel') + rect(400,45,315,195,'panel') + t(75,80,'平行與垂直') + line(80,160,320,160,'primary') + line(200,210,200,80,'secondary') + t(75,225,'水平：m=0；鉛直：不存在') + t(430,80,'斜率乘積只適用非鉛直線') + line(445,170,665,100,'primary') + line(500,80,610,200,'secondary')),
      () => shell(id, '點到直線的距離', '由點向直線作垂線，最短距離是垂直線段。', grid(80,230,30,18,6) + axes(80,230,650,45) + line(130,210,600,85,'primary') + circle(380,70,8,'accent') + line(380,70,415,135,'wrong') + t(400,115,'垂直距離') + t(365,55,'P'))
    ];
    const l17 = [
      () => shell(id, '圓心、半徑與直徑', '圓周上的每一點到圓心距離相同，直徑是兩倍半徑。', axes(80,230,650,45) + circle(360,145,80,'panel') + circle(360,145,6,'point') + circle(440,145,6,'accent') + line(360,145,440,145,'secondary') + line(280,145,440,145,'primary') + t(325,140,'圓心') + t(390,135,'半徑') + t(325,125,'直徑')),
      () => shell(id, '圓的標準式與位置判斷', '代入座標與圓心距離比較，可判斷點在圓內、圓上或圓外。', circle(300,150,75,'panel') + circle(300,150,6,'point') + circle(300,95,6,'good') + circle(350,150,6,'accent') + circle(410,150,6,'bad') + t(250,175,'圓心') + t(315,90,'圓上') + t(365,175,'圓內') + t(425,175,'圓外')),
      () => shell(id, '半徑垂直切線', '切點處的半徑與切線夾角為 90 度。', circle(250,150,70,'panel') + circle(250,150,6,'point') + circle(315,90,6,'accent') + line(250,150,315,90,'secondary') + line(120,90,440,90,'primary') + t(210,180,'圓心') + t(320,75,'切點') + t(330,115,'90°')),
      () => shell(id, '兩圓的位置關係', '圓心距離與兩半徑比較，可判斷相離、相切或相交。', circle(170,145,55,'panel') + circle(320,145,55,'panel') + circle(500,145,55,'panel') + circle(630,145,55,'panel') + t(120,235,'相離') + t(270,235,'相切') + t(455,235,'相交') + t(585,235,'重合／同心'))
    ];
    const l18 = [
      () => shell(id, '對邊、鄰邊、斜邊', '直角三角形以指定角標示三邊，建立三角比對應。', path('M150 220 L150 80 L410 220 Z','primary') + t(260,235,'鄰邊') + t(115,145,'對邊') + t(265,125,'斜邊') + t(170,195,'θ')),
      () => shell(id, '3-4-5 與特殊角', '3-4-5 三角形與 30、45、60 度的特殊結構提供三角比來源。', path('M80 220 L80 100 L240 220 Z','primary') + t(135,235,'4') + t(55,160,'3') + t(140,150,'5') + path('M400 220 L520 100 L640 220 Z','secondary') + t(495,245,'45°') + t(440,180,'等腰直角')),
      () => shell(id, '仰角與俯角', '視線、水平線與高度形成直角三角形，可估計建築物高度。', line(80,220,680,220,'axis') + line(520,220,520,65,'primary') + line(120,220,520,65,'secondary') + t(90,210,'觀測點') + t(525,60,'建築物') + t(300,185,'仰角 θ') + t(540,145,'高度')),
      () => shell(id, '正弦定理與餘弦定理', '已知邊角可用正弦定理；已知兩邊夾角可用餘弦定理。', path('M100 210 L300 80 L520 210 Z','primary') + t(190,225,'a') + t(390,225,'b') + t(300,65,'c') + t(555,100,'正弦：邊／對角的比相等') + t(555,150,'餘弦：c²=a²+b²−2ab cos C'))
    ];
    const l19 = [
      () => shell(id, '長方體與空間對角線', '長、寬、高組成三維格線；空間對角線再用畢氏定理。', rect(130,95,230,115,'panel') + line(360,95,500,55,'primary') + line(360,210,500,170,'primary') + line(130,95,270,55,'secondary') + line(270,55,500,55,'secondary') + t(210,235,'長、寬、高') + t(410,45,'空間對角線')),
      () => shell(id, '展開圖與表面積', '把長方體展開成矩形面，再逐面相加。', rect(90,105,120,70,'panel') + rect(210,105,120,70,'accent') + rect(330,105,120,70,'panel') + rect(210,35,120,70,'panel') + rect(210,175,120,70,'panel') + t(475,145,'表面積 = 各面面積總和')),
      () => shell(id, '體積填充模型', '底面面積乘高得到柱體體積；圓錐只有相同底高柱體的三分之一。', rect(80,90,180,120,'panel') + line(80,90,80,210,'axis') + t(120,235,'V=lwh') + path('M390 210 L480 70 L570 210 Z','secondary') + t(430,235,'V=⅓πr²h') + t(590,120,'高 h')),
      () => shell(id, '球的半徑與表面積、體積', '同一半徑 r 下，表面積使用平方單位，體積使用立方單位。', circle(210,150,80,'panel') + circle(210,150,6,'point') + line(210,150,290,150,'secondary') + t(225,140,'r') + t(360,110,'球面積：4πr²') + t(360,165,'球體積：4/3πr³') + t(360,220,'長度 cm；面積 cm²；體積 cm³'))
    ];
    const l20 = [
      () => shell(id, '拋物線的焦點與準線', '拋物線上的點到焦點距離等於到準線距離。', line(150,45,150,245,'wrong') + path('M150 145 Q340 20 670 145 Q340 270 150 145','primary') + circle(350,145,7,'accent') + line(350,145,480,95,'secondary') + line(150,145,350,145,'guide') + t(95,62,'準線') + t(360,135,'焦點') + t(495,90,'等距')),
      () => shell(id, '單點透視與消失點', '平行於觀看方向的線，在圖上向消失點收斂。', line(380,55,380,245,'secondary') + line(90,230,380,55,'primary') + line(670,230,380,55,'primary') + line(130,180,380,55,'guide') + line(630,180,380,55,'guide') + circle(380,55,7,'accent') + t(395,58,'消失點') + t(85,255,'近端') + t(610,255,'遠端')),
      () => shell(id, '近端與遠端的比例縮放', '同樣的實際長度，在遠處的圖上長度較短；比例必須先定義。', rect(70,80,250,120,'panel') + rect(460,120,120,80,'accent') + arrow(320,140,430,140,'secondary') + t(105,65,'近端：圖上較長') + t(455,105,'遠端：圖上較短') + t(180,225,'實際長度相同')),
      () => shell(id, '模型假設與模型限制', '透視模型要標示觀看方向與平行線；模型只在假設成立的範圍內有效。', rect(60,55,300,180,'good') + rect(400,55,300,180,'bad') + t(90,88,'模型假設') + t(90,135,'平行線、同一畫面、') + t(90,170,'固定觀看方向') + t(430,88,'模型限制') + t(430,135,'遮擋、彎曲道路、') + t(430,170,'不同視角會破壞比例'))
    ];
    const groups = [l02,l03,l04,l05,l06,l07,l08,l09,l10,l11,l12,l13,l14,l15,l16,l17,l18,l19,l20];
    const all = [f,l02,l03,l04,l05,l06,l07,l08,l09,l10,l11,l12,l13,l14,l15,l16,l17,l18,l19,l20];
    return all[index - 1] || f;
  }

  window.renderVisualModule = function (entry, lessonId, position) {
    const id = entry.id;
    const renderer = lessonVisual(id, lessonId)[position] || (() => shell(id, entry.title, entry.teachingGoal, rect(55,55,300,170,'panel') + rect(405,55,300,170,'good') + t(85,95,'原始模型') + t(435,95,'數學結果') + arrow(245,140,405,140,'secondary') + t(115,165,'把數值變化連回圖形', 'small')));
    const visual = typeof renderer === 'function' ? renderer() : renderer;
    return `<article class="visual-module visual-role-${esc(entry.role)}" data-visual-id="${esc(id)}" data-lesson-id="${lessonId}" data-visual-role="${esc(entry.role)}"><figure class="beginner-visual"><figcaption>${esc(entry.title)}｜${esc(entry.role)}</figcaption>${visual}<p class="visual-purpose">${esc(entry.teachingGoal)}</p></figure></article>`;
  };

  window.renderLessonVisualModules = function (lessonId) {
    const data = window.MATH_VISUAL_REGISTRY && window.MATH_VISUAL_REGISTRY.lessons[lessonId];
    if (!data) return '';
    return `<article class="single-unit-card visual-unit visual-module-set"><h3>看圖建立模型</h3><p>${esc(data.title)}：每張圖只承擔一個可驗證的數學教學任務。</p>${data.modules.map((entry, position) => window.renderVisualModule(entry, lessonId, position)).join('')}</article>`;
  };
})();
