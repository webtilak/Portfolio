// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
})

// GSAP Animations
gsap.registerPlugin(ScrollTrigger)

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Mobile menu toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Typed.js for hero text animation
const typed = new Typed("#typed-text", {
  strings: ["Full-Stack Developer", "Problem Solver"],
  typeSpeed: 100,
  backSpeed: 60,
  backDelay: 2000,
  loop: true,
})

// Three.js background for hero section
function initThreeJS() {
  const heroBackground = document.getElementById("hero-bg")
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ alpha: true })

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 0)
  heroBackground.appendChild(renderer.domElement)

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 1000
  const posArray = new Float32Array(particlesCount * 3)

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10
  }

  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
  })

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particlesMesh)

  camera.position.z = 3

  // Animation loop
  function animate() {
    requestAnimationFrame(animate)
    particlesMesh.rotation.x += 0.0005
    particlesMesh.rotation.y += 0.0005
    renderer.render(scene, camera)
  }

  animate()

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}

// Initialize Three.js when page loads
window.addEventListener("load", initThreeJS)

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-count"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    // Trigger animation when element comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter()
          observer.unobserve(entry.target)
        }
      })
    })

    observer.observe(counter)
  })
}

// Skill bars animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillBar = entry.target
        const width = skillBar.getAttribute("data-width")
        skillBar.style.width = width
        observer.unobserve(entry.target)
      }
    })
  })

  skillBars.forEach((bar) => observer.observe(bar))
}

// GSAP ScrollTrigger animations
gsap.from(".hero-text", {
  duration: 1,
  y: 100,
  opacity: 0,
  ease: "power3.out",
})

gsap.from(".floating-card", {
  duration: 1,
  scale: 0,
  opacity: 0,
  stagger: 0.2,
  delay: 0.5,
  ease: "back.out(1.7)",
})

// Project cards hover effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      duration: 0.3,
      y: -10,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      ease: "power2.out",
    })
  })

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      duration: 0.3,
      y: 0,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      ease: "power2.out",
    })
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Contact form handling
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Simple form validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields")
    return
  }

  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent

  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  setTimeout(() => {
    alert("Thank you for your message! I'll get back to you soon.")
    this.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
})

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  animateCounters()
  animateSkillBars()

  // Add scroll reveal animations
  const revealElements = document.querySelectorAll(".fade-in")

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        revealObserver.unobserve(entry.target)
      }
    })
  })

  revealElements.forEach((el) => revealObserver.observe(el))
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".floating-card")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Animate hero elements
  gsap
    .timeline()
    .from(".hero-title", { duration: 1, y: 50, opacity: 0, ease: "power3.out" })
    .from(".hero-subtitle", { duration: 0.8, y: 30, opacity: 0, ease: "power3.out" }, "-=0.5")
    .from(".hero-description", { duration: 0.8, y: 30, opacity: 0, ease: "power3.out" }, "-=0.3")
    .from(".hero-buttons", { duration: 0.8, y: 30, opacity: 0, ease: "power3.out" }, "-=0.3")
})

// dynamic date change in footer
const yearSpan = document.getElementById("current-year")
const currentYear = new Date().getFullYear()
yearSpan.innerHTML = `&copy; ${currentYear} Tilak Badgujar. All rights reserved.`
