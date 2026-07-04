// PIELOGIC.COM — light interactions
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('nav-mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  const slideshows = Array.from(document.querySelectorAll('.slideshow-section'));

  slideshows.forEach((slideshow) => {
    const slides = Array.from(slideshow.querySelectorAll('.slideshow-slide'));
    const dotsWrap = slideshow.querySelector('.slideshow-dots');
    const intervalMs = Number(slideshow.dataset.slideInterval || 5000);

    if (!slides.length || !dotsWrap) return;

    // Clear any existing dots before rebuilding. This keeps GitHub/browser cache refreshes clean.
    dotsWrap.innerHTML = '';

    let current = slides.findIndex((slide) => slide.classList.contains('is-active'));
    if (current < 0) current = 0;
    let timer = null;

    const dots = slides.map((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slideshow-dot';
      dot.setAttribute('aria-label', `Show slide ${index + 1}`);
      dot.addEventListener('click', () => showSlide(index, true));
      dotsWrap.appendChild(dot);
      return dot;
    });

    function showSlide(index, restartTimer) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('is-active', slideIndex === current);
      });
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('is-active', dotIndex === current);
      });
      if (restartTimer) startTimer();
    }

    function startTimer() {
      window.clearInterval(timer);
      if (slides.length > 1) {
        timer = window.setInterval(() => showSlide(current + 1, false), intervalMs);
      }
    }

    slideshow.addEventListener('mouseenter', () => window.clearInterval(timer));
    slideshow.addEventListener('mouseleave', startTimer);

    showSlide(current, false);
    startTimer();
  });
})();
