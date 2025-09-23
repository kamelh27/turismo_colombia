const optionsLenguage = document.querySelector(".options");
const selectedLenguage = document.querySelector(".selected");
const customSelect = document.querySelector(".custom-select");
const openMenu = document.querySelector(".icon-menu");
const closeMenu = document.querySelector(".icon-close");
const menuInicial = document.querySelector(".movil");
const cards = document.querySelectorAll(".card-conteiner");
const prevBtn = document.querySelectorAll(".prev");
const nextBtn = document.querySelectorAll(".next");
const btnMoverDerecha = document.querySelector(".btn-mover-derecha");
const btnMoverIzquierda = document.querySelector(".btn-mover-izquierda");
const slides = document.querySelectorAll(".slide");

// Selección de lenguaje
const escogerLenguage = () => {
  optionsLenguage.classList.toggle("active");
  customSelect.classList.toggle("active");
  const options = optionsLenguage.querySelectorAll("div");
  const selectedImg = selectedLenguage.querySelector("img");

  options.forEach((option) => {
    option.addEventListener("click", () => {
      selectedImg.src = option.querySelector("img").src;
      selectedImg.alt = option.querySelector("img").alt;
      optionsLenguage.classList.remove("active");
      customSelect.classList.remove("active");
    });
  });
};

// Menu movil
const menuOpen = () => {
  openMenu !== "clicked"
    ? menuInicial.classList.toggle("active")
    : menuInicial.classList.remove("active");
};

// Carrusel sobre Colombia cambiar de cards

let index = 0;

const showCard = (newIndex) => {
  cards.forEach((card) => card.classList.remove("show"));
  cards[newIndex].classList.add("show");
};

prevBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    index = (index + 1) % cards.length;
    showCard(index);
  });
});

nextBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    index = (index - 1 + cards.length) % cards.length;
    showCard(index);
  });
});

// Carrusel top experencias en colombia

let slideIndex = 0;
const moverAderecha = (newIndex) => {
  console.log("hola");
  slides.forEach((slide) => slide.classList.remove("show_active"));
  slides[newIndex].classList.add("show_active");
};

selectedLenguage.addEventListener("click", escogerLenguage);
openMenu.addEventListener("click", menuOpen);
closeMenu.addEventListener("click", menuOpen);

btnMoverDerecha.addEventListener("click", () => {
  console.log(slides);
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  moverAderecha(slideIndex);
});

btnMoverIzquierda.addEventListener("click", () => {
  slideIndex = (slideIndex + 1) % slides.length;
  moverAderecha(slideIndex);
});
