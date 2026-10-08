document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
if (toggle && nav) {
  const closeMenu = () => { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); }
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
}
document.querySelectorAll('[data-year]').forEach(element => { element.textContent = new Date().getFullYear(); });

const variantButtons = document.querySelectorAll('[data-variant]');
variantButtons.forEach(button => button.addEventListener('click', () => {
 variantButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
 document.querySelector('#variant-title').textContent = button.dataset.variant === '600' ? 'Airbus A340-600F' : 'Airbus A340-500F';
 document.querySelector('#variant-copy').textContent = button.dataset.variant === '600' ? 'One of ECV’s primary cargo types for scheduled, charter and seasonal operations. All 28 active scheduled sectors are available to this variant.' : 'The shorter member of ECV’s primary cargo aircraft pair. Fly the A340-500F across all 28 active scheduled sectors, alongside charter and seasonal operations.';
}));
