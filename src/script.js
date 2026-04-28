// ============================================================================
// PREVICEO WEBSITE - Enhanced JavaScript
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // ============================================================================
    // HEADER SCROLL EFFECT
    // ============================================================================
    const header = document.getElementById('main-header');
    const backToTopBtn = document.getElementById('back-to-top');
    let lastScroll = 0;

    function updateHeader() {
        const currentScroll = window.pageYOffset;
        
        if (backToTopBtn) {
            if (currentScroll > 500) {
                backToTopBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
                backToTopBtn.classList.add('opacity-100', 'translate-y-0');
            } else {
                backToTopBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
                backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
            }
        }
        
        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    // ============================================================================
    // BACK TO TOP BUTTON
    // ============================================================================
    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================================================
    // MOBILE NAVIGATION
    // ============================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMobileMenu() {
        mobileMenu?.classList.toggle('hidden');
        menuIconOpen?.classList.toggle('hidden');
        menuIconClose?.classList.toggle('hidden');
    }

    menuToggle?.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu?.classList.add('hidden');
            menuIconOpen?.classList.remove('hidden');
            menuIconClose?.classList.add('hidden');
        });
    });

    // ============================================================================
    // SMOOTH SCROLL
    // ============================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    toggleMobileMenu();
                }

                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                history.pushState(null, null, targetId);
            }
        });
    });

    // ============================================================================
    // AOS ANIMATIONS
    // ============================================================================
    function initAOSFallback() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    entry.target.style.opacity = '1';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('[data-aos]').forEach(el => {
            const delay = parseInt(el.getAttribute('data-aos-delay')) || 0;
            const duration = parseInt(el.getAttribute('data-aos-duration')) || 800;
            el.style.transitionDelay = `${delay}ms`;
            el.style.transitionDuration = `${duration}ms`;
            observer.observe(el);
        });
    }

    if (typeof AOS !== 'undefined') {
        try {
            AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 100 });
        } catch (e) {
            initAOSFallback();
        }
    } else {
        initAOSFallback();
    }

    // ============================================================================
    // FORM HANDLING
    // ============================================================================
    const contactForm = document.querySelector('form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = document.getElementById('name')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const message = document.getElementById('message')?.value.trim() || '';
            const submitBtn = this.querySelector('button[type="submit"]');
            
            if (!name || !email || !message) {
                e.preventDefault();
                showNotification('Por favor, completa todos los campos.', 'error');
                return false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                showNotification('Por favor, ingresa un correo valido.', 'error');
                return false;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="flex items-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Enviando...</span>';
            }

            e.preventDefault();
            
            setTimeout(() => {
                showNotification('Mensaje enviado con exito. Te contactaremos pronto.', 'success');
                contactForm.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span class="relative z-10 flex items-center">Enviar mensaje<svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></span>';
                }
            }, 1500);
        });
    }

    // ============================================================================
    // NOTIFICATION SYSTEM
    // ============================================================================
    function showNotification(message, type = 'info') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const icons = {
            success: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>',
            error: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
            info: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'
        };

        const colors = { success: 'bg-emerald-500', error: 'bg-red-500', info: 'bg-primary-600' };

        const notification = document.createElement('div');
        notification.className = `notification fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl transform transition-all duration-300 translate-y-20 opacity-0 ${colors[type]} text-white`;
        notification.innerHTML = `<div class="flex items-center space-x-3"><svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">${icons[type]}</svg><span class="font-medium">${message}</span></div>`;

        document.body.appendChild(notification);

        requestAnimationFrame(() => {
            notification.classList.remove('translate-y-20', 'opacity-0');
            notification.classList.add('translate-y-0', 'opacity-100');
        });

        setTimeout(() => {
            notification.classList.add('opacity-0', 'translate-y-4');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    window.showNotification = showNotification;

    // ============================================================================
    // RIPPLE EFFECT
    // ============================================================================
    document.querySelectorAll('button, .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,0.4);transform:scale(0);animation:ripple 0.6s ease-out;left:${e.clientX - rect.left}px;top:${e.clientY - rect.top}px;width:100px;height:100px;margin-left:-50px;margin-top:-50px;pointer-events:none;`;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ============================================================================
    // KEYBOARD NAVIGATION
    // ============================================================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
            closeModal();
        }
    });

    // ============================================================================
    // PAUSE MARQUEE ON HOVER
    // ============================================================================
    const marqueeElement = document.querySelector('.animate-marquee');
    if (marqueeElement) {
        marqueeElement.parentElement?.addEventListener('mouseenter', () => { marqueeElement.style.animationPlayState = 'paused'; });
        marqueeElement.parentElement?.addEventListener('mouseleave', () => { marqueeElement.style.animationPlayState = 'running'; });
    }
});

// ============================================================================
// MODAL SYSTEM
// ============================================================================
const modalData = {
    ds44: {
        title: 'Decreto Supremo 44 - Gestion de Prevencion de Riesgos',
        content: `
            <p>El <strong>Decreto Supremo N° 44</strong>, publicado el 27 de julio de 2024 y vigente desde el <strong>1 de febrero de 2025</strong>, es la nueva normativa que reemplaza a los antiguos Decretos Supremos N° 40 y N° 54 de 1969.</p>
            
            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">¿Que establece el DS 44?</h4>
            <p>Establece un <strong>Sistema de Gestion de Seguridad y Salud en el Trabajo (SST)</strong> obligatorio para todas las empresas, con las siguientes exigencias principales:</p>
            
            <ul class="space-y-3 mt-4">
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Matriz de Identificacion de Peligros y Evaluacion de Riesgos (MIPER):</strong> Todo empleador debe elaborar y actualizar continuamente una matriz que identifique los peligros y evaluen los riesgos de su actividad.</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Encargado de Prevencion:</strong> Obligatorio en todas las empresas, debe estar capacitado segun las normas de SUSESO.</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Delegados de Prevencion:</strong> Obligatorios en empresas con 10 a 25 trabajadores cuando no exista Comite Paritario.</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Comite Paritario de Higiene y Seguridad:</strong> Requerido en empresas con mas de 25 trabajadores.</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Capacitacion tecnica obligatoria:</strong> Programas de formacion especializados para trabajadores y responsables de seguridad.</div></li>
            </ul>

            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">¿Quien fiscaliza?</h4>
            <p>La <strong>Direccion del Trabajo</strong> fiscaliza el correcto funcionamiento de los Comites Paritarios y verifica el cumplimiento de los sistemas de gestion. Las <strong>Seremis de Salud</strong> fiscalizan las condiciones sanitarias y ambientales. La <strong>SUSESO</strong> fiscaliza a los organismos administradores de la Ley 16.744.</p>
        `
    },
    ley16744: {
        title: 'Ley 16.744 - Seguro contra Accidentes del Trabajo',
        content: `
            <p>La <strong>Ley 16.744</strong> (1968) establece el <strong>Seguro Social obligatorio contra accidentes del trabajo y enfermedades profesionales</strong>. Es aplicable a todos los trabajadores por cuenta ajena, incluidos domesticos y aprendices.</p>
            
            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">Definiciones clave</h4>
            <ul class="space-y-3 mt-4">
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Accidente del trabajo:</strong> Toda lesion que una persona sufra a causa o con ocasion del trabajo, y que le produzca incapacidad o muerte.</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Accidente de trayecto:</strong> Accidentes ocurridos en el trayecto directo entre la habitacion y el lugar de trabajo (ida o regreso).</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Enfermedad profesional:</strong> Enfermedad causada de manera directa por el ejercicio de la profesion o trabajo que realice una persona.</div></li>
            </ul>

            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">Prestaciones que otorga</h4>
            <p>La victima tiene derecho a prestaciones gratuitas hasta su curacion completa:</p>
            <ul class="space-y-2 mt-4">
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Atencion medica y quirurgica</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Hospitalizacion si es necesario</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Subsidio por incapacidad laboral</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Indemnizaciones por invalidez o fallecimiento</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Rehabilitacion profesional</li>
            </ul>

            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">Cotizacion</h4>
            <p>La cotizacion base es del <strong>0.95%</strong> sobre las remuneraciones imponibles, que se paga a la entidad administradora (mutual, ISL o CAPREDENA). Adicionalmente, la <strong>cotizacion diferenciada</strong> (DS 110) varia segun la actividad economica.</p>
        `
    },
    ds594: {
        title: 'Decreto Supremo 594 - Condiciones Sanitarias y Ambientales',
        content: `
            <p>El <strong>Decreto Supremo N° 594</strong> (1999) del Ministerio de Salud aprueba el Reglamento sobre <strong>Condiciones Sanitarias y Ambientales Basicas en los Lugares de Trabajo</strong>.</p>
            
            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">Requisitos principales</h4>
            <ul class="space-y-3 mt-4">
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Temperatura:</strong> No debe superar los 30°C ni ser inferior a 10°C en los lugares de trabajo.</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Ventilacion:</strong> Todo lugar de trabajo debe contar con ventilacion natural o artificial adecuada.</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Agua potable:</strong> Provisión minima de 100 litros/persona/dia, o no menos de 30 litros en caso de excepcion.</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Servicios higienicos:</strong> Excusados y lavamanos suficientes, en buen estado. Duchas cuando se manipulan sustancias toxicas.</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Senalizacion:</strong> Vias de escape y zonas de seguridad claramente senalizadas.</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Ruido:</strong> Niveles maximos permisibles de exposicion a ruido (85 dB para 8 horas diarias).</div></li>
            </ul>

            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">Proteccion contra radiacion UV</h4>
            <p>Actualizaciones recientes incorporan medidas para trabajadores expuestos a <strong>radiacion ultravioleta solar</strong>: informacion sobre riesgos, sombreado de lugares de trabajo y programas de instruccion sobre efectos en piel y ojos.</p>
        `
    },
    ley20507: {
        title: 'Ley 20.507 - Sanciones por Infraccion a la Seguridad Laboral',
        content: `
            <p>La <strong>Ley 20.507</strong> establece el regimen sancionatorio por infracciones a las normas sobre seguridad y salud en el trabajo. Es fundamental que las PYMES cumplan para evitar consecuencias graves.</p>
            
            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">Tipos de sanciones</h4>
            <ul class="space-y-3 mt-4">
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Multas administrativas:</strong> Aplicadas por la Direccion del Trabajo, varian segun el tamano de la empresa y la gravedad de la infraccion (leves, graves y muy graves).</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Paralizacion de trabajos:</strong> Procede la paralizacion inmediata ante riesgo grave e inminente para la vida o salud de los trabajadores.</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Responsabilidad penal:</strong> El articulo 490 del Codigo Penal sanciona lesiones o muerte causadas por incumplimiento deliberado de normas de seguridad.</div></li>
            </ul>

            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">Beneficio para PYMES</h4>
            <p>Si el empleador corrige la infraccion dentro de los 15 dias siguientes a la notificacion, la multa se rebaja al menos en un <strong>50%</strong>. Para micro y pequenas empresas, la rebaja es de al menos <strong>80%</strong>.</p>

            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">¿Como evitar sanciones?</h4>
            <ul class="space-y-2 mt-4">
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Implementar el sistema de gestion de riesgos segun DS 44</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Mantener capacitaciones actualizadas y documentadas</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Entregar y verificar el uso de EPP</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Elaborar y mantener actualizada la MIPER</li>
            </ul>
        `
    },
    ds110: {
        title: 'Decreto Supremo 110 - Cotizacion Adicional Diferenciada',
        content: `
            <p>El <strong>Decreto Supremo N° 110</strong> regula la <strong>cotizacion adicional diferenciada</strong> a que se refiere el articulo 15 de la Ley 16.744. Establece tasas variables segun la actividad economica de la empresa.</p>
            
            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">¿Como funciona?</h4>
            <p>Ademas de la cotizacion base del 0.95%, las empresas deben pagar una <strong>cotizacion adicional</strong> que varia segun el nivel de riesgo de su actividad:</p>
            
            <ul class="space-y-3 mt-4">
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Explotacion de minas y canteras:</strong> 3,40% (antes del DL 3501)</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Transportes y almacenaje:</strong> 2,55% (antes del DL 3501)</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Comercio general:</strong> 0% (sin cotizacion adicional)</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Servicios generales:</strong> 0% (sin cotizacion adicional)</div></li>
            </ul>

            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">Revision de tasas</h4>
            <p>Las mutualidades pueden revisar las tasas adicionales segun la siniestralidad de cada empresa. Una buena gestion de prevencion puede resultar en <strong>tasas mas bajas</strong>.</p>

            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">Importante para PYMES</h4>
            <p>Es fundamental conocer la clasificacion de tu empresa y verificar que la cotizacion que pagas corresponda a tu actividad real. Como prevencionista, te ayudo a clasificar correctamente tu empresa y optimizar esta cotizacion.</p>
        `
    },
    miper: {
        title: 'Matriz de Identificacion de Peligros y Evaluacion de Riesgos (MIPER)',
        content: `
            <p>La <strong>MIPER</strong> es una herramienta obligatoria segun el DS 44 que permite identificar, evaluar y controlar los peligros y riesgos presentes en tu empresa.</p>
            
            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">¿Que incluye?</h4>
            <ul class="space-y-3 mt-4">
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Identificacion de peligros:</strong> Reconocimiento sistematico de fuentes, situaciones o actos con potencial de dano.</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Evaluacion de riesgos:</strong> Determinacion de la probabilidad y severidad del dano potencial.</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Medidas de control:</strong> Jerarquia de controles (eliminacion, sustitucion, ingenieria, administrativos, EPP).</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><div><strong>Actualizacion:</strong> Debe actualizarse cuando cambien los procesos, se produzcan accidentes o se modifique la legislacion.</div></li>
            </ul>

            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">Mi servicio incluye</h4>
            <p>Como prevencionista, me encargo de realizar un recorrido por tu empresa, identificar todos los peligros, evaluar los riesgos y elaborar la matriz completa con las medidas de control correspondientes.</p>
        `
    },
    capacitaciones: {
        title: 'Capacitaciones en Prevencion de Riesgos',
        content: `
            <p>Las <strong>capacitaciones en prevencion de riesgos</strong> son obligatorias segun el DS 44 y la Ley 16.744. Todo trabajador debe recibir formacion adecuada sobre los riesgos de su puesto y las medidas de prevencion.</p>
            
            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">Temas que cubro</h4>
            <ul class="space-y-3 mt-4">
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-secondary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Prevencion de riesgos especificos del rubro</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-secondary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Uso correcto de Equipos de Proteccion Personal (EPP)</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-secondary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Planes de emergencia y evacuacion</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-secondary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Manejo de sustancias peligrosas</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-secondary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Legislacion vigente y derechos del trabajador</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-secondary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Primeros auxilios basicos</li>
            </ul>

            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">Modalidades</h4>
            <p>Ofrezco capacitaciones <strong>presenciales</strong> en tu empresa o de forma <strong>online</strong> para equipos remotos. Todas las sesiones quedan documentadas con asistencia y contenido para efectos de fiscalizacion.</p>
        `
    },
    reglamento: {
        title: 'Reglamento Interno de Orden, Higiene y Seguridad',
        content: `
            <p>El <strong>Reglamento Interno de Orden, Higiene y Seguridad (RIOHS)</strong> es obligatorio para toda empresa con 10 o mas trabajadores, segun el articulo 153 del Codigo del Trabajo.</p>
            
            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">¿Que debe contener?</h4>
            <ul class="space-y-3 mt-4">
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Horarios de entrada y salida</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Obligaciones y prohibiciones laborales</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Medidas de higiene y seguridad</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Uso obligatorio de EPP</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Sanciones por incumplimiento</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Procedimientos de emergencia</li>
            </ul>

            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">Mi servicio</h4>
            <p>Redacto o actualizo tu RIOHS de forma personalizada segun la realidad de tu empresa, asegurando que cumpla con toda la normativa vigente y sea aprobado por la Direccion del Trabajo.</p>
        `
    },
    comite: {
        title: 'Comite Paritario de Higiene y Seguridad',
        content: `
            <p>El <strong>Comite Paritario de Higiene y Seguridad (CPHS)</strong> es un organismo compuesto por 3 representantes del empleador y 3 representantes de los trabajadores, obligatorio en empresas con <strong>mas de 25 trabajadores</strong>.</p>
            
            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">Funciones del Comite Paritario</h4>
            <ul class="space-y-3 mt-4">
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Asesorar a la empresa en programas de prevencion</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Inspeccionar periodicamente los lugares de trabajo</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Investigar accidentes y enfermedades profesionales</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Promover capacitaciones en prevencion</li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Reuniones mensuales obligatorias</li>
            </ul>

            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">Para empresas con menos de 25 trabajadores</h4>
            <p>Si tu empresa tiene entre <strong>10 y 25 trabajadores</strong>, debes designar un <strong>Delegado de Prevencion</strong> elegido por los trabajadores. Como prevencionista, te asesoro en este proceso y en la capacitacion del delegado.</p>
        `
    },
    emergencia: {
        title: 'Planes de Emergencia y Evacuacion',
        content: `
            <p>Los <strong>planes de emergencia y evacuacion</strong> son obligatorios segun el DS 594 y el DS 44. Toda empresa debe estar preparada para enfrentar siniestros de manera organizada.</p>
            
            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">Elementos del plan</h4>
            <ul class="space-y-3 mt-4">
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><strong>Analisis de riesgos:</strong> Identificacion de escenarios de emergencia posibles.</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><strong>Brigadas de emergencia:</strong> Equipos de evacuacion, primeros auxilios y combate de incendios.</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><strong>Planos de evacuacion:</strong> Rutas de escape, puntos de encuentro y ubicacion de extintores.</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><strong>Simulacros:</strong> Ejercicios practicos periodicos para validar el plan.</div></li>
            </ul>

            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">Mi servicio</h4>
            <p>Diseno el plan de emergencia a medida de tu empresa, incluyendo la capacitacion de brigadas, los planos de evacuacion y la realizacion de simulacros. Todo documentado y listo para fiscalizacion.</p>
        `
    },
    investigacion: {
        title: 'Investigacion de Accidentes del Trabajo',
        content: `
            <p>La <strong>investigacion de accidentes</strong> es obligatoria segun la Ley 16.744 y el DS 44. Permite identificar las causas raiz y establecer medidas correctivas para evitar la recurrencia.</p>
            
            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">Metodologia de investigacion</h4>
            <ul class="space-y-3 mt-4">
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><strong>Recoleccion de antecedentes:</strong> Entrevista a testigos, revision del lugar, documentacion.</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><strong>Analisis de causas:</strong> Metodo de arbol de causas o Ishikawa para identificar factores contribuyentes.</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><strong>Medidas correctivas:</strong> Propuestas concretas para eliminar o controlar las causas identificadas.</div></li>
                <li class="flex items-start gap-3"><svg class="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><strong>Informe tecnico:</strong> Documento completo para presentar a la mutualidad y la Direccion del Trabajo.</div></li>
            </ul>

            <h4 class="text-lg font-semibold text-secondary-900 mt-6 mb-3">Importante</h4>
            <p>La investigacion debe realizarse de forma <strong>inmediata</strong> despues del accidente. Como prevencionista, estoy disponible para realizar la investigacion y entregar el informe tecnico en los plazos requeridos.</p>
        `
    }
};

function openModal(key) {
    const data = modalData[key];
    if (!data) return;

    const overlay = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    const content = document.getElementById('modal-content');

    title.textContent = data.title;
    body.innerHTML = data.content;

    overlay.classList.remove('opacity-0', 'pointer-events-none');
    content.classList.remove('scale-95');
    content.classList.add('scale-100');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');

    overlay.classList.add('opacity-0', 'pointer-events-none');
    content.classList.add('scale-95');
    content.classList.remove('scale-100');
    document.body.style.overflow = '';
}

// Make modal functions available globally for onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;

document.getElementById('modal-overlay')?.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});