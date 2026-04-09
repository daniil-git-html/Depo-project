// ===== ПЛАВНОЕ ПОЯВЛЕНИЕ БЛОКОВ ПРИ СКРОЛЛЕ =====
document.addEventListener('DOMContentLoaded', function() {
    
    // Функция для анимации появления элементов
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Когда элемент появляется в области видимости
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1,  // Срабатывает, когда видно 10% элемента
        rootMargin: '0px 0px -50px 0px'  // Небольшой отступ снизу
    });

    // Находим все элементы с классом fade-in и начинаем следить за ними
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // ===== ПЛАВНЫЙ СКРОЛЛ ДЛЯ ЯКОРНЫХ ССЫЛОК =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Проверяем, что это действительно якорь (начинается с #)
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
        
        // Убираем активный класс у всех
        link.classList.remove('nav__link--active');
        
        // Добавляем активный класс на текущую страницу
        if (linkHref === currentPage) {
            link.classList.add('nav__link--active');
        }
        
        // Особый случай для главной страницы
        if (currentPage === '' && linkHref === 'index.html') {
            link.classList.add('nav__link--active');
        }
    });

    // ===== ЭФФЕКТ ПАРАЛЛАКСА ДЛЯ HERO-ФОНА (опционально) =====
    const heroBg = document.querySelector('.hero__bg');
    if (heroBg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            // Медленное движение фона при скролле
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    }

    // ===== КНОПКА "НАВЕРХ" (если добавите) =====
    // Можно раскомментировать, если решите добавить кнопку
    /*
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-top-btn';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--ktzh-yellow);
        color: var(--ktzh-black);
        border: none;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 99;
    `;
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    */

});

// ===== ПРЕДЗАГРУЗКА ИЗОБРАЖЕНИЙ (для плавности) =====
window.addEventListener('load', function() {
    // Добавляем класс loaded к body для возможных дополнительных анимаций
    document.body.classList.add('loaded');
    
    // Скрываем прелоадер, если он есть
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
        // Если изображение не загрузилось, ставим заглушку
        this.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%231E2124\'/%3E%3Ctext x=\'50\' y=\'55\' font-family=\'Arial\' font-size=\'14\' fill=\'%23F2C94C\' text-anchor=\'middle\'%3EНет фото%3C/text%3E%3C/svg%3E';
        this.style.objectFit = 'contain';
    });
});

