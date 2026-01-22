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



document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault(); // evitar comportamiento por defecto

    // Cerrar offcanvas primero si está abierto
    const offcanvasEl = document.querySelector('.offcanvas.show');
    if (offcanvasEl) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
      bsOffcanvas.hide();
      // Esperar a que termine la animación antes de scrollear
      offcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, { once: true });
    } else {
      // Si el offcanvas no está abierto, simplemente hacer scroll
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


document.getElementById('servicio1m-link').addEventListener('click', handleServiceClick);
document.getElementById('servicio2m-link').addEventListener('click', handleServiceClick);

function handleServiceClick(e) {
  e.preventDefault();
  const targetUrl = this.getAttribute('href');
  const menu = document.getElementById('menuMovil');
  const offcanvasInstance = bootstrap.Offcanvas.getInstance(menu);

  if (offcanvasInstance) {
    offcanvasInstance.hide();
    menu.addEventListener('hidden.bs.offcanvas', () => {
      window.location.href = targetUrl;
    }, { once: true });
  } else {
    window.location.href = targetUrl;
  }
}

//MODAL PARA GALERIA DE IMGS
const imagenes = document.querySelectorAll(".img-galeria");
const imagenModal = document.getElementById("imagenModal");
const modal = new bootstrap.Modal(document.getElementById("modalImagen"));
const modalEl = document.getElementById("modalImagen");

let index = 0;
let startX = 0;
let startY = 0;
let moveX = 0;
let moveY = 0;

// abrir modal
imagenes.forEach((img, i) => {
  img.addEventListener("click", () => {
    index = i;
    imagenModal.src = img.src;
    resetTransform();
    modal.show();
  });
});

// reset posición
function resetTransform() {
  moveX = moveY = 0;
  imagenModal.style.transform = `translate(-50%, -50%)`;
}

// slider
function showImage(i) {
  if (i < 0) i = imagenes.length - 1;
  if (i >= imagenes.length) i = 0;
  index = i;
  imagenModal.src = imagenes[index].src;
  resetTransform();
}

// botones
document.querySelector(".prev").onclick = () => showImage(index - 1);
document.querySelector(".next").onclick = () => showImage(index + 1);

// TOUCH EVENTS
imagenModal.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

imagenModal.addEventListener("touchmove", e => {
  const x = e.touches[0].clientX - startX;
  const y = e.touches[0].clientY - startY;

  // arrastrar imagen
  imagenModal.style.transform =
    `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;

  moveX = x;
  moveY = y;
});

imagenModal.addEventListener("touchend", () => {

  // deslizar abajo para cerrar
  if (moveY > 120) {
    modal.hide();
    return;
  }

  // swipe lateral
  if (Math.abs(moveX) > 80) {
    moveX > 0 ? showImage(index - 1) : showImage(index + 1);
  }

  resetTransform();
});
