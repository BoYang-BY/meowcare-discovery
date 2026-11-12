import { topics } from './topics.js';
import { el, link, photo, svg } from './dom.js';
import { exhibitFor, icon } from './visuals.js';

const doorNames = { drop: 'water', home: 'space', scan: 'ai', chart: 'health' };
const descriptions = {
  drop: '從水碗位置，讀懂日常習慣。', home: '給每一隻貓，自在的選擇。',
  scan: '從定位、辨識，到連結事件。', chart: '讓零散的觀察，變成有脈絡的關心。'
};
export function exhibitArt(symbol) {
  const art = el('div', `door-art ${doorNames[symbol] || 'ai'}-art`);
  art.setAttribute('aria-hidden', 'true');
  if (symbol === 'chart') {
    const graphic = svg('svg', { viewBox: '0 0 260 180' });
    graphic.append(svg('path', { d: 'M0 150 42 105 84 130 126 60 168 80 210 28 260 0' }), svg('circle', { cx: 210, cy: 28, r: 9 })); art.append(graphic);
  } else {
    for (let i = 0; i < 3; i++) art.append(el('i'));
    if (symbol === 'scan') art.append(el('span', '', 'LOCATE\nIDENTIFY\nCONNECT'));
  }
  return art;
}
export function renderExhibitEntrances(root) {
  if (!root) return;
  root.replaceChildren();
  Object.values(topics).forEach((topic, index) => {
    const exhibit = exhibitFor(topic);
    const door = link('', topic.href, `exhibit-door door-${doorNames[exhibit.symbol] || 'ai'}${index > 3 ? ' door-extension' : ''}`);
    door.dataset.topic = topic.id; door.dataset.tone = exhibit.tone; door.dataset.enter = '';
    const number = el('span', 'door-number', exhibit.number); number.setAttribute('aria-hidden', 'true');
    const arrow = el('span', 'door-arrow', '↗'); arrow.setAttribute('aria-hidden', 'true');
    door.append(el('span', 'door-overline', `EXHIBIT ${exhibit.number} / ${topic.englishTitle}`), number, el('h3', '', exhibit.name), el('p', '', descriptions[exhibit.symbol] || topic.intro), exhibitArt(exhibit.symbol), arrow, el('span', 'door-hint', '進入展區'));
    root.append(door);
  });
}
// The same scene is themed through tokens; topic content stays in topics.js.
export function createExhibitScene(topic, exhibit) {
  const scene = el('div', 'exhibit-installation');
  scene.setAttribute('aria-label', `${exhibit.name}：選擇觀察線索，前往對應章節`);
  const orbit = el('div', 'installation-orbits'); orbit.setAttribute('aria-hidden', 'true'); orbit.append(el('i'), el('i'), el('i'));
  const numeral = el('span', 'installation-number', exhibit.number); numeral.setAttribute('aria-hidden', 'true');
  const image = el('div', 'installation-photo'); image.append(photo(topic.image, '', true));
  const motif = el('div', 'installation-motif'); motif.append(exhibitArt(exhibit.symbol), icon(exhibit.symbol)); motif.setAttribute('aria-hidden', 'true');
  const controls = el('nav', 'installation-observations'); controls.setAttribute('aria-label', '展區觀察線索');
  topic.sections.slice(0, 3).forEach((section, i) => {
    const anchor = link('', `#${section.id}`, 'installation-point');
    anchor.append(el('span', 'installation-node', `0${i + 1}`), el('span', '', section.title.replaceAll('\n', '')), el('span', 'installation-arrow', '↗')); controls.append(anchor);
  });
  scene.append(numeral, orbit, image, motif, controls, el('span', 'installation-caption', 'OBSERVATION FIELD / 日常情境照片與概念圖解，非即時偵測'));
  return scene;
}
