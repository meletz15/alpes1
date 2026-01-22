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
document.addEventListener("DOMContentLoaded", () => {

  const imagenes = document.querySelectorAll(".img-galeria");
  const imagenModal = document.getElementById("imagenModal");
  const modalElement = document.getElementById("modalImagen");

  if (!imagenes.length || !imagenModal || !modalElement) {
    console.error("No se encontraron elementos del modal o imágenes");
    return;
  }

  const modal = new bootstrap.Modal(modalElement);

  imagenes.forEach(img => {
    img.addEventListener("click", () => {
      imagenModal.src = img.src;
      modal.show();
    });
  });

});
