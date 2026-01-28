
// Configuración del enlace de Discord
const DISCORD_INVITE_URL = 'https://discord.gg/tu-enlace-aqui'; // Cambia esto por tu enlace real de Discord

// Configuración de streamers de la comunidad (simplificada para evitar problemas de carga)
// Configuración simplificada de streamers
const STREAMERS_CONFIG = {
    'sunnci': {
        username: 'sunnci',
        displayName: 'Sunnci',
        platforms: {
            twitch: 'https://www.twitch.tv/sunnci',
            instagram: 'https://www.instagram.com/sunnci_/',
            kick: null
        },
        profileImageUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/95474c4b-3ec3-4d8f-8ecb-4785d22e7d6a-profile_image-70x70.png'
    }
};

/*
// FUNCIONES DE API TEMPORALMENTE DESHABILITADAS PARA EVITAR PROBLEMAS DE CARGA
// Descomenta cuando tengas las credenciales de Twitch configuradas

// Obtener token de acceso de Twitch usando Client Credentials
async function getTwitchAccessToken() {
    // Código comentado para evitar problemas de CORS y carga
}

// Obtener información del usuario de Twitch  
async function getTwitchUserInfo(username) {
    // Código comentado para evitar problemas de CORS y carga
}

// Obtener estado del stream de Twitch
async function getTwitchStreamInfo(userId) {
    // Código comentado para evitar problemas de CORS y carga
}

// Función principal para actualizar datos del streamer
async function updateStreamerData(username) {
    // Temporalmente deshabilitada - usar datos manuales
    console.log('📋 Usando datos manuales para', username);
}
*/

// Función simplificada para inicializar streamer - sin estados en vivo
function initStreamerDisplay() {
    const config = STREAMERS_CONFIG['sunnci'];
    const card = document.querySelector('[data-username="sunnci"]');
    
    if (card && config) {
        // Actualizar imagen del streamer
        const imgElement = card.querySelector('.streamer-image img');
        if (imgElement) {
            imgElement.src = config.profileImageUrl || 'https://via.placeholder.com/150x150/9146ff/ffffff?text=S';
            imgElement.alt = config.displayName;
        }
        
        // Actualizar nombre del streamer
        const nameElement = card.querySelector('.streamer-name');
        if (nameElement) {
            nameElement.textContent = config.displayName;
        }
        
        // Configurar click handler para toda la card
        setupStreamClickHandler(card, config);
        
        console.log('✅ Streamer inicializado:', config.displayName);
    }
}

// Formatear número de espectadores
function formatViewerCount(count) {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
}
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000; // 2 segundos
                const increment = target / (duration / 16); // 60 FPS
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    entry.target.textContent = Math.floor(current);

                    if (current >= target) {
                        entry.target.textContent = target;
                        clearInterval(timer);
                    }
                }, 16);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));
}

// Smooth scroll para los enlaces de navegación
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip Discord links and external links
            if (href === '#' || this.classList.contains('discord-btn') || this.classList.contains('discord-nav-btn')) {
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Efectos de scroll en la navbar
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(139, 92, 246, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// Animaciones de entrada para elementos
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const animateElements = document.querySelectorAll('.feature, .game-card, .about-text, .about-visual');
    animateElements.forEach(el => observer.observe(el));
}

// Configurar enlaces de Discord
function setupDiscordLinks() {
    const discordButtons = document.querySelectorAll('.discord-btn, .discord-nav-btn, #discordFooter');
    
    discordButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Mostrar modal de información si no hay enlace configurado
            if (DISCORD_INVITE_URL === 'https://discord.gg/tu-enlace-aqui') {
                showDiscordModal();
            } else {
                window.open(DISCORD_INVITE_URL, '_blank');
            }
        });
    });
}

// Inicializar funcionalidad de streamers
function initStreamers() {
    const streamerCards = document.querySelectorAll('.streamer-card');
    
    streamerCards.forEach(card => {
        const username = card.getAttribute('data-username');
        const platform = card.getAttribute('data-platform');
        const config = STREAMERS_CONFIG[username];
        
        if (config) {
            setupStreamClickHandler(card, config);
            
            // Cargar datos reales del streamer
            if (platform === 'twitch') {
                updateStreamerData(username);
            }
        }
    });

    // Configurar botón para unirse como streamer
    const joinStreamersBtn = document.querySelector('.join-streamers-btn');
    if (joinStreamersBtn) {
        joinStreamersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showJoinStreamersModal();
        });
    }

    // Actualizar estado de streams cada 2 minutos
    setInterval(() => {
        Object.keys(STREAMERS_CONFIG).forEach(username => {
            if (STREAMERS_CONFIG[username].platform === 'twitch') {
                updateStreamerData(username);
            }
        });
    }, 120000); // 2 minutos

    console.log('✅ Sistema de streamers inicializado con APIs reales');
}

/*
// FUNCIÓN COMENTADA - Ya no necesaria sin estados en vivo
// Actualizar tarjeta de streamer con datos
function updateStreamerCard(card, config) {
    const liveIndicator = card.querySelector('.live-indicator');
    const offlineIndicator = card.querySelector('.offline-indicator');
    const streamPreview = card.querySelector('.stream-preview');
    const gameElement = card.querySelector('.streamer-game');
    const viewersElement = card.querySelector('.streamer-viewers, .streamer-followers');
    const thumbnailImg = card.querySelector('.stream-thumbnail img');

    if (config.isLive) {
        // Mostrar como en vivo
        if (liveIndicator) liveIndicator.style.display = 'flex';
        if (offlineIndicator) offlineIndicator.style.display = 'none';
        if (streamPreview) {
            streamPreview.classList.remove('offline');
            streamPreview.style.cursor = 'pointer';
        }
        card.classList.add('live');
        
        if (gameElement) gameElement.textContent = `Jugando: ${config.currentGame}`;
        if (viewersElement) viewersElement.textContent = `${config.viewers} espectadores`;
        
        // Actualizar thumbnail del stream si está disponible
        if (thumbnailImg && config.thumbnailUrl) {
            thumbnailImg.src = config.thumbnailUrl;
            thumbnailImg.alt = `Stream de ${config.displayName}`;
        } else if (thumbnailImg) {
            thumbnailImg.src = 'https://via.placeholder.com/320x180/9146ff/ffffff?text=Stream+En+Vivo';
        }
    } else {
        // Mostrar como offline
        if (liveIndicator) liveIndicator.style.display = 'none';
        if (offlineIndicator) offlineIndicator.style.display = 'flex';
        if (streamPreview) {
            streamPreview.classList.add('offline');
            streamPreview.style.cursor = 'default';
        }
        card.classList.remove('live');
        
        if (gameElement) {
            const lastGame = config.lastGame || config.currentGame;
            gameElement.textContent = lastGame === 'Offline' ? 'Stream offline' : `Último stream: ${lastGame}`;
        }
        
        if (viewersElement) {
            const followers = config.followers || 'N/A';
            viewersElement.textContent = `${followers} seguidores`;
        }
        
        // Thumbnail offline
        if (thumbnailImg) {
            thumbnailImg.src = 'https://via.placeholder.com/320x180/1a1a1a/666?text=Stream+Offline';
            thumbnailImg.alt = 'Stream Offline';
        }
    }
    
    // Actualizar timestamp
    if (config.lastUpdated) {
        const timestamp = card.querySelector('.last-updated') || document.createElement('small');
        if (!card.querySelector('.last-updated')) {
            timestamp.className = 'last-updated';
            timestamp.style.cssText = 'color: #666; font-size: 0.8rem; display: block; text-align: center; margin-top: 10px;';
            card.querySelector('.streamer-info').appendChild(timestamp);
        }
        timestamp.textContent = `Actualizado: ${config.lastUpdated.toLocaleTimeString()}`;
    }
}
*/

// Configurar clicks en redes sociales - versión simplificada
function setupStreamClickHandler(card, config) {
    if (!card || !config) return;
    
    // Configurar botón de Twitch
    const twitchBtn = card.querySelector('.social-btn.twitch');
    if (twitchBtn && config.platforms.twitch) {
        twitchBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.open(config.platforms.twitch, '_blank');
            console.log(`Twitch abierto: ${config.displayName}`);
        });
    }
    
    // Configurar botón de Instagram
    const instagramBtn = card.querySelector('.social-btn.instagram');
    if (instagramBtn && config.platforms.instagram) {
        instagramBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.open(config.platforms.instagram, '_blank');
            console.log(`Instagram abierto: ${config.displayName}`);
        });
    }
    
    // Hacer toda la card clickeable para Twitch como fallback
    card.addEventListener('click', () => {
        if (config.platforms.twitch) {
            window.open(config.platforms.twitch, '_blank');
        }
    });
    
    card.style.cursor = 'pointer';
    card.title = `Ver perfil de ${config.displayName}`;
}

/* 
// FUNCIÓN COMENTADA - Ya no necesaria sin estados en vivo
// Simular actualización de estado de streams
function updateStreamStatus() {
    Object.keys(STREAMERS_CONFIG).forEach(username => {
        const config = STREAMERS_CONFIG[username];
        const card = document.querySelector(`[data-username="${username}"]`);
        
        if (card && config) {
            // Simular cambios de estado (en producción esto vendría de APIs reales)
            const randomChange = Math.random();
            if (randomChange < 0.1) { // 10% probabilidad de cambio
                config.isLive = !config.isLive;
                updateStreamerCard(card, config);
                setupStreamClickHandler(card, config);
                
                console.log(`Stream status updated: ${config.displayName} is now ${config.isLive ? 'LIVE' : 'OFFLINE'}`);
            }
        }
    });
}
*/

// Modal para unirse como streamer
function showJoinStreamersModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
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
        max-width: 600px;
        width: 90%;
        border: 2px solid #8b5cf6;
        box-shadow: 0 20px 40px rgba(139, 92, 246, 0.3);
    `;

    modalContent.innerHTML = `
        <i class="fas fa-video" style="font-size: 4rem; color: #8b5cf6; margin-bottom: 20px;"></i>
        <h2 style="color: #8b5cf6; font-family: 'Orbitron', monospace; margin-bottom: 20px;">
            ¡Únete como Streamer!
        </h2>
        <p style="color: #ccc; margin-bottom: 30px; line-height: 1.6;">
            ¿Eres creador de contenido? Únete a nuestra comunidad de streamers de YAG3R y comparte tu pasión por los videojuegos.
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; margin: 30px 0;">
            <div style="padding: 20px; background: rgba(145, 70, 255, 0.1); border-radius: 15px; border: 1px solid rgba(145, 70, 255, 0.3);">
                <i class="fab fa-twitch" style="font-size: 2rem; color: #9146ff; margin-bottom: 10px;"></i>
                <h4 style="color: #9146ff;">Twitch</h4>
                <p style="color: #ccc; font-size: 0.9rem;">Streams en vivo</p>
            </div>
            <div style="padding: 20px; background: rgba(255, 0, 0, 0.1); border-radius: 15px; border: 1px solid rgba(255, 0, 0, 0.3);">
                <i class="fab fa-youtube" style="font-size: 2rem; color: #ff0000; margin-bottom: 10px;"></i>
                <h4 style="color: #ff0000;">YouTube</h4>
                <p style="color: #ccc; font-size: 0.9rem;">Videos y streams</p>
            </div>
            <div style="padding: 20px; background: rgba(24, 119, 242, 0.1); border-radius: 15px; border: 1px solid rgba(24, 119, 242, 0.3);">
                <i class="fab fa-facebook" style="font-size: 2rem; color: #1877f2; margin-bottom: 10px;"></i>
                <h4 style="color: #1877f2;">Facebook</h4>
                <p style="color: #ccc; font-size: 0.9rem;">Gaming streams</p>
            </div>
            <div style="padding: 20px; background: rgba(83, 217, 44, 0.1); border-radius: 15px; border: 1px solid rgba(83, 217, 44, 0.3);">
                <i class="fas fa-play-circle" style="font-size: 2rem; color: #53d92c; margin-bottom: 10px;"></i>
                <h4 style="color: #53d92c;">Kick</h4>
                <p style="color: #ccc; font-size: 0.9rem;">Streaming libre</p>
            </div>
        </div>
        <div style="margin-bottom: 20px; padding: 15px; background: rgba(139, 92, 246, 0.1); border-radius: 10px; border-left: 4px solid #8b5cf6;">
            <small style="color: #ccc;">
                Contáctanos en Discord para más información sobre cómo unirte
            </small>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" 
                style="background: #8b5cf6; color: #fff; border: none; padding: 12px 30px; border-radius: 25px; font-weight: 600; cursor: pointer; font-size: 1rem; transition: all 0.3s ease; margin-right: 10px;">
            Cerrar
        </button>
        <button onclick="window.open('${DISCORD_INVITE_URL}', '_blank'); this.parentElement.parentElement.remove();"
                style="background: #5865f2; color: #fff; border: none; padding: 12px 30px; border-radius: 25px; font-weight: 600; cursor: pointer; font-size: 1rem; transition: all 0.3s ease;">
            <i class="fab fa-discord"></i> Ir a Discord
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

// Modal para configurar Discord
function showDiscordModal() {
    // Crear modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
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
        max-width: 500px;
        width: 90%;
        border: 2px solid #00ff88;
        box-shadow: 0 20px 40px rgba(0, 255, 136, 0.3);
    `;

    modalContent.innerHTML = `
        <i class="fab fa-discord" style="font-size: 4rem; color: #5865f2; margin-bottom: 20px;"></i>
        <h2 style="color: #8b5cf6; font-family: 'Orbitron', monospace; margin-bottom: 20px;">
            ¡Configura tu Discord!
        </h2>
        <p style="color: #ccc; margin-bottom: 30px; line-height: 1.6;">
            Para conectar tu servidor de Discord, edita el archivo <code style="color: #8b5cf6; background: rgba(139,92,246,0.1); padding: 2px 8px; border-radius: 4px;">script.js</code> 
            y cambia la variable <code style="color: #8b5cf6; background: rgba(139,92,246,0.1); padding: 2px 8px; border-radius: 4px;">DISCORD_INVITE_URL</code> 
            por tu enlace de invitación real.
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

// Efectos de partículas en el fondo
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

// Añadir CSS para animación de partículas
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

// Efecto de escritura para el título
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

// Cursor personalizado (opcional)
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

// Loader personalizado
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

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando YAG3R...');
    
    // Simular tiempo de carga mínimo
    setTimeout(() => {
        try {
            // Funciones básicas de UI
            initSmoothScroll();
            initNavbarEffects();
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

// Mensaje de bienvenida en consola
console.log(`
%c
 ██    ██  █████   ██████  ██████  ██████  
 ██  ██  ██   ██ ██       ██      ██   ██ 
 ████    ███████ ██   ███ ██████  ██████  
  ██     ██   ██ ██    ██      ██ ██   ██ 
  ██     ██   ██  ██████  ██████  ██   ██ 

%c¡Bienvenido a YAG3R Community!
%cPara configurar el enlace de Discord, edita la variable DISCORD_INVITE_URL en script.js
`, 
'color: #8b5cf6; font-family: monospace;', 
'color: #8b5cf6; font-size: 16px; font-weight: bold;',
'color: #888; font-size: 12px;'
);

// Analytics simple (opcional)
function trackPageView() {
    // Aquí puedes añadir tu código de analytics
    console.log('Página vista:', window.location.href);
}

// Easter egg - Konami Code
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

// Sistema de donaciones
let selectedAmount = null;

// Inicializar sistema de donaciones
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

// Sistema de Reproductor de Música CIRCULAR con Spotify - SIMPLIFICADO
function initMusicPlayer() {
    console.log('🎵 Inicializando reproductor YAG3R...');
    
    const musicPlayer = document.getElementById('music-player');
    const spotifyCircleBtn = document.getElementById('spotify-circle-btn');
    const collapseBtn = document.getElementById('collapse-btn');
    const iframe = document.getElementById('spotify-iframe');
    
    // Tu playlist específica
    const YAGR_PLAYLIST = '3NEqwt1QL9GH0PXsHiQSxA';
    
    // Verificar que los elementos existan
    if (!musicPlayer || !spotifyCircleBtn || !iframe) {
        console.error('❌ Elementos del reproductor no encontrados');
        return;
    }
    
    // Configurar iframe inmediatamente con tu playlist
    iframe.src = `https://open.spotify.com/embed/playlist/${YAGR_PLAYLIST}?utm_source=generator`;
    console.log('✅ Playlist YAG3R cargada:', YAGR_PLAYLIST);
    
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
        
        showNotification('🎵 ¡Reproductor YAG3R abierto!');
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
        console.log('🎵 ¡Iniciando música YAG3R automáticamente!');
        
        // Activar efectos visuales
        spotifyCircleBtn?.classList.add('playing');
        document.querySelector('.music-indicator')?.classList.add('active');
        
        // Mostrar notificación de inicio
        showNotification('🎵 ¡YAG3R Official Mix iniciado!');
        
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

// Mostrar proceso de donación
    
    // Playlists de Spotify disponibles
    const playlists = [
        {
            name: '� YAG3R Official Mix',
            id: '3NEqwt1QL9GH0PXsHiQSxA',
            description: 'Playlist oficial de YAG3R Community'
        },
        {
            name: '�🎮 Gaming Hip-Hop',
            id: '37i9dQZF1DX0XUsuxWHRQd',
            description: 'Hip-hop beats para gaming'
        },
        {
            name: '⚡ Electronic Gaming',
            id: '37i9dQZF1DWZq3dEIvgRdp',
            description: 'Música electrónica para jugar'
        },
        {
            name: '🔥 Intense Gaming',
            id: '37i9dQZF1DX4eRPd9frC1m',
            description: 'Música intensa para gaming'
        }
    ];
    
    // Iniciar autoplay inmediato
    function startAutoplay() {
        console.log('🎵 ¡Iniciando música automáticamente!');
        isPlaying = true;
        
        // Reproducir audio de fondo oculto para activar autoplay
        if (backgroundAudio) {
            backgroundAudio.play().catch(e => {
                console.log('Audio requerirá interacción del usuario');
            });
        }

// Mostrar proceso de donación
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

// Función para ocultar el loader de página
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