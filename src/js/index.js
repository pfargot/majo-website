import i18next from 'i18next'
import '../css/style.css'

i18next.init(
  {
    lng: 'en',
    debug: false,
    resources: {
      en: {
        translation: {
          nav: { home: 'Home', about: 'About', contact: 'Contact' },
          hero: {
            hey: 'Hey There 👋 I am',
            title: 'Mariajosé Argote',
            subtitle: 'Founder, Advisor & Growth Strategist',
            desc: 'Mariajosé Argote is a purpose-driven founder, advisor, and growth strategist with 10+ years of international experience.',
            connect: 'Connect With Me',
          },
          about: {
            quick: 'A quick intro',
            heading: 'About',
            desc1:
              'Mariajosé Argote is a purpose-driven founder, advisor, and growth strategist with 10+ years of international experience. She has led operations, strategic partnerships, and venture growth in the US, UK, EU, and Latin America. Her leadership spans industries including insurtech, healthtech, and mobility.',
            desc2:
              'For insights into my professional journey, my <1>LinkedIn</1> profile is available for review. If you want to connect or discuss shared interests, head to the <3>contact section</3> below.',
          },
          contact: {
            want: 'Want to stay in touch?',
            heading: "Let's connect!",
            desc: 'Feel free to connect and explore collaboration opportunities. Cheers!',
            email: 'Email',
            linkedin: 'LinkedIn',
            thanks: 'Thanks for stopping by! 👋',
          },
        },
      },
      fr: {
        translation: {
          nav: { home: 'Accueil', about: 'À propos', contact: 'Contact' },
          hero: {
            hey: 'Bonjour 👋 Je suis',
            title: 'Mariajosé Argote',
            subtitle: 'Fondatrice, Conseillère & Stratège de Croissance',
            desc: 'Mariajosé Argote est une fondatrice, conseillère et stratège de croissance animée par une mission, avec plus de 10 ans d’expérience internationale.',
            connect: 'Entrer en contact',
          },
          about: {
            quick: 'Petite introduction',
            heading: 'À propos',
            desc1:
              'Mariajosé Argote est une fondatrice, conseillère et stratège de croissance animée par une mission, avec plus de 10 ans d’expérience internationale. Elle a dirigé des opérations, des partenariats stratégiques et la croissance de start-ups aux États-Unis, au Royaume-Uni, dans l’UE et en Amérique latine. Son leadership s’étend à des secteurs comme l’insurtech, la healthtech et la mobilité.',
            desc2:
              'Pour en savoir plus sur mon parcours professionnel, mon <1>LinkedIn</1> est disponible. Pour échanger ou discuter d’intérêts communs, rendez-vous dans la <3>section contact</3> ci-dessous.',
          },
          contact: {
            want: 'Envie de rester en contact ?',
            heading: 'Restons connectés !',
            desc: 'N’hésitez pas à me contacter pour explorer des opportunités de collaboration. À bientôt !',
            email: 'Email',
            linkedin: 'LinkedIn',
            thanks: 'Merci de votre visite ! 👋',
          },
        },
      },
      es: {
        translation: {
          nav: { home: 'Inicio', about: 'Sobre mí', contact: 'Contacto' },
          hero: {
            hey: '¡Hola! 👋 Soy',
            title: 'Mariajosé Argote',
            subtitle: 'Fundadora, Asesora y Estratega de Crecimiento',
            desc: 'Mariajosé Argote es una fundadora, asesora y estratega de crecimiento con propósito y más de 10 años de experiencia internacional.',
            connect: 'Conectar conmigo',
          },
          about: {
            quick: 'Una breve introducción',
            heading: 'Sobre mí',
            desc1:
              'Mariajosé Argote es una fundadora, asesora y estratega de crecimiento con propósito y más de 10 años de experiencia internacional. Ha liderado operaciones, alianzas estratégicas y el crecimiento de startups en EE.UU., Reino Unido, UE y América Latina. Su liderazgo abarca sectores como insurtech, healthtech y movilidad.',
            desc2:
              'Para conocer más sobre mi trayectoria profesional, mi <1>LinkedIn</1> está disponible. Si quieres conectar o hablar de intereses comunes, dirígete a la <3>sección de contacto</3> abajo.',
          },
          contact: {
            want: '¿Quieres mantenerte en contacto?',
            heading: '¡Conectemos!',
            desc: 'No dudes en contactarme para explorar oportunidades de colaboración. ¡Gracias!',
            email: 'Correo',
            linkedin: 'LinkedIn',
            thanks: '¡Gracias por tu visita! 👋',
          },
        },
      },
    },
  },
  function () {
    updateContent()
  }
)

function updateContent() {
  document.querySelector('[data-i18n="nav-home"]').textContent =
    i18next.t('nav.home')
  document.querySelector('[data-i18n="nav-about"]').textContent =
    i18next.t('nav.about')
  document.querySelector('[data-i18n="nav-contact"]').textContent =
    i18next.t('nav.contact')
  document.querySelector('[data-i18n="hero-hey"]').textContent =
    i18next.t('hero.hey')
  document.querySelector('[data-i18n="hero-title"]').textContent =
    i18next.t('hero.title')
  document.querySelector('[data-i18n="hero-subtitle"]').textContent =
    i18next.t('hero.subtitle')
  document.querySelector('[data-i18n="hero-desc"]').textContent =
    i18next.t('hero.desc')
  document.querySelector('[data-i18n="hero-connect"]').textContent =
    i18next.t('hero.connect')
  document.querySelector('[data-i18n="about-quick"]').textContent =
    i18next.t('about.quick')
  document.querySelector('[data-i18n="about-heading"]').textContent =
    i18next.t('about.heading')
  document.querySelector('[data-i18n="about-desc1"]').textContent =
    i18next.t('about.desc1')
  document.querySelector('[data-i18n="about-desc2"]').innerHTML = i18next
    .t('about.desc2')
    .replace(
      '<1>',
      '<a href="https://www.linkedin.com/in/majoargote/" target="_blank">'
    )
    .replace('</1>', '</a>')
    .replace('<3>', '<a href="#contact" class="menu-scroll">')
    .replace('</3>', '</a>')
  document.querySelector('[data-i18n="contact-want"]').textContent =
    i18next.t('contact.want')
  document.querySelector('[data-i18n="contact-heading"]').textContent =
    i18next.t('contact.heading')
  document.querySelector('[data-i18n="contact-desc"]').textContent =
    i18next.t('contact.desc')
  document.querySelector('[data-i18n="contact-email"]').textContent =
    i18next.t('contact.email')
  document.querySelector('[data-i18n="contact-linkedin"]').textContent =
    i18next.t('contact.linkedin')
  document.querySelector('[data-i18n="contact-thanks"]').textContent =
    i18next.t('contact.thanks')
}

document.querySelectorAll('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', function (e) {
    e.preventDefault()
    i18next.changeLanguage(btn.dataset.lang, updateContent)
  })
})

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
