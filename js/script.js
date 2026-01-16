  const slides = document.querySelectorAll('.slide');
  let index = 0;

  setInterval(() => {
    slides[index].classList.remove('active');
    slides[index].classList.add('exit');

    index = (index + 1) % slides.length;

    slides[index].classList.remove('exit');
    slides[index].classList.add('active');
  }, 3000);