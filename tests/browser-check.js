import { topics } from '../assets/js/topics.js';
import { articles } from '../assets/js/content.js';
import { interactionRegistry } from '../assets/js/interactions.js';
import { exhibitFor } from '../assets/js/visuals.js';

const results = [];
const report = document.querySelector('#test-report');
const frame = document.createElement('iframe');
frame.title = '自動驗收用頁面';
frame.style.cssText = 'position:absolute;left:-20000px;top:0;width:1440px;height:1000px;border:0';
document.body.append(frame);
const base = new URL('../', import.meta.url);
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
function check(name, passed, detail = '') {
  results.push({ name, passed: Boolean(passed), detail });
}
async function load(path, width = 1440) {
  frame.style.width = `${width}px`;
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error(`頁面逾時：${path}`)), 10000);
    frame.onload = () => { clearTimeout(timeout); resolve(); };
    frame.src = new URL(path, base).href;
  });
  await delay(80);
  const doc = frame.contentDocument;
  for (const image of doc.images) { image.loading = 'eager'; try { await image.decode(); } catch { /* Report below. */ } }
  return doc;
}
async function main() {
  const originalSlugs = ['multi-cat-water-resources', 'observe-drinking-habits', 'dry-and-wet-food', 'reduce-resource-competition', 'daily-health-records', 'changes-in-drinking', 'arrange-cat-water-stations'];
  check('V1 七篇文章保留', originalSlugs.every(id => articles.some(a => a.id === id)) && new Set(articles.map(a => a.id)).size === articles.length);
  const keys = Object.keys(topics);
  for (const [id, topic] of Object.entries(topics)) {
    check(`主題完整格式：${id}`, topic.id === id && topic.intro.length > 30 && topic.sections.length >= 3
      && topic.sections.every(s => s.id && s.title && s.paragraphs.length > 0 && s.paragraphs.every(p => p.length > 20))
      && new Set(topic.sections.map(s => s.id)).size === topic.sections.length && interactionRegistry[topic.interaction.type]
      && topic.scenario.paragraphs.length > 0 && topic.takeaways.length >= 3 && topic.cautions.length > 0
      && topic.sources.length > 0 && topic.sources.every(s => s.title && s.url.startsWith('https://'))
      && topic.relatedArticles.every(slug => articles.some(a => a.id === slug)) && keys.includes(topic.nextTopic));
  }
  const paths = ['index.html', ...Object.values(topics).map(t => t.href), 'topic.html?id=water'];
  for (const path of paths) {
    const doc = await load(path);
    await doc.fonts.ready;
    if (path === 'index.html') {
      const style = frame.contentWindow.getComputedStyle(doc.documentElement);
      const luminance = hex => {
        const channels = hex.trim().replace('#', '').match(/\w\w/g).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
        return .2126 * channels[0] + .7152 * channels[1] + .0722 * channels[2];
      };
      for (const background of ['--mint', '--aqua', '--apricot', '--lavender', '--leaf']) for (const color of ['--ink', '--muted']) {
        const a = luminance(style.getPropertyValue(background)); const b = luminance(style.getPropertyValue(color));
        const ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
        check(`文字對比：${color}/${background}`, ratio >= 4.5, ratio.toFixed(2));
      }
    }
    check(`單一 H1／語言：${path}`, doc.querySelectorAll('h1').length === 1 && doc.documentElement.lang === 'zh-Hant-TW');
    check(`共用導覽／頁尾：${path}`, doc.querySelectorAll('.main-nav a').length === keys.length + 1 && doc.querySelectorAll('.footer-nav a').length === keys.length);
    check(`圖片載入：${path}`, [...doc.images].every(image => image.complete && image.naturalWidth > 0));
    check(`系統繁中字體與無外部樣式：${path}`, frame.contentWindow.getComputedStyle(doc.body).fontFamily.includes('Microsoft JhengHei') && !doc.querySelector('link[rel="stylesheet"][href^="https:"]'));
    check(`JavaScript 錯誤：${path}`, !frame.contentWindow.__meowcareErrors?.length, JSON.stringify(frame.contentWindow.__meowcareErrors || []));
    const topicId = doc.body.dataset.topic || new URL(frame.src).searchParams.get('id');
    const data = topics[topicId];
    if (data) {
      check(`展區名稱與序號：${topicId}`, doc.querySelector('h1').textContent === exhibitFor(data).name && doc.querySelector('.topic-hero .exhibit-sign').textContent.startsWith(`EXHIBIT ${exhibitFor(data).number}`));
      for (const section of data.sections) check(`V2 段落完整保留：${topicId}/${section.id}`, section.paragraphs.every(p => doc.getElementById(section.id).textContent.includes(p)) && section.points.every(p => doc.getElementById(section.id).textContent.includes(p)));
      check(`V2 情境與重點保留：${topicId}`, data.scenario.paragraphs.every(p => doc.querySelector('.scenario-grid').textContent.includes(p)) && data.takeaways.every(p => doc.querySelector('.takeaway-list').textContent.includes(p)));
      check(`V4 主題色與版型：${topicId}`, doc.body.dataset.theme === exhibitFor(data).tone && new Set([...doc.querySelectorAll('.editorial-section')].map(n => n.dataset.layout)).size === 3);
      check(`展區重點完整：${topicId}`, doc.querySelectorAll('.takeaway-item').length === data.takeaways.length);
    }
    for (const width of [320, 390, 768, 1440]) {
      frame.style.width = `${width}px`; await delay(30);
      const available = doc.documentElement.clientWidth;
      check(`無橫向溢出 ${width}px：${path}`, doc.documentElement.scrollWidth <= available, `${doc.documentElement.scrollWidth}/${available}`);
      check(`V4 正文字級 ${width}px：${path}`, parseFloat(frame.contentWindow.getComputedStyle(doc.body).fontSize) >= 18);
      if (width === 1440) check(`V4 桌面標題放大：${path}`, parseFloat(frame.contentWindow.getComputedStyle(doc.querySelector('h1')).fontSize) >= (data ? 52 : 64));
    }
    for (const anchor of doc.querySelectorAll('a[href]')) {
      const url = new URL(anchor.href);
      if (url.origin !== location.origin) {
        check(`外部連結保護：${path}`, anchor.target === '_blank' && anchor.rel.includes('noopener') && anchor.rel.includes('noreferrer'));
        continue;
      }
      const response = await fetch(url);
      check(`內部連結 HTTP：${url.pathname}${url.search}${url.hash}`, response.ok);
      if (url.pathname === frame.contentWindow.location.pathname && !url.search && url.hash) {
        check(`頁內錨點：${path}${url.hash}`, doc.getElementById(decodeURIComponent(url.hash.slice(1))));
      }
    }
  }
  let doc = await load('index.html', 320);
  check('V4 幾何展區入口自動產生', doc.querySelectorAll('.exhibit-door').length === keys.length);
  check('確認原型的中央場景保留', doc.querySelector('.station-cat image') && doc.querySelector('.station-connections') && !doc.querySelector('.hero-portal,.mascot,.sticker,.tape'));
  for (const topic of Object.values(topics)) {
    const entrance = doc.querySelector(`.exhibit-door[data-topic="${topic.id}"]`);
    check(`首頁展區入口：${topic.id}`, entrance?.querySelector('h3').textContent === exhibitFor(topic).name && entrance.getAttribute('href') === topic.href);
  }
  for (const mode of ['ai', 'trend', 'water']) {
    doc.querySelector(`[data-observation="${mode}"]`).click();
    check(`觀察站模式：${mode}`, doc.querySelector('#station').dataset.mode === mode && doc.querySelectorAll('[data-observation][aria-pressed=true]').length === 1 && doc.querySelector('#readout-description').textContent.length > 30);
  }
  doc.querySelector('[data-observation="trend"]').click();
  const cat = doc.querySelector('#prototype-cat');
  const first = doc.querySelector('.sample-summary').textContent;
  cat.value = 'b'; cat.dispatchEvent(new Event('change'));
  check('觀察站趨勢與資料表同步', doc.querySelector('.sample-summary').textContent !== first && doc.querySelectorAll('.sample-details tbody tr').length === 7);
  doc.querySelector('[data-observation="water"]').click();
  for (let step = 0; step < 4; step++) { doc.querySelector(`#home-ai-demo .pipeline-steps [data-value="${step}"]`).click(); check(`首頁 AI 步驟：${step + 1}`, doc.querySelector('#home-ai-demo .vision-scene').dataset.step === String(step)); }
  check('首頁 AI 紀錄欄位示意', doc.querySelector('#home-ai-demo .event-preview').textContent.includes('非模型輸出'));
  for (const control of doc.querySelectorAll('[data-perspective]')) { control.click(); check(`首頁觀點：${control.dataset.perspective}`, control.getAttribute('aria-pressed') === 'true' && doc.querySelector('#perspective-panel a')); }
  const menu = doc.querySelector('.menu-toggle'); menu.click();
  check('手機選單展開', menu.getAttribute('aria-expanded') === 'true' && frame.contentWindow.getComputedStyle(doc.querySelector('.main-nav')).display !== 'none');
  doc.querySelector('.main-nav a').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  check('手機選單 Escape 與焦點', menu.getAttribute('aria-expanded') === 'false' && doc.activeElement === menu);
  doc = await load('water.html');
  for (const mode of ['distributed', 'clustered']) { doc.querySelector(`[data-value="${mode}"]`).click(); check(`飲水配置：${mode}`, doc.querySelector('.room-plan').dataset.layout === mode && doc.querySelectorAll('.water-point').length === 3 && doc.querySelector('.demo-status').textContent.length > 30); }
  for (const bowl of doc.querySelectorAll('.water-point')) { bowl.click(); check('水碗觀察點 '+bowl.textContent, bowl.getAttribute('aria-pressed') === 'true' && doc.querySelector('.bowl-readout').textContent.includes('接近路線')); }
  doc = await load('environment.html');
  for (const scene of ['shared', 'separated', 'resting']) {
    doc.querySelector(`[data-value="scene-${scene}"]`).click();
    check(`環境情境：${scene}`, doc.querySelector('.room-plan').dataset.scene === scene && doc.querySelector('.scene-description').textContent.includes('示意'));
  }
  for (const node of doc.querySelectorAll('.hotspot')) { node.click(); check(`空間熱點：${node.dataset.value}`, node.getAttribute('aria-pressed') === 'true' && doc.querySelector('.hotspot-panel p').textContent.length > 30); }
  doc = await load('technology.html');
  for (let step = 0; step < 4; step++) { doc.querySelector(`.pipeline-steps [data-value="${step}"]`).click(); check(`AI 流程步驟：${step + 1}`, doc.querySelector('.vision-scene').dataset.step === String(step)); }
  check('AI 展區紀錄欄位與覆核狀態', doc.querySelector('.event-preview').textContent.includes('待人工確認'));
  const roi = doc.querySelector('#roi-inside'); const identity = doc.querySelector('#identity-status'); const dwell = doc.querySelector('#dwell-seconds'); const threshold = doc.querySelector('#threshold-seconds');
  const update = node => node.dispatchEvent(new Event(node.type === 'range' ? 'input' : 'change', { bubbles: true }));
  check('AI 候選事件', doc.querySelector('#event-result').dataset.candidate === 'true');
  roi.checked = false; update(roi); check('AI 區域外分支', doc.querySelector('#event-result').textContent.includes('不在 ROI'));
  roi.checked = true; update(roi); identity.value = 'unknown'; update(identity); check('AI 未知身分分支', doc.querySelector('#event-result').textContent.includes('待人工覆核'));
  identity.value = 'known'; update(identity); dwell.value = 1; update(dwell); check('AI 時間不足分支', doc.querySelector('#event-result').textContent.includes('尚未達'));
  dwell.value = 3; threshold.value = 3; update(dwell); update(threshold); check('AI 等於門檻邊界', doc.querySelector('#event-result').dataset.candidate === 'true');
  doc = await load('health.html', 320);
  for (const cat of ['orange', 'sesame']) for (const days of [14, 7]) {
    doc.querySelector(`[data-value="${cat}"]`).click(); const period = doc.querySelector('#trend-period'); period.value = days; update(period);
    const cells = [...doc.querySelectorAll('.data-table tbody tr')];
    const sum = cells.reduce((total, row) => total + Number(row.lastChild.textContent), 0);
    check(`趨勢：${cat}/${days}天`, cells.length === days && doc.querySelectorAll('.chart-dot').length === days && doc.querySelector('#chart-summary').textContent.includes(`${sum} 次`));
  }
  doc.querySelector('details').open = true;
  check('圖表資料表與模擬標記', doc.querySelector('.data-table caption').textContent.includes('模擬') && doc.querySelector('.demo-disclaimer').textContent.includes('完全模擬'));
  for (const input of doc.querySelectorAll('.prep-checklist input')) { input.checked = true; update(input); }
  check('就醫清單計數', doc.querySelector('.prep-checklist .demo-status').textContent.includes('4 / 4'));
  check('資料表手機無溢出', doc.documentElement.scrollWidth <= doc.documentElement.clientWidth);
  for (const article of articles) {
    doc = await load(`article.html?id=${article.id}`, 320);
    check(`原文章可讀：${article.id}`, doc.querySelector('h1').textContent === article.title && doc.querySelectorAll('#article section').length === article.sections.length + (article.cautions.length ? 1 : 0) + 1);
    check(`原文章手機無溢出：${article.id}`, doc.documentElement.scrollWidth <= doc.documentElement.clientWidth);
  }
  for (const path of ['topic.html', 'topic.html?id=missing', 'topic.html?id=__proto__', 'article.html?id=missing']) {
    doc = await load(path); check(`未知 ID：${path}`, /還沒在這裡|找不到這篇/.test(doc.querySelector('h1').textContent));
  }
  // A temporary in-memory topic proves the extension path without shipping fake content.
  doc = await load('topic.html?id=water');
  const extension = await frame.contentWindow.eval(`(async()=>{const {topics}=await import(new URL('./assets/js/topics.js',location.href)); topics['extension-smoke']=structuredClone(topics.water); Object.assign(topics['extension-smoke'],{id:'extension-smoke',navTitle:'擴充測試',title:'共用主題擴充測試',href:'topic.html?id=extension-smoke',exhibit:{name:'第五展區測試',tone:'leaf',symbol:'chart'}});history.replaceState({},'', 'topic.html?id=extension-smoke');await import(new URL('./assets/js/topic.js?extension-smoke',location.href));return {title:document.querySelector('h1').textContent,nav:document.querySelectorAll('.main-nav a').length,demo:document.querySelector('[data-interaction]').dataset.interaction}})()`);
  check('新增主題共用模板與自動導覽（僅記憶體測試）', extension.title === '第五展區測試' && extension.nav === keys.length + 2 && extension.demo === 'resource-map');
  const entrance = await frame.contentWindow.eval(`(async()=>{const main=document.querySelector('#main');main.replaceChildren();const root=document.createElement('div');root.className='exhibition-floor';main.append(root);const {renderExhibitEntrances}=await import(new URL('./assets/js/exhibit-components.js',location.href));renderExhibitEntrances(root);const last=root.lastElementChild;return {entries:root.children.length,number:last.querySelector('.door-number').textContent,title:last.querySelector('h3').textContent,href:last.getAttribute('href'),extension:last.classList.contains('door-extension')}})()`);
  check('第五展區自動加入首頁幾何入口', entrance.entries === keys.length + 1 && entrance.number === String(keys.length + 1).padStart(2, '0') && entrance.title === '第五展區測試' && entrance.href === 'topic.html?id=extension-smoke' && entrance.extension);
}
try { await main(); } catch (error) { check('驗收程序完成', false, error.stack); }
finally {
  frame.remove();
  window.meowcareTestResults = results;
  const failures = results.filter(item => !item.passed);
  report.textContent = `完成 ${results.length} 項檢查，通過 ${results.length - failures.length}，失敗 ${failures.length}。\n\n` + results.map(item => `${item.passed ? '✓' : '✗'} ${item.name}${!item.passed && item.detail ? ` — ${item.detail}` : ''}`).join('\n');
  document.body.dataset.testStatus = failures.length ? 'failed' : 'passed';
}
