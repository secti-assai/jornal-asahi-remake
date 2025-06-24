// DOM Elements
const carousel = document.getElementById("newsCarousel")
const slides = carousel.querySelectorAll(".carousel-slide")
const indicators = carousel.querySelectorAll(".indicator")
const prevBtn = carousel.querySelector(".carousel-prev")
const nextBtn = carousel.querySelector(".carousel-next")
const galleryItems = document.querySelectorAll(".gallery-item")
const modal = document.getElementById("imageModal")
const modalImage = document.getElementById("modalImage")
const modalTitle = document.getElementById("modalTitle")
const modalClose = document.querySelector(".modal-close")
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const mobileMenu = document.getElementById("mobileMenu")
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

// Carousel functionality
let currentSlide = 0
let slideInterval // 10 seconds

function showSlide(index) {
  // Remove active class from all slides and indicators
  slides.forEach((slide) => slide.classList.remove("active"))
  indicators.forEach((indicator) => indicator.classList.remove("active"))

  // Add active class to current slide and indicator
  slides[index].classList.add("active")
  indicators[index].classList.add("active")

  currentSlide = index
}

function nextSlide() {
  const next = (currentSlide + 1) % slides.length
  showSlide(next)
}

function prevSlide() {
  const prev = (currentSlide - 1 + slides.length) % slides.length
  showSlide(prev)
}

function startSlideshow() {
  slideInterval = setInterval(nextSlide, 5000)
}

function stopSlideshow() {
  clearInterval(slideInterval)
}

// Event listeners for carousel
nextBtn.addEventListener("click", () => {
  nextSlide()
  stopSlideshow()
  startSlideshow()
})

prevBtn.addEventListener("click", () => {
  prevSlide()
  stopSlideshow()
  startSlideshow()
})

indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    showSlide(index)
    stopSlideshow()
    startSlideshow()
  })
})

// Pause slideshow on hover
carousel.addEventListener("mouseenter", stopSlideshow)
carousel.addEventListener("mouseleave", startSlideshow)

// Gallery modal functionality
galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img")
    const title = item.getAttribute("data-title")

    modalImage.src = img.src
    modalImage.alt = title
    modalTitle.textContent = title
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  })
})

// Close modal
function closeModal() {
  modal.classList.remove("active")
  document.body.style.overflow = "auto"
}

modalClose.addEventListener("click", closeModal)
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal()
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal()
  }
})

// Mobile menu functionality
mobileMenuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")
})

// Close mobile menu when clicking on links
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
  })
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
    mobileMenu.classList.remove("active")
  }
})

// Smooth scrolling for navigation links
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

// Active navigation link highlighting
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

// Scroll event listener for active nav link
window.addEventListener("scroll", updateActiveNavLink)

// Intersection Observer for animations
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
document.querySelectorAll(".gallery-item, .interview-card, .live-card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Video play functionality
document.querySelectorAll(".video-container, .video-thumbnail").forEach((container) => {
  container.addEventListener("click", () => {
    // In a real implementation, you would open the video in a modal or redirect to YouTube
    console.log("Video clicked - would open video player")
    // Example: window.open('https://youtube.com/watch?v=VIDEO_ID', '_blank');
  })
})

// Loading animation for images
function addImageLoadingEffect() {
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    if (!img.complete) {
      img.classList.add("loading")
      img.addEventListener("load", () => {
        img.classList.remove("loading")
      })
    }
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  startSlideshow()
  addImageLoadingEffect()
  updateActiveNavLink()

  // Add entrance animations
  setTimeout(() => {
    document.querySelectorAll(".hero-section > *").forEach((el, index) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease"

      setTimeout(() => {
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
      }, index * 200)
    })
  }, 100)
})

// Handle window resize
window.addEventListener("resize", () => {
  // Close mobile menu on resize to desktop
  if (window.innerWidth > 768) {
    mobileMenu.classList.remove("active")
  }
})

// Performance optimization: Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.removeAttribute("data-src")
          imageObserver.unobserve(img)
        }
      }
    })
  })

  // Observe images with data-src attribute
  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}

// Add click ripple effect to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple effect styles
const rippleStyle = document.createElement("style")
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(rippleStyle)
