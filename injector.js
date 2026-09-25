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

html = html.replace(/<section class="section action-section" id="action">[\s\S]*?<\/section>/, newActionSection);
fs.writeFileSync('index.html', html, 'utf8');
console.log("HTML replaced successfully.");
