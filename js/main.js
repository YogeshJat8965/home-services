/* ========================================
   PREMIUM HOME SERVICES - MAIN JAVASCRIPT
   Dynamic URL Parameter System
   ======================================== */

// ========== PAGE LOADER ==========
window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800); // Short delay for smooth experience
    }
});

// ========== DEFAULT VALUES (FALLBACKS) ==========
const DEFAULT_VALUES = {
    name: 'Premier Home Services',
    phone: '(555) 123-4567',
    email: 'info@yourbusiness.com',
    city: 'Your City',
    address: 'Serving Your City & Surrounding Areas',
    rating: '5.0',
    reviews: '50+',
    years: '10+',
    license: 'Licensed & Insured',
    emergency: 'no',
    services: 'Emergency Repairs,Residential Services,Commercial Services,Installation & Replacement,Maintenance & Inspection,24/7 Support'
};

// ========== URL PARAMETER PARSER ==========
function getURLParameters() {
    const params = new URLSearchParams(window.location.search);
    const data = {};
    
    // Parse all parameters with short names
    data.name = params.get('name') || params.get('n') || DEFAULT_VALUES.name;
    data.phone = params.get('phone') || params.get('p') || DEFAULT_VALUES.phone;
    data.email = params.get('email') || params.get('e') || DEFAULT_VALUES.email;
    data.city = params.get('city') || params.get('c') || DEFAULT_VALUES.city;
    data.address = params.get('address') || params.get('a') || DEFAULT_VALUES.address;
    data.rating = params.get('rating') || params.get('r') || DEFAULT_VALUES.rating;
    data.reviews = params.get('reviews') || params.get('rv') || DEFAULT_VALUES.reviews;
    data.years = params.get('years') || params.get('y') || DEFAULT_VALUES.years;
    data.license = params.get('license') || params.get('l') || DEFAULT_VALUES.license;
    data.emergency = params.get('emergency') || params.get('em') || DEFAULT_VALUES.emergency;
    data.services = params.get('services') || params.get('s') || DEFAULT_VALUES.services;
    
    return data;
}

// ========== UPDATE DYNAMIC CONTENT ==========
function updateContent() {
    const data = getURLParameters();
    
    // Update Business Name (appears in multiple places)
    const businessNameElements = [
        'nav-business-name',
        'hero-business-name',
        'why-business-name',
        'footer-business-name',
        'footer-copyright-name'
    ];
    businessNameElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = data.name;
    });
    
    // Update Phone Numbers (multiple locations)
    const phoneElements = [
        { id: 'nav-phone', attr: 'href', prefix: 'tel:', display: true },
        { id: 'hero-phone', attr: null, prefix: '', display: true },
        { id: 'hero-call-btn', attr: 'href', prefix: 'tel:', display: false },
        { id: 'emergency-phone', attr: null, prefix: '', display: true },
        { id: 'emergency-call-btn', attr: 'href', prefix: 'tel:', display: false },
        { id: 'contact-phone', attr: 'href', prefix: 'tel:', display: true },
        { id: 'footer-phone', attr: 'href', prefix: 'tel:', display: true },
        { id: 'floatingCta', attr: 'href', prefix: 'tel:', display: false }
    ];
    
    phoneElements.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
            // Clean phone number for tel: link (remove formatting)
            const cleanPhone = data.phone.replace(/[^0-9]/g, '');
            
            if (item.attr) {
                element.setAttribute(item.attr, item.prefix + cleanPhone);
            }
            if (item.display) {
                // Find span inside or update text directly
                const span = element.querySelector('span');
                if (span) {
                    span.textContent = data.phone;
                } else if (!item.attr) {
                    element.textContent = data.phone;
                }
            }
        }
    });
    
    // Update Email
    const emailElements = [
        { id: 'contact-email', attr: 'href', prefix: 'mailto:' },
        { id: 'footer-email', attr: 'href', prefix: 'mailto:' }
    ];
    
    emailElements.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
            element.setAttribute(item.attr, item.prefix + data.email);
            element.textContent = data.email;
        }
    });
    
    // Update City (appears in many places)
    const cityElements = [
        'hero-city',
        'area-city',
        'area-city-2',
        'area-city-3',
        'testimonial-city-1',
        'testimonial-city-2',
        'testimonial-city-3',
        'footer-city'
    ];
    cityElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = data.city;
    });
    
    // Update Address
    const addressElement = document.getElementById('contact-address');
    if (addressElement) {
        // If custom address provided, use it; otherwise use city-based default
        const displayAddress = data.address !== DEFAULT_VALUES.address 
            ? data.address 
            : `Serving ${data.city} & Surrounding Areas`;
        addressElement.textContent = displayAddress;
    }
    
    // Update Ratings
    const ratingElements = ['hero-rating', 'trust-rating'];
    ratingElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = data.rating;
    });
    
    // Update Reviews
    const reviewsElement = document.getElementById('trust-reviews');
    if (reviewsElement) reviewsElement.textContent = data.reviews;
    
    // Update Years
    const yearsElement = document.getElementById('trust-years');
    if (yearsElement) yearsElement.textContent = data.years;
    
    // Update Page Title
    document.title = `${data.name} - Licensed Plumber & Electrician | 24/7 Emergency Service`;
    
    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', 
            `${data.name} offers professional plumbing, electrical, and home repair services in ${data.city}. Licensed, insured, and available 24/7. Call ${data.phone} for same-day service.`
        );
    }
    
    // Update Open Graph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', `${data.name} - ${data.city}'s Trusted Home Service Experts`);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', 
        `Professional home services in ${data.city}. Licensed, insured, and trusted. Call ${data.phone} for same-day service.`
    );
    
    // Handle Emergency Banner (conditional display)
    const emergencyBanner = document.getElementById('emergencyBanner');
    if (emergencyBanner) {
        if (data.emergency.toLowerCase() === 'yes' || data.emergency === '1' || data.emergency === 'true') {
            emergencyBanner.style.display = 'block';
        } else {
            emergencyBanner.style.display = 'none';
        }
    }
    
    // Update Services (if custom services provided)
    // This would require more complex logic to replace service cards
    // For now, we keep the default 6 services
    
    console.log('✅ Content updated with:', data);
}

// ========== MOBILE NAVIGATION TOGGLE ==========
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        // Toggle menu
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const isClickInsideMenu = navMenu.contains(e.target);
            const isClickOnHamburger = hamburger.contains(e.target);
            
            if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Don't prevent default for # only
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== BACK TO TOP BUTTON ==========
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        // Scroll to top on click
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ========== STICKY NAVBAR ==========
function initStickyNav() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 10) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    });
}

// ========== 3D SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    // Add scroll animation classes to various elements
    const scrollElements = [
        { selector: '.service-card', animationClass: 'scroll-animate' },
        { selector: '.benefit-card', animationClass: 'scroll-flip' },
        { selector: '.testimonial-card', animationClass: 'scroll-scale' },
        { selector: '.gallery-item', animationClass: 'scroll-animate' },
        { selector: '.contact-form-container', animationClass: 'scroll-slide-left' },
        { selector: '.contact-info-container', animationClass: 'scroll-slide-right' },
        { selector: '.section-header', animationClass: 'scroll-flip' }
    ];
    
    // Add animation classes to elements
    scrollElements.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        elements.forEach(el => {
            el.classList.add(item.animationClass);
        });
    });
    
    // Intersection Observer options
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    // Create observer for repeating animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animated class to trigger animation
                entry.target.classList.add('animated');
            } else {
                // Remove animated class when element exits viewport for repeating animation
                entry.target.classList.remove('animated');
            }
        });
    }, observerOptions);
    
    // Observe all elements with scroll animation classes
    const allAnimatedElements = document.querySelectorAll('.scroll-animate, .scroll-slide-left, .scroll-slide-right, .scroll-scale, .scroll-flip');
    allAnimatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ========== FORM HANDLING ==========
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            console.log('Form submitted:', formData);
            
            // Show success message (you can customize this)
            alert('Thank you for your message! We\'ll get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // In production, you would send this to a backend or service like:
            // - Formspree
            // - EmailJS
            // - Your own backend
        });
        
        // Real-time validation (optional)
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    input.style.borderColor = '#dc2626';
                } else {
                    input.style.borderColor = '#e2e8f0';
                }
            });
            
            input.addEventListener('input', () => {
                if (input.style.borderColor === 'rgb(220, 38, 38)') {
                    input.style.borderColor = '#e2e8f0';
                }
            });
        });
    }
}

// ========== FLOATING CTA VISIBILITY ==========
function initFloatingCTA() {
    const floatingCta = document.getElementById('floatingCta');
    const heroSection = document.querySelector('.hero');
    
    if (floatingCta && heroSection) {
        window.addEventListener('scroll', () => {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            
            if (window.pageYOffset > heroBottom) {
                floatingCta.style.display = 'flex';
            } else {
                floatingCta.style.display = 'flex'; // Always show on mobile
            }
        });
    }
}

// ========== INITIALIZE ALL FUNCTIONS ==========
function init() {
    console.log('🚀 Initializing Premium Home Services Website...');
    
    // Update content from URL parameters
    updateContent();
    
    // Initialize all interactive features
    initMobileNav();
    initSmoothScroll();
    initBackToTop();
    initStickyNav();
    initScrollAnimations();
    initFormHandling();
    initFloatingCTA();
    
    console.log('✅ Website initialized successfully!');
}

// ========== RUN ON PAGE LOAD ==========
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========== UTILITY: Generate URL for Admin Panel ==========
// This function can be used by the admin panel
window.generateDemoURL = function(data) {
    const baseURL = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    
    // Only add parameters that are different from defaults
    if (data.name && data.name !== DEFAULT_VALUES.name) params.set('name', data.name);
    if (data.phone && data.phone !== DEFAULT_VALUES.phone) params.set('phone', data.phone);
    if (data.email && data.email !== DEFAULT_VALUES.email) params.set('email', data.email);
    if (data.city && data.city !== DEFAULT_VALUES.city) params.set('city', data.city);
    if (data.address && data.address !== DEFAULT_VALUES.address) params.set('address', data.address);
    if (data.rating && data.rating !== DEFAULT_VALUES.rating) params.set('rating', data.rating);
    if (data.reviews && data.reviews !== DEFAULT_VALUES.reviews) params.set('reviews', data.reviews);
    if (data.years && data.years !== DEFAULT_VALUES.years) params.set('years', data.years);
    if (data.emergency && data.emergency !== DEFAULT_VALUES.emergency) params.set('emergency', data.emergency);
    
    const queryString = params.toString();
    return queryString ? `${baseURL}?${queryString}` : baseURL;
};

// ========== UTILITY: Copy to Clipboard ==========
window.copyToClipboard = function(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('✅ Copied to clipboard:', text);
            return true;
        }).catch(err => {
            console.error('❌ Failed to copy:', err);
            return false;
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            console.log('✅ Copied to clipboard (fallback):', text);
            return true;
        } catch (err) {
            console.error('❌ Failed to copy (fallback):', err);
            return false;
        } finally {
            document.body.removeChild(textArea);
        }
    }
};
