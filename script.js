/* script.js */

// 1. GLOBAL FUNCTIONS (Keep these outside so buttons can see them)
function logout() {
    localStorage.removeItem('userName');
    window.location.reload(); 
}

// 2. ALL LOGIC RUNS HERE
document.addEventListener("DOMContentLoaded", () => {
    
 // --- A. MOBILE NAVIGATION & SIDEBAR ---
    const burger = document.getElementById("burger");
    const closeSidebar = document.getElementById("closeSidebar");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const navDesktop = document.querySelector('.nav-desktop');

    const closeMenu = () => {
        if (sidebar) sidebar.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
        if (navDesktop) navDesktop.classList.remove("nav-active");
        document.body.style.overflow = ""; 
        if (burger) burger.textContent = '☰';
    };

    if (burger) {
        burger.addEventListener("click", () => {
            // Toggle the sidebar if it exists
            if (sidebar) {
                sidebar.classList.toggle("active");
                if (overlay) overlay.classList.toggle("active");
                
                // Block scrolling when menu is open
                const isOpen = sidebar.classList.contains("active");
                document.body.style.overflow = isOpen ? "hidden" : "";
                burger.textContent = isOpen ? '✕' : '☰';
            } 
            
            // Toggle top nav for tablets/small desktops
            if (navDesktop) {
                navDesktop.classList.toggle('nav-active');
            }
        });
    }

    if (closeSidebar) closeSidebar.addEventListener("click", closeMenu);
    if (overlay) overlay.addEventListener("click", closeMenu);

    // --- B. REGISTRATION & CONTACT FORM ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.textContent;
            
            const userData = {
                fullName: document.getElementById('name')?.value || "N/A",
                email: document.getElementById('email')?.value || "",
                password: document.querySelector('input[type="password"]')?.value || "no-password-provided",
                message: document.getElementById('message')?.value || ""
            };

            submitBtn.textContent = "Connecting to Database...";
            submitBtn.disabled = true;

            try {
                const response = await fetch('http://localhost:5000/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                });
                const result = await response.json();
                if (response.ok) {
                    alert(`Success! User saved to MongoDB.`);
                    contactForm.reset();
                } else {
                    alert(`Error: ${result.error}`);
                }
            } catch (err) {
                console.error("Connection failed:", err);
                alert("Could not connect to the server. Is your Node.js running?");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // --- C. USER LOGIN UI LOGIC ---
    const userName = localStorage.getItem('userName');
    const headerAuth = document.getElementById('header-auth');
    const sidebarAuth = document.getElementById('sidebar-auth');

    if (userName && headerAuth) {
        const loggedInHTML = `
            <span style="font-weight: 600; color: #2563eb; margin-right: 10px;">Hi, ${userName.split(' ')[0]}</span>
            <button onclick="logout()" class="btn-outline" style="cursor: pointer; padding: 5px 12px; font-size: 14px;">Logout</button>
        `;
        headerAuth.innerHTML = loggedInHTML;
        if(sidebarAuth) sidebarAuth.innerHTML = loggedInHTML;
    }

    // --- D. COOKIE BANNER LOGIC ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');

    if (cookieBanner && !localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('show');
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.classList.remove('show');
        });
    }

    // --- E. GLOBAL SEARCH LOGIC ---
    const searchInput = document.getElementById('globalSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) alert(`Searching for: ${query}... This feature is coming soon!`);
            }
        });
    }
});