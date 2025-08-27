// Gallery Page JavaScript

// Gallery data for different campaigns
const galleryData = {
    fuliza: {
        title: "Fuliza Activation",
        description: "Mobile money service promotion campaign showcasing Safaricom's Fuliza overdraft service through interactive customer engagement.",
        images: [
            { src: "placeholder", alt: "Fuliza activation booth setup" },
            { src: "placeholder", alt: "Customer engagement activities" },
            { src: "placeholder", alt: "Brand ambassadors in action" }
        ]
    },
    masoko: {
        title: "Masoko by Safaricom",
        description: "E-commerce platform promotional campaign featuring product demonstrations and customer onboarding activities.",
        images: [
            { src: "placeholder", alt: "Masoko product showcase" },
            { src: "placeholder", alt: "Customer registration drive" },
            { src: "placeholder", alt: "Mobile app demonstrations" }
        ]
    },
    kochokocho: {
        title: "Kochokocho - Safaricom",
        description: "Customer loyalty promotion campaign designed to reward and engage existing Safaricom customers.",
        images: [
            { src: "placeholder", alt: "Kochokocho campaign launch" },
            { src: "placeholder", alt: "Customer reward activities" },
            { src: "placeholder", alt: "Brand activation events" }
        ]
    },
    nivea: {
        title: "Nivea Promotion",
        description: "Skincare product activation campaign featuring product sampling, skin consultations, and brand awareness activities.",
        images: [
            { src: "placeholder", alt: "Nivea product sampling" },
            { src: "placeholder", alt: "Skin consultation booth" },
            { src: "placeholder", alt: "Brand ambassador interactions" }
        ]
    },
    durex: {
        title: "Durex Promotion",
        description: "Health awareness campaign promoting safe practices and product education through engaging community outreach.",
        images: [
            { src: "placeholder", alt: "Health awareness booth" },
            { src: "placeholder", alt: "Educational materials distribution" },
            { src: "placeholder", alt: "Community engagement activities" }
        ]
    },
    roadshows: {
        title: "Road Shows",
        description: "Mobile marketing campaigns bringing brands directly to customers across various locations and communities.",
        images: [
            { src: "placeholder", alt: "Mobile marketing vehicle" },
            { src: "placeholder", alt: "On-location brand activation" },
            { src: "placeholder", alt: "Community engagement setup" }
        ]
    },
    reckitt: {
        title: "Reckitt",
        description: "Consumer goods promotion featuring household and personal care products with interactive demonstrations.",
        images: [
            { src: "placeholder", alt: "Reckitt product display" },
            { src: "placeholder", alt: "Product demonstration booth" },
            { src: "placeholder", alt: "Customer interaction zone" }
        ]
    },
    simtank: {
        title: "Simtank Promotion",
        description: "Water storage solutions campaign showcasing innovative water tank products and installation services.",
        images: [
            { src: "placeholder", alt: "Simtank product showcase" },
            { src: "placeholder", alt: "Installation demonstration" },
            { src: "placeholder", alt: "Customer consultation area" }
        ]
    },
    dstv: {
        title: "DSTV Activation",
        description: "Entertainment platform promotion featuring package demonstrations and customer subscription drives.",
        images: [
            { src: "placeholder", alt: "DSTV package showcase" },
            { src: "placeholder", alt: "Subscription activation booth" },
            { src: "placeholder", alt: "Entertainment content display" }
        ]
    },
    mpesa: {
        title: "M-Pesa Campaign",
        description: "Mobile money activation campaign promoting financial inclusion and digital payment solutions.",
        images: [
            { src: "placeholder", alt: "M-Pesa registration drive" },
            { src: "placeholder", alt: "Digital payment demonstrations" },
            { src: "placeholder", alt: "Financial literacy sessions" }
        ]
    },
    events: {
        title: "Corporate Events",
        description: "Professional event management services including conferences, product launches, and corporate gatherings.",
        images: [
            { src: "placeholder", alt: "Corporate conference setup" },
            { src: "placeholder", alt: "Product launch event" },
            { src: "placeholder", alt: "Professional networking session" }
        ]
    },
    street: {
        title: "Street Activations",
        description: "Community engagement campaigns bringing brands directly to the streets and public spaces.",
        images: [
            { src: "placeholder", alt: "Street activation setup" },
            { src: "placeholder", alt: "Community engagement activities" },
            { src: "placeholder", alt: "Public space brand presence" }
        ]
    }
};

// Initialize gallery functionality
function initializeGallery() {
    // Make sure body is visible
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
    
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    }
    
    initNavigation();
    initFilterTabs();
    initLightbox();
    initScrollEffects();
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    // Mobile menu toggle
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Filter tabs functionality
function initFilterTabs() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            });
            
            // Re-trigger AOS animations for visible items
            if (typeof AOS !== 'undefined') {
                setTimeout(() => {
                    AOS.refresh();
                }, 100);
            }
        });
    });
}

// Lightbox functionality
function initLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const closeBtn = document.getElementById('lightbox-close');
    const title = document.getElementById('lightbox-title');
    const description = document.getElementById('lightbox-description');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const viewBtns = document.querySelectorAll('.view-btn');
    
    let currentGallery = null;
    let currentImageIndex = 0;
    
    // Open lightbox
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const galleryKey = btn.getAttribute('data-gallery');
            openLightbox(galleryKey);
        });
    });
    
    // Close lightbox
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    // Close on backdrop click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeLightbox();
            }
        });
    }
    
    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentGallery && currentImageIndex > 0) {
                currentImageIndex--;
                updateLightboxImage();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentGallery && currentImageIndex < currentGallery.images.length - 1) {
                currentImageIndex++;
                updateLightboxImage();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal && modal.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    if (currentGallery && currentImageIndex > 0) {
                        currentImageIndex--;
                        updateLightboxImage();
                    }
                    break;
                case 'ArrowRight':
                    if (currentGallery && currentImageIndex < currentGallery.images.length - 1) {
                        currentImageIndex++;
                        updateLightboxImage();
                    }
                    break;
            }
        }
    });
    
    function openLightbox(galleryKey) {
        currentGallery = galleryData[galleryKey];
        currentImageIndex = 0;
        
        if (currentGallery && title && description) {
            title.textContent = currentGallery.title;
            description.textContent = currentGallery.description;
            updateLightboxImage();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeLightbox() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            currentGallery = null;
            currentImageIndex = 0;
        }
    }
    
    function updateLightboxImage() {
        // In a real implementation, this would update the actual image
        // For now, we'll just update the navigation button states
        if (prevBtn) {
            prevBtn.style.opacity = currentImageIndex > 0 ? '1' : '0.5';
            prevBtn.style.pointerEvents = currentImageIndex > 0 ? 'auto' : 'none';
        }
        
        if (nextBtn && currentGallery) {
            nextBtn.style.opacity = currentImageIndex < currentGallery.images.length - 1 ? '1' : '0.5';
            nextBtn.style.pointerEvents = currentImageIndex < currentGallery.images.length - 1 ? 'auto' : 'none';
        }
    }
}

// Scroll effects
function initScrollEffects() {
    // Back to top button (if exists)
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
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
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeGallery);

// Initialize when window is loaded (for any additional resources)
window.addEventListener('load', () => {
    // Additional initialization if needed
    console.log('Gallery page loaded successfully');
});
