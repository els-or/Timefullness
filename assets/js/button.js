document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    toggle.addEventListener('change', () => {
        const theme = toggle.checked ? 'dark' : 'light';
        html.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);

        const frostedElements = document.querySelectorAll('.frosted-glass, .frosted-glass-dark');

        frostedElements.forEach(element => {
            if (theme === 'dark') {
                element.classList.remove('frosted-glass');
                element.classList.add('frosted-glass-dark');
            } else {
                element.classList.remove('frosted-glass-dark');
                element.classList.add('frosted-glass');
            }
        });
    });

    const content = document.querySelector('.content');
    content.style.opacity = '0';
    setTimeout(() => {
        content.style.opacity = '1';
    }, 200);
});