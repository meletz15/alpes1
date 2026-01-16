document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');

  // Si no hay slides o solo hay uno, no hacer nada
  if (!slides || slides.length < 2) return;

  let index = 0;

  const sliderInterval = setInterval(() => {
    // 🔒 Blindaje total
    if (!slides[index]) return;

    slides[index].classList.remove('active');
    slides[index].classList.add('exit');

    index = (index + 1) % slides.length;

    if (!slides[index]) return;

    slides[index].classList.remove('exit');
    slides[index].classList.add('active');
  }, 3000);

  // 🔑 CUANDO SE ABRE EL MENÚ, PAUSAR EL SLIDER
  const menu = document.getElementById('menuMovil');
  if (menu) {
    menu.addEventListener('show.bs.offcanvas', () => {
      clearInterval(sliderInterval);
    });
  }
});
