import '../css/style.css'

// Lazy load non-critical libraries
const loadLibraries = () => {
  // Load CSS first
  const loadStyles = [
    import('../../node_modules/glightbox/dist/css/glightbox.min.css'),
    import('../css/animate.css'),
  ]

  // Then load and initialize libraries
  Promise.all(loadStyles).then(() => {
    Promise.all([import('glightbox'), import('wowjs')]).then(
      ([GLightbox, WOW]) => {
        // Initialize GLightbox
        GLightbox.default({
          type: 'image',
        })

        // Initialize WOW
        new WOW.default.WOW({
          live: false,
          offset: 50,
        }).init()
      }
    )
  })
}

// Only load portfolio-related code if portfolio section exists
if (document.querySelector('.portfolio-container')) {
  Promise.all([import('imagesloaded'), import('isotope-layout')]).then(
    ([imagesLoaded, Isotope]) => {
      const portfolioContainer = document.querySelector('.portfolio-container')
      imagesLoaded.default(portfolioContainer, function () {
        const elem = document.querySelector('.items-wrapper')
        if (elem) {
          const iso = new Isotope.default(elem, {
            itemSelector: '.item',
            masonry: {
              columnWidth: '.item',
            },
          })

          // Add filter functionality
          document
            .querySelectorAll('.portfolio-buttons button')
            .forEach((button) => {
              button.addEventListener('click', (event) => {
                const filterValue = event.target.getAttribute('data-filter')
                iso.arrange({ filter: filterValue })

                // Update active state
                document
                  .querySelectorAll('.portfolio-buttons button')
                  .forEach((btn) => {
                    btn.classList.remove('active')
                  })
                event.target.classList.add('active')
              })
            })
        }
      })
    }
  )
}

// Navbar functionality
const initNavbar = () => {
  const navbarToggler = document.querySelector('#navbarToggler')
  const navbarCollapse = document.querySelector('#navbarCollapse')

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', () => {
      navbarToggler.classList.toggle('navbarTogglerActive')
      navbarCollapse.classList.toggle('hidden')
    })

    // Close navbar on link click
    document
      .querySelectorAll('#navbarCollapse ul li:not(.submenu-item) a')
      .forEach((link) => {
        link.addEventListener('click', () => {
          navbarToggler.classList.remove('navbarTogglerActive')
          navbarCollapse.classList.add('hidden')
        })
      })
  }

  // Sub-menu functionality
  document.querySelectorAll('.submenu-item').forEach((item) => {
    const link = item.querySelector('a')
    const submenu = item.querySelector('.submenu')
    if (link && submenu) {
      link.addEventListener('click', () => {
        submenu.classList.toggle('hidden')
      })
    }
  })
}

// Sticky header and back-to-top functionality
const initScrollEffects = () => {
  const header = document.querySelector('.header')
  const backToTop = document.querySelector('.back-to-top')

  if (header && backToTop) {
    window.addEventListener('scroll', () => {
      // Sticky header
      header.classList.toggle('sticky', window.pageYOffset > header.offsetTop)

      // Back to top button
      backToTop.style.display =
        document.documentElement.scrollTop > 50 ? 'flex' : 'none'
    })

    // Smooth scroll to top
    backToTop.addEventListener('click', (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    })
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initNavbar()
  initScrollEffects()

  // Lazy load non-critical features
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadLibraries)
  } else {
    setTimeout(loadLibraries, 1000)
  }
})
