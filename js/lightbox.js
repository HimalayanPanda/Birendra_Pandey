// Lightbox JavaScript
// Mr. Birendra Raj Pandey Professional Website

document.addEventListener('DOMContentLoaded', function() {
    initGalleryLightbox();
    initEventLightbox();
});

// Gallery Lightbox
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (galleryItems.length > 0 && lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const alt = img.alt;
                
                // Set lightbox content
                lightboxImg.src = img.src;
                lightboxCaption.textContent = alt;
                
                // Show lightbox
                lightbox.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Add fade-in animation
                setTimeout(() => {
                    lightbox.style.opacity = '1';
                }, 10);
            });
        });
        
        // Close lightbox
        function closeLightbox() {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
        
        // Close button
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        // Click outside to close
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display === 'block') {
                closeLightbox();
            }
        });
        
        // Arrow key navigation
        let currentIndex = 0;
        const items = Array.from(galleryItems);
        
        function showImage(index) {
            if (index >= 0 && index < items.length) {
                currentIndex = index;
                const img = items[index].querySelector('img');
                const alt = img.alt;
                
                lightboxImg.src = img.src;
                lightboxCaption.textContent = alt;
            }
        }
        
        document.addEventListener('keydown', function(e) {
            if (lightbox.style.display === 'block') {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    showImage(currentIndex - 1);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    showImage(currentIndex + 1);
                }
            }
        });
    }
}

// Event Lightbox
function initEventLightbox() {
    const eventCards = document.querySelectorAll('.event-card');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (eventCards.length > 0 && lightbox) {
        eventCards.forEach(card => {
            card.addEventListener('click', function() {
                const eventImage = this.querySelector('.event-image img');
                const eventTitle = this.querySelector('h3').textContent;
                const eventDate = this.querySelector('.event-date').textContent;
                const eventLocation = this.querySelector('.event-location').textContent;
                const eventDescription = this.querySelector('.event-description').textContent;
                
                // Create event details content
                const eventDetails = `
                    <div class="event-lightbox-content">
                        <img src="${eventImage.src}" alt="${eventTitle}">
                        <div class="event-lightbox-info">
                            <h3>${eventTitle}</h3>
                            <p class="event-date">${eventDate}</p>
                            <p class="event-location">${eventLocation}</p>
                            <p class="event-description">${eventDescription}</p>
                        </div>
                    </div>
                `;
                
                // Set lightbox content
                lightboxImg.style.display = 'none';
                lightboxCaption.innerHTML = eventDetails;
                
                // Show lightbox
                lightbox.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Add fade-in animation
                setTimeout(() => {
                    lightbox.style.opacity = '1';
                }, 10);
            });
        });
    }
}

// Add CSS for lightbox
const lightboxStyles = `
    <style>
        .lightbox {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lightbox-content {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .lightbox-close {
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 2rem;
            font-weight: bold;
            cursor: pointer;
            z-index: 2001;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s ease;
        }
        
        .lightbox-close:hover {
            background: rgba(0, 0, 0, 0.8);
        }
        
        .lightbox-caption {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            text-align: center;
            max-width: 80%;
            background: rgba(0, 0, 0, 0.7);
            padding: 1rem;
            border-radius: 6px;
        }
        
        .event-lightbox-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .event-lightbox-content img {
            max-width: 100%;
            max-height: 300px;
            object-fit: cover;
            border-radius: 6px;
        }
        
        .event-lightbox-info {
            text-align: center;
        }
        
        .event-lightbox-info h3 {
            color: var(--accent-gold);
            margin-bottom: 0.5rem;
        }
        
        .event-lightbox-info .event-date {
            color: var(--accent-gold);
            font-weight: 600;
            margin-bottom: 0.25rem;
        }
        
        .event-lightbox-info .event-location {
            color: #ccc;
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }
        
        .event-lightbox-info .event-description {
            color: white;
            line-height: 1.6;
        }
        
        /* Responsive lightbox */
        @media (max-width: 768px) {
            .lightbox-content {
                max-width: 95%;
                max-height: 80%;
            }
            
            .lightbox-caption {
                max-width: 90%;
                bottom: 10px;
            }
            
            .event-lightbox-content {
                max-width: 90%;
            }
            
            .event-lightbox-content img {
                max-height: 200px;
            }
        }
        
        /* Loading state for images */
        .lightbox-content.loading {
            opacity: 0.5;
        }
        
        /* Image zoom effect on hover */
        .lightbox-content:hover {
            transform: translate(-50%, -50%) scale(1.02);
            transition: transform 0.3s ease;
        }
        
        /* Keyboard navigation indicators */
        .lightbox::before {
            content: 'Use ← → arrow keys to navigate, ESC to close';
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            background: rgba(0, 0, 0, 0.7);
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-size: 0.8rem;
            opacity: 0.8;
        }
        
        @media (max-width: 768px) {
            .lightbox::before {
                display: none;
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', lightboxStyles);

// Image loading optimization
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize image preloading
preloadImages(); 