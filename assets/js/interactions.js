import { el, button, svg, photo } from './dom.js';
import { icon } from './visuals.js';
import { animateChange } from './animations.js';

function controls(label) {
  const group = el('div', 'segmented');
  group.setAttribute('role', 'group');
  group.setAttribute('aria-label', label);
  return group;
}
function selectButton(text, value, handler) {
  const node = button(text, handler, 'choice');
  node.dataset.value = value;
  return node;
}
function setSelected(group, value) {
  for (const node of group.querySelectorAll('button')) node.setAttribute('aria-pressed', String(node.dataset.value === value));
}
function status() {
  const node = el('p', 'demo-status');
  node.setAttribute('role', 'status');
  node.setAttribute('aria-live', 'polite');
  return node;
}
function roomBase() {
  const room = el('div', 'room-plan');
  room.setAttribute('role', 'img');
  room.setAttribute('aria-label', '概念平面圖：客廳在左，休息區在右，中央有通道，下方有進出口');
  room.append(el('span', 'room-title room-living', 'LIVING / 客廳'), el('span', 'room-title room-rest', 'REST / 休息區'), el('span', 'room-door', '進出口'));
  const sofa = el('div', 'room-sofa', '沙發');
  const bed = el('div', 'room-bed', '休息處');
  room.append(sofa, bed);
  return room;
}
function resourceMap(root) {
  let mode = 'clustered';
  const group = controls('飲水配置模式');
  const diagram = roomBase();
  const explanation = status();
  const points = el('div', 'map-points');
  // Interactive children need a group, not an image role which can hide buttons.
  diagram.setAttribute('role', 'group');
  diagram.setAttribute('aria-label', '飲水配置概念平面圖，選擇水碗查看接近路線');
  const route = svg('svg', { viewBox: '0 0 100 100', preserveAspectRatio: 'none', class: 'resource-route', 'aria-hidden': 'true' });
  diagram.append(route, points);
  const bowlReadout = status(); bowlReadout.classList.add('bowl-readout');
  bowlReadout.id = 'bowl-readout';
  let activeBowl = 0;
  const bowls = [];
  for (let index = 0; index < 3; index++) {
    const bowl = button(`水 ${index + 1}`, () => { activeBowl = index; renderBowl(); }, 'water-point');
    bowl.setAttribute('aria-controls', bowlReadout.id); bowl.setAttribute('aria-label', `觀察水碗 ${index + 1} 的接近路線`);
    bowl.append(icon('drop', 'water-drop')); bowls.push(bowl); points.append(bowl);
  }
  function positions() { return mode === 'clustered' ? [[20, 68], [42, 68], [64, 68]] : [[20, 48], [79, 45], [43, 77]]; }
  function renderBowl() {
    bowls.forEach((bowl, index) => bowl.setAttribute('aria-pressed', String(index === activeBowl)));
    const [x, y] = positions()[activeBowl];
    route.replaceChildren(svg('path', { d: `M42 100 L42 80 L${x} ${y}`, class: 'route-track' }), svg('circle', { cx: x, cy: y, r: 3 }));
    const clues = mode === 'clustered'
      ? ['靠近客廳左側，但仍需觀察進入同一區域時是否有等待。', '與其他水碗共享接近區域；多一個碗不等於多一條路。', '靠近兩區交界，留意通道附近是否容易被占據。']
      : ['客廳內的獨立位置，觀察家具是否影響靠近與離開。', '休息區的另一個選擇，確認通路與房門在日常可通行。', '接近入口的選擇，留意人流與個別貓咪是否願意使用。'];
    bowlReadout.textContent = `水碗 ${activeBowl + 1}｜${clues[activeBowl]} 虛線只示意一條接近路線，不代表實際移動軌跡。`;
  }
  function render() {
    setSelected(group, mode);
    diagram.dataset.layout = mode;
    positions().forEach(([x, y], index) => {
      const bowl = bowls[index];
      bowl.style.left = `${x}%`; bowl.style.top = `${y}%`;
    });
    explanation.textContent = mode === 'clustered'
      ? '集中配置：三個水碗靠近同一區域，可能仍需共用接近路線。觀察是否有等待或阻擋，不能只看碗的數量。'
      : '分散配置：三個示意飲水點位於不同位置，提供多種接近選擇。仍須觀察實際使用，不能保證消除競爭。';
    renderBowl();
  }
  for (const [value, label] of [['clustered', '集中擺放'], ['distributed', '分散配置']]) group.append(selectButton(label, value, () => { mode = value; render(); }));
  const layout = el('div', 'demo-split');
  const aside = el('div', 'demo-aside');
  aside.append(el('span', 'mini-label', 'TRY A DIFFERENT ARRANGEMENT'), el('h3', '', '碗的數量之外，\n看見空間的選擇。'), explanation, bowlReadout, el('p', 'fine-print', '切換配置後，還可以點選水 1／水 2／水 3。位置並非尺寸或距離建議。'));
  layout.append(diagram, aside);
  root.append(group, layout);
  render();
}
function spaceExplorer(root) {
  const locations = [
    { id: 'retreat', name: '安全休息', x: 79, y: 32, title: '有地方躲，也有路離開。', text: '觀察休息處的出入口是否容易被其他貓擋住。單一入口旁若常有等待，可記下互動再討論調整。高度也要符合個別活動能力。' },
    { id: 'water', name: '飲水位置', x: 23, y: 53, title: '把選擇分散在空間裡。', text: '飲水與食物分開，並保留不同位置的選擇。不要只在同一角落排更多碗；觀察每隻貓能否自在靠近。' },
    { id: 'route', name: '通行動線', x: 51, y: 77, title: '一條路，可能是共同的瓶頸。', text: '留意門、家具和另一隻貓的位置是否擋住通路。記錄繞路與退讓，不強迫貓咪通過，也不單憑示意圖推論壓力。' },
  ];
  const room = roomBase();
  room.setAttribute('role', 'group');
  room.setAttribute('aria-label', '互動空間觀察點');
  const panel = el('div', 'demo-aside hotspot-panel');
  panel.setAttribute('aria-live', 'polite');
  const buttons = [];
  const scenes = controls('生活情境切換');
  const sceneDescription = status(); sceneDescription.classList.add('scene-description');
  const obstruction = el('span', 'room-obstacle'); obstruction.setAttribute('aria-hidden', 'true'); room.append(obstruction);
  const sceneData = [
    { id: 'shared', label: '共用通道', focus: 'route', text: '共用通道情境（示意）：資源可能共用同一段路。留意是否有等待、繞路或退讓，不從平面圖直接判斷壓力。' },
    { id: 'separated', label: '分散資源', focus: 'water', text: '分散資源情境（示意）：提供不同位置與接近路線。仍需觀察每隻貓實際使用的情況，不能保證消除競爭。' },
    { id: 'resting', label: '安靜休息', focus: 'retreat', text: '安靜休息情境（示意）：把注意力放在休息位置、出入口與活動能力。觀察是否容易到達，也能從容離開。' },
  ];
  function render(item) {
    for (const node of buttons) node.setAttribute('aria-pressed', String(node.dataset.value === item.id));
    panel.replaceChildren(el('span', 'mini-label', 'EXPLORE THE SPACE'), el('h3', '', item.title), el('p', '', item.text), el('p', 'fine-print', '用 Tab 移動至觀察點，按 Enter 或空白鍵展開。'));
    animateChange(panel);
  }
  for (const item of locations) {
    const node = selectButton(item.name, item.id, () => render(item));
    node.className = 'hotspot'; node.style.left = `${item.x}%`; node.style.top = `${item.y}%`;
    buttons.push(node); room.append(node);
  }
  const layout = el('div', 'demo-split');
  function renderScene(scene) {
    room.dataset.scene = scene.id;
    setSelected(scenes, `scene-${scene.id}`);
    sceneDescription.textContent = scene.text;
    render(locations.find(item => item.id === scene.focus));
  }
  for (const scene of sceneData) scenes.append(selectButton(scene.label, `scene-${scene.id}`, () => renderScene(scene)));
  layout.append(room, panel); root.append(scenes, sceneDescription, layout);
  renderScene(sceneData[0]);
}

const pipelineSteps = [
  { title: 'YOLOv8n 偵測', short: '定位', detail: '先找到畫面中的貓。框線代表位置概念，不代表已辨識個體，更不代表正在喝水。', label: 'DETECTION / 示意偵測框' },
  { title: 'PetFace 身分', short: '辨識', detail: '將臉部特徵與個體資料連結。側臉、遮擋或陌生貓應保留未知身分，等待人工覆核。', label: 'IDENTITY / 示意身分特徵' },
  { title: 'ROI ＋ 持續時間', short: '條件', detail: '專題以手動區域及持續時間判定候選事件。下方可調參數只展示規則，不是實際專題門檻。', label: 'ROI / 手動區域概念示意' },
  { title: '歷史與趨勢', short: '回看', detail: '整理個體、時間與候選事件，供之後回看。記錄次數不等於毫升數，也不能直接評估健康。', label: 'HISTORY / 整理待覆核的事件' },
];
function rangeControl(id, labelText, initial, min, max, callback) {
  const wrap = el('div', 'range-control');
  const label = el('label', '', labelText); label.htmlFor = id;
  const output = el('output', '', `${initial} 秒`); output.htmlFor = id;
  const input = el('input'); input.id = id; input.type = 'range'; input.min = min; input.max = max; input.value = initial;
  input.addEventListener('input', () => { output.textContent = `${input.value} 秒`; callback(); });
  wrap.append(label, output, input);
  return { wrap, input };
}
function aiPipeline(root, { compact = false } = {}) {
  let step = 0;
  const steps = controls('技術流程步驟'); steps.classList.add('pipeline-steps');
  const scene = el('div', 'vision-scene');
  scene.append(photo({ src: 'assets/images/cat-portrait.jpg', alt: '示意照片：黑白貓，沒有進行模型推論' }));
  const frame = el('div', 'detection-frame');
  let beam;
  const annotation = el('span', 'vision-label');
  scene.append(frame, annotation);
  const detail = el('div', 'pipeline-detail'); detail.setAttribute('aria-live', 'polite');
  function renderStep() {
    setSelected(steps, String(step));
    scene.dataset.step = step;
    annotation.textContent = pipelineSteps[step].label;
    detail.replaceChildren(el('span', 'mini-label', `STEP 0${step + 1}`), el('h3', '', pipelineSteps[step].title), el('p', '', pipelineSteps[step].detail));
    if (step === 3) {
      const record = el('dl', 'event-preview');
      for (const [key, value] of [['資料來源', '前端示範，非模型輸出'], ['個體欄位', '芝麻（示範貓名）'], ['事件類型', '候選飲水事件'], ['覆核狀態', '待人工確認']]) record.append(el('dt', '', key), el('dd', '', value));
      detail.append(record);
    }
    beam?.remove(); beam = el('span', 'scan-beam'); frame.append(beam);
    animateChange(detail);
  }
  pipelineSteps.forEach((item, index) => steps.append(selectButton(`0${index + 1} ${item.short}`, String(index), () => { step = index; renderStep(); })));
  const split = el('div', 'demo-split'); split.append(scene, detail);
  if (compact) { root.append(steps, split); renderStep(); return; }
  const form = el('div', 'event-rule');
  form.append(el('h3', '', '調整條件，看候選事件如何改變'));
  const switches = el('div', 'rule-switches');
  const roiLabel = el('label', 'check-label');
  const roi = el('input'); roi.type = 'checkbox'; roi.id = 'roi-inside'; roi.checked = true;
  roiLabel.append(roi, document.createTextNode('位於手動 ROI 內（模擬）'));
  const identityLabel = el('label', '', '身分狀態'); identityLabel.htmlFor = 'identity-status';
  const identity = el('select'); identity.id = 'identity-status';
  for (const [value, text] of [['known', '已確認個體（模擬）'], ['unknown', '未知／待覆核']]) { const option = el('option', '', text); option.value = value; identity.append(option); }
  const selectWrap = el('div'); selectWrap.append(identityLabel, identity);
  switches.append(roiLabel, selectWrap);
  const result = status(); result.id = 'event-result';
  let dwell; let threshold;
  function evaluate() {
    const enough = Number(dwell.input.value) >= Number(threshold.input.value);
    let message;
    if (!roi.checked) message = '未形成候選事件：模擬位置不在 ROI 內。';
    else if (identity.value === 'unknown') message = '待人工覆核：身分尚未確認，不指派給既有貓咪。';
    else if (!enough) message = '未形成候選事件：模擬持續時間尚未達示範門檻。';
    else message = '形成候選事件（模擬）：符合這組條件，仍需回看；不代表已確認飲水。';
    result.textContent = message;
    result.dataset.candidate = String(roi.checked && identity.value === 'known' && enough);
  }
  dwell = rangeControl('dwell-seconds', '持續時間（示範）', 5, 0, 12, evaluate);
  threshold = rangeControl('threshold-seconds', '判定門檻（示範）', 3, 1, 10, evaluate);
  roi.addEventListener('change', evaluate); identity.addEventListener('change', evaluate);
  const ranges = el('div', 'range-grid'); ranges.append(dwell.wrap, threshold.wrap);
  form.append(switches, ranges, result);
  root.append(steps, split, form);
  renderStep(); evaluate();
}

// Deliberately fabricated educational data. No patient, device or model output.
const trendData = {
  sesame: { name: '芝麻', counts: [4, 5, 4, 6, 5, 5, 4, 5, 6, 5, 4, 5, 6, 5] },
  orange: { name: '橘子', counts: [3, 4, 3, 3, 4, 5, 4, 3, 4, 5, 6, 5, 7, 6] },
};
function trendChart(root) {
  let selected = 'sesame'; let days = 7;
  const toolbar = el('div', 'chart-toolbar');
  const cats = controls('示範貓咪');
  for (const [id, cat] of Object.entries(trendData)) cats.append(selectButton(cat.name, id, () => { selected = id; render(); }));
  const periodWrap = el('div', 'period-control');
  const label = el('label', '', '觀察區間'); label.htmlFor = 'trend-period';
  const period = el('select'); period.id = 'trend-period';
  for (const number of [7, 14]) { const option = el('option', '', `${number} 天`); option.value = number; period.append(option); }
  period.addEventListener('change', () => { days = Number(period.value); render(); });
  periodWrap.append(label, period); toolbar.append(cats, periodWrap);
  const chart = el('div', 'trend-visual');
  const summary = status(); summary.id = 'chart-summary';
  const details = el('details', 'data-details'); details.append(el('summary', '', '逐日資料表（同一組模擬數據）'));
  const table = el('table', 'data-table'); const caption = el('caption', '', '每日候選飲水事件｜完全模擬資料');
  const head = el('thead'); const tr = el('tr');
  for (const name of ['示範日期', '貓咪', '候選事件（次）']) { const th = el('th', '', name); th.scope = 'col'; tr.append(th); }
  head.append(tr); const body = el('tbody'); table.append(caption, head, body); details.append(table);
  function render() {
    setSelected(cats, selected);
    const cat = trendData[selected]; const values = cat.counts.slice(-days);
    const dates = values.map((_, index) => `10/${String(15 - days + index).padStart(2, '0')}`);
    const graph = svg('svg', { viewBox: '0 0 800 280', role: 'img', 'aria-labelledby': 'trend-title trend-desc' });
    graph.append(svg('title', { id: 'trend-title' }, `${cat.name} ${days} 天模擬候選事件`), svg('desc', { id: 'trend-desc' }, `每日次數依序為 ${values.join('、')}。可展開下方資料表讀取。`));
    for (const tick of [0, 2, 4, 6, 8]) {
      const y = 224 - tick * 22;
      graph.append(svg('line', { x1: 48, x2: 772, y1: y, y2: y, class: 'chart-grid' }), svg('text', { x: 24, y: y + 5, class: 'chart-text' }, tick));
    }
    const coords = values.map((value, index) => [56 + index * (700 / (days - 1)), 224 - value * 22]);
    graph.append(svg('path', { d: `M ${coords.map(pair => pair.join(',')).join(' L ')} L 756,224 L 56,224 Z`, class: 'chart-area' }), svg('polyline', { points: coords.map(pair => pair.join(',')).join(' '), class: 'chart-line', fill: 'none' }));
    coords.forEach(([x, y], index) => { const point = svg('circle', { cx: x, cy: y, r: 5, class: 'chart-dot' }); point.append(svg('title', {}, `${dates[index]}：${values[index]} 次（模擬）`)); graph.append(point); });
    for (const index of [0, Math.floor((days - 1) / 2), days - 1]) graph.append(svg('text', { x: coords[index][0], y: 260, 'text-anchor': 'middle', class: 'chart-text' }, dates[index]));
    chart.replaceChildren(el('p', 'chart-unit', '每日候選事件數（次） · 2026 年 10 月示範日期'), graph);
    animateChange(chart);
    summary.textContent = `${cat.name}｜${days} 天共 ${values.reduce((a, b) => a + b, 0)} 次候選事件（模擬）。這不是飲水量、正常範圍或健康評分。`;
    body.replaceChildren();
    values.forEach((value, index) => { const row = el('tr'); row.append(el('td', '', `2026/${dates[index]}`), el('td', '', cat.name), el('td', '', String(value))); body.append(row); });
  }
  root.append(toolbar, chart, summary, details);
  const checklist = el('fieldset', 'prep-checklist'); checklist.append(el('legend', '', '就醫資訊準備清單'));
  const completion = status();
  const checks = [];
  for (const text of ['整理變化開始的時間', '記下食物與用藥變動', '整理食慾、排尿與精神觀察', '帶現有照片或筆記，不延後就醫']) {
    const label = el('label', 'check-label'); const input = el('input'); input.type = 'checkbox'; checks.push(input);
    input.addEventListener('change', () => { completion.textContent = `已整理 ${checks.filter(c => c.checked).length} / ${checks.length} 項。此清單不判斷病情，也不儲存或傳送資料。`; });
    label.append(input, document.createTextNode(text)); checklist.append(label);
  }
  completion.textContent = '已整理 0 / 4 項。清單僅在此頁暫時勾選，不儲存或傳送資料。';
  checklist.append(completion); root.append(checklist);
  render();
}

export const interactionRegistry = {
  'resource-map': resourceMap,
  'space-explorer': spaceExplorer,
  'ai-pipeline': aiPipeline,
  'trend-chart': trendChart,
};
export function mountInteraction(type, root, options = {}) {
  const mount = interactionRegistry[type];
  if (mount) mount(root, options);
  else root.append(el('p', 'demo-status', '此互動類型尚未支援，請先閱讀本頁的文字說明。'));
}
