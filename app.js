// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
    this.querySelector('svg').classList.toggle('rotate-90');
  });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });

  // GSAP Animations
  gsap.registerEffect({
    name: "fadeIn",
    effect: (targets, config) => {
      return gsap.from(targets, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        ...config
      });
    },
    defaults: {duration: 0.8},
    extendTimeline: true
  });

  // Animate sections on scroll
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out"
    });
  });

  // Animate hero elements
  const tl = gsap.timeline();
  tl.fadeIn("#home h1", {delay: 0.3})
    .fadeIn("#home p", {delay: 0.1})
    .fadeIn("#home .flex", {delay: 0.2})
    .fadeIn(".hero-glasses", {y: -20, duration: 1.5, ease: "elastic.out(1, 0.5)"});

  // Product hover effect
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;
      
      gsap.to(card, {
        rotationX: angleX,
        rotationY: angleY,
        transformPerspective: 1000,
        transformOrigin: "center center",
        ease: "power2.out",
        duration: 0.5
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
      });
    });
  });

  // Parallax effect for hero glasses
  gsap.to(".hero-glasses", {
    scrollTrigger: {
      scrub: 1
    },
    y: 100,
    duration: 1
  });

  // Animated gradient background for featured section
  const featuredSection = document.querySelector('#collection');
  if (featuredSection) {
    gsap.to(featuredSection, {
      backgroundPosition: '100% 50%',
      scrollTrigger: {
        trigger: featuredSection,
        scrub: 1,
        start: "top bottom",
        end: "bottom top"
      }
    });
  }

  // Animated counter for stats
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length > 0) {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-counter');
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000;
      const startTime = Date.now();
      
      const updateCount = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        
        counter.textContent = value.toLocaleString() + suffix;
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };
      
      // Start counting when section is in view
      ScrollTrigger.create({
        trigger: counter.closest('section'),
        start: "top 80%",
        onEnter: updateCount,
        once: true
      });
    });
  }
});

