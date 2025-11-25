// Recuperado elementos de Dom
const customSelect = document.querySelector(".custom-select");
const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options");
const selectedLenguage = selected;

// Seleccionar elementos del Dom

const openMenu = document.querySelector(".icon-menu");
const closeMenu = document.querySelector(".icon-close");
const menuInicial = document.querySelector(".section.movil");
const cards = document.querySelectorAll(".card-conteiner");
const prevBtn = document.querySelectorAll(".prev");
const nextBtn = document.querySelectorAll(".next");
const slides = document.querySelectorAll(".slide");
const btnMoverDerecha = document.querySelector(".btn-mover-derecha");
const btnMoverIzquierda = document.querySelector(".btn-mover-izquierda");

// Sistema de idioma

let translations = {};
let currentLanguage = localStorage.getItem("language") || "es";

const loadTranslations = async () => {
  try {
    const response = await fetch("/translations.json");
    if (!response.ok) {
      throw new Error(`Error al cargar traducciones: ${response.status}`);
    }
    translations = await response.json();
    console.log("Traducciones cargadas correctamente");
    return true;
  } catch (error) {
    console.error("Error cargando traducciones:", error);
    return false;
  }
};

const setActivePage = () => {
  const currentPage = window.location.pathname.split("/").pop();
  const buttons = document.querySelectorAll(".box_botone button");

  buttons.forEach((button) => {
    const link = button.querySelector("a");
    if (link) {
      const href = link.getAttribute("href");
      const buttonPage = href.split("/").pop();

      if (buttonPage === currentPage) {
        button.classList.add("active");
        button.closest(".box_botone")?.classList.add("active");
      }
    }
  });
};

const changeLanguage = (lang) => {
  currentLanguage = lang;
  localStorage.setItem("language", lang);
  updateContent();
};

const updateContent = () => {
  // Traducir elementos con data-translate
  if (!translations[currentLanguage]) {
    console.warn("Traducciones no disponibles para:", currentLanguage);
    return;
  }

  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key];
    }
  });
  // Traducir placeholders
  document
    .querySelectorAll("[data-translate-placeholder]")
    .forEach((element) => {
      const key = element.getAttribute("data-translate-placeholder");
      if (translations[currentLanguage][key]) {
        element.placeholder = translations[currentLanguage][key];
      }
    });

  // Traducir atributos alt
  document.querySelectorAll("[data-translate-alt]").forEach((element) => {
    const key = element.getAttribute("data-translate-alt");
    if (translations[currentLanguage][key]) {
      element.alt = translations[currentLanguage][key];
    }
  });

  // Traducir atributos aria-label
  document.querySelectorAll("[data-translate-aria]").forEach((element) => {
    const key = element.getAttribute("data-translate-aria");
    if (translations[currentLanguage][key]) {
      element.setAttribute("aria-label", translations[currentLanguage][key]);
    }
  });

  document.documentElement.lang = currentLanguage;
  document.body.className = document.body.className.replace(/lang-\w+/g, "");
  document.body.classList.add(`lang-${currentLanguage}`);
};

// Selector de idioma

const toggleLanguageSelector = () => {
  customSelect?.classList.toggle("active");
  optionsContainer?.classList.toggle("active");
};

const escogerLenguage = () => {
  toggleLanguageSelector();
};

const initLanguageSelector = () => {
  if (customSelect && selected && optionsContainer) {
    const options = optionsContainer.querySelectorAll("div[data-value]");
    const selectedImg = selected.querySelector("img.spanish, img.english");
    // Cargar idioma guardado al inicio
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      const savedOption = optionsContainer.querySelector(
        `[data-value="${savedLang}"]`
      );
      if (savedOption && selectedImg) {
        const newImg = savedOption.querySelector("img");
        if (newImg) {
          selectedImg.src = newImg.src;
          selectedImg.alt = newImg.alt;
          selectedImg.className = newImg.className;
        }
      }
    }
    // Evento para cada opción
    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();

        const newImg = option.querySelector("img");
        const selectedLang = option.getAttribute("data-value");

        if (selectedImg && newImg) {
          selectedImg.src = newImg.src;
          selectedImg.alt = newImg.alt;
          selectedImg.className = newImg.className;
        }

        if (selectedLang) {
          changeLanguage(selectedLang);
        }

        customSelect.classList.remove("active");
        optionsContainer.classList.remove("active");
      });
    });
  }
};

// Evento para cada opción
const mobileLangButtons = document.querySelectorAll(".lang-btn");
if (mobileLangButtons.length > 0) {
  const savedLang = localStorage.getItem("language") || "es";

  mobileLangButtons.forEach((btn) => {
    const btnLang = btn.getAttribute("data-lang");
    if (btnLang === savedLang) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      const selectedLang = btn.getAttribute("data-lang");

      changeLanguage(selectedLang);

      mobileLangButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}
// Cerrar selector al hacer clic fuera

document.addEventListener("click", (e) => {
  if (customSelect && !customSelect.contains(e.target)) {
    customSelect.classList.remove("active");
    optionsContainer.classList.remove("active");
  }
});

// Menu movil

const menuOpen = () => {
  menuInicial?.classList.toggle("active");
};

// Currusel sobre colombia cambiar de cards

let index = 0;

const showCard = (newIndex) => {
  cards.forEach((card) => card.classList.remove("show"));
  if (cards[newIndex]) {
    cards[newIndex].classList.add("show");
  }
};

if (prevBtn.length > 0) {
  prevBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      index = (index + 1) % cards.length;
      showCard(index);
    });
  });
}

if (nextBtn.length > 0) {
  nextBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      index = (index - 1 + cards.length) % cards.length;
      showCard(index);
    });
  });
}

// Carruesel top experiencias en Colombia
let slideIndex = 0;

const moverAderecha = (newIndex) => {
  slides.forEach((slide) => slide.classList.remove("show_active"));
  if (slides[newIndex]) {
    slides[newIndex].classList.add("show_active");
  }
};

if (selectedLenguage) {
  selectedLenguage.addEventListener("click", escogerLenguage);
}

if (openMenu) {
  openMenu.addEventListener("click", menuOpen);
}

if (closeMenu) {
  closeMenu.addEventListener("click", menuOpen);
}

if (btnMoverDerecha) {
  btnMoverDerecha.addEventListener("click", () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    moverAderecha(slideIndex);
  });
}

if (btnMoverIzquierda) {
  btnMoverIzquierda.addEventListener("click", () => {
    slideIndex = (slideIndex + 1) % slides.length;
    moverAderecha(slideIndex);
  });
}

// Inicialización

const init = async () => {
  const translationsLoaded = await loadTranslations();

  if (translationsLoaded) {
    updateContent();
    setActivePage();
    initLanguageSelector();
  } else {
    console.error("No se pudieron cargar las traducciones");
  }
};

document.addEventListener("DOMContentLoaded", init);
