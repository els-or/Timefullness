document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-bs-theme', savedTheme);
        toggle.checked = savedTheme === 'dark';
    }

    // Handle toggle changes
    toggle.addEventListener('change', () => {
        const theme = toggle.checked ? 'dark' : 'light';
        html.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);

        // Add animation class
        const content = document.querySelector('.content');
        content.style.opacity = '0';
        setTimeout(() => {
            content.style.opacity = '1';
        }, 200);
    });
});