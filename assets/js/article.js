import { articles, categories } from './content.js';
import { initSite } from './site.js';

initSite();

const root = document.querySelector('#article');
const id = new URLSearchParams(window.location.search).get('id');
const article = articles.find(item => item.id === id);
function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
root.replaceChildren();
if (!article) {
  document.title = '找不到文章｜MeowCare Discovery';
  root.append(element('h1', '找不到這篇照護文章'), element('p', '連結可能不完整，或文章尚未收錄。請回到主題探索，尋找需要的照護內容。'));
  const back = element('a', '回到主題探索', 'button');
  back.href = 'index.html#explore';
  root.append(back);
} else {
  document.title = `${article.title}｜MeowCare Discovery`;
  document.querySelector('meta[name="description"]').content = article.summary;
  const meta = element('p', undefined, 'article-meta');
  const date = element('time', article.updatedAt);
  date.dateTime = article.updatedAt;
  meta.append(document.createTextNode('最後更新：'), date, document.createTextNode(` · ${article.tags.join(' / ')}`));
  root.append(element('span', categories[article.category], 'category'), element('h1', article.title), meta, element('p', article.summary, 'article-summary'));
  for (const item of article.sections) {
    const section = element('section');
    section.append(element('h2', item.heading));
    for (const paragraph of item.paragraphs) section.append(element('p', paragraph));
    root.append(section);
  }
  if (article.cautions.length) {
    const section = element('section', undefined, 'cautions');
    const list = element('ul');
    for (const caution of article.cautions) list.append(element('li', caution));
    section.append(element('h2', '照護時請留意'), list);
    root.append(section);
  }
  const sources = element('section', undefined, 'sources');
  const list = element('ul');
  for (const source of article.sources) {
    const url = new URL(source.url);
    if (url.protocol !== 'https:') continue;
    const item = element('li');
    const link = element('a', `${source.title}（另開分頁）`);
    link.href = url.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    item.append(link);
    list.append(item);
  }
  sources.append(element('h2', '參考來源'), list, element('p', '本站提供一般教育資訊，不取代獸醫診療。每隻貓的需求不同；若發現令人擔憂的症狀，請諮詢獸醫。', 'education-note'));
  root.append(sources);
}
