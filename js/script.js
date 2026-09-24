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
                if (link.getAttribute('href') === '#' + id) {
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
function animateValue(obj, start, end, duration, format) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        obj.innerHTML = current + (format || "");
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
    admin: '<div class="av-grid">' +
            '<div class="av-card"><div class="av-card-title">Total Students</div><div class="av-card-value animate-num" data-val="12402">12,402</div></div>' +
            '<div class="av-card"><div class="av-card-title">Campus Attendance</div><div class="av-card-value animate-num" data-val="94" data-format="%">94%</div></div>' +
            '<div class="av-card"><div class="av-card-title">Active Teachers</div><div class="av-card-value animate-num" data-val="845">845</div></div>' +
        '</div>' +
        '<div class="av-card" style="flex:1; margin-top:1rem;">' +
            '<div class="av-card-title">Recent Activity</div>' +
            '<div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 1rem;">' +
                '<div style="padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);"><strong>System:</strong> Database backup completed successfully.</div>' +
                '<div style="padding: 0.5rem 0;"><strong>Principal:</strong> Published Annual Sports Meet announcement.</div>' +
            '</div>' +
        '</div>',
    teacher: '<div class="av-grid">' +
            '<div class="av-card"><div class="av-card-title">My Classes</div><div class="av-card-value animate-num" data-val="6">6</div></div>' +
            '<div class="av-card"><div class="av-card-title">Assignments to Grade</div><div class="av-card-value animate-num" data-val="34">34</div></div>' +
            '<div class="av-card"><div class="av-card-title">Avg. Attendance</div><div class="av-card-value animate-num" data-val="91" data-format="%">91%</div></div>' +
        '</div>' +
        '<div class="av-card" style="flex:1; margin-top:1rem;">' +
            '<div class="av-card-title">Upcoming Schedule</div>' +
            '<div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 1rem; display: flex; gap: 1rem;">' +
                '<div style="padding: 1rem; background: var(--bg-primary); border-radius: 8px; flex: 1;"><strong>10:00 AM</strong><br>10-A Mathematics</div>' +
                '<div style="padding: 1rem; background: var(--bg-primary); border-radius: 8px; flex: 1;"><strong>11:30 AM</strong><br>10-B Physics</div>' +
            '</div>' +
        '</div>',
    student: '<div class="av-grid">' +
            '<div class="av-card"><div class="av-card-title">My Attendance</div><div class="av-card-value animate-num" data-val="98" data-format="%">98%</div></div>' +
            '<div class="av-card"><div class="av-card-title">Pending Tasks</div><div class="av-card-value animate-num" data-val="2">2</div></div>' +
            '<div class="av-card"><div class="av-card-title">Overall Grade</div><div class="av-card-value">A-</div></div>' +
        '</div>' +
        '<div class="av-card" style="flex:1; margin-top:1rem;">' +
            '<div class="av-card-title">Announcements</div>' +
            '<div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 1rem;">' +
                '<div style="padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);"><strong>Science Dept:</strong> Tomorrows lab is shifted to Room 302.</div>' +
            '</div>' +
        '</div>'
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
        { title: "Ananya Rao", desc: "Student | Class 10-A | 94% Att." },
        { title: "Mathematics Assignment", desc: "Task | Due Friday" },
        { title: "Annual Sports Meet", desc: "Event | Starts in 3 days" },
        { title: "Rahul Sharma", desc: "Teacher | Physics Dept" }
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
                searchResults.innerHTML += '<div class="search-results-item"><div class="sr-title">' + item.title + '</div><div class="sr-desc">' + item.desc + '</div></div>';
            });
        } else {
            searchResults.innerHTML = '<div class="search-results-item"><div class="sr-desc">No results found.</div></div>';
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
        const btn = demoForm.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.opacity = '1';
            demoForm.reset();
            formSuccess.style.display = 'block';
            setTimeout(() => formSuccess.style.display = 'none', 5000);
        }, 1500);
    });
}


const pdRoleBtns = document.querySelectorAll('.pd-role-btn');
const pdNav = document.getElementById('pd-nav');
const pdContentArea = document.getElementById('pd-content-area');
const pdGreeting = document.getElementById('pd-greeting');
const pdProfName = document.getElementById('pd-prof-name');
const pdProfRole = document.getElementById('pd-prof-role');
const pdAvatar = document.querySelector('.pd-avatar');

const pdData = {
    admin: {
        name: "Alex Admin",
        greeting: "Good morning, Alex.",
        initials: "AA",
        nav: [
            { icon: "fa-solid fa-chart-pie", label: "Campus Overview", active: true },
            { icon: "fa-solid fa-users", label: "Students" },
            { icon: "fa-solid fa-chalkboard-user", label: "Teachers" },
            { icon: "fa-solid fa-clipboard-check", label: "Attendance" },
            { icon: "fa-solid fa-bullhorn", label: "Announcements" },
            { icon: "fa-solid fa-chart-line", label: "Analytics" }
        ],
        html: `
            <div class="pd-kpi-grid">
                <div class="pd-kpi"><div class="pd-kpi-header"><span>Total Students</span><div class="pd-kpi-icon"><i class="fa-solid fa-users"></i></div></div><div class="pd-kpi-value animate-num" data-val="2842">2,842</div><div class="pd-kpi-trend"><i class="fa-solid fa-arrow-trend-up"></i> +4.2% this month</div></div>
                <div class="pd-kpi"><div class="pd-kpi-header"><span>Campus Attendance</span><div class="pd-kpi-icon"><i class="fa-solid fa-clipboard-check"></i></div></div><div class="pd-kpi-value animate-num" data-val="94" data-format="%">94%</div><div class="pd-kpi-trend"><i class="fa-solid fa-arrow-trend-up"></i> +1.1% this week</div></div>
                <div class="pd-kpi"><div class="pd-kpi-header"><span>Active Teachers</span><div class="pd-kpi-icon"><i class="fa-solid fa-chalkboard-user"></i></div></div><div class="pd-kpi-value animate-num" data-val="145">145</div><div class="pd-kpi-trend" style="color:var(--text-tertiary)"><i class="fa-solid fa-minus"></i> No change</div></div>
                <div class="pd-kpi"><div class="pd-kpi-header"><span>System Alerts</span><div class="pd-kpi-icon"><i class="fa-solid fa-bell"></i></div></div><div class="pd-kpi-value animate-num" data-val="3">3</div><div class="pd-kpi-trend" style="color:#EF4444"><i class="fa-solid fa-arrow-trend-up"></i> Action Required</div></div>
            </div>
            <div class="pd-grid-main">
                <div class="pd-widget">
                    <div class="pd-widget-title"><span>Recent Activity</span><button style="background:transparent; border:none; color:var(--accent-primary); cursor:pointer; font-weight:600;">View All</button></div>
                    <div class="pd-timeline">
                        <div class="pd-tl-item"><div class="pd-tl-time">10:42</div><div class="pd-tl-dot"></div><div class="pd-tl-content"><div class="pd-tl-title">Semester Reports Generated</div><div class="pd-tl-desc">Automated system generated 2,842 reports.</div></div></div>
                        <div class="pd-tl-item"><div class="pd-tl-time">09:15</div><div class="pd-tl-dot" style="background:#F59E0B"></div><div class="pd-tl-content"><div class="pd-tl-title">New Teacher Onboarded</div><div class="pd-tl-desc">Sarah Jenkins added to Science Department.</div></div></div>
                        <div class="pd-tl-item"><div class="pd-tl-time">08:00</div><div class="pd-tl-dot" style="background:#10B981"></div><div class="pd-tl-content"><div class="pd-tl-title">Daily Backup Complete</div><div class="pd-tl-desc">Database securely backed up to cloud.</div></div></div>
                    </div>
                </div>
                <div class="pd-widget">
                    <div class="pd-widget-title"><span>Department Progress</span></div>
                    <div class="pd-prog-item"><div class="pd-prog-header"><span>Science</span><span>88%</span></div><div class="pd-prog-bar"><div class="pd-prog-fill" style="width: 88%;"></div></div></div>
                    <div class="pd-prog-item"><div class="pd-prog-header"><span>Mathematics</span><span>76%</span></div><div class="pd-prog-bar"><div class="pd-prog-fill" style="width: 76%;"></div></div></div>
                    <div class="pd-prog-item"><div class="pd-prog-header"><span>Literature</span><span>92%</span></div><div class="pd-prog-bar"><div class="pd-prog-fill" style="width: 92%;"></div></div></div>
                    <div class="pd-prog-item"><div class="pd-prog-header"><span>Arts</span><span>85%</span></div><div class="pd-prog-bar"><div class="pd-prog-fill" style="width: 85%;"></div></div></div>
                </div>
            </div>
        `
    },
    teacher: {
        name: "Sarah Teacher",
        greeting: "Welcome back, Sarah.",
        initials: "ST",
        nav: [
            { icon: "fa-solid fa-layer-group", label: "My Classes", active: true },
            { icon: "fa-solid fa-clipboard-check", label: "Today's Attendance" },
            { icon: "fa-solid fa-file-signature", label: "Assignments" },
            { icon: "fa-solid fa-chart-line", label: "Student Progress" },
            { icon: "fa-solid fa-bullhorn", label: "Class Announcements" },
            { icon: "fa-solid fa-calendar", label: "Upcoming Classes" }
        ],
        html: `
            <div class="pd-kpi-grid">
                <div class="pd-kpi"><div class="pd-kpi-header"><span>My Classes</span><div class="pd-kpi-icon"><i class="fa-solid fa-layer-group"></i></div></div><div class="pd-kpi-value animate-num" data-val="6">6</div><div class="pd-kpi-trend" style="color:var(--text-tertiary)"><i class="fa-solid fa-minus"></i> Total</div></div>
                <div class="pd-kpi"><div class="pd-kpi-header"><span>Pending Grades</span><div class="pd-kpi-icon"><i class="fa-solid fa-file-signature"></i></div></div><div class="pd-kpi-value animate-num" data-val="34">34</div><div class="pd-kpi-trend" style="color:#F59E0B"><i class="fa-solid fa-arrow-trend-up"></i> Due Tomorrow</div></div>
                <div class="pd-kpi"><div class="pd-kpi-header"><span>Avg Class Attendance</span><div class="pd-kpi-icon"><i class="fa-solid fa-clipboard-check"></i></div></div><div class="pd-kpi-value animate-num" data-val="92" data-format="%">92%</div><div class="pd-kpi-trend"><i class="fa-solid fa-arrow-trend-up"></i> +2.4% this week</div></div>
                <div class="pd-kpi"><div class="pd-kpi-header"><span>Messages</span><div class="pd-kpi-icon"><i class="fa-solid fa-message"></i></div></div><div class="pd-kpi-value animate-num" data-val="12">12</div><div class="pd-kpi-trend"><i class="fa-solid fa-arrow-trend-up"></i> 4 Unread</div></div>
            </div>
            <div class="pd-grid-main">
                <div class="pd-widget">
                    <div class="pd-widget-title"><span>Today's Schedule</span></div>
                    <div class="pd-timeline">
                        <div class="pd-tl-item"><div class="pd-tl-time">09:00</div><div class="pd-tl-dot"></div><div class="pd-tl-content"><div class="pd-tl-title">Advanced Physics (11-A)</div><div class="pd-tl-desc">Room 304 &bull; 32 Students</div></div></div>
                        <div class="pd-tl-item"><div class="pd-tl-time">10:30</div><div class="pd-tl-dot"></div><div class="pd-tl-content"><div class="pd-tl-title">Quantum Mechanics Intro</div><div class="pd-tl-desc">Lab 2 &bull; 18 Students</div></div></div>
                        <div class="pd-tl-item"><div class="pd-tl-time">13:00</div><div class="pd-tl-dot" style="background:#F59E0B"></div><div class="pd-tl-content"><div class="pd-tl-title">Department Meeting</div><div class="pd-tl-desc">Staff Room</div></div></div>
                    </div>
                </div>
                <div class="pd-widget">
                    <div class="pd-widget-title"><span>Quick Notes</span><button style="background:transparent; border:none; color:var(--accent-primary); cursor:pointer;"><i class="fa-solid fa-plus"></i></button></div>
                    <div style="display:flex; flex-direction:column; gap:1rem;">
                        <div style="background: var(--bg-primary); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color); border-left: 4px solid #F59E0B;">
                            <div style="font-weight:700; font-size:0.85rem; color:var(--text-primary); margin-bottom:0.5rem;">Lab Equipment Request</div>
                            <div style="font-size:0.75rem; color:var(--text-tertiary);">Need 5 more oscilloscopes for tomorrow's practical.</div>
                        </div>
                        <div style="background: var(--bg-primary); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color); border-left: 4px solid var(--accent-primary);">
                            <div style="font-weight:700; font-size:0.85rem; color:var(--text-primary); margin-bottom:0.5rem;">Student Feedback</div>
                            <div style="font-size:0.75rem; color:var(--text-tertiary);">Remember to review John's extra credit submission.</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    student: {
        name: "Emma Student",
        greeting: "Ready to learn, Emma?",
        initials: "ES",
        nav: [
            { icon: "fa-solid fa-house", label: "My Schedule", active: true },
            { icon: "fa-solid fa-list-check", label: "Tasks" },
            { icon: "fa-solid fa-book", label: "Courses" },
            { icon: "fa-solid fa-clipboard-check", label: "Attendance" },
            { icon: "fa-solid fa-chart-pie", label: "Academic Progress" },
            { icon: "fa-solid fa-graduation-cap", label: "Upcoming Exams" },
            { icon: "fa-solid fa-folder-open", label: "Resources" },
            { icon: "fa-solid fa-bullseye", label: "Goals" }
        ],
        html: `
            <div class="pd-kpi-grid">
                <div class="pd-kpi"><div class="pd-kpi-header"><span>Overall Grade</span><div class="pd-kpi-icon"><i class="fa-solid fa-star"></i></div></div><div class="pd-kpi-value">A-</div><div class="pd-kpi-trend"><i class="fa-solid fa-arrow-trend-up"></i> Top 10%</div></div>
                <div class="pd-kpi"><div class="pd-kpi-header"><span>Pending Tasks</span><div class="pd-kpi-icon"><i class="fa-solid fa-list-check"></i></div></div><div class="pd-kpi-value animate-num" data-val="5">5</div><div class="pd-kpi-trend" style="color:#F59E0B"><i class="fa-solid fa-clock"></i> 2 Due Today</div></div>
                <div class="pd-kpi"><div class="pd-kpi-header"><span>My Attendance</span><div class="pd-kpi-icon"><i class="fa-solid fa-clipboard-check"></i></div></div><div class="pd-kpi-value animate-num" data-val="98" data-format="%">98%</div><div class="pd-kpi-trend"><i class="fa-solid fa-check"></i> Perfect this month</div></div>
                <div class="pd-kpi"><div class="pd-kpi-header"><span>Upcoming Exams</span><div class="pd-kpi-icon"><i class="fa-solid fa-graduation-cap"></i></div></div><div class="pd-kpi-value animate-num" data-val="2">2</div><div class="pd-kpi-trend" style="color:#EF4444"><i class="fa-solid fa-circle-exclamation"></i> Next in 6 days</div></div>
            </div>
            
            <div class="pd-grid-main">
                <div class="pd-widget">
                    <div class="pd-widget-title">
                        <span>Tasks</span>
                        <div class="pd-task-tabs">
                            <span class="pd-task-tab active">All</span>
                            <span class="pd-task-tab">Today</span>
                            <span class="pd-task-tab">This Week</span>
                            <span class="pd-task-tab">Important</span>
                        </div>
                    </div>
                    <div class="pd-task-list" id="pd-task-list">
                        <div class="pd-task-item" onclick="this.classList.toggle('completed')">
                            <div class="pd-checkbox"><i class="fa-solid fa-check"></i></div>
                            <div class="pd-task-title">Complete Mathematics Assignment</div>
                            <div class="pd-badge-high">High</div>
                        </div>
                        <div class="pd-task-item" onclick="this.classList.toggle('completed')">
                            <div class="pd-checkbox"><i class="fa-solid fa-check"></i></div>
                            <div class="pd-task-title">Physics Lab Report Draft</div>
                            <div class="pd-badge-high">High</div>
                        </div>
                        <div class="pd-task-item" onclick="this.classList.toggle('completed')">
                            <div class="pd-checkbox"><i class="fa-solid fa-check"></i></div>
                            <div class="pd-task-title">Read Chapter 4 Biology</div>
                            <div class="pd-badge-med">Medium</div>
                        </div>
                        <div class="pd-task-item" onclick="this.classList.toggle('completed')">
                            <div class="pd-checkbox"><i class="fa-solid fa-check"></i></div>
                            <div class="pd-task-title">History Essay Outline</div>
                            <div class="pd-badge-med">Medium</div>
                        </div>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <div class="pd-widget">
                        <div class="pd-widget-title"><span>Course Progress</span></div>
                        <div class="pd-prog-item"><div class="pd-prog-header"><span>Mathematics</span><span>75%</span></div><div class="pd-prog-bar"><div class="pd-prog-fill" style="width: 75%;"></div></div></div>
                        <div class="pd-prog-item"><div class="pd-prog-header"><span>Physics</span><span>82%</span></div><div class="pd-prog-bar"><div class="pd-prog-fill" style="width: 82%;"></div></div></div>
                        <div class="pd-prog-item"><div class="pd-prog-header"><span>Chemistry</span><span>65%</span></div><div class="pd-prog-bar"><div class="pd-prog-fill" style="width: 65%;"></div></div></div>
                        <div class="pd-prog-item"><div class="pd-prog-header"><span>English Literature</span><span>90%</span></div><div class="pd-prog-bar"><div class="pd-prog-fill" style="width: 90%;"></div></div></div>
                    </div>
                    <div class="pd-widget">
                        <div class="pd-widget-title"><span>Calendar</span><div style="font-size:0.75rem; color:var(--text-tertiary);"><i class="fa-solid fa-chevron-left"></i> September 2026 <i class="fa-solid fa-chevron-right"></i></div></div>
                        <div class="pd-cal-grid">
                            <div class="pd-cal-day">M</div><div class="pd-cal-day">T</div><div class="pd-cal-day">W</div><div class="pd-cal-day">T</div><div class="pd-cal-day">F</div><div class="pd-cal-day">S</div><div class="pd-cal-day">S</div>
                            <div class="pd-cal-date" style="color:var(--border-hover)">30</div><div class="pd-cal-date" style="color:var(--border-hover)">31</div><div class="pd-cal-date">1</div><div class="pd-cal-date">2</div><div class="pd-cal-date">3</div><div class="pd-cal-date">4</div><div class="pd-cal-date">5</div>
                            <div class="pd-cal-date event">6</div><div class="pd-cal-date">7</div><div class="pd-cal-date">8</div><div class="pd-cal-date event">9</div><div class="pd-cal-date">10</div><div class="pd-cal-date">11</div><div class="pd-cal-date">12</div>
                            <div class="pd-cal-date">13</div><div class="pd-cal-date">14</div><div class="pd-cal-date">15</div><div class="pd-cal-date">16</div><div class="pd-cal-date">17</div><div class="pd-cal-date">18</div><div class="pd-cal-date">19</div>
                            <div class="pd-cal-date event">20</div><div class="pd-cal-date">21</div><div class="pd-cal-date">22</div><div class="pd-cal-date">23</div><div class="pd-cal-date active">24</div><div class="pd-cal-date">25</div><div class="pd-cal-date">26</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
};

function renderDashboard(role) {
    if(!pdContentArea) return;
    const data = pdData[role];
    pdProfName.innerText = data.name;
    pdProfRole.innerText = role.charAt(0).toUpperCase() + role.slice(1);
    pdGreeting.innerText = data.greeting;
    pdAvatar.innerText = data.initials;
    
    pdNav.innerHTML = data.nav.map(n => 
        `<div class="pd-nav-item ${n.active ? 'active' : ''}"><i class="${n.icon}"></i> ${n.label}</div>`
    ).join('');
    
    pdContentArea.style.opacity = 0;
    setTimeout(() => {
        pdContentArea.innerHTML = data.html;
        pdContentArea.style.opacity = 1;
    }, 200);
}

if(pdRoleBtns.length > 0) {
    pdRoleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            pdRoleBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderDashboard(e.target.getAttribute('data-role'));
        });
    });
    renderDashboard('student');
}
