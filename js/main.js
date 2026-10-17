/**
 * SPITALUL DE BOLI CRONICE MEDICAL EXPERT HOUSE
 * Motor de interacțiuni: Animații Scroll Reveal, Meniu Mobil, Lightbox Foto, Hartă Leaflet
 */

document.addEventListener("DOMContentLoaded", function () {
  
  // ==================== 1. SCROLL REVEAL (ANIMAȚII LINE) ====================
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback pentru navigatoare fără suport IntersectionObserver
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  // ==================== 2. MENIU MOBIL (DRAWER) ====================
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const closeDrawerBtn = document.getElementById("close-drawer-btn");
  const drawerOverlay = document.getElementById("drawer-overlay");

  function openDrawer() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.add("open");
      drawerOverlay.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  }

  function closeDrawer() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.remove("open");
      drawerOverlay.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);

  // Închidere automată a meniului mobil la clic pe un link
  if (mobileDrawer) {
    mobileDrawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeDrawer);
    });
  }

  // Resetare preferințe vechi de contrast / font
  try {
    localStorage.removeItem("meh_font_size");
    localStorage.removeItem("meh_contrast");
  } catch (e) {}

  // ==================== 4. LIGHTBOX GALERIE FOTO ====================
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");
  const galleryTriggers = document.querySelectorAll("[data-lightbox]");

  galleryTriggers.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const imgSrc = this.getAttribute("href") || this.getAttribute("src");
      const captionText =
        this.getAttribute("data-caption") ||
        this.querySelector("img")?.alt ||
        "Fotografie Spital";
      if (lightboxModal && lightboxImg) {
        lightboxImg.src = imgSrc;
        if (lightboxCaption) lightboxCaption.textContent = captionText;
        lightboxModal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener("click", function (e) {
      if (e.target === lightboxModal || e.target === lightboxClose) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  // ==================== 5. HARTĂ LEAFLET INTERACTIVĂ ====================
  const mapElement = document.getElementById("hospital-map");
  if (mapElement && typeof L !== "undefined") {
    // Coordonate exacte conform poziționării pe DN64 (Strada Principală nr. 9, Vlăduceni)
    const hospitalCoords = [45.1266, 24.2765];

    const map = L.map("hospital-map", {
      scrollWheelZoom: false,
    }).setView(hospitalCoords, 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
    }).addTo(map);

    const marker = L.marker(hospitalCoords).addTo(map);
    marker
      .bindPopup(
        `<div style="font-family:inherit;font-size:13px;line-height:1.45;">
           <strong style="color:#135e6e;font-size:14px;display:block;margin-bottom:4px;">Spital de Boli Cronice Medical Expert House</strong>
           Sat Vlăduceni, Com. Păușești-Măglași<br>
           Strada Principală nr. 9 (pe DN64, la 7-8 km de Rm. Vâlcea)<br>
           <div style="margin-top:8px;">
             <a href="https://www.google.com/maps/search/?api=1&query=Spital+de+Boli+Cronice+Medical+Expert+House" target="_blank" style="color:#ea580c;font-weight:bold;text-decoration:none;">➔ Deschide în Google Maps</a>
           </div>
         </div>`
      )
      .openPopup();
  }

  // ==================== 6. FORMULARE CONTACT & SOLICITARE ====================
  const contactForms = document.querySelectorAll(".ajax-contact-form");
  contactForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const successMsg = form.querySelector(".form-success-msg");
      if (successMsg) {
        successMsg.classList.remove("hidden");
        form.reset();
        setTimeout(() => {
          successMsg.classList.add("hidden");
        }, 6000);
      } else {
        alert(
          "Vă mulțumim! Solicitarea dumneavoastră a fost recepționată. Echipa medicală vă va contacta în cel mai scurt timp."
        );
        form.reset();
      }
    });
  });
});
