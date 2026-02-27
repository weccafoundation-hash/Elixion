document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger) {
    const toggleMenu = () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isExpanded);

      // Optional: Prevent body scroll when menu is active on mobile
      if (isExpanded && window.innerWidth <= 992) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking a nav-link (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          toggleMenu();
        }
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMenu();
        hamburger.focus(); // return focus
      }
    });
  }

  // Active Link Highlighting
  const currentLocation = location.href;
  const navLinks = document.querySelectorAll('.nav-link');
  const pathName = location.pathname;

  navLinks.forEach(link => {
    // Exact match or contains for sub-pages
    const linkPath = new URL(link.href, window.location.origin).pathname;

    // Default to handling index.html mapping to /
    if ((pathName === '/' || pathName.endsWith('elixion-prime/')) && linkPath.includes('index.html')) {
      link.classList.add('active');
    } else if (pathName.includes(linkPath) && !linkPath.endsWith('/')) {
      link.classList.add('active');
    } else if (link.href === currentLocation) {
      link.classList.add('active');
    }
  });

  // Highlight index if no specific page is active (for local dev root)
  const hasActive = Array.from(navLinks).some(link => link.classList.contains('active'));
  if (!hasActive && navLinks.length > 0) {
    const isRoot = pathName === '/' || pathName.endsWith('/elixion-prime/');
    if (isRoot) {
      navLinks[0].classList.add('active');
    }
  }

  // Accordion Logic for FAQ
  const accordions = document.querySelectorAll('.accordion-btn');
  accordions.forEach(acc => {
    acc.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);

      const content = this.nextElementSibling;
      if (!expanded) {
        content.style.maxHeight = content.scrollHeight + "px";
        this.classList.add('active');
      } else {
        content.style.maxHeight = null;
        this.classList.remove('active');
      }
    });
  });

  // Back to Top Button Logic
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '&#8593;';
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

