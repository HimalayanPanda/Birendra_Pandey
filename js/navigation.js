// Navigation JavaScript
// Mr. Birendra Raj Pandey Professional Website

document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initStickyNavigation();
    initNavbarScrollEffect();
});

// Mobile Navigation (Hamburger Menu)
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        // Toggle mobile menu
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (hamburger.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset hamburger bars
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset hamburger bars
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    }
}

// Sticky Navigation
function initStickyNavigation() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove sticky class based on scroll position
            if (scrollTop > 100) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
            
            // Hide/show navbar on scroll (optional effect)
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
}

// Navbar Scroll Effect
function initNavbarScrollEffect() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            // Change navbar background opacity based on scroll
            if (scrollTop > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(15px)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
            
            // Add active class to current section link
            const sections = document.querySelectorAll('section[id]');
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Smooth scroll to section with offset for fixed navbar
function smoothScrollToSection(targetId) {
    const target = document.getElementById(targetId);
    const navbarHeight = document.getElementById('navbar').offsetHeight;
    
    if (target) {
        const targetPosition = target.offsetTop - navbarHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            
            if (hamburger && navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset hamburger bars
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        }
    });
}

// Initialize keyboard navigation
initKeyboardNavigation();

// Add CSS for sticky navigation
const stickyNavStyles = `
    <style>
        .navbar {
            transition: all 0.3s ease;
        }
        
        .navbar.sticky {
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .nav-link.active {
            color: var(--accent-gold) !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
        
        /* Mobile menu animations */
        .nav-menu {
            transition: left 0.3s ease;
        }
        
        .hamburger .bar {
            transition: all 0.3s ease;
        }
        
        /* Focus styles for accessibility */
        .nav-link:focus,
        .hamburger:focus {
            outline: 2px solid var(--accent-gold);
            outline-offset: 2px;
        }
        
        /* Skip to content link */
        .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--accent-gold);
            color: var(--background-white);
            padding: 8px;
            text-decoration: none;
            border-radius: 6px;
            z-index: 1001;
        }
        
        .skip-link:focus {
            top: 6px;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', stickyNavStyles); 