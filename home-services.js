// home services mobile "view more" toggle
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.home-services');
  const toggle = document.querySelector('[data-home-services-toggle]');

  if (!section || !toggle) return;

  const updateToggleLabel = () => {
    const isExpanded = section.classList.contains('is-expanded');
    toggle.textContent = isExpanded ? 'View less' : 'View more';
    toggle.setAttribute('aria-expanded', String(isExpanded));
  };

  toggle.addEventListener('click', () => {
    section.classList.toggle('is-expanded');
    updateToggleLabel();
  });

  updateToggleLabel();
});
