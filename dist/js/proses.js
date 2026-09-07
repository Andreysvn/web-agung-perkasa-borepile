// ============================================================
// PROSES.JS - Interactive Process Page
// Scroll animations, sticky progress, step navigation
// ============================================================

(function() {
    'use strict';

    // ===== 1. MOBILE MENU =====
    var mobileMenu = document.getElementById('mobile-menu');
    var navMenu = document.querySelector('.nav-menu');

    if (mobileMenu && navMenu) {
        var newToggle = mobileMenu.cloneNode(true);
        mobileMenu.parentNode.replaceChild(newToggle, mobileMenu);
        var newMenu = navMenu.cloneNode(true);
        navMenu.parentNode.replaceChild(newMenu, navMenu);

        var menuBtn = document.getElementById('mobile-menu');
        var menuList = document.querySelector('.nav-menu');

        if (menuBtn && menuList) {
            menuBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                var isActive = menuList.classList.toggle('active');
                menuBtn.classList.toggle('active');
                menuBtn.setAttribute('aria-expanded', isActive);
                document.body.style.overflow = isActive ? 'hidden' : '';
            });

            menuList.querySelectorAll('a').forEach(function(link) {
                link.addEventListener('click', function() {
                    menuList.classList.remove('active');
                    menuBtn.classList.remove('active');
                    menuBtn.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                });
            });

            document.addEventListener('click', function(e) {
                if (menuList.classList.contains('active')) {
                    var isInside = menuList.contains(e.target) || menuBtn.contains(e.target);
                    if (!isInside) {
                        menuList.classList.remove('active');
                        menuBtn.classList.remove('active');
                        menuBtn.setAttribute('aria-expanded', 'false');
                        document.body.style.overflow = '';
                    }
                }
            });
        }
    }

    // ===== 2. DROPDOWN MOBILE =====
    document.querySelectorAll('.dropdown .dropbtn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                var parent = this.closest('.dropdown');
                parent.classList.toggle('active');
                document.querySelectorAll('.dropdown').forEach(function(d) {
                    if (d !== parent) d.classList.remove('active');
                });
            }
        });
    });

    // ===== 3. SCROLL TOP =====
    var scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== 4. SCROLL-TRIGGERED ANIMATIONS =====
    var steps = document.querySelectorAll('.proses-step');
    var connectors = document.querySelectorAll('.step-connector');
    var summary = document.querySelector('.proses-summary');

    var observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
    };

    var stepObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    steps.forEach(function(step) { stepObserver.observe(step); });
    connectors.forEach(function(c) { stepObserver.observe(c); });
    if (summary) stepObserver.observe(summary);

    // ===== 5. STICKY PROGRESS BAR =====
    function createProgressBar() {
        if (steps.length === 0) return;

        var progress = document.createElement('div');
        progress.className = 'proses-progress';
        progress.setAttribute('role', 'navigation');
        progress.setAttribute('aria-label', 'Navigasi tahapan proses');

        var inner = document.createElement('div');
        inner.className = 'proses-progress-inner';

        var stepNames = ['Pengeboran', 'Pemasangan Besi', 'Penuangan Beton'];

        stepNames.forEach(function(name, i) {
            if (i > 0) {
                var connector = document.createElement('div');
                connector.className = 'progress-connector';
                connector.id = 'connector-' + i;
                inner.appendChild(connector);
            }

            var stepEl = document.createElement('a');
            stepEl.className = 'progress-step';
            stepEl.href = '#proses';
            stepEl.dataset.step = i;
            stepEl.innerHTML = '<span class="progress-num">' + (i + 1) + '</span><span class="progress-label">' + name + '</span>';

            stepEl.addEventListener('click', function(e) {
                e.preventDefault();
                var target = steps[i];
                if (target) {
                    var offset = 120;
                    var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            });

            inner.appendChild(stepEl);
        });

        progress.appendChild(inner);

        var prosesSection = document.querySelector('.proses-section');
        if (prosesSection) {
            prosesSection.insertBefore(progress, prosesSection.querySelector('.container'));
        }
    }

    createProgressBar();

    // ===== 6. UPDATE PROGRESS ON SCROLL =====
    var progressSteps = document.querySelectorAll('.progress-step');
    var progressConnectors = document.querySelectorAll('.progress-connector');

    function updateProgress() {
        var scrollY = window.scrollY + 150;
        var activeIndex = 0;

        steps.forEach(function(step, i) {
            var rect = step.getBoundingClientRect();
            var top = rect.top + window.pageYOffset;
            if (scrollY >= top) {
                activeIndex = i;
            }
        });

        progressSteps.forEach(function(el, i) {
            el.classList.remove('active', 'completed');
            if (i === activeIndex) {
                el.classList.add('active');
            } else if (i < activeIndex) {
                el.classList.add('completed');
            }
        });

        progressConnectors.forEach(function(el, i) {
            el.classList.toggle('filled', i < activeIndex);
        });
    }

    var scrollTicking = false;
    window.addEventListener('scroll', function() {
        if (!scrollTicking) {
            window.requestAnimationFrame(function() {
                updateProgress();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    updateProgress();

    // ===== 7. TOGGLE DETAILS (Expand/Collapse) =====
    document.querySelectorAll('.toggle-details-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var details = btn.nextElementSibling;
            if (!details) return;

            var isOpen = details.style.display !== 'none';
            details.style.display = isOpen ? 'none' : 'block';
            btn.setAttribute('aria-expanded', !isOpen);

            var icon = btn.querySelector('.fa-chevron-down, .fa-chevron-up');
            if (icon) {
                icon.classList.toggle('fa-chevron-down', isOpen);
                icon.classList.toggle('fa-chevron-up', !isOpen);
            }

            btn.childNodes[0].textContent = isOpen ? 'Lihat Detail Teknis ' : 'Sembunyikan Detail ';
        });
    });

    // ===== 8. FAQ ACCORDION =====
    document.querySelectorAll('.faq-question').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !expanded);
            btn.classList.toggle('active');
            var answer = btn.nextElementSibling;
            if (answer) {
                answer.classList.toggle('show');
            }
        });
    });

    // ===== 9. COMPARISON ACCORDION =====
    document.querySelectorAll('.comparison-accordion-header').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var accordion = btn.closest('.comparison-accordion');
            var isOpen = accordion.classList.contains('active');

            document.querySelectorAll('.comparison-accordion').forEach(function(a) {
                a.classList.remove('active');
                a.querySelector('.comparison-accordion-header').setAttribute('aria-expanded', 'false');
            });

            if (!isOpen) {
                accordion.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

})();
