// Modern interactions and animations
document.addEventListener('DOMContentLoaded', function(){
  // Testimonials slider logic
  const slider = document.querySelector('.testimonials-slider');
  if (slider) {
    const track = slider.querySelector('.slider-track');
    const cards = Array.from(track.querySelectorAll('.testimonial-card'));
    const leftBtn = slider.querySelector('.slider-arrow-left');
    const rightBtn = slider.querySelector('.slider-arrow-right');
    let current = 0;

    function showTestimonial(idx) {
      cards.forEach((card, i) => {
        card.classList.toggle('active', i === idx);
      });
    }

    leftBtn.addEventListener('click', () => {
      current = (current - 1 + cards.length) % cards.length;
      showTestimonial(current);
    });
    rightBtn.addEventListener('click', () => {
      current = (current + 1) % cards.length;
      showTestimonial(current);
    });

    // Optional: swipe support for mobile
    let startX = null;
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    track.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const endX = e.changedTouches[0].clientX;
      if (endX - startX > 40) {
        leftBtn.click();
      } else if (startX - endX > 40) {
        rightBtn.click();
      }
      startX = null;
    });

    // Show first testimonial
    showTestimonial(current);
  }
  // Set current year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '50px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  // Observe all sections and cards for scroll animations
  document.querySelectorAll('section, .card, .person').forEach(el => {
    el.style.opacity = '0';  // Start invisible
    observer.observe(el);
  });

  // Sticky header with hide on scroll down
  let lastScroll = 0;
  const header = document.querySelector('.site-header');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      header.style.transform = 'translateY(0)';
      return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 80) {
      // Scrolling down & past header
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  });

  // Modern form handling with validation
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if(!form) return;

  // Real-time validation
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateInput(this);
    });
    
    input.addEventListener('input', function() {
      if(this.classList.contains('error')) {
        validateInput(this);
      }
    });
  });

  function validateInput(input) {
    const value = input.value.trim();
    
    // Remove previous error state
    input.classList.remove('error');
    input.parentElement.querySelector('.error-message')?.remove();
    
    if(input.required && !value) {
      showError(input, 'This field is required');
      return false;
    }
    
    if(input.type === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      showError(input, 'Please enter a valid email address');
      return false;
    }
    
    return true;
  }

  function showError(input, message) {
    input.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'crimson';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
  }

  // Form submission
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    formMessage.textContent = '';
    
    // Validate all inputs
    let isValid = true;
    inputs.forEach(input => {
      if(!validateInput(input)) {
        isValid = false;
      }
    });
    
    if(!isValid) return;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const button = form.querySelector('button[type="submit"]');
    const oldText = button.textContent;
    button.disabled = true;
    button.innerHTML = '<span class="loading"></span> Sending...';
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success state
      form.reset();
      formMessage.style.color = 'var(--accent)';
      formMessage.textContent = 'Thanks — your message has been received. We will contact you within 48 hours.';
      
      // Log the submission (demo only)
      console.log('Form submitted:', data);
      
    } catch(err) {
      // Error state
      formMessage.style.color = 'crimson';
      formMessage.textContent = 'Sorry, there was a problem sending your message. Please try again.';
      
    } finally {
      // Reset button
      button.disabled = false;
      button.textContent = oldText;
    }
  });

  // Add smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
