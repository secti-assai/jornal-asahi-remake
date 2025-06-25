// DOM Elements (sem alteração)
const carousel = document.getElementById("newsCarousel")
const slides = carousel.querySelectorAll(".carousel-slide")
let indicators = carousel.querySelectorAll(".indicator")
const prevBtn = carousel.querySelector(".carousel-prev")
const nextBtn = carousel.querySelector(".carousel-next")

// Carousel functionality
let currentSlide = 0
let slideInterval
let slideTimeout

function showSlide(index) {
  indicators = carousel.querySelectorAll(".indicator") // atualiza indicadores
  index = (index + slides.length) % slides.length

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index)
  })

  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === index)
  })

  currentSlide = index
}

function nextSlide() {
  showSlide(currentSlide + 1)
}

function prevSlide() {
  showSlide(currentSlide - 1)
}

function startSlideshow() {
  clearInterval(slideInterval)
  slideInterval = setInterval(nextSlide, 5000)
}

function stopSlideshow() {
  clearInterval(slideInterval)
}

// Controla reinício com timeout para evitar resets múltiplos
function resetSlideshowTimer() {
  stopSlideshow()
  if (slideTimeout) clearTimeout(slideTimeout)
  slideTimeout = setTimeout(() => {
    startSlideshow()
  }, 5000) // reinicia só depois de 5s parado
}

// Event listeners para botões e indicadores
nextBtn.addEventListener("click", () => {
  nextSlide()
  resetSlideshowTimer()
})

prevBtn.addEventListener("click", () => {
  prevSlide()
  resetSlideshowTimer()
})

indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    showSlide(index)
    resetSlideshowTimer()
  })
})

// Pausa slideshow no hover, só em desktop
carousel.addEventListener("mouseenter", () => {
  if (window.innerWidth > 768) stopSlideshow()
})

carousel.addEventListener("mouseleave", () => {
  if (window.innerWidth > 768) startSlideshow()
})

// Inicializa slideshow ao carregar DOM
document.addEventListener("DOMContentLoaded", () => {
  startSlideshow()
})
