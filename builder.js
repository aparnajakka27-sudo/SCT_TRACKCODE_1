const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const newActionSection = `
<!-- PREMIUM DASHBOARD SECTION -->
<section class="section" id="action" style="padding: 6rem 0; background: var(--bg-secondary);">
    <div class="container" style="max-width: 1400px;">
        <div class="section-header text-center fade-up">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--accent-gold); letter-spacing: 0.1em; margin-bottom: 1rem; text-transform: uppercase;">Live Product Preview</div>
            <h2 class="section-title">SEE CAMPUSFLOW IN ACTION</h2>
            <p class="section-subtitle">A connected workspace designed around the everyday needs of modern campuses.</p>
        </div>
        
        <div class="pd-role-selector fade-up delay-1">
            <button class="pd-role-btn active" data-role="student">STUDENT</button>
            <button class="pd-role-btn" data-role="teacher">TEACHER</button>
            <button class="pd-role-btn" data-role="admin">ADMIN</button>
        </div>

        <div class="premium-dashboard fade-up delay-2">
            <aside class="pd-sidebar">
                <nav class="pd-nav" id="pd-nav"></nav>
                <div class="pd-quick-actions">
                    <div class="pd-qa-title">QUICK ACTIONS</div>
                    <button class="pd-qa-btn" onclick="alert('Quick Action Modal: New Task')"><i class="fa-solid fa-plus"></i> New Task</button>
                    <button class="pd-qa-btn" onclick="alert('Quick Action Modal: New Note')"><i class="fa-solid fa-plus"></i> New Note</button>
                    <button class="pd-qa-btn" onclick="alert('Quick Action Modal: Add Resource')"><i class="fa-solid fa-plus"></i> Add Resource</button>
                </div>
                <div class="pd-sidebar-profile">
                    <div class="pd-avatar">ES</div>
                    <div class="pd-prof-info">
                        <div class="pd-prof-name" id="pd-prof-name">Emma Student</div>
                        <div class="pd-prof-role" id="pd-prof-role">Student</div>
                    </div>
                </div>
            </aside>
            <main class="pd-main">
                <header class="pd-header">
                    <div>
                        <h2 class="pd-greeting" id="pd-greeting">Ready to learn, Emma?</h2>
                        <p class="pd-date">Monday, 24 September 2026</p>
                    </div>
                    <div class="pd-header-right">
                        <div class="pd-search">
                            <i class="fa-solid fa-search"></i>
                            <input type="text" placeholder="Search campus...">
                        </div>
                        <div class="pd-icon-btn"><i class="fa-regular fa-bell"></i><span class="pd-badge">3</span></div>
                    </div>
                </header>
                <div class="pd-content" id="pd-content-area"></div>
            </main>
        </div>
    </div>
</section>
`;

html = html.replace(/<section class="section action-section bg-surface" id="action">[\s\S]*?<\/section>/, newActionSection);
fs.writeFileSync('index.html', html, 'utf8');

const dashboardCss = `
/* ==================================================
   PREMIUM DASHBOARD UI
================================================== */
.pd-role-selector { display: flex; justify-content: center; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
.pd-role-btn { padding: 0.8rem 2rem; border-radius: 30px; border: 1px solid var(--border-color); background: var(--surface); color: var(--text-secondary); font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.3s; letter-spacing: 0.05em; }
.pd-role-btn.active { background: var(--accent-primary); color: #FFF; border-color: var(--accent-primary); }

.premium-dashboard { background: var(--bg-primary); border-radius: 24px; border: 1px solid var(--border-color); box-shadow: var(--shadow-xl); display: flex; overflow: hidden; height: 800px; text-align: left; }
.pd-sidebar { width: 260px; background: var(--surface); border-right: 1px solid var(--border-color); display: flex; flex-direction: column; padding: 2rem 1.5rem; }
.pd-nav { flex: 1; display: flex; flex-direction: column; gap: 0.5rem; overflow-y: auto; }
.pd-nav-item { padding: 0.75rem 1rem; border-radius: 8px; color: var(--text-secondary); font-weight: 600; font-size: 0.9rem; display: flex; align-items: center; gap: 1rem; cursor: pointer; transition: all 0.2s; }
.pd-nav-item:hover { background: var(--bg-secondary); }
.pd-nav-item.active { background: var(--accent-primary); color: #FFF; }

.pd-qa-title { font-size: 0.7rem; font-weight: 700; color: var(--text-tertiary); letter-spacing: 0.1em; margin-bottom: 1rem; margin-top: 2rem; }
.pd-qa-btn { display: flex; align-items: center; gap: 0.8rem; width: 100%; padding: 0.75rem; border: 1px dashed var(--border-color); border-radius: 8px; background: transparent; color: var(--text-primary); font-weight: 600; font-size: 0.85rem; cursor: pointer; margin-bottom: 0.5rem; transition: all 0.2s; }
.pd-qa-btn:hover { border-color: var(--accent-primary); color: var(--accent-primary); background: var(--bg-secondary); }

.pd-sidebar-profile { display: flex; align-items: center; gap: 1rem; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color); }
.pd-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--accent-primary); color: #FFF; display: grid; place-items: center; font-weight: 700; font-size: 0.9rem; flex-shrink: 0; }
.pd-prof-name { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); }
.pd-prof-role { font-size: 0.75rem; color: var(--text-tertiary); }

.pd-main { flex: 1; display: flex; flex-direction: column; background: var(--bg-primary); overflow: hidden; }
.pd-header { display: flex; justify-content: space-between; align-items: center; padding: 2rem 3rem; background: var(--surface); border-bottom: 1px solid var(--border-color); }
.pd-greeting { font-size: 1.8rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.25rem; }
.pd-date { font-size: 0.9rem; color: var(--text-tertiary); font-weight: 500; }

.pd-header-right { display: flex; align-items: center; gap: 1.5rem; }
.pd-search { position: relative; }
.pd-search input { padding: 0.6rem 1rem 0.6rem 2.5rem; border-radius: 20px; border: 1px solid var(--border-color); background: var(--bg-primary); font-size: 0.85rem; width: 250px; color: var(--text-primary); }
.pd-search i { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-tertiary); font-size: 0.85rem; }
.pd-icon-btn { position: relative; width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--border-color); display: grid; place-items: center; color: var(--text-secondary); cursor: pointer; }
.pd-badge { position: absolute; top: -5px; right: -5px; background: #EF4444; color: #FFF; font-size: 0.65rem; font-weight: 700; width: 18px; height: 18px; border-radius: 50%; display: grid; place-items: center; }

.pd-content { flex: 1; overflow-y: auto; overflow-x: hidden; padding: 2rem 3rem; display: flex; flex-direction: column; gap: 1.5rem; transition: opacity 0.3s ease; }

.pd-kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
.pd-kpi { background: var(--surface); padding: 1.5rem; border-radius: 16px; border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 1rem; transition: transform 0.2s; }
.pd-kpi:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
.pd-kpi-header { display: flex; justify-content: space-between; align-items: center; color: var(--text-tertiary); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
.pd-kpi-icon { width: 32px; height: 32px; border-radius: 8px; background: var(--bg-secondary); color: var(--accent-primary); display: grid; place-items: center; }
.pd-kpi-value { font-size: 2rem; font-weight: 800; color: var(--text-primary); }
.pd-kpi-trend { font-size: 0.75rem; font-weight: 600; color: #10B981; display: flex; align-items: center; gap: 0.25rem; }

.pd-grid-main { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; align-items: start; }
.pd-widget { background: var(--surface); border-radius: 16px; border: 1px solid var(--border-color); padding: 1.5rem; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; }
.pd-widget-title { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; }

.pd-task-tabs { display: flex; gap: 1rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; overflow-x: auto; }
.pd-task-tab { font-size: 0.8rem; font-weight: 600; color: var(--text-tertiary); cursor: pointer; white-space: nowrap; }
.pd-task-tab.active { color: var(--accent-primary); border-bottom: 2px solid var(--accent-primary); padding-bottom: 0.5rem; margin-bottom: -0.6rem; }
.pd-task-list { display: flex; flex-direction: column; gap: 0.8rem; }
.pd-task-item { display: flex; align-items: center; gap: 1rem; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); cursor: pointer; transition: all 0.2s; background: var(--surface); }
.pd-task-item:hover { background: var(--bg-primary); }
.pd-task-item.completed { opacity: 0.6; }
.pd-task-item.completed .pd-task-title { text-decoration: line-through; }
.pd-task-title { flex: 1; font-size: 0.9rem; font-weight: 600; color: var(--text-primary); }
.pd-badge-high { background: rgba(239, 68, 68, 0.1); color: #EF4444; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.65rem; font-weight: 700; }
.pd-badge-med { background: rgba(245, 158, 11, 0.1); color: #F59E0B; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.65rem; font-weight: 700; }
.pd-checkbox { width: 18px; height: 18px; border-radius: 4px; border: 2px solid var(--border-color); cursor: pointer; display: grid; place-items: center; color: transparent; font-size: 0.6rem; }
.completed .pd-checkbox { background: var(--accent-primary); border-color: var(--accent-primary); color: #FFF; }

.pd-timeline { display: flex; flex-direction: column; gap: 1.5rem; position: relative; }
.pd-timeline::before { content: ''; position: absolute; left: 4px; top: 0; bottom: 0; width: 2px; background: var(--border-color); }
.pd-tl-item { display: flex; gap: 1rem; position: relative; z-index: 1; }
.pd-tl-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--accent-primary); margin-top: 0.3rem; outline: 4px solid var(--surface); flex-shrink: 0; }
.pd-tl-time { font-size: 0.75rem; font-weight: 700; color: var(--text-tertiary); width: 45px; flex-shrink: 0; }
.pd-tl-content { flex: 1; background: var(--bg-primary); padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--border-color); }
.pd-tl-title { font-size: 0.85rem; font-weight: 700; color: var(--text-primary); }
.pd-tl-desc { font-size: 0.75rem; color: var(--text-tertiary); margin-top: 0.25rem; }

.pd-prog-item { margin-bottom: 1rem; }
.pd-prog-header { display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem; }
.pd-prog-bar { width: 100%; height: 6px; background: var(--bg-secondary); border-radius: 3px; overflow: hidden; }
.pd-prog-fill { height: 100%; background: var(--accent-primary); border-radius: 3px; width: 0%; transition: width 1s ease-out; }

.pd-cal-header { display: flex; justify-content: space-between; font-weight: 700; font-size: 0.9rem; margin-bottom: 1rem; }
.pd-cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.25rem; text-align: center; }
.pd-cal-day { font-size: 0.7rem; font-weight: 700; color: var(--text-tertiary); padding-bottom: 0.5rem; }
.pd-cal-date { font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); padding: 0.4rem; border-radius: 50%; cursor: pointer; }
.pd-cal-date:hover { background: var(--bg-secondary); }
.pd-cal-date.active { background: var(--accent-primary); color: #FFF; }
.pd-cal-date.event { position: relative; }
.pd-cal-date.event::after { content: ''; position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; border-radius: 50%; background: #F59E0B; }

@media (max-width: 1024px) {
    .premium-dashboard { flex-direction: column; height: auto; }
    .pd-sidebar { width: 100%; border-right: none; border-bottom: 1px solid var(--border-color); padding: 1.5rem; flex-direction: row; align-items: center; justify-content: space-between; flex-wrap: wrap; }
    .pd-nav { flex-direction: row; overflow-x: auto; width: 100%; order: 3; margin-top: 1rem; padding-bottom: 0.5rem; }
    .pd-nav-item { white-space: nowrap; }
    .pd-quick-actions { display: none; }
    .pd-sidebar-profile { margin-top: 0; padding-top: 0; border: none; }
    .pd-grid-main { grid-template-columns: 1fr; }
    .pd-kpi-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
    .pd-header { padding: 1.5rem; flex-direction: column; align-items: flex-start; gap: 1rem; }
    .pd-content { padding: 1.5rem; }
    .pd-search input { width: 100%; }
    .pd-header-right { width: 100%; justify-content: space-between; }
    .pd-kpi-grid { grid-template-columns: 1fr; }
}
`;
fs.appendFileSync('css/style.css', '\n' + dashboardCss);

const dashboardJs = `
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
        html: \`
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
        \`
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
        html: \`
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
        \`
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
        html: \`
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
        \`
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
        \`<div class="pd-nav-item \${n.active ? 'active' : ''}"><i class="\${n.icon}"></i> \${n.label}</div>\`
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
`;
fs.appendFileSync('js/script.js', '\n' + dashboardJs);
