document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section, header');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // 1. Fixed Navbar Scroll Effect & Styling (Task Requirement)
    const handleScroll = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize on load

    // 2. Mobile Hamburger Menu (Task Requirement)
    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.contains('active');
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        document.body.style.overflow = isActive ? 'auto' : 'hidden';
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // 3. Active Navigation State via IntersectionObserver (Task Requirement)
    const navObserverOptions = {
        root: null,
        rootMargin: '-40% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        if (section.id) sectionObserver.observe(section);
    });

    // 4. Refined Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.fade-up');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 5. Contact Form Validation Logic
    if (contactForm) {
        // Real-time validation clearance
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('error');
            });
            input.addEventListener('change', () => {
                input.classList.remove('error');
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required')) {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.classList.add('error');
                    } else if (input.type === 'email' && !isValidEmail(input.value)) {
                        isValid = false;
                        input.classList.add('error');
                        const errorMsg = input.nextElementSibling;
                        if(errorMsg && errorMsg.classList.contains('error-msg')) {
                            errorMsg.textContent = "Please enter a valid email address.";
                        }
                    }
                }
            });

            if (isValid) {
                // Success State Simulation
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
                submitBtn.disabled = true;

                // Mock API delay
                setTimeout(() => {
                    formMessage.textContent = 'Demo request received! Our team will reach out within 24 hours.';
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                    
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    setTimeout(() => {
                        formMessage.style.opacity = '0';
                        setTimeout(() => {
                            formMessage.className = 'form-message';
                            formMessage.style.opacity = '1';
                            formMessage.textContent = '';
                        }, 300);
                    }, 5000);
                }, 1200);

            } else {
                formMessage.textContent = 'Please correct the highlighted fields before submitting.';
                formMessage.className = 'form-message error';
            }
        });
    }

    // Helper: Email Regex
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
