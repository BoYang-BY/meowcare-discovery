import { topics } from './topics.js';
import { el, link, button } from './dom.js';
import { icon, exhibitFor } from './visuals.js';

export function initSite(active = '') {
  const header = document.querySelector('[data-site-header]');
  if (header) {
    const inner = el('div', 'container header-inner');
    const brand = link('', 'index.html', 'brand');
    brand.setAttribute('aria-label', 'MeowCare Discovery 貓咪智慧照護互動展覽館首頁');
    const wordmark = el('span', 'brand-name', 'MeowCare');
    wordmark.append(el('span', 'brand-discovery', 'DISCOVERY'));
    const glyph = el('span', 'brand-glyph', 'm↗'); glyph.setAttribute('aria-hidden', 'true');
    brand.append(glyph, wordmark);
    const nav = el('nav', 'main-nav'); nav.id = 'main-nav'; nav.setAttribute('aria-label', '展館主要導覽');
    const home = link('展館入口', 'index.html');
    if (active === 'home') home.setAttribute('aria-current', 'page');
    nav.append(home);
    for (const topic of Object.values(topics)) {
      const exhibit = exhibitFor(topic);
      const a = link(exhibit.name, topic.href);
      if (active === topic.id) { a.setAttribute('aria-current', 'page'); a.dataset.tone = exhibit.tone; }
      nav.append(a);
    }
    const toggle = button('導覽 ＋', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'), 'menu-toggle');
    toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-controls', nav.id);
    function setOpen(open) { toggle.setAttribute('aria-expanded', String(open)); toggle.textContent = open ? '關閉 －' : '導覽 ＋'; header.classList.toggle('menu-open', open); }
    header.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); } });
    inner.append(brand, nav, toggle); header.replaceChildren(inner);
  }
  const footer = document.querySelector('[data-site-footer]');
  if (footer) {
    const inner = el('div', 'container footer-inner');
    const title = el('div'); title.append(el('p', 'footer-brand', 'MeowCare Discovery'), el('p', 'footer-tagline', '貓咪智慧照護互動展覽館'));
    const nav = el('nav', 'footer-nav'); nav.setAttribute('aria-label', '展區頁尾導覽');
    for (const topic of Object.values(topics)) { const exhibit = exhibitFor(topic); nav.append(link(`${exhibit.number} / ${exhibit.name}`, topic.href)); }
    inner.append(title, nav);
    const bottom = el('div', 'container footer-bottom');
    bottom.append(el('p', '', '觀察日常，探索更好的陪伴。'), link('回到頂端 ↑', '#main'));
    footer.replaceChildren(inner, bottom, el('p', 'container footer-notice', '本站提供一般教育與專題架構展示，不取代獸醫診療。令人擔憂的症狀請諮詢獸醫。'));
  }
}
