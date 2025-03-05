// assets/js/index.js
function toggleMenu() {
    const navLinks = document.querySelector('nav ul.nav-links');
    navLinks.classList.toggle('show');
}

document.getElementById('moreInfoBtn').addEventListener('click', function() {
    document.querySelectorAll('.info-item.hidden').forEach(item => {
        item.classList.remove('hidden');
    });
    this.style.display = 'none';  // ボタンを非表示にする
});
