import { topics } from './topics.js';
import { articles } from './content.js';
import { el, link, sourceLink, photo } from './dom.js';
import { initSite } from './site.js';
import { initAnimations } from './animations.js';
import { mountInteraction } from './interactions.js';
import { exhibitFor, icon } from './visuals.js';
import { createExhibitScene } from './exhibit-components.js';

const id = document.body.dataset.topic || new URLSearchParams(location.search).get('id');
const topic = Object.hasOwn(topics, id) ? topics[id] : undefined;
initSite(topic?.id);
const main = document.querySelector('#main');
function heading(kicker, title) {
  const wrap = el('div', 'section-title'); wrap.append(el('p', 'eyebrow', kicker), el('h2', '', title)); return wrap;
}
if (!topic) {
  document.title = '找不到展區｜MeowCare Discovery';
  const state = el('section', 'container not-found');
  state.append(el('p', 'exhibit-sign', 'A DIFFERENT ROUTE'), el('h1', '', '這個展區還沒在這裡。'), el('p', '', '連結可能不完整。請回到展館入口，重新選擇探索路線。'), link('回到展館入口 ↗', 'index.html#explore', 'button')); main.replaceChildren(state);
} else {
  const exhibit = exhibitFor(topic);
  document.body.dataset.theme = exhibit.tone;
  document.title = `${exhibit.name}｜MeowCare Discovery`;
  document.querySelector('meta[name="description"]').content = topic.intro;
  const hero = el('section', 'topic-hero');
  const inner = el('div', 'container topic-hero-grid');
  const copy = el('div', 'topic-hero-copy');
  copy.append(link('← 展館入口', 'index.html#explore', 'back-link'), el('p', 'exhibit-sign', `EXHIBIT ${exhibit.number} / ${topic.englishTitle}`), el('h1', 'hero-title', exhibit.name), el('p', 'exhibit-question', topic.title.replaceAll('\n', '')), el('p', 'hero-intro', topic.intro), link('探索互動展品 ↓', '#interactive', 'button'));
  const visual = createExhibitScene(topic, exhibit);
  inner.append(copy, visual); hero.append(inner);
  const toc = el('nav', 'container topic-toc'); toc.setAttribute('aria-label', '展區章節導覽');
  topic.sections.forEach((section, index) => toc.append(link(`${String(index + 1).padStart(2, '0')} / ${section.title.replaceAll('\n', '')}`, `#${section.id}`)));
  toc.append(link('互動展品 ↘', '#interactive')); main.replaceChildren(hero, toc);
  topic.sections.forEach((item, index) => {
    const section = el('section', 'editorial-section'); section.id = item.id; section.dataset.layout = exhibit.layouts[index % exhibit.layouts.length];
    const wrap = el('div', 'container editorial-grid'); wrap.dataset.reveal = '';
    const title = heading(item.kicker, item.title); title.prepend(el('span', 'chapter-index', String(index + 1).padStart(2, '0')));
    const text = el('div', 'editorial-copy'); item.paragraphs.forEach(paragraph => text.append(el('p', '', paragraph)));
    const list = el('ul', 'point-list'); item.points.forEach(point => list.append(el('li', '', point)));
    wrap.append(title, text, list); section.append(wrap); main.append(section);
    if (index === 1) {
      const interactive = el('section', 'interactive-section'); interactive.id = 'interactive';
      const content = el('div', 'container'); content.dataset.reveal = '';
      content.append(heading(`INTERACTIVE OBJECT ${exhibit.number} / 互動展品`, topic.interaction.title), el('p', 'section-intro', topic.interaction.description), el('p', 'demo-disclaimer', topic.interaction.disclaimer));
      const demo = el('div', 'interactive-demo exhibit-panel'); demo.dataset.interaction = topic.interaction.type;
      content.append(demo); interactive.append(content); main.append(interactive); mountInteraction(topic.interaction.type, demo);
    }
  });
  const scenario = el('section', 'scenario-section');
  const scenarioInner = el('div', 'container scenario-grid'); scenarioInner.dataset.reveal = '';
  scenarioInner.append(el('p', 'exhibit-sign', 'LIFE IN CONTEXT / 生活情境'));
  const story = el('div'); story.append(el('h2', '', topic.scenario.title)); topic.scenario.paragraphs.forEach(text => story.append(el('p', '', text)));
  scenarioInner.append(story); scenario.append(scenarioInner); main.append(scenario);
  const summary = el('section', 'container takeaway-section'); summary.dataset.reveal = '';
  summary.append(heading('WHAT TO TAKE AWAY / 帶走的線索', '把理解，帶回日常。'));
  const takeaways = el('ol', 'takeaway-list'); topic.takeaways.forEach(text => takeaways.append(el('li', 'takeaway-item', text))); summary.append(takeaways);
  const caution = el('aside', 'caution'); topic.cautions.forEach(text => caution.append(el('p', '', text))); summary.append(caution); main.append(summary);
  const references = el('section', 'container references'); references.append(heading('EXPLORE THE SOURCES', '繼續探索，有據可循。'));
  const grid = el('div', 'references-grid');
  const related = el('div'); related.append(el('h3', '', '延伸閱讀'));
  for (const slug of topic.relatedArticles) { const article = articles.find(a => a.id === slug); if (article) related.append(link(`${article.title} ↗`, `article.html?id=${encodeURIComponent(slug)}`, 'reading-link')); }
  const citations = el('div'); citations.append(el('h3', '', '資料來源'));
  const sources = el('ul', 'source-list'); topic.sources.forEach(source => { const item = el('li'); item.append(sourceLink(source)); sources.append(item); });
  citations.append(sources, el('p', 'fine-print', `內容編輯與來源查閱：${topic.updatedAt}。來源連結另開分頁。`)); grid.append(related, citations); references.append(grid); main.append(references);
  const next = topics[topic.nextTopic]; const nextExhibit = exhibitFor(next);
  const nextSection = el('section', 'next-exhibit');
  nextSection.dataset.theme = nextExhibit.tone;
  const nextLink = link('', next.href, 'container next-exhibit-link');
  nextLink.append(el('span', 'exhibit-sign', `NEXT / EXHIBIT ${nextExhibit.number}`), el('span', 'next-title', `${nextExhibit.name} ↗`)); nextSection.append(nextLink); main.append(nextSection);
  initAnimations();
}
