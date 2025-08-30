
const portfolioData = {
  personalInfo: {
    name: "Lucky Giri",
    title: "Full Stack Developer",
    email: "lucky.giri@email.com",
    phone: "+91 XXXXX-XXXXX",
    bio: "Passionate full-stack developer with 3+ years of experience creating innovative web solutions. I specialize in modern JavaScript frameworks and have a keen eye for design. When I'm not coding, you can find me exploring new technologies or contributing to open-source projects."
  },
  skills: [
    { name: "HTML5", level: 85 },
    { name: "CSS3", level: 80 },
    { name: "JavaScript", level: 65 },
    { name: "React", level: 50 },
    { name: "Node.js", level: 45 },
    { name: "Python", level: 70 },
    { name: "UI/UX Design", level: 65 },
    { name: "Database Design", level: 60 }
  ],
  projects: [
    {
      title: "Interactive Calculator",
      description: "Modern calculator application with advanced CSS grid layout and JavaScript functionality for all basic arithmetic operations.",
      tech: ["HTML5", "CSS", "JavaScript"],
      demoLink: "#",
      codeLink: "https://github.com/Lucky-Giri-02/Codesoft-Calculator"
    }
  ],
  experience: [
    
    {
      title: "Frontend Developer",
      company: "XVZ Solutions",
      period: "XXXX - Present",
      description: "Developed and maintained websites using modern technologies"
    },
    {
      title: "Junior Web Developer",
      company: "XYZ SOLUTIONS",
      period: "XXXX - XXXX",
      description: "Built responsive websites and landing pages for clients"
    }
  ]
};

// DOM elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const dynamicTitle = document.getElementById('dynamic-title');
const aboutBio = document.querySelector('.about-bio');
const skillsGrid = document.querySelector('.skills-grid');
const projectsGrid = document.querySelector('.projects-grid');
const timelineItems = document.querySelector('.timeline-items');
const contactForm = document.querySelector('.contact-form');

const titles = [
  "Full Stack Developer",
  "UI/UX Designer", 
  "Web Enthusiast",
  "Tech Lover"
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

document.addEventListener('DOMContentLoaded', () => {

  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 2000);

  initNavigation();
  initTypingAnimation();
  populateContent();
  initScrollAnimations();
  initCounters();
  initFormHandling();
});

function initNavigation() {

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
      const offsetTop = target.offsetTop - 80; 
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      smoothScrollTo(targetId);
    });
  });

  document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      smoothScrollTo(targetId);
    });
  });

  document.querySelectorAll('a[href^="#"]:not(.nav-link):not(.hero-buttons .btn)').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        smoothScrollTo(targetId);
      }
    });
  });
}

function initTypingAnimation() {
  function typeText() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
      dynamicTitle.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      
      if (charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(typeText, 500);
      } else {
        setTimeout(typeText, 50);
      }
    } else {
      dynamicTitle.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      
      if (charIndex === currentTitle.length) {
        isDeleting = true;
        setTimeout(typeText, 2000);
      } else {
        setTimeout(typeText, 100);
      }
    }
  }
  
  typeText();
}

function populateContent() {

  if (aboutBio) {
    aboutBio.textContent = portfolioData.personalInfo.bio;
  }

  if (skillsGrid) {
    skillsGrid.innerHTML = portfolioData.skills.map(skill => `
      <div class="skill-card">
        <h3 class="skill-name">${skill.name}</h3>
        <div class="skill-bar">
          <div class="skill-progress" data-progress="${skill.level}"></div>
        </div>
        <div class="skill-percentage">${skill.level}%</div>
      </div>
    `).join('');
  }

  if (projectsGrid) {
    projectsGrid.innerHTML = portfolioData.projects.map(project => `
      <div class="project-card">
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tech">
            ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
          <div class="project-links">
            <a href="${project.demoLink}" class="project-link" target="_blank">Live Demo</a>
            <a href="${project.codeLink}" class="project-link" target="_blank">View Code</a>
          </div>
        </div>
      </div>
    `).join('');
  }

  if (timelineItems) {
    timelineItems.innerHTML = portfolioData.experience.map(exp => `
      <div class="timeline-item">
        <div class="timeline-title">${exp.title}</div>
        <div class="timeline-company">${exp.company}</div>
        <div class="timeline-period">${exp.period}</div>
        <div class="timeline-description">${exp.description}</div>
      </div>
    `).join('');
  }
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        

        if (entry.target.classList.contains('skills')) {
          animateSkillBars();
        }

        if (entry.target.classList.contains('about')) {
          animateCounters();
        }
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });

  const cards = document.querySelectorAll('.skill-card, .project-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
}

function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      const progress = bar.getAttribute('data-progress');
      bar.style.width = progress + '%';
    }, index * 100);
  });
}

// Counter animation
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const increment = target / 60; 
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });
  }

  window.animateCounters = animateCounters;
}

function initFormHandling() {
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');

      // Clear previous error states
      clearFormErrors();

      let hasErrors = false;

      // Basic validation with visual feedback
      if (!name || name.trim() === '') {
        showFieldError('name', 'Please enter your name');
        hasErrors = true;
      }

      if (!email || email.trim() === '') {
        showFieldError('email', 'Please enter your email');
        hasErrors = true;
      } else if (!isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        hasErrors = true;
      }

      if (!subject || subject.trim() === '') {
        showFieldError('subject', 'Please enter a subject');
        hasErrors = true;
      }

      if (!message || message.trim() === '') {
        showFieldError('message', 'Please enter your message');
        hasErrors = true;
      }

      if (hasErrors) {
        showNotification('Please fix the errors above', 'error');
        return;
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        showNotification('Message sent successfully!', 'success');
        
        // Reset form labels
        resetFormLabels();
      }, 2000);
    });


    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      input.addEventListener('focus', () => {
        const label = input.nextElementSibling;
        if (label) {
          label.style.top = '-10px';
          label.style.fontSize = '0.8rem';
          label.style.color = 'var(--color-primary)';
        }
        // Clear error state on focus
        clearFieldError(input.name);
      });

      input.addEventListener('blur', () => {
        if (!input.value) {
          const label = input.nextElementSibling;
          if (label) {
            label.style.top = '15px';
            label.style.fontSize = '1rem';
            label.style.color = 'var(--color-text-secondary)';
          }
        }
      });

      // Real-time validation
      input.addEventListener('input', () => {
        clearFieldError(input.name);
      });
    });
  }
}

function showFieldError(fieldName, message) {
  const field = document.querySelector(`[name="${fieldName}"]`);
  if (field) {
    field.style.borderColor = '#ff4444';
    field.style.boxShadow = '0 0 5px rgba(255, 68, 68, 0.3)';

    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'field-error';
      errorElement.style.cssText = `
        color: #ff4444;
        font-size: 0.8rem;
        margin-top: 5px;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
    setTimeout(() => errorElement.style.opacity = '1', 100);
  }
}

function clearFieldError(fieldName) {
  const field = document.querySelector(`[name="${fieldName}"]`);
  if (field) {
    field.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    field.style.boxShadow = 'none';
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.style.opacity = '0';
      setTimeout(() => errorElement.remove(), 300);
    }
  }
}

function clearFormErrors() {
  const errorElements = contactForm.querySelectorAll('.field-error');
  errorElements.forEach(error => error.remove());
  
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    input.style.boxShadow = 'none';
  });
}

function resetFormLabels() {
  const labels = contactForm.querySelectorAll('label');
  labels.forEach(label => {
    label.style.top = '15px';
    label.style.fontSize = '1rem';
    label.style.color = 'var(--color-text-secondary)';
  });
}

// Utility functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button class="notification-close">&times;</button>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background: ${type === 'success' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'};
    border: 1px solid ${type === 'success' ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)'};
    color: ${type === 'success' ? '#00ff00' : '#ff4444'};
    border-radius: 10px;
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 15px;
    font-weight: 500;
    backdrop-filter: blur(10px);
    transform: translateX(400px);
    transition: transform 0.3s ease;
  `;

  // Add close button styles
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: inherit;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    removeNotification(notification);
  }, 5000);

  // Manual close
  closeBtn.addEventListener('click', () => {
    removeNotification(notification);
  });
}

function removeNotification(notification) {
  notification.style.transform = 'translateX(400px)';
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  
  const heroBackground = document.querySelector('.hero-bg');
  if (heroBackground) {
    heroBackground.style.transform = `translateY(${rate}px)`;
  }

  // Floating shapes parallax
  const shapes = document.querySelectorAll('.shape');
  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.1;
    shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
  });
});

// Add smooth reveal animations for elements on scroll
function addRevealAnimations() {
  const revealElements = document.querySelectorAll('.timeline-item, .contact-item, .stat');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    revealObserver.observe(element);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(addRevealAnimations, 100);
});
document.addEventListener('DOMContentLoaded', () => {

  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });


  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});

let ticking = false;

function updateScrollAnimations() {

  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  
  const heroBackground = document.querySelector('.hero-bg');
  if (heroBackground && scrolled < window.innerHeight) {
    heroBackground.style.transform = `translateY(${rate}px)`;
  }

  ticking = false;
}

function requestScrollUpdate() {
  if (!ticking) {
    requestAnimationFrame(updateScrollAnimations);
    ticking = true;
  }
}

window.addEventListener('scroll', requestScrollUpdate);

document.addEventListener('DOMContentLoaded', () => {

  const externalLinks = document.querySelectorAll('a[target="_blank"]');
  externalLinks.forEach(link => {
    link.addEventListener('click', function() {
      this.style.opacity = '0.7';
      setTimeout(() => {
        this.style.opacity = '1';
      }, 200);
    });
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      animationObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item');
  animateElements.forEach(el => {
    animationObserver.observe(el);
  });
});