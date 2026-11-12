import { topics } from './topics.js';
import { svg } from './dom.js';

const presets = {
  water: { name: '飲水的秘密', tone: 'aqua', symbol: 'drop' },
  environment: { name: '貓咪的世界', tone: 'apricot', symbol: 'home' },
  technology: { name: 'AI 的眼睛', tone: 'lavender', symbol: 'scan' },
  health: { name: '健康的線索', tone: 'leaf', symbol: 'chart' },
};
export function exhibitFor(topic) {
  const position = Object.keys(topics).indexOf(topic.id);
  const index = position < 0 ? Object.keys(topics).length : position;
  const tones = ['aqua', 'apricot', 'lavender', 'leaf'];
  const data = { name: topic.navTitle, tone: tones[index % tones.length], symbol: 'scan', ...presets[topic.id], ...topic.exhibit };
  if (!tones.includes(data.tone)) data.tone = tones[index % tones.length];
  const orders = [['lead', 'gallery', 'wide'], ['wide', 'lead', 'gallery'], ['gallery', 'wide', 'lead']];
  return { ...data, number: String(index + 1).padStart(2, '0'), layouts: orders[index % orders.length] };
}
const paths = {
  drop: 'M32 7C25 19 14 30 14 40a18 18 0 0 0 36 0C50 30 39 19 32 7ZM23 39c0 6 4 10 9 10',
  home: 'M8 29 32 9l24 20M15 24v31h34V24M26 55V38h12v17',
  scan: 'M8 23V9h14M42 9h14v14M56 41v14H42M22 55H8V41M21 27l2-9 8 5 9-5 3 9v14c-5 8-17 8-22 0ZM26 33h1M37 33h1M29 41h6',
  chart: 'M10 10v44h45M16 42l11-12 10 7 15-20M44 17h8v8',
  brand: 'M12 45V17l12 8 8-10 8 10 12-8v28c-9 10-31 10-40 0ZM22 35h2M40 35h2M29 43h6',
};
export function icon(kind = 'scan', className = '') {
  const graphic = svg('svg', { viewBox: '0 0 64 64', class: `exhibit-icon ${className}`, 'aria-hidden': 'true', focusable: 'false', fill: 'none', stroke: 'currentColor', 'stroke-width': 2.4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  graphic.append(svg('path', { d: paths[kind] || paths.scan }));
  return graphic;
}
