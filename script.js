// === YAG3R Community Website - Script Principal ===
// Script principal para la funcionalidad de la página

// === CONFIGURACIÓN DISCORD ===
const DISCORD_INVITE_URL = 'https://discord.gg/4b84j9wc8S';

// === CONFIGURACIÓN STREAMERS ===
const STREAMERS_CONFIG = {
    isLive: false,
    currentStreamer: {
        name: 'YAG3R',
        avatar: 'https://via.placeholder.com/50',
        viewers: 1234,
        game: 'Fortnite',
        platform: 'Twitch',
        url: 'https://twitch.tv/yag3r'
    }
};

// === NAVEGACIÓN Y SCROLL ===
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === EFECTOS DEL NAVBAR ===
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Auto-hide navbar on scroll down
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
    });
}

// === NAVEGACIÓN ACTIVA ===
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    // Activar "Inicio" por defecto al cargar la página
    const inicioLink = document.querySelector('.nav-menu a[href="#inicio"]');
    if (inicioLink) {
        inicioLink.classList.add('active');
    }
    
    // Crear el observer para las secciones
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            
            if (entry.isIntersecting) {
                // Remover clase active de todos los links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Añadir clase active al link correspondiente
                if (navLink) {
                    navLink.classList.add('active');
                    console.log(`📍 Sección activa: ${sectionId}`);
                }
            }
        });
    }, {
        threshold: 0.3, // Se activa cuando el 30% de la sección está visible
        rootMargin: '-50px 0px -50px 0px' // Ajuste para mejor detección
    });

    // Observar todas las secciones
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    console.log('🎯 Navegación activa inicializada');
}

// === ANIMACIONES DE SCROLL ===
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.feature-card, .donation-card, .stats-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// === ANIMACIÓN DE NÚMEROS ===
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const animateCounter = (number) => {
        const target = parseInt(number.getAttribute('data-target')) || 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                number.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target.toLocaleString();
            }
        };
        
        updateNumber();
    };

    // Observer para animar cuando los números entren en vista
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                numbers.forEach(number => {
                    animateCounter(number);
                });
            }
        });
    }, { threshold: 0.5 });

    // Observar la sección de estadísticas
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    } else {
        // Fallback: animar inmediatamente si no se encuentra la sección
        numbers.forEach(number => {
            animateCounter(number);
        });
    }
}

// === CONFIGURACIÓN DE DISCORD ===
function setupDiscordLinks() {
    const discordButtons = document.querySelectorAll('[href*="discord"]');
    
    discordButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (DISCORD_INVITE_URL.includes('your-invite-code')) {
                e.preventDefault();
                showDiscordConfigModal();
            } else {
                button.href = DISCORD_INVITE_URL;
            }
        });
    });
}

function showDiscordConfigModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        border: 2px solid var(--primary-purple);
        max-width: 500px;
        margin: 20px;
        box-shadow: 0 20px 60px rgba(139, 92, 246, 0.3);
    `;
    
    modalContent.innerHTML = `
        <i class="fab fa-discord" style="font-size: 4rem; color: #5865f2; margin-bottom: 20px;"></i>
        <h2 style="color: white; margin-bottom: 20px; font-family: 'Orbitron', monospace;">
            Discord no configurado
        </h2>
        <p style="color: #ccc; margin-bottom: 20px; line-height: 1.6;">
            Para usar la función de Discord, necesitas configurar tu enlace de invitación en el archivo script.js
        </p>
        <div style="margin-bottom: 20px; padding: 15px; background: rgba(88, 101, 242, 0.1); border-radius: 10px; border-left: 4px solid #5865f2;">
            <small style="color: #ccc;">
                Ejemplo: https://discord.gg/tu-codigo-de-invitacion
            </small>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" 
                style="background: #8b5cf6; color: #fff; border: none; padding: 12px 30px; border-radius: 25px; font-weight: 600; cursor: pointer; font-size: 1rem; transition: all 0.3s ease;">
            Entendido
        </button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Animación de entrada
    modalContent.style.transform = 'scale(0.8)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalContent.style.transition = 'all 0.3s ease';
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 10);
}

// === SISTEMA DE STREAMERS ===
function initStreamerDisplay() {
    console.log('🎮 Inicializando sistema de streamers...');
    
    const streamingSection = document.querySelector('.streaming-status');
    
    if (streamingSection) {
        updateStreamerStatus();
        // Actualizar cada 60 segundos
        setInterval(updateStreamerStatus, 60000);
    }
    
    console.log('✅ Sistema de streamers configurado');
}

function updateStreamerStatus() {
    const statusBadge = document.querySelector('.live-badge');
    const streamerInfo = document.querySelector('.current-stream');
    
    if (!statusBadge) return;
    
    if (STREAMERS_CONFIG.isLive) {
        const { name, avatar, viewers, game, platform, url } = STREAMERS_CONFIG.currentStreamer;
        
        statusBadge.innerHTML = `
            <span class="live-indicator"></span>
            <span>EN VIVO</span>
        `;
        statusBadge.classList.add('live');
        
        if (streamerInfo) {
            streamerInfo.innerHTML = `
                <div class="streamer-details">
                    <img src="${avatar}" alt="${name}" class="streamer-avatar">
                    <div class="stream-info">
                        <h4>${name}</h4>
                        <p>Jugando ${game}</p>
                        <span class="viewers">${viewers.toLocaleString()} viewers</span>
                    </div>
                    <a href="${url}" target="_blank" class="watch-btn">
                        Ver en ${platform}
                    </a>
                </div>
            `;
        }
    } else {
        statusBadge.innerHTML = `
            <span class="offline-indicator"></span>
            <span>OFFLINE</span>
        `;
        statusBadge.classList.remove('live');
        
        if (streamerInfo) {
            streamerInfo.innerHTML = `
                <div class="offline-message">
                    <h4>No hay streams activos</h4>
                    <p>¡Mantente pendiente para los próximos streams!</p>
                </div>
            `;
        }
    }
}

// === SISTEMA DE DONACIONES ===
function initDonations() {
    console.log('🎯 Inicializando sistema de donaciones...');
    
    // Selección de montos predefinidos
    const amountButtons = document.querySelectorAll('.amount-btn');
    const donateButtons = document.querySelectorAll('.donate-btn');
    const customInputs = document.querySelectorAll('.amount-input');
    
    let selectedAmounts = {
        paypal: null,
        mercadopago: null
    };

    // Manejar botones de monto predefinido
    amountButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const amount = btn.getAttribute('data-amount');
            const card = btn.closest('.donation-card');
            const platform = card.querySelector('.donate-btn').getAttribute('data-platform');
            
            // Remover selección previa en esta tarjeta
            card.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
            
            // Seleccionar nuevo botón
            btn.classList.add('selected');
            selectedAmounts[platform] = amount;
            
            // Limpiar input personalizado
            const customInput = card.querySelector('.amount-input');
            if (customInput) {
                customInput.value = '';
            }
            
            console.log(`Monto seleccionado para ${platform}:`, amount);
        });
    });

    // Manejar inputs personalizados
    customInputs.forEach(input => {
        input.addEventListener('input', () => {
            const card = input.closest('.donation-card');
            const platform = card.querySelector('.donate-btn').getAttribute('data-platform');
            const amount = parseFloat(input.value);
            
            if (amount > 0) {
                // Remover selección de botones predefinidos
                card.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('selected'));
                selectedAmounts[platform] = amount;
                console.log(`Monto personalizado para ${platform}:`, amount);
            } else {
                selectedAmounts[platform] = null;
            }
        });
    });

    // Manejar botones de donación
    donateButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = btn.getAttribute('data-platform');
            const amount = selectedAmounts[platform];
            
            if (!amount || amount <= 0) {
                alert('Por favor selecciona un monto válido antes de continuar');
                return;
            }
            
            console.log(`🎯 Procesando donación ${platform}:`, amount);
            
            // Mostrar modal de procesamiento y redirigir
            showDonationProcess(platform, amount, () => {
                if (platform === 'paypal') {
                    // URL de PayPal para donaciones
                    const paypalUrl = `https://www.paypal.com/donate/?business=YAG3RCOMMUNITY@GMAIL.COM&amount=${amount}&currency_code=USD&item_name=Donación+YAG3R+Community`;
                    window.open(paypalUrl, '_blank');
                } else if (platform === 'mercadopago') {
                    // URL de MercadoPago - necesitarías configurar tu cuenta y obtener el link
                    const mercadopagoUrl = `https://mpago.la/2DQ8vFK?amount=${amount}`;
                    // Por ahora mostrar alerta con instrucciones
                    alert(`Redirigiendo a MercadoPago por $${amount} ARS\n\nPara configurar MercadoPago:\n1. Crea una cuenta en mercadopago.com\n2. Crea un link de cobro\n3. Reemplaza la URL en el código`);
                    window.open(mercadopagoUrl, '_blank');
                }
            });
        });
    });
    
    console.log('💝 Sistema de donaciones inicializado');
}

// === SISTEMA DE REPRODUCTOR DE MÚSICA ===
function initMusicPlayer() {
    console.log('🎵 Inicializando reproductor YAG3R...');
    
    const musicPlayer = document.getElementById('music-player');
    const spotifyCircleBtn = document.getElementById('spotify-circle-btn');
    const collapseBtn = document.getElementById('collapse-btn');
    const iframe = document.getElementById('spotify-iframe');
    
    // Tu playlist específica de YAG3R
    const YAGR_PLAYLIST = '3NEqwt1QL9GH0PXsHiQSxA';
    
    // Verificar que los elementos existan
    if (!musicPlayer || !spotifyCircleBtn || !iframe) {
        console.error('❌ Elementos del reproductor no encontrados');
        return;
    }
    
    // Configurar iframe inmediatamente con tu playlist con autoplay y shuffle
    iframe.src = `https://open.spotify.com/embed/playlist/${YAGR_PLAYLIST}?utm_source=generator&theme=0&autoplay=1&shuffle=1`;
    console.log('✅ Playlist YAG3R cargada con autoplay y shuffle:', YAGR_PLAYLIST);
    
    // Estado de reproducción
    let isExpanded = false;
    
    // Función para mostrar notificación
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = 'music-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fab fa-spotify"></i>
                <span>${message}</span>
            </div>
        `;
        
        const bgColor = type === 'success' 
            ? 'linear-gradient(135deg, rgba(30, 215, 96, 0.95), rgba(25, 185, 85, 0.95))'
            : 'linear-gradient(135deg, rgba(139, 92, 246, 0.95), rgba(168, 85, 247, 0.95))';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 15px 20px;
            border-radius: 15px;
            z-index: 10001;
            font-weight: 600;
            box-shadow: 0 8px 25px rgba(30, 215, 96, 0.4);
            animation: slideInRight 0.5s ease;
            backdrop-filter: blur(10px);
            cursor: pointer;
        `;
        
        document.body.appendChild(notification);
        
        // Remover después de 4 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 4000);
    }
    
    // Click en círculo de Spotify para expandir
    spotifyCircleBtn.addEventListener('click', () => {
        console.log('🔍 Expandiendo reproductor YAG3R');
        musicPlayer.classList.remove('compact');
        isExpanded = true;
        
        // Activar efectos visuales
        spotifyCircleBtn.classList.add('playing');
        document.querySelector('.music-indicator')?.classList.add('active');
        
        showNotification('🔀 ¡Reproductor YAG3R en modo aleatorio!');
    });

    // Botón para colapsar
    if (collapseBtn) {
        collapseBtn.addEventListener('click', () => {
            musicPlayer.classList.add('compact');
            isExpanded = false;
            console.log('🔽 Contrayendo reproductor');
        });
    }

    // Autoplay inmediato al cargar la página
    function startAutoplay() {
        console.log('🔀 ¡Iniciando música YAG3R en modo aleatorio!');
        
        // Activar efectos visuales
        spotifyCircleBtn?.classList.add('playing');
        document.querySelector('.music-indicator')?.classList.add('active');
        
        // Mostrar notificación de inicio con modo shuffle
        showNotification('🔀 ¡YAG3R Official Mix en modo aleatorio!');
        
        // Expandir automáticamente por 3 segundos para mostrar el contenido
        setTimeout(() => {
            if (musicPlayer && musicPlayer.classList.contains('compact')) {
                musicPlayer.classList.remove('compact');
                setTimeout(() => {
                    musicPlayer.classList.add('compact');
                }, 3000);
            }
        }, 1500);
    }

    // Verificar playlist cargada
    iframe.onload = () => {
        console.log('✅ Playlist YAG3R cargada exitosamente');
    };

    iframe.onerror = () => {
        console.error('❌ Error cargando playlist YAG3R');
        showNotification('❌ Error cargando música', 'error');
    };

    // Iniciar autoplay después de 1 segundo
    setTimeout(startAutoplay, 1000);

    console.log('✅ Reproductor YAG3R inicializado correctamente');
}

// === MOSTRAR PROCESO DE DONACIÓN ===
function showDonationProcess(platform, amount, callback) {
    // Crear modal de procesamiento
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            border: 2px solid var(--primary-purple);
            max-width: 400px;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        ">
            <i class="fas fa-heart" style="font-size: 3rem; color: var(--primary-purple); margin-bottom: 20px; animation: heartbeat 1s ease infinite;"></i>
            <h3 style="color: white; margin-bottom: 15px; font-family: 'Orbitron', monospace;">Procesando donación</h3>
            <p style="color: #ccc; margin-bottom: 20px;">Plataforma: ${platform}</p>
            <p style="color: var(--light-purple); font-size: 1.2rem; font-weight: bold; margin-bottom: 30px;">Monto: $${amount}</p>
            <div style="width: 40px; height: 40px; border: 4px solid rgba(139, 92, 246, 0.1); border-left: 4px solid var(--primary-purple); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animar entrada
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('div').style.transform = 'scale(1)';
    }, 100);
    
    // Procesar donación después de 2 segundos
    setTimeout(() => {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
            callback();
        }, 300);
    }, 2000);
}

// === FUNCIÓN PARA OCULTAR EL LOADER DE PÁGINA ===
function hidePageLoader() {
    const loader = document.getElementById('page-loader');
    const body = document.body;
    
    if (loader) {
        // Agregar clase de fade out
        loader.classList.add('fade-out');
        
        // Remover clase loading del body
        body.classList.remove('loading');
        
        // Remover el loader del DOM después de la animación
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 800);
        
        console.log('✨ Loader ocultado - Bienvenido a YAG3R!');
    }
}

// === EFECTOS DE PARTÍCULAS ===
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(139, 92, 246, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float-particle ${10 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
        `;
        hero.appendChild(particle);
    }
}

function addParticleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// === EFECTO DE ESCRITURA PARA EL TÍTULO ===
function typeWriter() {
    const heroTitle = document.querySelector('.logo-text');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const timer = setInterval(() => {
        heroTitle.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(timer);
        }
    }, 150);
}

// === CURSOR PERSONALIZADO ===
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(139, 92, 246, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Efectos hover
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'rgba(139, 92, 246, 0.6)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'rgba(139, 92, 246, 0.3)';
        });
    });
}

// === LOADER PERSONALIZADO ===
function showLoader() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a0a;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;

    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="font-family: 'Orbitron', monospace; font-size: 3rem; color: #8b5cf6; margin-bottom: 20px; animation: glow 2s ease-in-out infinite alternate;">
                YAG3R
            </div>
            <div style="width: 50px; height: 50px; border: 3px solid rgba(139, 92, 246, 0.3); border-top: 3px solid #8b5cf6; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;">
            </div>
        </div>
    `;

    // Añadir animación de spin
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);

    document.body.appendChild(loader);

    // Remover loader después de que la página cargue
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// === EASTER EGG - KONAMI CODE ===
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konami.join(',')) {
        // Easter egg activado
        document.body.style.animation = 'rainbow 2s ease infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
        }, 10000);
        
        console.log('%c¡Easter egg activado! 🎮', 'color: #8b5cf6; font-size: 20px;');
    }
});

// === ANALYTICS SIMPLE ===
function trackPageView() {
    console.log('Página vista:', window.location.href);
}

// === INICIALIZACIÓN PRINCIPAL ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando YAG3R...');
    
    // Simular tiempo de carga mínimo
    setTimeout(() => {
        try {
            // Funciones básicas de UI
            initSmoothScroll();
            initNavbarEffects();
            initActiveNavigation();
            initScrollAnimations();
            animateNumbers();
            typeWriter();
            
            // Configurar Discord
            setupDiscordLinks();
            
            // Inicializar streamer (sin API)
            initStreamerDisplay();
            
            // Inicializar sistema de donaciones
            initDonations();
            
            // Inicializar reproductor de música
            initMusicPlayer();
            
            // Efectos visuales
            addParticleStyles();
            createParticles();
            
            // Cursor personalizado solo en desktop
            if (window.innerWidth > 768) {
                initCustomCursor();
            }
            
            // Ocultar loader y mostrar contenido
            hidePageLoader();
            
            console.log('✅ YAG3R cargado correctamente');
        } catch (error) {
            console.error('❌ Error inicializando:', error);
            hidePageLoader(); // Asegurar que se oculte el loader en caso de error
        }
    }, 2000); // 2 segundos de carga mínima
});

// === MENSAJE DE BIENVENIDA EN CONSOLA ===
console.log(`
%c
 ██    ██  █████   ██████  ██████  ██████  
 ██  ██  ██   ██ ██       ██      ██   ██ 
 ████    ███████ ██   ███ ██████  ██████  
  ██     ██   ██ ██    ██      ██ ██   ██ 
  ██     ██   ██  ██████  ██████  ██   ██ 

%c¡Bienvenido a YAG3R Community!
%cTu playlist oficial está cargada y lista para reproducir.
`, 
'color: #8b5cf6; font-family: monospace;', 
'color: #8b5cf6; font-size: 16px; font-weight: bold;',
'color: #888; font-size: 12px;'
);

// === FORMULARIO DE STREAMERS ===
function openStreamerForm() {
    const modal = document.getElementById('streamerModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Animación de entrada
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    console.log('📝 Formulario de streamer abierto');
}

function closeStreamerForm() {
    const modal = document.getElementById('streamerModal');
    modal.classList.remove('show');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
    
    console.log('❌ Formulario de streamer cerrado');
}

// Cerrar modal al hacer clic fuera
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('streamerModal');
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeStreamerForm();
        }
    });
});

// Función para enviar aplicación por email
function sendStreamerApplication(event) {
    event.preventDefault();
    
    const form = document.getElementById('streamerForm');
    const formData = new FormData(form);
    
    // Obtener los valores del formulario
    const nombre = formData.get('nombre') || '';
    const plataforma = formData.get('plataforma_streaming') || '';
    const instagram = formData.get('instagram') || 'No proporcionado';
    const juegos = formData.get('juegos') || '';
    const experiencia = formData.get('experiencia') || 'No especificado';
    const informacion = formData.get('informacion_adicional') || 'Sin información adicional';
    
    // Crear el cuerpo del email
    const emailSubject = 'Nueva Aplicación de Streamer - YAG3R Community';
    const emailBody = `
Hola YAG3R Team,

Nueva aplicación para unirse como streamer:

📺 INFORMACIÓN DEL STREAMER:
• Nombre: ${nombre}
• Plataforma de streaming: ${plataforma}
• Instagram: ${instagram}
• Experiencia: ${experiencia}

🎮 CONTENIDO:
• Juegos/Contenido: ${juegos}

💬 INFORMACIÓN ADICIONAL:
${informacion}

---
Aplicación enviada desde: YAG3R Community Website
Fecha: ${new Date().toLocaleString()}
`;

    // Crear enlace mailto
    const mailtoLink = `mailto:yag3rgaming@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Mostrar feedback al usuario
    const submitBtn = form.querySelector('.btn-submit');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Abriendo email...';
    submitBtn.disabled = true;
    
    // Abrir cliente de email
    window.open(mailtoLink);
    
    // Mostrar mensaje de éxito después de un momento
    setTimeout(() => {
        showStreamerSuccess();
    }, 1500);
    
    console.log('📧 Aplicación de streamer preparada para envío por email');
}

function showStreamerSuccess() {
    const modal = document.getElementById('streamerModal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <div class="success-message">
            <div class="success-icon">
                <i class="fas fa-envelope-open"></i>
            </div>
            <h3>¡Email Preparado!</h3>
            <p>Se ha abierto tu cliente de email con todos los datos completados.</p>
            <p><strong>Solo tienes que hacer clic en "Enviar"</strong> para mandar tu aplicación.</p>
            <p>Revisaremos tu solicitud y nos pondremos en contacto contigo pronto.</p>
            <button onclick="closeStreamerForm()" class="btn-success">
                <i class="fas fa-thumbs-up"></i>
                ¡Entendido!
            </button>
        </div>
    `;
    
    console.log('✅ Email de aplicación de streamer preparado');
}