/**
 * Go Global Patent - Main JavaScript File
 * Handles language switching, mobile menu, and form interactions
 */

// Language Management
let currentLanguage = 'en'; // Default language is English

/**
 * Initialize the page
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeHamburgerMenu();
    initializeLanguageToggle();
    initializeContactForm();
    updateLanguage(currentLanguage);
});

/**
 * Initialize hamburger menu for mobile
 */
function initializeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }
}

/**
 * Initialize language toggle buttons (both desktop and mobile)
 */
function initializeLanguageToggle() {
    // Desktop language buttons
    const enBtnDesktop = document.getElementById('lang-en-desktop');
    const cnBtnDesktop = document.getElementById('lang-cn-desktop');
    
    if (enBtnDesktop) {
        enBtnDesktop.addEventListener('click', () => switchLanguage('en'));
    }
    if (cnBtnDesktop) {
        cnBtnDesktop.addEventListener('click', () => switchLanguage('cn'));
    }
    
    // Mobile language buttons
    const enBtnMobile = document.getElementById('lang-en-mobile');
    const cnBtnMobile = document.getElementById('lang-cn-mobile');
    
    if (enBtnMobile) {
        enBtnMobile.addEventListener('click', () => switchLanguage('en'));
    }
    if (cnBtnMobile) {
        cnBtnMobile.addEventListener('click', () => switchLanguage('cn'));
    }
}

/**
 * Switch language
 * @param {string} lang - Language code ('en' or 'cn')
 */
function switchLanguage(lang) {
    currentLanguage = lang;
    updateLanguage(lang);
    updateLanguageButtons(lang);
}

/**
 * Update all elements with language data attributes
 * @param {string} lang - Language code ('en' or 'cn')
 */
function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-en][data-cn]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            // Check if element is input placeholder or text content
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang === 'cn' ? 'zh-CN' : 'en';
}

/**
 * Update language toggle button states (both desktop and mobile)
 * @param {string} lang - Language code ('en' or 'cn')
 */
function updateLanguageButtons(lang) {
    // Desktop buttons
    const enBtnDesktop = document.getElementById('lang-en-desktop');
    const cnBtnDesktop = document.getElementById('lang-cn-desktop');
    
    if (enBtnDesktop && cnBtnDesktop) {
        if (lang === 'en') {
            enBtnDesktop.classList.add('active');
            cnBtnDesktop.classList.remove('active');
        } else {
            cnBtnDesktop.classList.add('active');
            enBtnDesktop.classList.remove('active');
        }
    }
    
    // Mobile buttons
    const enBtnMobile = document.getElementById('lang-en-mobile');
    const cnBtnMobile = document.getElementById('lang-cn-mobile');
    
    if (enBtnMobile && cnBtnMobile) {
        if (lang === 'en') {
            enBtnMobile.classList.add('active');
            cnBtnMobile.classList.remove('active');
        } else {
            cnBtnMobile.classList.add('active');
            enBtnMobile.classList.remove('active');
        }
    }
}

/**
 * Initialize contact form
 */
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

/**
 * Handle form submission with Formspree integration
 * @param {Event} e - Form submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');
    const originalBtnText = submitBtn.textContent;
    
    // Get form data
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
        showMessage(
            currentLanguage === 'en' 
                ? 'Please fill in all required fields.' 
                : '请填写所有必填字段。',
            'error'
        );
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage(
            currentLanguage === 'en' 
                ? 'Please enter a valid email address.' 
                : '请输入有效的邮箱地址。',
            'error'
        );
        return;
    }
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = currentLanguage === 'en' ? 'Sending...' : '发送中...';
    
    // Hide any previous success message
    if (successMessage) {
        successMessage.classList.add('hidden');
    }
    
    // Send data to Formspree
    fetch('https://formspree.io/f/xjgbqdqr', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Success: Hide form and show success message
            form.style.display = 'none';
            if (successMessage) {
                successMessage.classList.remove('hidden');
                // Update success message text based on language
                const successText = successMessage.querySelector('p');
                if (successText) {
                    const text = currentLanguage === 'en' 
                        ? 'Thank you! Your patent review request has been sent. We will contact you shortly.'
                        : '感谢您！您的专利评估请求已发送。我们将尽快与您联系。';
                    successText.textContent = text;
                }
            }
            
            // Reset form for potential future use
            form.reset();
        } else {
            // Handle Formspree errors
            return response.json().then(data => {
                throw new Error(data.error || 'Form submission failed');
            });
        }
    })
    .catch(error => {
        // Error: Restore button state and show error message
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        
        showMessage(
            currentLanguage === 'en' 
                ? 'Oops! There was a problem submitting your form. Please try again.' 
                : '抱歉！提交表单时出现问题。请重试。',
            'error'
        );
        
        console.error('Form submission error:', error);
    });
}

/**
 * Show message to user
 * @param {string} message - Message to display
 * @param {string} type - Message type ('success' or 'error')
 */
function showMessage(message, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message mt-4 p-4 rounded-lg ${
        type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-300' 
            : 'bg-red-100 text-red-800 border border-red-300'
    }`;
    messageDiv.textContent = message;
    
    // Insert message after form
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

/**
 * Smooth scroll to anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

