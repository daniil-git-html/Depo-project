// ===== ПЛАВНОЕ ПОЯВЛЕНИЕ БЛОКОВ ПРИ СКРОЛЛЕ =====
document.addEventListener('DOMContentLoaded', function() {
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // ===== ПЛАВНЫЙ СКРОЛЛ ДЛЯ ЯКОРНЫХ ССЫЛОК =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        link.classList.remove('nav__link--active');
        if (linkHref === currentPage) {
            link.classList.add('nav__link--active');
        }
        if (currentPage === '' && linkHref === 'index.html') {
            link.classList.add('nav__link--active');
        }
    });

    // ===== ЭФФЕКТ ПАРАЛЛАКСА ДЛЯ HERO-ФОНА =====
    const heroBg = document.querySelector('.hero__bg');
    if (heroBg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    }

    // ===== ЗВУКИ ДЛЯ КАРТОЧЕК =====
    // Дюсембаев Алмас -> коза
    const almasCard = document.getElementById('almas-card');
    if (almasCard) {
        const goatAudio = new Audio('audio/goat-bleats.mp3');
        almasCard.addEventListener('click', function() {
            goatAudio.currentTime = 0;
            goatAudio.play().catch(e => console.log('Звук козы не воспроизвелся:', e));
        });
    }

    // Кузнецов Эмиль -> мельница (mill)
    const emilCard = document.getElementById('emil-card');
    if (emilCard) {
        const millAudio = new Audio('audio/mill.mp3');
        emilCard.addEventListener('click', function() {
            millAudio.currentTime = 0;
            millAudio.play().catch(e => console.log('Звук мельницы не воспроизвелся:', e));
        });
    }

});

// ===== ПРЕДЗАГРУЗКА ИЗОБРАЖЕНИЙ =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// ===== ОБРАБОТКА ОШИБОК ЗАГРУЗКИ ИЗОБРАЖЕНИЙ =====
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%231E2124\'/%3E%3Ctext x=\'50\' y=\'55\' font-family=\'Arial\' font-size=\'14\' fill=\'%23F2C94C\' text-anchor=\'middle\'%3EНет фото%3C/text%3E%3C/svg%3E';
        this.style.objectFit = 'contain';
    });
});

