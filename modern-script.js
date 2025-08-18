// Modern Trading Education Landing Page JavaScript
// Advanced functionality with ES6+ features, animations, and form validation

class TradingLandingPage {
    constructor() {
        this.isLoading = true;
        this.currentSection = 'home';
        this.formData = new Map();
        this.animations = new Map();
        
        // Bind methods
        this.init = this.init.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.submitForm = this.submitForm.bind(this);
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.init);
        } else {
            this.init();
        }
    }

    async init() {
        console.log('🚀 Initializing TradeMaster Landing Page...');
        
        try {
            // Initialize all components
            await this.setupLoadingScreen();
            this.setupNavigation();
            this.setupScrollEffects();
            this.setupFormHandling();
            this.setupAnimations();
            this.setupUtilities();
            this.trackUserActivity();
            
            // Initialize AOS (Animate On Scroll)
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    easing: 'ease-out-cubic',
                    once: true,
                    offset: 50
                });
            }
            
            console.log('✅ Landing page initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing landing page:', error);
        }
    }

    // Loading Screen Management
    async setupLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (!loadingScreen) return;

        // Simulate loading time for better UX
        await this.delay(1500);
        
        // Fade out loading screen
        loadingScreen.style.opacity = '0';
        
        await this.delay(500);
        
        // Remove loading screen from DOM
        loadingScreen.remove();
        this.isLoading = false;
        
        // Trigger entrance animations
        this.triggerEntranceAnimations();
    }

    // Navigation System
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!navbar) return;

        // Navbar scroll effect
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = 'none';
            }
            
            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        this.smoothScrollTo(target);
                        
                        // Update active link
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                        
                        // Close mobile menu
                        if (navMenu) navMenu.classList.remove('active');
                        if (navToggle) navToggle.classList.remove('active');
                    }
                }
            });
        });

        // Update active nav link on scroll
        this.setupScrollSpy();
    }

    // Scroll Spy for Navigation
    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.currentSection = id;
                    
                    // Update active nav link
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-100px 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    // Scroll Effects and Floating CTA
    setupScrollEffects() {
        const floatingCTA = document.getElementById('floatingCTA');
        const heroSection = document.getElementById('home');
        
        if (!floatingCTA || !heroSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    floatingCTA.classList.add('hidden');
                } else {
                    floatingCTA.classList.remove('hidden');
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(heroSection);

        // Parallax effect for hero background
        window.addEventListener('scroll', () => {
            if (this.isLoading) return;
            
            const scrollY = window.scrollY;
            const heroBackground = document.querySelector('.hero-background');
            
            if (heroBackground && scrollY < window.innerHeight) {
                heroBackground.style.transform = `translateY(${scrollY * 0.5}px)`;
            }
        });
    }

    // Advanced Form Handling
    setupFormHandling() {
        const form = document.getElementById('registrationForm');
        const demoAccountSelect = document.getElementById('demoAccount');
        const marketSelection = document.getElementById('marketSelection');
        const mobileInput = document.getElementById('mobile');

        if (!form) return;

        // Demo account conditional field
        if (demoAccountSelect && marketSelection) {
            demoAccountSelect.addEventListener('change', (e) => {
                const marketSelect = marketSelection.querySelector('select');
                
                if (e.target.value === 'Yes') {
                    marketSelection.classList.remove('hidden');
                    marketSelect.required = true;
                    this.animateSlideDown(marketSelection);
                } else {
                    marketSelection.classList.add('hidden');
                    marketSelect.required = false;
                    marketSelect.value = '';
                }
            });
        }

        // Phone number validation and formatting
        if (mobileInput) {
            mobileInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/[^0-9+]/g, '');
                
                // Handle +91 prefix
                if (value.startsWith('+91')) {
                    value = '+91' + value.slice(3).replace(/[^0-9]/g, '').slice(0, 10);
                } else {
                    value = value.replace(/[^0-9]/g, '');
                    
                    // Ensure first digit is 6-9 for Indian mobile numbers
                    if (value.length === 1 && !/[6-9]/.test(value)) {
                        value = '';
                    }
                    
                    value = value.slice(0, 10);
                }
                
                e.target.value = value;
                this.validateField(e.target);
            });
        }

        // Real-time validation for all form fields
        const formFields = form.querySelectorAll('input, select');
        formFields.forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });

        // Extract UTM parameters
        this.extractUTMParameters();

        // Form submission
        form.addEventListener('submit', this.submitForm);
    }

    // Field Validation
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Remove existing errors
        this.clearFieldError(field);

        if (field.required && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(fieldName)} is required`;
        } else {
            // Specific validations
            switch (fieldName) {
                case 'Mobile':
                    if (value && !this.isValidMobileNumber(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid mobile number';
                    }
                    break;
                case 'fullname':
                    if (value && value.length < 2) {
                        isValid = false;
                        errorMessage = 'Name must be at least 2 characters long';
                    }
                    break;
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    // Mobile Number Validation
    isValidMobileNumber(number) {
        // Remove any non-numeric characters except +
        const cleaned = number.replace(/[^0-9+]/g, '');
        
        // Check for Indian mobile number patterns
        if (cleaned.startsWith('+91')) {
            return cleaned.length === 13 && /^[6-9]/.test(cleaned.slice(3));
        } else {
            return cleaned.length === 10 && /^[6-9]/.test(cleaned);
        }
    }

    // Form Error Display
    showFieldError(field, message) {
        field.style.borderColor = '#ef4444';
        
        // Create or update error message
        let errorDiv = field.parentNode.querySelector('.field-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            field.parentNode.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.75rem;
            margin-top: 0.25rem;
            display: block;
            animation: slideDown 0.3s ease;
        `;
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    getFieldLabel(fieldName) {
        const labels = {
            'fullname': 'Full Name',
            'Mobile': 'Mobile Number',
            'Language': 'Language',
            'Experience': 'Experience Level',
            'demoAccount': 'Demo Account',
            'market': 'Market'
        };
        return labels[fieldName] || fieldName;
    }

    // UTM Parameter Extraction
    extractUTMParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const utmParams = {
            utm_source: urlParams.get('utm_source') || '',
            utm_medium: urlParams.get('utm_medium') || '',
            utm_campaign: urlParams.get('utm_campaign') || '',
            utm_term: urlParams.get('utm_term') || '',
            utm_content: urlParams.get('utm_content') || ''
        };

        // Set hidden form fields
        Object.entries(utmParams).forEach(([key, value]) => {
            const field = document.getElementById(key);
            if (field) field.value = value;
        });
    }

    // Form Submission
    async submitForm(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        const btnArrow = submitBtn.querySelector('.btn-arrow');
        const errorMessage = document.getElementById('errorMessage');

        // Validate all fields
        const formFields = form.querySelectorAll('input[required], select[required]');
        let isFormValid = true;

        formFields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showFormError('Please fix the errors above');
            return;
        }

        try {
            // Show loading state
            submitBtn.disabled = true;
            btnText.classList.add('hidden');
            btnLoader.classList.remove('hidden');
            btnArrow.style.display = 'none';
            errorMessage.classList.add('hidden');

            // Collect form data
            const formData = new FormData(form);
            const jsonData = {};
            
            for (const [key, value] of formData.entries()) {
                jsonData[key] = value;
            }

            // Submit to webhook
            const response = await fetch('https://webhooks.integrately.com/a/webhooks/6b81c0b612bb4beeab5bd774c15b8b38', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData)
            });

            if (response.ok) {
                // Success - redirect to thank you page
                this.showSuccessAnimation(submitBtn);
                
                // Track conversion
                if (typeof fbq !== 'undefined') {
                    fbq('track', 'Lead');
                }
                
                await this.delay(1000);
                window.location.href = 'thankyou.html';
            } else {
                throw new Error('Network response was not ok');
            }

        } catch (error) {
            console.error('Form submission failed:', error);
            this.showFormError('Submission failed. Please try again.');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
            btnArrow.style.display = 'block';
        }
    }

    showFormError(message) {
        const errorMessage = document.getElementById('errorMessage');
        const errorText = errorMessage.querySelector('.error-text');
        
        if (errorText) errorText.textContent = message;
        errorMessage.classList.remove('hidden');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 5000);
    }

    // Success Animation
    async showSuccessAnimation(button) {
        button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        button.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Success!</span>
        `;
        
        // Animate button
        button.style.transform = 'scale(1.05)';
        await this.delay(200);
        button.style.transform = 'scale(1)';
    }

    // Animation System
    setupAnimations() {
        // Typing animation for hero title
        this.setupTypingAnimation();
        
        // Number counter animations
        this.setupCounterAnimations();
        
        // Market data animation
        this.setupMarketDataAnimation();
        
        // Intersection Observer for animations
        this.setupIntersectionAnimations();
    }

    setupTypingAnimation() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const text = heroTitle.innerHTML;
        const gradientText = heroTitle.querySelector('.gradient-text');
        
        if (gradientText) {
            const gradientContent = gradientText.innerHTML;
            const beforeGradient = text.split('<span class="gradient-text">')[0];
            const afterGradient = text.split('</span>')[1] || '';
            
            heroTitle.innerHTML = beforeGradient + '<span class="gradient-text"></span>' + afterGradient;
            
            setTimeout(() => {
                this.typeText(gradientText, gradientContent, 100);
            }, 1000);
        }
    }

    async typeText(element, text, speed) {
        element.innerHTML = '';
        
        for (let i = 0; i < text.length; i++) {
            element.innerHTML += text.charAt(i);
            await this.delay(speed);
        }
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const text = element.textContent;
        const hasX = text.includes('X');
        const hasPercent = text.includes('%');
        const hasSlash = text.includes('/');
        
        let finalValue;
        if (hasX) {
            finalValue = parseInt(text);
        } else if (hasPercent || hasSlash) {
            return; // Skip percentage and fraction counters
        } else {
            finalValue = parseInt(text);
        }
        
        if (isNaN(finalValue)) return;
        
        let currentValue = 0;
        const increment = finalValue / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                clearInterval(timer);
                element.textContent = text; // Restore original text
            } else {
                if (hasX) {
                    element.textContent = Math.floor(currentValue) + 'X';
                } else {
                    element.textContent = Math.floor(currentValue);
                }
            }
        }, stepTime);
    }

    setupMarketDataAnimation() {
        const stockItems = document.querySelectorAll('.stock-item');
        
        stockItems.forEach((item, index) => {
            setTimeout(() => {
                const changeElement = item.querySelector('.change');
                if (changeElement) {
                    // Animate the change values
                    this.animateStockChange(changeElement);
                }
            }, index * 200);
        });
    }

    animateStockChange(element) {
        const originalText = element.textContent;
        element.style.opacity = '0';
        element.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.3s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }

    setupIntersectionAnimations() {
        // Staggered animation for feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            observer.observe(card);
        });
    }

    // Utility Functions
    setupUtilities() {
        // Smooth scroll utility
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                const target = document.querySelector(href);
                
                if (target && href !== '#') {
                    e.preventDefault();
                    this.smoothScrollTo(target);
                }
            });
        });

        // Handle floating CTA click
        const floatingCTA = document.getElementById('floatingCTA');
        if (floatingCTA) {
            floatingCTA.addEventListener('click', (e) => {
                if (e.target.closest('a[href^="#"]')) {
                    e.preventDefault();
                    const target = document.querySelector('#register');
                    if (target) this.smoothScrollTo(target);
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close mobile menu
                const navMenu = document.getElementById('navMenu');
                const navToggle = document.getElementById('navToggle');
                
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (navToggle) navToggle.classList.remove('active');
                }
            }
        });
    }

    // Smooth Scroll Implementation
    smoothScrollTo(target) {
        const targetPosition = target.offsetTop - 100; // Account for navbar
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    // Easing function for smooth animations
    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // Animation helpers
    animateSlideDown(element) {
        element.style.height = '0';
        element.style.overflow = 'hidden';
        element.style.transition = 'height 0.3s ease';
        
        requestAnimationFrame(() => {
            element.style.height = element.scrollHeight + 'px';
            
            setTimeout(() => {
                element.style.height = 'auto';
                element.style.overflow = 'visible';
            }, 300);
        });
    }

    triggerEntranceAnimations() {
        // Add entrance animations after loading
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroContent) {
            heroContent.style.animation = 'fadeInUp 1s ease forwards';
        }
        
        if (heroVisual) {
            heroVisual.style.animation = 'fadeInRight 1s ease 0.3s forwards';
        }
    }

    // User Activity Tracking
    trackUserActivity() {
        let scrollDepth = 0;
        let maxScrollDepth = 0;
        let timeOnPage = Date.now();
        
        // Track scroll depth
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            scrollDepth = Math.round((window.scrollY / documentHeight) * 100);
            
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                
                // Track milestone events
                if (maxScrollDepth >= 25 && !this.tracked25) {
                    this.trackEvent('scroll_25_percent');
                    this.tracked25 = true;
                }
                if (maxScrollDepth >= 50 && !this.tracked50) {
                    this.trackEvent('scroll_50_percent');
                    this.tracked50 = true;
                }
                if (maxScrollDepth >= 75 && !this.tracked75) {
                    this.trackEvent('scroll_75_percent');
                    this.tracked75 = true;
                }
            }
        });

        // Track time on page
        window.addEventListener('beforeunload', () => {
            const sessionDuration = Math.round((Date.now() - timeOnPage) / 1000);
            this.trackEvent('session_duration', { duration: sessionDuration });
        });

        // Track section views
        const sections = document.querySelectorAll('section[id]');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.trackEvent('section_view', { section: entry.target.id });
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => sectionObserver.observe(section));
    }

    trackEvent(eventName, data = {}) {
        // Track with Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('trackCustom', eventName, data);
        }
        
        // Track with Google Analytics (if available)
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, data);
        }
        
        console.log('📊 Event tracked:', eventName, data);
    }

    // Utility delay function
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Performance monitoring
    measurePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    
                    this.trackEvent('page_performance', {
                        load_time: Math.round(loadTime),
                        dom_ready: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)
                    });
                }, 0);
            });
        }
    }
}

// Add custom CSS animations
const customStyles = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .nav-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .nav-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }

        .nav-menu .nav-link {
            padding: 0.75rem 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .nav-menu .nav-link:last-child {
            border-bottom: none;
        }
    }
`;

// Inject custom styles
const styleSheet = document.createElement('style');
styleSheet.textContent = customStyles;
document.head.appendChild(styleSheet);

// Initialize the landing page
const landingPage = new TradingLandingPage();

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TradingLandingPage;
}

// Add to window for debugging
window.TradingLandingPage = landingPage;
