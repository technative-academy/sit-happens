document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.querySelector('[data-testimonials]');
  const quoteEl = document.querySelector('[data-quote-output]');
  if (!wrap || !quoteEl) return;

  const indicator = wrap.querySelector('.testimonials__indicator');

  function moveIndicator() {
    const active = wrap.querySelector('.person.is-active');
    if (!active || !indicator) return;

    const wrapRect = wrap.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();

    const width = activeRect.width;

    const centerX = activeRect.left - wrapRect.left + width / 2;

    indicator.style.left = `${centerX}px`;
    indicator.style.width = `${width}px`;
  }

  requestAnimationFrame(moveIndicator);

  wrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.person');
    if (!btn) return;

    wrap
      .querySelectorAll('.person')
      .forEach((p) => p.classList.remove('is-active'));
    btn.classList.add('is-active');

    const nextQuote = btn.dataset.quote;
    if (nextQuote) quoteEl.textContent = nextQuote;

    moveIndicator();
  });

  window.addEventListener('resize', moveIndicator);
});

document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.querySelector('[data-home-tabs]');
  if (!wrap) return;

  wrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.home-tabs__item');
    if (!btn) return;

    wrap.querySelectorAll('.home-tabs__item').forEach((el) => {
      el.classList.remove('is-active');
    });

    btn.classList.add('is-active');
  });
});
