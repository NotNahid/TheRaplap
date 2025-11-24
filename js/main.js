document.addEventListener('DOMContentLoaded', () => {
    // --- DARK MODE TOGGLE - NEW ---
    const darkModeToggle = createDarkModeToggle();
    loadDarkModePreference();

    function createDarkModeToggle() {
        const toggle = document.createElement('button');
        toggle.className = 'dark-mode-toggle';
        toggle.innerHTML = '🌙';
        toggle.title = 'Toggle Dark Mode (Press D)';
        toggle.setAttribute('aria-label', 'Toggle dark mode');
        document.body.appendChild(toggle);

        toggle.addEventListener('click', () => {
            toggleDarkMode();
        });

        // Keyboard shortcut: D key
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'd' || e.key === 'D') && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                toggleDarkMode();
            }
        });

        return toggle;
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        darkModeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
        localStorage.setItem('darkMode', isDarkMode);
    }

    function loadDarkModePreference() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '☀️';
        }
    }

    // --- SEARCH & FILTER FUNCTIONALITY - NEW ---
    setupSearchFunctionality();

    function setupSearchFunctionality() {
        const searchInputs = document.querySelectorAll('.search-input');
        searchInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const videoSlots = document.querySelectorAll('.mc-slot[data-video]');
                
                videoSlots.forEach(slot => {
                    const videoTitle = slot.getAttribute('data-video').toLowerCase();
                    if (videoTitle.includes(searchTerm) || searchTerm === '') {
                        slot.style.display = 'block';
                        slot.style.animation = 'slideIn 0.3s ease-out';
                    } else {
                        slot.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- EVENT LISTENERS ---
    document.addEventListener('keydown', handleKeyDown);

    // --- KEYBOARD NAVIGATION LOGIC ---
    function handleKeyDown(event) {
        // Ignore key presses if user is typing in a form field
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        switch (event.key) {
            case '1':
                window.location.href = 'index.html';
                break;
            case '2':
                window.location.href = 'videos.html';
                break;
            case '3':
                window.location.href = 'about.html';
                break;
            case 'e':
            case 'E':
                event.preventDefault();
                window.location.href = 'videos.html';
                break;
            case 'Escape':
                window.location.href = 'index.html';
                break;
        }
    }

    // --- PARTICLE CLICK EFFECT ---
    document.addEventListener('click', (event) => {
        if (event.target.closest('a, button, .mc-slot')) {
            return;
        }
        for (let i = 0; i < 10; i++) {
            createParticle(event.clientX, event.clientY);
        }
    });

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        document.body.appendChild(particle);

        const size = Math.floor(Math.random() * 6 + 4);
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        const destinationX = (Math.random() - 0.5) * 200;
        const destinationY = (Math.random() - 0.5) * 200;

        particle.style.left = `${x - size / 2}px`;
        particle.style.top = `${y - size / 2}px`;

        const animation = particle.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${destinationX}px, ${destinationY}px)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });

        animation.onfinish = () => particle.remove();
    }

    // --- PAGE TRANSITION EFFECTS - ENHANCED ---
    setupPageTransitions();

    function setupPageTransitions() {
        const links = document.querySelectorAll('a[href$=".html"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (!href.startsWith('http')) {
                    document.body.style.opacity = '1';
                    document.body.style.transition = 'opacity 0.3s ease-out';
                    setTimeout(() => {
                        document.body.style.opacity = '0';
                    }, 10);
                }
            });
        });
    }
});
