document.addEventListener('DOMContentLoaded', () => {
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
                event.preventDefault(); // Prevent typing 'e' in a form
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
});