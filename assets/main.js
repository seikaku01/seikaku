document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('shop-nav');

    menuToggle.addEventListener('click', function () {
        nav.classList.toggle('show-nav');
        menuToggle.classList.toggle('active');
    });
});
