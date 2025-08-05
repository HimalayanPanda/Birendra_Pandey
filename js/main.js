// Enhanced Main JavaScript File
// Mr. Birendra Raj Pandey Professional Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initEnhancedScrollAnimations();
    initContactForm();
    initTypingAnimation();
    initEnhancedParallaxEffect();
    initHoverAnimations();
    initSectionEntranceAnimations();
});

// Smooth Scrolling Implementation
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    document.getElementById('hamburger').classList.remove('active');
                }
            }
        });
    });
}

// Enhanced Scroll Animations with Exit Animations
function initEnhancedScrollAnimations() {
    const observerOptions = {
        threshold: [0, 0.1, 0.5, 0.9, 1],
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            const isIntersecting = entry.isIntersecting;
            const intersectionRatio = entry.intersectionRatio;
            
            // Add entrance animation
            if (isIntersecting && intersectionRatio > 0.1) {
                element.classList.add('visible');
                element.classList.remove('animate-out');
            }
            
            // Add exit animation when element is scrolling out of view
            if (!isIntersecting && element.classList.contains('visible')) {
                element.classList.add('animate-out');
                element.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(`
        .fade-in, .slide-in-left, .slide-in-right, .scale-in, 
        .fade-in-up, .zoom-in, .stagger-item, .section-entrance,
        .card-entrance, .gallery-entrance, .slide-up
    `);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Section Entrance Animations
function initSectionEntranceAnimations() {
    const sectionObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const section = entry.target;
            const isIntersecting = entry.isIntersecting;
            
            if (isIntersecting) {
                // Add entrance animation to section
                section.classList.add('section-entrance-visible');
                
                // Trigger staggered animations for section children
                const animatedChildren = section.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .card-entrance, .gallery-entrance');
                animatedChildren.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 150); // Stagger by 150ms
                });
            } else {
                // Add exit animation
                section.classList.remove('section-entrance-visible');
                const animatedChildren = section.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .card-entrance, .gallery-entrance');
                animatedChildren.forEach(child => {
                    child.classList.remove('visible');
                    child.classList.add('animate-out');
                });
            }
        });
    }, sectionObserverOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Enhanced Parallax Effect
function initEnhancedParallaxEffect() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            const scale = 1 + (scrolled * 0.0001);
            
            element.style.transform = `translateY(${yPos}px) scale(${scale})`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Hover Animations
function initHoverAnimations() {
    // Add hover classes to interactive elements
    const interactiveElements = document.querySelectorAll('.event-card, .gallery-item, .button, .nav-link');
    
    interactiveElements.forEach(element => {
        // Add appropriate hover class based on element type
        if (element.classList.contains('event-card') || element.classList.contains('gallery-item')) {
            element.classList.add('hover-lift');
        } else if (element.classList.contains('button')) {
            element.classList.add('hover-scale');
        } else if (element.classList.contains('nav-link')) {
            element.classList.add('hover-glow');
        }
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.innerHTML = '<span class="loading"></span> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add enhanced styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        transform: translateX(0);
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Enhanced Typing Animation for Hero Title
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.classList.add('typing-animation');
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                heroTitle.classList.remove('typing-animation');
            }
        };
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }
}

// Active Navigation Highlighting with Enhanced Animation
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                // Add subtle animation to active link
                link.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });
}

// Initialize active navigation
initActiveNavigation();

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const optimizedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// Enhanced CSS for notifications
const notificationStyles = `
    <style>
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 1rem;
            transition: opacity 0.2s ease;
        }
        
        .notification-close:hover {
            opacity: 0.7;
        }
        
        .section-entrance-visible {
            animation: sectionEntrance 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes sectionEntrance {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles); 