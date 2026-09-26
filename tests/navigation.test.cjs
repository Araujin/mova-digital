const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const code = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');

// Simulação leve do DOM: verifica comportamento, sem afirmar validação visual.
function setup({ observer = false, reduced = false } = {}) {
  let document;
  const element = () => {
    const classes = new Set();
    return {
      attributes: {}, events: {}, textContent: '',
      classList: {
        add: value => classes.add(value), remove: value => classes.delete(value),
        contains: value => classes.has(value),
        toggle(value, force = !classes.has(value)) {
          if (force) classes.add(value); else classes.delete(value);
          return force;
        },
      },
      setAttribute(key, value) { this.attributes[key] = value; },
      getAttribute(key) { return this.attributes[key]; },
      addEventListener(key, fn) { this.events[key] = fn; },
      focus() { document.activeElement = this; },
    };
  };
  const button = element(); const nav = element(); const header = element();
  const year = element(); const section = element(); const links = [element(), element()];
  links.forEach(link => link.setAttribute('href', '#metodo'));
  nav.querySelectorAll = () => links;
  const reveals = [element(), element()];
  const mobile = { matches: true, addEventListener(_, fn) { this.change = fn; } };
  document = {
    activeElement: button, body: element(), documentElement: element(), events: {},
    querySelector: selector => ({ '.header': header, '.menu-button': button, '.nav': nav, '#year': year })[selector],
    querySelectorAll: () => reveals,
    getElementById: id => id === 'metodo' ? section : null,
    addEventListener(key, fn) { this.events[key] = fn; },
  };
  const window = { scrollY: 0, addEventListener() {}, matchMedia: query => query.includes('720') ? mobile : { matches: reduced } };
  let revealCallback;
  class IntersectionObserver {
    constructor(callback) { revealCallback = callback; }
    observe() {} unobserve() {}
  }
  if (observer) window.IntersectionObserver = IntersectionObserver;
  vm.runInNewContext(code, { document, window, IntersectionObserver, Date });
  return { document, button, nav, links, mobile, reveals, year, section, revealCallback };
}

test('Escape fecha o menu, libera a rolagem e devolve o foco', () => {
  const s = setup(); s.button.events.click();
  assert.equal(s.button.attributes['aria-expanded'], 'true');
  assert.equal(s.document.activeElement, s.links[0]);
  s.document.events.keydown({ key: 'Escape', preventDefault() {} });
  assert.equal(s.nav.classList.contains('open'), false);
  assert.equal(s.document.body.classList.contains('menu-open'), false);
  assert.equal(s.document.activeElement, s.button);
});
test('Mudança para desktop remove o bloqueio de rolagem', () => {
  const s = setup(); s.button.events.click(); s.mobile.change({ matches: false });
  assert.equal(s.document.body.classList.contains('menu-open'), false);
  assert.equal(s.button.attributes['aria-expanded'], 'false');
});
test('Navegação fecha o menu e transfere foco para a seção', () => {
  const s = setup(); s.button.events.click(); s.links[0].events.click();
  assert.equal(s.document.activeElement, s.section);
  assert.equal(s.nav.classList.contains('open'), false);
});
test('Tab e Shift+Tab permanecem nos controles do menu aberto', () => {
  const s = setup(); s.button.events.click(); s.links[1].focus();
  s.document.events.keydown({ key: 'Tab', shiftKey: false, preventDefault() {} });
  assert.equal(s.document.activeElement, s.button);
  s.document.events.keydown({ key: 'Tab', shiftKey: true, preventDefault() {} });
  assert.equal(s.document.activeElement, s.links[1]);
});
test('Sem IntersectionObserver e com movimento reduzido o conteúdo fica visível', () => {
  for (const options of [{ observer: false }, { observer: true, reduced: true }]) {
    const s = setup(options);
    assert.ok(s.reveals.every(e => !e.classList.contains('reveal-pending')));
    assert.equal(s.year.textContent, new Date().getFullYear());
  }
});
test('Animação revela o conteúdo quando ele entra na área visível', () => {
  const s = setup({ observer: true });
  assert.equal(s.reveals[0].classList.contains('reveal-pending'), true);
  s.revealCallback([{ target: s.reveals[0], isIntersecting: true }]);
  assert.equal(s.reveals[0].classList.contains('reveal-pending'), false);
  assert.equal(s.reveals[0].classList.contains('visible'), true);
});
