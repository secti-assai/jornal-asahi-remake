// DOM Elements (Hero carousel - mantido intacto)
const carousel = document.getElementById("newsCarousel")
const slides = carousel.querySelectorAll(".carousel-slide")
let indicators = carousel.querySelectorAll(".indicator")
const prevBtn = carousel.querySelector(".carousel-prev")
const nextBtn = carousel.querySelector(".carousel-next")

// Carousel functionality (mantido)
let currentSlide = 0
let slideInterval
let slideTimeout

function showSlide(index) {
  indicators = carousel.querySelectorAll(".indicator")
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

function resetSlideshowTimer() {
  stopSlideshow()
  if (slideTimeout) clearTimeout(slideTimeout)
  slideTimeout = setTimeout(() => {
    startSlideshow()
  }, 5000)
}

// Event listeners para botões e indicadores (mantido)
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

carousel.addEventListener("mouseenter", () => {
  if (window.innerWidth > 768) stopSlideshow()
})

carousel.addEventListener("mouseleave", () => {
  if (window.innerWidth > 768) startSlideshow()
})

// Inicializa slideshow ao carregar DOM (mantido)
document.addEventListener("DOMContentLoaded", () => {
  startSlideshow()
  initializeNewFeatures()
})

// Novas funcionalidades
function initializeNewFeatures() {
  initializeNewsSlider()
  initializeGallery()
  initializePolls()
  initializeMobileMenu()
  initializeScrollAnimations()
  initializeInterviews()
}

// Gallery Modal
function initializeGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item")
  const modal = document.getElementById("imageModal")
  const modalImage = document.getElementById("modalImage")
  const modalTitle = document.getElementById("modalTitle")
  const modalClose = document.querySelector(".modal-close")

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img")
      const title = item.getAttribute("data-title")

      modalImage.src = img.src
      modalTitle.textContent = title
      modal.classList.add("active")
      document.body.style.overflow = "hidden"
    })
  })

  modalClose.addEventListener("click", closeModal)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal()
  })

  function closeModal() {
    modal.classList.remove("active")
    document.body.style.overflow = "auto"
  }

  // Escape key to close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal()
    }
  })
}

// Polls functionality
function initializePolls() {
  const pollForms = document.querySelectorAll(".poll-form")

  pollForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = new FormData(form)
      const selectedOption = formData.get(form.querySelector('input[type="radio"]').name)

      if (!selectedOption) {
        alert("Por favor, selecione uma opção antes de votar.")
        return
      }

      // Simulate vote submission
      const submitBtn = form.querySelector(".poll-submit")
      const originalText = submitBtn.innerHTML

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'
      submitBtn.disabled = true

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Voto registrado!'
        submitBtn.style.background = "#10b981"

        // Update percentages (simulate)
        updatePollResults(form)

        setTimeout(() => {
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
          submitBtn.style.background = ""
        }, 2000)
      }, 1500)
    })
  })
}

function updatePollResults(form) {
  const options = form.querySelectorAll(".poll-option")
  const totalVotes = Math.floor(Math.random() * 100) + 50

  options.forEach((option, index) => {
    const percentage = option.querySelector(".option-percentage")
    const newPercentage = Math.floor(Math.random() * 40) + 20
    percentage.textContent = `${newPercentage}%`

    // Add visual feedback
    option.style.background = "#f0fdf4"
    option.style.borderColor = "#10b981"

    setTimeout(() => {
      option.style.background = ""
      option.style.borderColor = ""
    }, 3000)
  })

  // Update vote count
  const voteCount = form.closest(".poll-card").querySelector(".poll-votes")
  if (voteCount) {
    const currentVotes = Number.parseInt(voteCount.textContent.replace(/\D/g, ""))
    voteCount.textContent = `${currentVotes + 1} votos`
  }
}

// Mobile Menu
function initializeMobileMenu() {
  const mobileToggle = document.querySelector(".mobile-menu-toggle")
  const mobileMenu = document.getElementById("mobileMenu")
  const mobileLinks = document.querySelectorAll(".mobile-nav-link")

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileToggle.classList.toggle("active")
      if (mobileToggle.classList.contains("active")) {
        mobileMenu.classList.add("active")
        document.mobileToggle.style.overflow = "hidden"
      } else {
        mobileMenu.classList.remove("active")
         document.mobileToggle.style.overflow = "auto"
      }
    })

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
         document.mobileToggle.style.overflow = "auto"
      })
    })

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileMenu.classList.remove("active")
        document.body.style.overflow = "auto"
      }
    })
  }
}

// Scroll Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".news-card, .poll-card, .interview-card, .gallery-item")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

// Interview Videos
function initializeInterviews() {
  const videoThumbnails = document.querySelectorAll(".video-thumbnail")

  videoThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      // Simulate video play
      const playOverlay = thumbnail.querySelector(".play-overlay")
      const icon = playOverlay.querySelector("i")

      icon.className = "fas fa-spinner fa-spin"

      setTimeout(() => {
        alert("Funcionalidade de vídeo será implementada em breve!")
        icon.className = "fas fa-play"
      }, 1000)
    })
  })
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Forum stats animation
function animateStats() {
  const stats = document.querySelectorAll(".stat-number")

  stats.forEach((stat) => {
    const finalValue = stat.textContent
    const numericValue = Number.parseFloat(finalValue.replace(/[^\d.]/g, ""))
    const suffix = finalValue.replace(/[\d.]/g, "")

    let currentValue = 0
    const increment = numericValue / 50

    const timer = setInterval(() => {
      currentValue += increment
      if (currentValue >= numericValue) {
        currentValue = numericValue
        clearInterval(timer)
      }

      if (suffix === "k") {
        stat.textContent = (currentValue / 1000).toFixed(1) + "k"
      } else {
        stat.textContent = Math.floor(currentValue) + suffix
      }
    }, 30)
  })
}

// Trigger stats animation when forum section is visible
const forumSection = document.querySelector(".forum-section")
if (forumSection) {
  const forumObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats()
          forumObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  forumObserver.observe(forumSection)
}

// Add loading states for buttons
document.querySelectorAll(".btn").forEach((btn) => {
  if (!btn.classList.contains("poll-submit")) {
    btn.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#" || !this.getAttribute("href")) {
        e.preventDefault()

        const originalText = this.innerHTML
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...'
        this.disabled = true

        setTimeout(() => {
          this.innerHTML = originalText
          this.disabled = false
        }, 2000)
      }
    })
  }
})

// News Slider functionality
function initializeNewsSlider() {
  const newsTrack = document.getElementById("newsTrack")
  const newsSlides = document.querySelectorAll(".news-slide")
  const prevBtn = document.getElementById("newsPrev")
  const nextBtn = document.getElementById("newsNext")
  const indicators = document.querySelectorAll(".news-indicator")
  const progressBar = document.getElementById("newsProgressBar")

  let currentNewsSlide = 0
  let newsSliderInterval
  let isNewsSliderPlaying = true
  const slideCount = newsSlides.length
  const autoPlayDuration = 6000 // 6 seconds

  function updateNewsSlider() {
    // Update track position
    const translateX = -currentNewsSlide * 100
    newsTrack.style.transform = `translateX(${translateX}%)`

    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentNewsSlide)
      indicator.classList.toggle("playing", index === currentNewsSlide && isNewsSliderPlaying)
    })

    // Update progress bar
    const progress = ((currentNewsSlide + 1) / slideCount) * 100
    progressBar.style.width = `${progress}%`

    // Update navigation buttons
    prevBtn.disabled = currentNewsSlide === 0
    nextBtn.disabled = currentNewsSlide === slideCount - 1
  }

  function nextNewsSlide() {
    if (currentNewsSlide < slideCount - 1) {
      currentNewsSlide++
    } else {
      currentNewsSlide = 0 // Loop back to first slide
    }
    updateNewsSlider()
  }

  function prevNewsSlide() {
    if (currentNewsSlide > 0) {
      currentNewsSlide--
    } else {
      currentNewsSlide = slideCount - 1 // Loop to last slide
    }
    updateNewsSlider()
  }

  function goToNewsSlide(index) {
    currentNewsSlide = index
    updateNewsSlider()
  }

  function startNewsAutoPlay() {
    stopNewsAutoPlay()
    newsSliderInterval = setInterval(() => {
      nextNewsSlide()
    }, autoPlayDuration)
    isNewsSliderPlaying = true
    updateNewsSlider()
  }

  function stopNewsAutoPlay() {
    if (newsSliderInterval) {
      clearInterval(newsSliderInterval)
      newsSliderInterval = null
    }
    isNewsSliderPlaying = false
    indicators.forEach((indicator) => indicator.classList.remove("playing"))
  }

  function resetNewsAutoPlay() {
    if (isNewsSliderPlaying) {
      startNewsAutoPlay()
    }
  }

  // Event listeners
  nextBtn.addEventListener("click", () => {
    nextNewsSlide()
    resetNewsAutoPlay()
  })

  prevBtn.addEventListener("click", () => {
    prevNewsSlide()
    resetNewsAutoPlay()
  })

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      goToNewsSlide(index)
      resetNewsAutoPlay()
    })
  })

  // Pause on hover (desktop only)
  const newsSliderContainer = document.querySelector(".news-slider-container")
  if (window.innerWidth > 768) {
    newsSliderContainer.addEventListener("mouseenter", stopNewsAutoPlay)
    newsSliderContainer.addEventListener("mouseleave", () => {
      if (isNewsSliderPlaying) startNewsAutoPlay()
    })
  }

  // Touch/swipe support for mobile
  let startX = 0
  let currentX = 0
  let isDragging = false

  newsSliderContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX
    isDragging = true
    stopNewsAutoPlay()
  })

  newsSliderContainer.addEventListener("touchmove", (e) => {
    if (!isDragging) return
    currentX = e.touches[0].clientX
    e.preventDefault()
  })

  newsSliderContainer.addEventListener("touchend", () => {
    if (!isDragging) return
    isDragging = false

    const diffX = startX - currentX
    const threshold = 50

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        nextNewsSlide()
      } else {
        prevNewsSlide()
      }
    }

    resetNewsAutoPlay()
  })

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.target.closest(".news-slider-container")) {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          prevNewsSlide()
          resetNewsAutoPlay()
          break
        case "ArrowRight":
          e.preventDefault()
          nextNewsSlide()
          resetNewsAutoPlay()
          break
        case " ":
          e.preventDefault()
          if (isNewsSliderPlaying) {
            stopNewsAutoPlay()
          } else {
            startNewsAutoPlay()
          }
          break
      }
    }
  })

  // Initialize
  updateNewsSlider()
  startNewsAutoPlay()

  // Pause autoplay when page is not visible
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopNewsAutoPlay()
    } else if (isNewsSliderPlaying) {
      startNewsAutoPlay()
    }
  })
}
