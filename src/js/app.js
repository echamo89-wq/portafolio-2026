// Configuración de Datos del Portafolio
const portfolioData = {
    skills: [
        { name: "React / Next.js", icon: "⚛️" },
        { name: "JavaScript (ES6+)", icon: "💛" },
        { name: "TypeScript", icon: "📘" },
        { name: "Node.js / Express", icon: "🟢" },
        { name: "UI/UX & Figma", icon: "🎨" },
        { name: "CSS Avanzado / Tailwind", icon: "💅" },
        { name: "WebGL / Three.js", icon: "🧊" },
        { name: "Git / GitHub", icon: "🐙" }
    ],
    projects: [
        {
            title: "NeoMarket E-Commerce",
            description: "Plataforma de comercio electrónico con carrito persistente y tema futurista.",
            tech: ["Frontend", "Vanilla JS", "CSS3"],
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
            demoLink: "#",
            repoLink: "https://github.com"
        },
        {
            title: "Crypto Dashboard Pro",
            description: "Panel de control financiero en tiempo real con integración de WebSockets.",
            tech: ["React", "Chart.js", "WebSockets"],
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
            demoLink: "#",
            repoLink: "https://github.com"
        },
        {
            title: "Holo Spatial UI",
            description: "Concepto de interfaz inmersiva WebXR para navegación espacial.",
            tech: ["Three.js", "WebXR", "JavaScript"],
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
            demoLink: "#",
            repoLink: "https://github.com"
        }
    ],
    contact: {
        email: "john.doe@example.com",
        github: "https://github.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
});

function initPortfolio() {
    displaySkills();
    displayProjects('all');
    setupProjectFilters();
    setupMobileMenu();
    setupBackToTop();
    setupEmailCopy();
    setupContactForm();
    setupScrollReveal();
    setupNavbarScroll();
    setupThemeManager();
}

// 1. Mostrar Habilidades
function displaySkills() {
    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) return;
    
    portfolioData.skills.forEach(skill => {
        const tag = document.createElement('div');
        tag.className = 'skill-tag';
        tag.innerHTML = `<span>${skill.icon}</span> ${skill.name}`;
        skillsContainer.appendChild(tag);
    });
}

// 2. Mostrar Proyectos con Filtrado
function displayProjects(filterValue) {
    const projectGrid = document.getElementById('project-grid');
    if (!projectGrid) return;
    
    projectGrid.innerHTML = '';
    
    const filteredProjects = filterValue === 'all' 
        ? portfolioData.projects 
        : portfolioData.projects.filter(p => p.tech.some(t => t.includes(filterValue)));

    filteredProjects.forEach((proj, index) => {
        const card = document.createElement('div');
        card.className = 'project-card scroll-reveal';
        card.style.transitionDelay = `${index * 0.1}s`;
        
        const techBadges = proj.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');

        card.innerHTML = `
            <div class="project-img">
                <img src="${proj.image}" alt="${proj.title}" loading="lazy">
            </div>
            <div class="project-meta">
                <h3 class="project-title">${proj.title}</h3>
                <p class="project-desc">${proj.description}</p>
            </div>
            <div class="project-tech">
                ${techBadges}
            </div>
            <div class="project-links">
                <a href="${proj.demoLink}" class="demo-link">Live Demo ↗</a>
                <a href="${proj.repoLink}" target="_blank" class="repo-link">Código Source</a>
            </div>
        `;
        projectGrid.appendChild(card);
        
        // Trigger reveal manually for injected content if intersection observer is ready
        setTimeout(() => card.classList.add('visible'), 50);
    });
}

// 3. Lógica de Filtros de Proyectos
function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayProjects(btn.dataset.filter);
        });
    });
}

// 4. Lógica Menú Móvil
function setupMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const items = document.querySelectorAll('.nav-item');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        const isActive = toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    items.forEach(item => {
        item.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
}

// 5. Botón Volver Arriba
function setupBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 6. Copiar Email
function setupEmailCopy() {
    const emailLink = document.querySelector('.contact-link[href^="mailto"]');
    if (!emailLink) return;

    emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = portfolioData.contact.email;
        navigator.clipboard.writeText(email).then(() => {
            const originalText = emailLink.innerText;
            emailLink.innerText = '¡Email Copiado! ✅';
            setTimeout(() => emailLink.innerText = originalText, 2000);
        });
    });
}

// 7. Formulario de Contacto Pro
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const submitBtn = contactForm.querySelector('.submit-btn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        if (formData.name.length < 2 || !formData.email.includes('@')) {
            alert('Por favor, completa los campos correctamente.');
            return;
        }

        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Enviando...';
        submitBtn.disabled = true;

        // Simulamos envío con delay
        setTimeout(() => {
            submitBtn.innerText = '¡Mensaje Enviado! ✅';
            submitBtn.style.background = '#00ff88';
            submitBtn.style.color = '#000';
            contactForm.reset();

            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// 8. Scroll Reveal
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
}

// 9. Navbar Scroll
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a.nav-item');

    window.addEventListener('scroll', () => {
        // Toggle shadow/background on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.padding = '1rem 5%';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.padding = '1.5rem 5%';
        }

        // Active Linking
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// 10. Gestor de Temas Futurista
function setupThemeManager() {
    const btnRetro = document.getElementById('theme-retro');
    const btnFuture = document.getElementById('theme-future');
    const body = document.body;

    if (!btnRetro || !btnFuture) return;

    // Cargar preferencia guardada
    const savedTheme = localStorage.getItem('portfolio-theme') || 'retro';
    applyTheme(savedTheme);

    btnRetro.addEventListener('click', () => applyTheme('retro'));
    btnFuture.addEventListener('click', () => applyTheme('future'));

    function applyTheme(theme) {
        if (theme === 'future') {
            body.classList.add('theme-future');
            btnFuture.classList.add('active');
            btnRetro.classList.remove('active');
            
            // Efecto de brillo visual al cambiar
            triggerThemeGlitch();
        } else {
            body.classList.remove('theme-future');
            btnRetro.classList.add('active');
            btnFuture.classList.remove('active');
            
            // También un pequeño glitch para el modo retro
            triggerThemeGlitch();
        }
        
        localStorage.setItem('portfolio-theme', theme);
    }

    function triggerThemeGlitch() {
        body.style.filter = 'contrast(2) brightness(1.5) hue-rotate(90deg)';
        setTimeout(() => {
            body.style.filter = '';
        }, 150);
    }
}
