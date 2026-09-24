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


/* ==================================================
   1. THEME TOGGLE (Light/Dark Mode)
================================================== */
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle ? themeToggle.querySelector('i') : null;
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark' && icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

if (themeToggle && icon) {
    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
}

/* ==================================================
   2. SCROLL PROGRESS BAR
================================================== */
const scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

/* ==================================================
   3. ACTIVE NAV HIGHLIGHTING
================================================== */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === # + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.3, rootMargin: "-100px 0px -100px 0px" });

sections.forEach(sec => navObserver.observe(sec));

/* ==================================================
   4. ANIMATED NUMBERS (HERO/ANALYTICS)
================================================== */
function animateValue(obj, start, end, duration, format = "") {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        obj.innerHTML = current + format;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const numObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const endVal = parseInt(el.getAttribute('data-val'), 10);
            const format = el.getAttribute('data-format') || "";
            animateValue(el, 0, endVal, 1500, format);
            observer.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.animate-num').forEach(el => numObserver.observe(el));

/* ==================================================
   5. ACTION SECTION ROLE TABS
================================================== */
const actionViews = {
    admin: 
        <div class="av-grid">
            <div class="av-card"><div class="av-card-title">Total Students</div><div class="av-card-value animate-num" data-val="12402">12,402</div></div>
            <div class="av-card"><div class="av-card-title">Campus Attendance</div><div class="av-card-value animate-num" data-val="94" data-format="%">94%</div></div>
            <div class="av-card"><div class="av-card-title">Active Teachers</div><div class="av-card-value animate-num" data-val="845">845</div></div>
        </div>
        <div class="av-card" style="flex:1;">
            <div class="av-card-title">Recent Activity</div>
            <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 1rem;">
                <div style="padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);"><strong>System:</strong> Database backup completed successfully.</div>
                <div style="padding: 0.5rem 0;"><strong>Principal:</strong> Published 'Annual Sports Meet' announcement.</div>
            </div>
        </div>
    ,
    teacher: 
        <div class="av-grid">
            <div class="av-card"><div class="av-card-title">My Classes</div><div class="av-card-value animate-num" data-val="6">6</div></div>
            <div class="av-card"><div class="av-card-title">Assignments to Grade</div><div class="av-card-value animate-num" data-val="34">34</div></div>
            <div class="av-card"><div class="av-card-title">Avg. Attendance</div><div class="av-card-value animate-num" data-val="91" data-format="%">91%</div></div>
        </div>
        <div class="av-card" style="flex:1;">
            <div class="av-card-title">Upcoming Schedule</div>
            <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 1rem; display: flex; gap: 1rem;">
                <div style="padding: 1rem; background: var(--bg-primary); border-radius: 8px; flex: 1;"><strong>10:00 AM</strong><br>10-A Mathematics</div>
                <div style="padding: 1rem; background: var(--bg-primary); border-radius: 8px; flex: 1;"><strong>11:30 AM</strong><br>10-B Physics</div>
            </div>
        </div>
    ,
    student: 
        <div class="av-grid">
            <div class="av-card"><div class="av-card-title">My Attendance</div><div class="av-card-value animate-num" data-val="98" data-format="%">98%</div></div>
            <div class="av-card"><div class="av-card-title">Pending Tasks</div><div class="av-card-value animate-num" data-val="2">2</div></div>
            <div class="av-card"><div class="av-card-title">Overall Grade</div><div class="av-card-value">A-</div></div>
        </div>
        <div class="av-card" style="flex:1;">
            <div class="av-card-title">Announcements</div>
            <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 1rem;">
                <div style="padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);"><strong>Science Dept:</strong> Tomorrow's lab is shifted to Room 302.</div>
            </div>
        </div>
    
};

const actionTabs = document.querySelectorAll('.action-tab');
const actionView = document.getElementById('actionView');
const actionRoleTitle = document.getElementById('actionRoleTitle');

if (actionTabs.length > 0 && actionView) {
    function loadRole(role) {
        actionView.innerHTML = actionViews[role];
        if(role === 'admin') actionRoleTitle.innerText = "Administrator Dashboard";
        if(role === 'teacher') actionRoleTitle.innerText = "Teacher Dashboard";
        if(role === 'student') actionRoleTitle.innerText = "Student Portal";
        
        // Re-trigger animations
        document.querySelectorAll('.action-view .animate-num').forEach(el => {
            const endVal = parseInt(el.getAttribute('data-val'), 10);
            const format = el.getAttribute('data-format') || "";
            animateValue(el, 0, endVal, 1000, format);
        });
    }

    actionTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            actionTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            actionView.style.opacity = 0;
            setTimeout(() => {
                loadRole(e.target.getAttribute('data-role'));
                actionView.style.opacity = 1;
            }, 200);
        });
    });
    
    // Init
    loadRole('admin');
    actionView.style.transition = 'opacity 0.2s';
}

/* ==================================================
   6. CAMPUS SEARCH
================================================== */
const searchInput = document.querySelector('.campus-search input');
const searchResults = document.querySelector('.search-results');

if (searchInput && searchResults) {
    const mockData = [
        { title: "Ananya Rao", desc: "Student • Class 10-A • 94% Att." },
        { title: "Mathematics Assignment", desc: "Task • Due Friday" },
        { title: "Annual Sports Meet", desc: "Event • Starts in 3 days" },
        { title: "Rahul Sharma", desc: "Teacher • Physics Dept" }
    ];

    searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        searchResults.innerHTML = '';
        if (val.length === 0) {
            searchResults.style.display = 'none';
            return;
        }
        
        const filtered = mockData.filter(d => d.title.toLowerCase().includes(val) || d.desc.toLowerCase().includes(val));
        
        if (filtered.length > 0) {
            filtered.forEach(item => {
                searchResults.innerHTML += <div class="search-results-item"><div class="sr-title"> + item.title + </div><div class="sr-desc"> + item.desc + </div></div>;
            });
        } else {
            searchResults.innerHTML = <div class="search-results-item"><div class="sr-desc">No results found.</div></div>;
        }
        searchResults.style.display = 'block';
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.campus-search')) {
            searchResults.style.display = 'none';
        }
    });
}


/* ==================================================
   7. FORM VALIDATION
================================================== */
const demoForm = document.getElementById('demoForm');
const formSuccess = document.getElementById('formSuccess');

if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic frontend validation check is handled by 'required' attributes
        // but we can add a custom check here if needed.
        
        const btn = demoForm.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.opacity = '1';
            demoForm.reset();
            formSuccess.style.display = 'block';
            
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}
