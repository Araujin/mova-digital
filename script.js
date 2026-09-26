'use strict';

const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
const year = document.querySelector('#year');
const mobileViewport = window.matchMedia('(max-width: 720px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// A navegação permanece disponível mesmo quando o JavaScript não executa.
if (menuButton && nav) {
  document.documentElement.classList.add('js');
  const navLinks = [...nav.querySelectorAll('a')];

  function setMenuOpen(open, restoreFocus = false) {
    nav.classList.toggle('open', open);
    menuButton.classList.toggle('active', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('menu-open', open);

    if (open) navLinks[0]?.focus();
    else if (restoreFocus) menuButton.focus();
  }

  menuButton.addEventListener('click', () => {
    setMenuOpen(!nav.classList.contains('open'));
  });

  navLinks.forEach(link => link.addEventListener('click', () => {
    setMenuOpen(false);
    const href = link.getAttribute('href');
    if (href?.startsWith('#')) {
      const section = document.getElementById(href.slice(1));
      if (section) {
        section.setAttribute('tabindex', '-1');
        section.focus({ preventScroll: true });
      }
    }
  }));

  document.addEventListener('keydown', event => {
    if (!nav.classList.contains('open')) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      setMenuOpen(false, true);
    }

    // Mantém o foco nos controles do menu enquanto ele cobre a tela.
    if (event.key === 'Tab') {
      const controls = [menuButton, ...navLinks];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  mobileViewport.addEventListener('change', event => {
    if (!event.matches) setMenuOpen(false);
  });
}

if (header) {
  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 28);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

// O conteúdo é visível por padrão; animações são um aprimoramento opcional.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending');
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(element => {
    element.classList.add('reveal-pending');
    observer.observe(element);
  });
}

if (year) year.textContent = new Date().getFullYear();
