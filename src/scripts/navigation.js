/**
 * OPTIMIA PMO - Navigation & Mobile Drawer Controller
 */

export const SECTION_IDS = [
    'hero',
    'proyectos',
    'desafio',
    'propuesta',
    'diferenciales',
    'servicios',
    'simulador',
    'metodologia',
    'modelos',
    'contacto'
];

export function setupNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMobileMenu() {
        if (!mobileMenu) return;
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            menuIconOpen?.classList.add('hidden');
            menuIconClose?.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('hidden');
            menuIconOpen?.classList.remove('hidden');
            menuIconClose?.classList.add('hidden');
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        });
    });

    setupScrollspy();
}

/**
 * Scrollspy Controller utilizing IntersectionObserver
 */
export function setupScrollspy(sectionIds = SECTION_IDS) {
    const navLinks = document.querySelectorAll('.nav-link, nav a[href^="#"], #mobile-menu a[href^="#"]');
    
    // Obtain section elements in the exact specified sequential order
    const orderedSections = sectionIds
        .map(id => document.getElementById(id))
        .filter(el => el !== null);

    const sections = orderedSections.length > 0 ? orderedSections : document.querySelectorAll('section[id]');

    if (!sections.length || !navLinks.length) return;

    function setActiveLink(sectionId) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${sectionId}`) {
                link.classList.add('nav-link-active', 'active');
            } else if (href && href.startsWith('#')) {
                link.classList.remove('nav-link-active', 'active');
            }
        });
    }

    // IntersectionObserver with rootMargin matching the top third of the viewport
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                if (sectionId) {
                    setActiveLink(sectionId);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Fallback: bottom of page activates contact link
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60)) {
            setActiveLink('contacto');
        }
    }, { passive: true });
}


