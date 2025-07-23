// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else if (prefersDark) {
    html.setAttribute('data-theme', 'dark');
  }
  
  updateThemeIcon();
}

// Update theme icon
function updateThemeIcon() {
  const isDark = html.getAttribute('data-theme') === 'dark';
  const icon = themeToggle.querySelector('i');
  
  if (isDark) {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// Toggle theme
function toggleTheme() {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon();
}

// Theme toggle event listener
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// Smooth Scrolling Navigation
function scrollToSection(sectionId) {
  const targetElement = document.getElementById(sectionId);
  if (targetElement) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = targetElement.offsetTop - headerHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// Initialize smooth scrolling for navigation links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-links a, .footer-links a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        scrollToSection(targetId);
      }
    });
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('nav');
  
  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
        nav.classList.remove('active');
        mobileToggle.classList.remove('active');
      }
    });
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileToggle.classList.remove('active');
      });
    });
  }
}

// Shimmer Loading Effect Management
function initShimmerLoading() {
  const cards = document.querySelectorAll('.shimmer-loading');
  
  // Simulate loading delay for demonstration
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.remove('shimmer-loading');
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      // Fade in animation
      setTimeout(() => {
        card.style.transition = 'all 0.6s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100);
    }, 300 + (index * 150)); // Staggered loading
  });
}

// Intersection Observer for Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe section headers and cards
  const animateElements = document.querySelectorAll('.section-header, .archive-card, .tour-card, .artisan-card, .course-card');
  animateElements.forEach(el => {
    observer.observe(el);
  });
}

// Header Scroll Effect
function initHeaderScrollEffect() {
  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  });
}

// Card Interaction Effects
function initCardEffects() {
  const cards = document.querySelectorAll('.archive-card, .tour-card, .artisan-card, .course-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-12px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
    
    // Add click effect
    card.addEventListener('click', (e) => {
      if (!e.target.matches('button')) {
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
          card.style.transform = 'translateY(-8px)';
        }, 150);
      }
    });
  });
}

// Button Click Effects
function initButtonEffects() {
  const buttons = document.querySelectorAll('button');
  
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Ripple effect
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Login Modal Management
function initLoginModal() {
  const loginBtn = document.getElementById('login-btn');
  const loginModal = document.getElementById('login-modal');
  const loginClose = document.getElementById('login-close');
  const loginOverlay = document.getElementById('login-modal-overlay');
  const loginTabs = document.querySelectorAll('.login-tab');
  const loginForms = document.querySelectorAll('.login-form');
  const passwordToggles = document.querySelectorAll('.password-toggle');
  
  if (!loginModal) return;
  
  // Open login modal
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      loginModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  // Close login modal
  function closeLoginModal() {
    loginModal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  if (loginClose) {
    loginClose.addEventListener('click', closeLoginModal);
  }
  
  if (loginOverlay) {
    loginOverlay.addEventListener('click', closeLoginModal);
  }
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginModal.classList.contains('active')) {
      closeLoginModal();
    }
  });
  
  // Tab switching
  loginTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;
      
      // Update active tab
      loginTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update active form
      loginForms.forEach(form => {
        form.classList.remove('active');
        if (form.id === `${targetTab}-form`) {
          form.classList.add('active');
        }
      });
    });
  });
  
  // Password toggle functionality
  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.dataset.target;
      const passwordInput = document.getElementById(targetId);
      const icon = toggle.querySelector('i');
      
      if (passwordInput && icon) {
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          icon.className = 'fas fa-eye-slash';
        } else {
          passwordInput.type = 'password';
          icon.className = 'fas fa-eye';
        }
      }
    });
  });
  
  // Form validation and submission
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(loginForm);
      const email = formData.get('email');
      const password = formData.get('password');
      
      if (validateLoginForm(email, password)) {
        // Simulate login process
        showLoginSuccess('Login successful! Welcome back to E-HERITAGE.');
        setTimeout(() => {
          closeLoginModal();
        }, 2000);
      }
    });
  }
  
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(registerForm);
      const fullname = formData.get('fullname');
      const email = formData.get('email');
      const password = formData.get('password');
      const confirmPassword = formData.get('confirm-password');
      const terms = formData.get('terms');
      
      if (validateRegisterForm(fullname, email, password, confirmPassword, terms)) {
        // Simulate registration process
        showLoginSuccess('Account created successfully! Welcome to E-HERITAGE.');
        setTimeout(() => {
          closeLoginModal();
        }, 2000);
      }
    });
  }
}

// Form validation functions
function validateLoginForm(email, password) {
  let isValid = true;
  
  // Clear previous errors
  clearFormErrors();
  
  if (!email || !isValidEmail(email)) {
    showFieldError('login-email', 'Please enter a valid email address');
    isValid = false;
  }
  
  if (!password || password.length < 6) {
    showFieldError('login-password', 'Password must be at least 6 characters');
    isValid = false;
  }
  
  return isValid;
}

function validateRegisterForm(fullname, email, password, confirmPassword, terms) {
  let isValid = true;
  
  // Clear previous errors
  clearFormErrors();
  
  if (!fullname || fullname.trim().length < 2) {
    showFieldError('register-fullname', 'Full name must be at least 2 characters');
    isValid = false;
  }
  
  if (!email || !isValidEmail(email)) {
    showFieldError('register-email', 'Please enter a valid email address');
    isValid = false;
  }
  
  if (!password || password.length < 6) {
    showFieldError('register-password', 'Password must be at least 6 characters');
    isValid = false;
  }
  
  if (password !== confirmPassword) {
    showFieldError('register-confirm-password', 'Passwords do not match');
    isValid = false;
  }
  
  if (!terms) {
    showFieldError('register-confirm-password', 'You must agree to the terms of service');
    isValid = false;
  }
  
  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  
  const formGroup = field.closest('.form-group');
  
  field.classList.add('error');
  
  // Remove existing error message
  const existingError = formGroup.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Add new error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message show';
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    color: var(--primary-red);
    font-size: var(--font-size-xs);
    margin-top: var(--spacing-xs);
  `;
  formGroup.appendChild(errorDiv);
}

function clearFormErrors() {
  const errorFields = document.querySelectorAll('.form-group input.error');
  const errorMessages = document.querySelectorAll('.error-message');
  
  errorFields.forEach(field => field.classList.remove('error'));
  errorMessages.forEach(message => message.remove());
}

function showLoginSuccess(message) {
  // Create success notification
  const notification = document.createElement('div');
  notification.className = 'login-success-notification';
  notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>${message}</span>
  `;
  
  // Add styles for notification
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--primary-green);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 3000;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after delay
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Accessibility Improvements
function initAccessibility() {
  // Skip link functionality
  const skipLink = document.createElement('a');
  skipLink.href = '#hero';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary-green);
    color: white;
    padding: 8px;
    text-decoration: none;
    transition: top 0.3s;
    z-index: 1001;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close any open modals or menus
      const nav = document.getElementById('nav');
      const mobileToggle = document.getElementById('mobile-menu-toggle');
      const loginModal = document.getElementById('login-modal');
      
      if (nav) nav.classList.remove('active');
      if (mobileToggle) mobileToggle.classList.remove('active');
      if (loginModal && loginModal.classList.contains('active')) {
        loginModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSmoothScrolling();
  initMobileMenu();
  initLoginModal();
  initScrollAnimations();
  initHeaderScrollEffect();
  initCardEffects();
  initButtonEffects();
  initAccessibility();
  
  // Initialize shimmer loading after a short delay
  setTimeout(initShimmerLoading, 500);
});

// Handle window resize
window.addEventListener('resize', () => {
  // Recalculate layouts if needed
  const nav = document.getElementById('nav');
  if (nav && window.innerWidth > 768) {
    nav.classList.remove('active');
  }
});

// Add ripple effect styles
const rippleStyles = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: rippleEffect 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes rippleEffect {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .animate-in {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .error {
    border-color: var(--primary-red) !important;
    box-shadow: 0 0 0 2px rgba(220, 20, 60, 0.2);
  }
`;

// Inject ripple effect styles
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);