// Shared observation station: production and approved prototype use the same implementation.
export function initObservationStation() {
const station = document.querySelector('#station');
if (!station) return;
const extra = document.querySelector('#readout-extra');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const buttons = [...document.querySelectorAll('[data-observation]')];
const modes = {
  water: { index: '01 / WATER OBSERVATION', title: '靠近水碗，故事才剛開始。', description: '飲水位置、個別習慣與飲食背景，一起構成觀察的起點。點選觀察站，看見不同線索如何串連；畫面中的水波僅為示意。', link: 'water.html', linkText: '進入「飲水的秘密」', tokens: ['飲水位置', '個別習慣', '飲食背景'] },
  ai: { index: '02 / MACHINE VISION', title: '看見貓咪，也看懂觀察的邊界。', description: 'YOLOv8n 定位貓咪，PetFace 協助身分辨識，再結合手動 ROI 與持續時間條件判定飲水事件。這裡的掃描、定位點與框線都是視覺模擬，沒有執行模型。', link: 'technology.html', linkText: '探索「AI 的眼睛」', tokens: ['YOLOv8n：貓咪偵測', 'PetFace：身分辨識', '手動 ROI ＋持續時間'] },
  trend: { index: '03 / EVERYDAY PATTERNS', title: '把日常連起來，才看得見變化。', description: '切換兩隻示範貓，看看同一週的飲水事件紀錄。事件次數不等於飲水量，也不能單獨用來判斷健康；應連同飲食、行為與照護紀錄一起觀察。', link: 'health.html', linkText: '走進「健康的線索」' }
};
function node(tag, text, className) {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
}
function svgNode(tag, attributes) {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
  return element;
}
function renderTrend() {
  const records = { a: [3, 4, 2, 5, 4, 6, 5], b: [5, 4, 5, 3, 4, 3, 4] };
  const controls = node('div', undefined, 'sample-controls');
  const label = node('label', '選擇示範貓'); label.htmlFor = 'prototype-cat';
  const select = node('select'); select.id = 'prototype-cat';
  for (const [value, text] of [['a', '示範貓 A'], ['b', '示範貓 B']]) {
    const option = node('option', text); option.value = value; select.append(option);
  }
  controls.append(label, select, node('span', '虛構示範資料 · 單位：事件次數'));
  const chart = svgNode('svg', { viewBox: '0 0 600 190', role: 'img', class: 'sample-chart', 'aria-label': '一週示範飲水事件趨勢；完整數值見下方資料表' });
  const summary = node('p', undefined, 'sample-summary'); summary.setAttribute('aria-live', 'polite');
  const details = node('details', undefined, 'sample-details');
  details.append(node('summary', '查看完整示範數據'));
  const table = node('table');
  const caption = node('caption', '虛構示範資料，非實際監測結果'); table.append(caption);
  const head = node('thead'); const row = node('tr');
  for (const text of ['日期', '事件次數']) { const th = node('th', text); th.scope = 'col'; row.append(th); }
  head.append(row); const body = node('tbody'); table.append(head, body); details.append(table);
  function update() {
    const values = records[select.value]; chart.replaceChildren(); body.replaceChildren();
    for (const y of [35, 85, 135]) chart.append(svgNode('path', { d: `M30 ${y}H570`, class: 'sample-grid' }));
    const points = values.map((value, i) => [30 + i * 90, 155 - value * 20]);
    const path = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');
    chart.append(svgNode('path', { d: `${path} L570 155 L30 155Z`, class: 'sample-area' }), svgNode('path', { d: path, class: 'sample-line' }));
    points.forEach(([x, y], i) => {
      chart.append(svgNode('circle', { cx: x, cy: y, r: 5, class: 'sample-point' }));
      const text = svgNode('text', { x, y: 181, 'text-anchor': 'middle' }); text.textContent = `日 ${i + 1}`; chart.append(text);
      const tr = node('tr'); tr.append(node('td', `第 ${i + 1} 天`), node('td', String(values[i]))); body.append(tr);
    });
    summary.textContent = `${select.selectedOptions[0].textContent}：七天共 ${values.reduce((a, b) => a + b, 0)} 次示範事件。此資料不能用於醫療判讀。`;
    const mini = values.map((value, i) => `${i ? 'L' : 'M'}${8 + i * 28} ${100 - value * 12}`).join(' ');
    document.querySelector('#scene-trend-line').setAttribute('d', mini);
    const endpoint = document.querySelector('.trend-device circle'); endpoint.setAttribute('cx', '176'); endpoint.setAttribute('cy', String(100 - values[6] * 12));
  }
  select.addEventListener('change', update);
  extra.append(controls, chart, summary, details); update();
}
function setMode(mode) {
  const data = modes[mode]; station.dataset.mode = mode;
  for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.observation === mode));
  document.querySelector('#readout-index').textContent = data.index;
  document.querySelector('#readout-title').textContent = data.title;
  document.querySelector('#readout-description').textContent = data.description;
  const link = document.querySelector('#readout-link'); link.href = data.link; link.textContent = `${data.linkText} ↗`;
  extra.replaceChildren();
  if (mode === 'trend') renderTrend();
  else { const list = node('ul', undefined, 'reading-tokens'); for (const token of data.tokens) list.append(node('li', token)); extra.append(list); }
}
buttons.forEach(button => button.addEventListener('click', () => setMode(button.dataset.observation)));
setMode('water');

let frame = 0;
let pointerX = 0, pointerY = 0;
const root = document.documentElement;
function resetMotion() {
  root.style.setProperty('--scene-x', '0px'); root.style.setProperty('--scene-y', '0px'); root.style.setProperty('--scroll-shift', '0px');
}
function scheduleScene() {
  if (motion.matches || frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    const bounds = station.getBoundingClientRect();
    if (bounds.bottom < 0 || bounds.top > innerHeight) return;
    root.style.setProperty('--scene-x', `${pointerX}px`); root.style.setProperty('--scene-y', `${pointerY}px`);
    root.style.setProperty('--scroll-shift', `${Math.min(14, scrollY * .025)}px`);
  });
}
station.addEventListener('pointermove', event => {
  if (event.pointerType !== 'mouse' || motion.matches) return;
  const box = station.getBoundingClientRect();
  pointerX = ((event.clientX - box.left) / box.width - .5) * 16;
  pointerY = ((event.clientY - box.top) / box.height - .5) * 10; scheduleScene();
});
station.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; scheduleScene(); });
addEventListener('scroll', scheduleScene, { passive: true });
motion.addEventListener('change', () => {
  if (motion.matches) { cancelAnimationFrame(frame); frame = 0; resetMotion();  }
});

}
