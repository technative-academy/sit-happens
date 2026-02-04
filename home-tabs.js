// home tabs image switching
document.addEventListener('DOMContentLoaded', () => {
  const tabsContainer = document.querySelector('[data-home-tabs]');
  const tabImage = document.querySelector('.home-tabs__image');

  if (!tabsContainer || !tabImage) return;

  const tabButtons = tabsContainer.querySelectorAll('.home-tabs__item');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // if tab is already active, do nothing
      if (button.classList.contains('is-active')) return;

      // remove active state from all tabs
      tabButtons.forEach((btn) => btn.classList.remove('is-active'));

      // add active state to clicked tab
      button.classList.add('is-active');

      // get the new image source
      const newImageSrc = button.dataset.image;
      if (newImageSrc) {
        // fade out the current image
        tabImage.classList.add('is-fading');

        // wait for fade out, then swap image and fade in
        setTimeout(() => {
          tabImage.src = newImageSrc;
          tabImage.classList.remove('is-fading');
        }, 200);
      }
    });
  });
});
