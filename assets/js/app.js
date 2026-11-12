import { initObservationStation } from './observation-station.js';
import { renderExhibitEntrances } from './exhibit-components.js';
import { el, link } from './dom.js';
import { initSite } from './site.js';
import { initAnimations, animateChange } from './animations.js';
import { mountInteraction } from './interactions.js';

initSite('home');
initObservationStation();
renderExhibitEntrances(document.querySelector('#exhibition-floor'));
mountInteraction('ai-pipeline', document.querySelector('#home-ai-demo'), { compact: true });
const perspectives = {
  water: { title: '水碗變空，故事就完整了嗎？', text: '把食物、使用位置與每隻貓的習慣一起看。觀察的起點，是提出更好的問題。', label: '走進飲水的秘密 ↗', href: 'water.html' },
  space: { title: '沒有爭吵，就代表沒有競爭嗎？', text: '一次安靜的等待、一段繞開的通路，也值得放進觀察。讓每隻貓保有各自選擇。', label: '走進貓咪的世界 ↗', href: 'environment.html' },
  record: { title: '數字變了，我們還需要知道什麼？', text: '時間、食物與生活變化，讓紀錄有了背景。帶著事實與獸醫討論，而不是先替牠下結論。', label: '探索健康的線索 ↗', href: 'health.html' },
};
const panel = document.querySelector('#perspective-panel');
for (const control of document.querySelectorAll('[data-perspective]')) control.addEventListener('click', () => {
  for (const item of document.querySelectorAll('[data-perspective]')) item.setAttribute('aria-pressed', String(item === control));
  const item = perspectives[control.dataset.perspective];
  panel.replaceChildren(el('h3', '', item.title), el('p', '', item.text), link(item.label, item.href, 'text-link')); animateChange(panel);
});
initAnimations();
