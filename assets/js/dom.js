// Content stays plain text. Shared helpers never interpolate data into HTML.
export function el(tag, className = '', text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
export function link(text, href, className = '') {
  const node = el('a', className, text);
  node.href = href;
  return node;
}
export function sourceLink(source) {
  const node = link(`${source.title} ↗`, source.url);
  if (new URL(source.url).protocol !== 'https:') throw new Error('來源必須使用 HTTPS');
  node.target = '_blank';
  node.rel = 'noopener noreferrer';
  return node;
}
export function photo(image, className = '', eager = false) {
  const node = el('img', className);
  node.src = image.src;
  node.alt = image.alt;
  node.width = 1200;
  node.height = 900;
  node.loading = eager ? 'eager' : 'lazy';
  node.decoding = 'async';
  return node;
}
export function button(text, handler, className = '') {
  const node = el('button', className, text);
  node.type = 'button';
  node.addEventListener('click', handler);
  return node;
}
export function svg(tag, attributes = {}, text) {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);
  if (text !== undefined) node.textContent = text;
  return node;
}
