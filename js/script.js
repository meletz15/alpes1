document.addEventListener('DOMContentLoaded', () => {

  // Logo del navbar: grande al inicio, pequeño al hacer scroll
  const header = document.querySelector('.header-alpes');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 60) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

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
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault(); 

    const offcanvasEl = document.querySelector('.offcanvas.show');
    if (offcanvasEl) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
      bsOffcanvas.hide();
      offcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, { once: true });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

document.querySelectorAll('[id^="servicio"][id$="-link"]').forEach(function (el) {
  el.addEventListener('click', handleServiceClick);
});

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
const contador = document.getElementById("contador");
const modalEl = document.getElementById("modalImagen");
const modal = new bootstrap.Modal(modalEl);

let index = 0;
let startX = 0, startY = 0;
let moveX = 0, moveY = 0;
let scale = 1;
let initialDistance = 0;
let lastTap = 0;

imagenes.forEach((img, i) => {
  img.addEventListener("click", () => {
    index = i;
    mostrarImagen();
    modal.show();
  });
});

modalEl.addEventListener("shown.bs.modal", () => {
  document.body.classList.add("no-scroll");
});

modalEl.addEventListener("hidden.bs.modal", () => {
  document.body.classList.remove("no-scroll");
  resetTransform();
});

function mostrarImagen() {
  imagenModal.src = imagenes[index].src;
  contador.textContent = `${index + 1} / ${imagenes.length}`;
  resetTransform();
}

function resetTransform() {
  scale = 1;
  moveX = moveY = 0;
  imagenModal.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

document.querySelector(".prev").onclick = () => cambiar(-1);
document.querySelector(".next").onclick = () => cambiar(1);

function cambiar(dir) {
  index = (index + dir + imagenes.length) % imagenes.length;
  mostrarImagen();
}

document.getElementById("cerrarModal").onclick = () => modal.hide();

imagenModal.addEventListener("touchstart", e => {
  if (e.touches.length === 2) {
    initialDistance = getDistance(e.touches);
  } else {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }
});

imagenModal.addEventListener("touchmove", e => {
  if (e.touches.length === 2) {
    const newDistance = getDistance(e.touches);
    scale = Math.min(Math.max(newDistance / initialDistance, 1), 3);
  } else {
    moveX = e.touches[0].clientX - startX;
    moveY = e.touches[0].clientY - startY;
  }

  imagenModal.style.transform =
    `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) scale(${scale})`;
});

imagenModal.addEventListener("touchend", () => {

  const now = new Date().getTime();
  if (now - lastTap < 300) {
    scale = scale === 1 ? 2 : 1;
    imagenModal.style.transform =
      `translate(-50%, -50%) scale(${scale})`;
    lastTap = 0;
    return;
  }
  lastTap = now;

  if (moveY > 120) {
    modal.hide();
    return;
  }

  if (Math.abs(moveX) > 80 && scale === 1) {
    moveX > 0 ? cambiar(-1) : cambiar(1);
  }

  resetTransform();
});

function getDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

const navs = document.querySelectorAll(".nav");

function mostrarFlechas() {
  navs.forEach(n => n.style.opacity = 1);
  clearTimeout(window.hideNav);
  window.hideNav = setTimeout(() => {
    navs.forEach(n => n.style.opacity = 0);
  }, 1500);
}

imagenModal.addEventListener("touchstart", mostrarFlechas);

function preload() {
  imagenes.forEach(img => {
    const i = new Image();
    i.src = img.src;
  });
}
preload();
function loadVideo(wrapper) {
  if (!wrapper) return;

  const videoId = wrapper.getAttribute('data-video');

  // Cerrar otros videos
  document.querySelectorAll('.video-wrapper').forEach(other => {
    if (other !== wrapper) resetVideo(other);
  });

  if (wrapper.querySelector('iframe')) return;

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  iframe.title = "YouTube video player";
  iframe.frameBorder = "0";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;

  iframe.style.width = "100%";
  iframe.style.height = "100%";

  wrapper.innerHTML = "";
  wrapper.appendChild(iframe);
}

function resetVideo(wrapper) {
  const videoId = wrapper.getAttribute('data-video');

  wrapper.innerHTML = `
    <div class="video-placeholder">
      <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" loading="lazy" decoding="async">
      <button class="play-btn">▶</button>
    </div>
  `;
}

document.querySelectorAll('.video-wrapper').forEach(wrapper => {
  wrapper.addEventListener('click', () => loadVideo(wrapper));
});

document.querySelectorAll('.play-video').forEach(button => {
  button.addEventListener('click', function () {
    const wrapper = this.closest('.video-card').querySelector('.video-wrapper');
    loadVideo(wrapper);
  });
});

// EMAILJS
(function () {
  emailjs.init("KnpWVgqMbzwwaiNpe");
})();

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contact-form");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector('[name="name"]')?.value || "";
    const email = document.querySelector('[name="email"]')?.value || "";
    const subject = document.querySelector('[name="subject"]')?.value || "";
    const message = document.querySelector('[name="message"]')?.value || "";

    const templateParams = {
      name,
      email,
      title: subject,
      message
    };

    emailjs.send("service_8fsqmyj", "template_4qquun8", templateParams)
      .then(() => {
        alert("Mensaje enviado correctamente ✅");
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Error al enviar el mensaje ❌");
      });
  });

});