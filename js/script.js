document.addEventListener('DOMContentLoaded', () => {

  // 🚫 NO ejecutar slider en móvil
  if (window.innerWidth < 768) {
    console.log('Slider desactivado en móvil');
    return;
  }

  const slides = document.querySelectorAll('.slide');
  if (!slides || slides.length < 2) return;

  let index = 0;

  setInterval(() => {
    if (!slides[index]) return;

    slides[index].classList.remove('active');
    slides[index].classList.add('exit');

    index = (index + 1) % slides.length;

    if (!slides[index]) return;

    slides[index].classList.remove('exit');
    slides[index].classList.add('active');
  }, 3000);

});
