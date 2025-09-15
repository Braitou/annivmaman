// Diaporama automatique
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function showNextSlide() {
        // Masquer la slide actuelle
        slides[currentSlide].classList.remove('active');
        
        // Passer à la slide suivante
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Afficher la nouvelle slide
        slides[currentSlide].classList.add('active');
    }
    
    // Démarrer le diaporama (change toutes les 3 secondes)
    setInterval(showNextSlide, 3000);
    
    // Ajouter des effets sonores kitsch (optionnel)
    function playKitschSound() {
        // Créer un son synthétique kitsch
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    }
    
    // Effet de clic sur les images (son kitsch)
    slides.forEach(slide => {
        slide.addEventListener('click', playKitschSound);
    });
    
    // Ajouter des confettis supplémentaires au clic
    function createConfetti() {
        const colors = ['#ff0080', '#00ff80', '#8000ff', '#ff8000', '#ffff00', '#ff00ff'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '1000';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            // Animation de chute
            const animation = confetti.animate([
                { 
                    transform: 'translateY(0px) rotate(0deg)',
                    opacity: 1
                },
                { 
                    transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            animation.addEventListener('finish', () => {
                confetti.remove();
            });
        }
    }
    
    // Confettis au clic sur le titre
    const title = document.querySelector('.title-3d');
    title.addEventListener('click', createConfetti);
    
    // Effet de shake sur le titre au survol
    title.addEventListener('mouseenter', function() {
        this.style.animation = 'shake 0.5s ease-in-out';
    });
    
    title.addEventListener('animationend', function() {
        this.style.animation = 'rotate3D 4s ease-in-out infinite';
    });
    
    // Ajouter l'animation shake au CSS dynamiquement
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: rotateY(0deg) rotateX(10deg) scale(1); }
            25% { transform: rotateY(0deg) rotateX(10deg) scale(1) translateX(-5px); }
            75% { transform: rotateY(0deg) rotateX(10deg) scale(1) translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    // Effet de particules supplémentaires au scroll (si sur desktop)
    let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            isScrolling = true;
            setTimeout(() => {
                isScrolling = false;
            }, 100);
            
            // Créer des particules supplémentaires
            createFloatingParticles();
        }
    });
    
    function createFloatingParticles() {
        const emojis = ['💖', '🎈', '🎁', '🌸', '💝', '🎊', '🌺', '💐', '🎂', '🎉'];
        
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.position = 'fixed';
            particle.style.fontSize = '1.5rem';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = '100vh';
            particle.style.zIndex = '100';
            particle.style.pointerEvents = 'none';
            particle.style.animation = 'float 4s ease-in-out forwards';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 4000);
        }
    }
    
    // Effet de clignotement aléatoire des lumières
    function randomLightBlink() {
        const corners = document.querySelectorAll('.light-corner');
        const randomCorner = corners[Math.floor(Math.random() * corners.length)];
        
        randomCorner.style.animation = 'none';
        setTimeout(() => {
            randomCorner.style.animation = 'cornerBlink 1.5s ease-in-out infinite';
        }, 100);
    }
    
    // Clignotement aléatoire toutes les 2 secondes
    setInterval(randomLightBlink, 2000);
    
    // Message de bienvenue dans la console (pour les développeurs curieux)
    console.log(`
    🎉🎂 JOYEUX ANNIVERSAIRE MAMAN ! 🎂🎉
    
    Site créé avec amour et beaucoup de kitsch !
    Toutes les animations sont optimisées pour mobile.
    
    Fonctionnalités :
    - Titre 3D rotatif
    - Diaporama automatique (3s par photo)
    - Lumières clignotantes
    - Particules flottantes
    - Confettis au clic
    - Bandeau à gratter interactif
    - Design responsive
    
    Amusez-vous bien ! 💖
    `);
    
    // Fonctionnalité du bandeau à gratter
    const scratchSurface = document.getElementById('scratchSurface');
    const hiddenContent = document.getElementById('hiddenContent');
    const surpriseButton = document.getElementById('surpriseButton');
    
    let isScratching = false;
    let scratchProgress = 0;
    const scratchThreshold = 40; // Pourcentage de surface grattée nécessaire
    let scratchCanvas = null;
    let scratchCtx = null;
    let lastProgressCheck = 0;
    let progressCheckInterval = 100; // Vérifier la progression tous les 100ms seulement
    let lastScratchTime = 0;
    let lastScratchPosition = { x: 0, y: 0 };
    let scratchPath = []; // Stocker le chemin pour un tracé plus fluide
    let lastSoundTime = 0;
    let soundCooldown = 200; // Minimum 200ms entre les sons
    
    // Initialiser le système de grattage réaliste avec masque canvas
    function initScratchSystem() {
        const rect = scratchSurface.getBoundingClientRect();
        
        // Créer le canvas de masque visible qui va révéler le contenu
        scratchCanvas = document.createElement('canvas');
        scratchCtx = scratchCanvas.getContext('2d');
        
        // Configurer le canvas pour qu'il ait la même taille que la surface
        scratchCanvas.width = rect.width;
        scratchCanvas.height = rect.height;
        scratchCanvas.classList.add('scratch-canvas');
        
        // Créer un masque initial opaque (étiquette intacte)
        scratchCtx.fillStyle = '#c0c0c0';
        scratchCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
        
        // Ajouter une texture argentée réaliste au masque
        addSilverTexture(scratchCtx, scratchCanvas.width, scratchCanvas.height);
        
        // Ajouter le texte "Gratte ici" sur le canvas
        scratchCtx.font = `${Math.min(scratchCanvas.width * 0.08, 24)}px 'Comic Neue', cursive`;
        scratchCtx.fillStyle = '#333';
        scratchCtx.textAlign = 'center';
        scratchCtx.textBaseline = 'middle';
        scratchCtx.fillText('Gratte ici', scratchCanvas.width / 2, scratchCanvas.height / 2);
        
        // Insérer le canvas dans la surface de grattage
        scratchSurface.appendChild(scratchCanvas);
        
        // Configurer le mode de composition pour créer l'effet de masque
        scratchCanvas.style.mask = 'none';
        scratchCanvas.style.webkitMask = 'none';
    }
    
    // Fonction pour ajouter une texture argentée réaliste
    function addSilverTexture(ctx, width, height) {
        // Créer un pattern de texture argentée
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const x = (i / 4) % width;
            const y = Math.floor((i / 4) / width);
            
            // Créer des variations de brillance pour simuler l'argent
            const noise = Math.random() * 0.3;
            const baseGray = 192 + Math.sin(x * 0.1) * 20 + Math.sin(y * 0.15) * 15;
            const finalGray = Math.min(255, Math.max(160, baseGray + noise * 50));
            
            data[i] = finalGray;     // Rouge
            data[i + 1] = finalGray; // Vert
            data[i + 2] = finalGray; // Bleu
            data[i + 3] = 255;       // Alpha
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        // Ajouter des reflets brillants
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
    }
    
    // Fonction optimisée pour calculer le pourcentage de grattage
    function calculateScratchProgress() {
        if (!scratchCanvas || !scratchCtx) return 0;
        
        // Échantillonner seulement une partie des pixels pour la performance
        const sampleStep = 4; // Vérifier 1 pixel sur 4 en largeur et hauteur
        const imageData = scratchCtx.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height);
        const data = imageData.data;
        let scratchedPixels = 0;
        let sampledPixels = 0;
        
        for (let y = 0; y < scratchCanvas.height; y += sampleStep) {
            for (let x = 0; x < scratchCanvas.width; x += sampleStep) {
                const index = (y * scratchCanvas.width + x) * 4 + 3; // Canal alpha
                if (index < data.length) {
                    sampledPixels++;
                    if (data[index] < 128) { // Alpha < 128 (zone grattée/transparente)
                        scratchedPixels++;
                    }
                }
            }
        }
        
        return sampledPixels > 0 ? (scratchedPixels / sampledPixels) * 100 : 0;
    }
    
    // Fonction pour détecter le grattage (souris)
    function handleMouseScratch(e) {
        if (e.buttons === 1) { // Clic gauche maintenu
            isScratching = true;
            scratchSurface.style.cursor = 'grabbing';
            updateScratchEffect(e);
        } else {
            isScratching = false;
            scratchSurface.style.cursor = 'crosshair';
        }
    }
    
    // Fonction pour détecter le grattage (tactile)
    function handleTouchScratch(e) {
        e.preventDefault();
        isScratching = true;
        const touch = e.touches[0];
        updateScratchEffect({ clientX: touch.clientX, clientY: touch.clientY });
    }
    
    // Fonction pour créer l'effet visuel de grattage réaliste avec déchirement optimisé
    function updateScratchEffect(e) {
        if (!isScratching || !scratchCanvas || !scratchCtx) return;
        
        const now = Date.now();
        const rect = scratchSurface.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (scratchCanvas.width / rect.width);
        const y = (e.clientY - rect.top) * (scratchCanvas.height / rect.height);
        
        // Limiter la fréquence d'exécution pour la fluidité
        if (now - lastScratchTime < 16) return; // ~60 FPS max
        lastScratchTime = now;
        
        // Calculer la distance depuis la dernière position pour un tracé plus fluide
        const distance = Math.sqrt(Math.pow(x - lastScratchPosition.x, 2) + Math.pow(y - lastScratchPosition.y, 2));
        
        // Ajouter la position au chemin
        scratchPath.push({ x, y, timestamp: now });
        
        // Nettoyer les anciens points du chemin (garder seulement les 50 derniers)
        if (scratchPath.length > 50) {
            scratchPath = scratchPath.slice(-50);
        }
        
        scratchCtx.globalCompositeOperation = 'destination-out';
        
        // Créer un tracé fluide entre les points
        if (scratchPath.length > 1 && distance > 2) {
            const prevPoint = scratchPath[scratchPath.length - 2];
            
            // Tracer une ligne fluide avec des cercles le long du chemin
            const steps = Math.max(1, Math.floor(distance / 3));
            for (let i = 0; i <= steps; i++) {
                const ratio = i / steps;
                const interpolatedX = prevPoint.x + (x - prevPoint.x) * ratio;
                const interpolatedY = prevPoint.y + (y - prevPoint.y) * ratio;
                
                // Taille variable basée sur la vitesse
                const speed = Math.min(distance / 10, 1);
                const baseSize = 12 + speed * 8;
                const tearSize = baseSize + Math.random() * 6;
                
                // Créer une forme de déchirure optimisée
                createOptimizedTear(interpolatedX, interpolatedY, tearSize);
            }
        } else {
            // Premier point ou point isolé
            const tearSize = 15 + Math.random() * 8;
            createOptimizedTear(x, y, tearSize);
        }
        
        lastScratchPosition = { x, y };
        
        // Vérifier la progression moins fréquemment pour la performance
        if (now - lastProgressCheck > progressCheckInterval) {
            scratchProgress = calculateScratchProgress();
            lastProgressCheck = now;
            
            // Vérifier si assez de surface a été grattée
            if (scratchProgress >= scratchThreshold && !hiddenContent.classList.contains('revealed')) {
                revealSurprise();
            }
        }
        
        // Réduire la fréquence des particules pour la fluidité
        if (Math.random() < 0.15 && distance > 5) { // 15% de chance et seulement si mouvement significatif
            createOptimizedTearParticles(e.clientX - rect.left, e.clientY - rect.top);
        }
        
        // Son de grattage avec debounce pour éviter la surcharge
        if (Math.random() < 0.2 && distance > 3 && now - lastSoundTime > soundCooldown) {
            playScratchSound();
            lastSoundTime = now;
        }
    }
    
    // Fonction optimisée pour créer une déchirure simple et fluide
    function createOptimizedTear(x, y, size) {
        if (!scratchCtx) return;
        
        // Créer une forme simple mais irrégulière
        scratchCtx.beginPath();
        scratchCtx.arc(x, y, size * 0.8, 0, Math.PI * 2);
        scratchCtx.fill();
        
        // Ajouter quelques irrégularités sans trop de calculs
        const spikes = 4 + Math.floor(Math.random() * 3);
        for (let i = 0; i < spikes; i++) {
            const angle = (Math.PI * 2 * i) / spikes + Math.random() * 0.5;
            const spikeLength = size * (0.3 + Math.random() * 0.4);
            const spikeX = x + Math.cos(angle) * (size + spikeLength);
            const spikeY = y + Math.sin(angle) * (size + spikeLength);
            
            scratchCtx.beginPath();
            scratchCtx.arc(spikeX, spikeY, size * 0.3, 0, Math.PI * 2);
            scratchCtx.fill();
        }
    }
    
    // Fonction pour créer des fibres déchirées sur les bords
    function createTearFibers(centerX, centerY, size) {
        if (!scratchCtx) return;
        
        scratchCtx.globalCompositeOperation = 'destination-out';
        scratchCtx.lineWidth = 1 + Math.random() * 2;
        
        // Créer des petites lignes irrégulières autour de la déchirure
        const fiberCount = 5 + Math.floor(Math.random() * 8);
        
        for (let i = 0; i < fiberCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const length = size * (0.3 + Math.random() * 0.7);
            const startX = centerX + Math.cos(angle) * (size * 0.8);
            const startY = centerY + Math.sin(angle) * (size * 0.8);
            const endX = startX + Math.cos(angle) * length;
            const endY = startY + Math.sin(angle) * length;
            
            scratchCtx.beginPath();
            scratchCtx.moveTo(startX, startY);
            scratchCtx.lineTo(endX, endY);
            scratchCtx.stroke();
        }
        
        scratchCtx.globalCompositeOperation = 'source-over';
    }
    
    // Version optimisée des particules de déchirement pour plus de fluidité
    function createOptimizedTearParticles(x, y) {
        // Réduire le nombre de fragments pour la performance
        const fragmentCount = 2 + Math.floor(Math.random() * 4); // 2-5 fragments au lieu de 5-12
        
        for (let i = 0; i < fragmentCount; i++) {
            const fragment = document.createElement('div');
            
            // Formes simplifiées mais toujours attractives
            const size = 2 + Math.random() * 4;
            
            fragment.style.position = 'absolute';
            fragment.style.left = (x + (Math.random() - 0.5) * 30) + 'px';
            fragment.style.top = (y + (Math.random() - 0.5) * 30) + 'px';
            fragment.style.width = size + 'px';
            fragment.style.height = size + 'px';
            
            // Couleur argentée simplifiée
            const brightness = 180 + Math.random() * 40;
            fragment.style.backgroundColor = `rgb(${brightness}, ${brightness}, ${brightness})`;
            fragment.style.borderRadius = '50%';
            fragment.style.pointerEvents = 'none';
            fragment.style.zIndex = '20';
            fragment.style.opacity = '0.7';
            fragment.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.3)';
            
            document.body.appendChild(fragment);
            
            // Animation simplifiée et plus rapide
            const angle = Math.random() * Math.PI * 2;
            const force = 20 + Math.random() * 40; // Force réduite
            const velocityX = Math.cos(angle) * force;
            const velocityY = Math.sin(angle) * force - 10;
            
            // Animation plus courte et simple
            const animation = fragment.animate([
                { 
                    transform: `translate(0px, 0px) scale(1)`,
                    opacity: 0.7
                },
                { 
                    transform: `translate(${velocityX}px, ${velocityY + 20}px) scale(0.3)`,
                    opacity: 0
                }
            ], {
                duration: 600 + Math.random() * 300, // Durée réduite
                easing: 'ease-out'
            });
            
            animation.addEventListener('finish', () => {
                if (fragment.parentNode) {
                    fragment.parentNode.removeChild(fragment);
                }
            });
        }
        
        // Réduire aussi les paillettes
        if (Math.random() < 0.7) { // 70% de chance seulement
            const sparkle = document.createElement('div');
            sparkle.style.position = 'absolute';
            sparkle.style.left = (x + (Math.random() - 0.5) * 20) + 'px';
            sparkle.style.top = (y + (Math.random() - 0.5) * 20) + 'px';
            sparkle.style.width = '2px';
            sparkle.style.height = '2px';
            sparkle.style.backgroundColor = '#ffffff';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '25';
            sparkle.style.boxShadow = '0 0 3px #ffffff';
            
            scratchSurface.appendChild(sparkle);
            
            // Animation de scintillement rapide
            const sparkleAnimation = sparkle.animate([
                { opacity: 1, transform: 'scale(1)' },
                { opacity: 0, transform: 'scale(0)' }
            ], {
                duration: 400,
                easing: 'ease-out'
            });
            
            sparkleAnimation.addEventListener('finish', () => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            });
        }
    }
    
    // Fonction pour jouer un son de grattage réaliste
    function playScratchSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Créer un bruit de grattage avec du bruit blanc filtré
        const bufferSize = audioContext.sampleRate * 0.1; // 0.1 seconde
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        // Générer du bruit blanc
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.1;
        }
        
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        
        // Créer un filtre pour simuler le son de grattage
        const filter = audioContext.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 1000;
        filter.Q.value = 1;
        
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        
        source.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        source.start(audioContext.currentTime);
        source.stop(audioContext.currentTime + 0.1);
    }
    
    // Fonction pour révéler la surprise
    function revealSurprise() {
        // Animation progressive de disparition du canvas d'étiquette
        if (scratchCanvas) {
            scratchCanvas.style.transition = 'opacity 1.2s ease-out';
            scratchCanvas.style.opacity = '0';
        }
        
        // Révéler le contenu caché avec un délai
        setTimeout(() => {
            hiddenContent.classList.add('revealed');
            
            // Effet sonore de révélation
            playRevealSound();
            
            // Confettis supplémentaires pour célébrer
            createConfetti();
            
            // Effet de scintillement final
            createFinalSparkles();
            
            // Message dans la console
            console.log('🎊 Surprise révélée ! L\'étiquette a été déchirée avec succès ! 🎊');
        }, 600);
    }
    
    // Fonction pour créer des scintillements finaux lors de la révélation
    function createFinalSparkles() {
        const sparkleCount = 20;
        const rect = scratchSurface.getBoundingClientRect();
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'absolute';
            sparkle.style.left = (Math.random() * rect.width) + 'px';
            sparkle.style.top = (Math.random() * rect.height) + 'px';
            sparkle.style.width = '3px';
            sparkle.style.height = '3px';
            sparkle.style.backgroundColor = '#ffffff';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '30';
            sparkle.style.boxShadow = '0 0 6px #ffffff, 0 0 12px rgba(255, 255, 255, 0.8)';
            
            scratchSurface.appendChild(sparkle);
            
            // Animation de scintillement de révélation
            const sparkleAnimation = sparkle.animate([
                { 
                    transform: 'scale(0) rotate(0deg)',
                    opacity: 0
                },
                { 
                    transform: 'scale(1.5) rotate(180deg)',
                    opacity: 1,
                    offset: 0.3
                },
                { 
                    transform: 'scale(1) rotate(360deg)',
                    opacity: 0.8,
                    offset: 0.7
                },
                { 
                    transform: 'scale(0) rotate(540deg)',
                    opacity: 0
                }
            ], {
                duration: 1500 + Math.random() * 1000,
                easing: 'ease-out',
                delay: Math.random() * 500
            });
            
            sparkleAnimation.addEventListener('finish', () => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            });
        }
    }
    
    // Fonction pour jouer un son de révélation
    function playRevealSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Créer une mélodie de révélation
        const frequencies = [523, 659, 784, 1047]; // Do, Mi, Sol, Do aigu
        let delay = 0;
        
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
            }, delay);
            delay += 150;
        });
    }
    
    // Initialiser le système de grattage après le chargement de la page
    setTimeout(() => {
        initScratchSystem();
        attachScratchEvents();
    }, 100);
    
    // Fonction pour attacher les événements de grattage au canvas
    function attachScratchEvents() {
        if (!scratchCanvas) return;
        
        // Événements pour le grattage à la souris
        scratchCanvas.addEventListener('mousedown', (e) => {
            isScratching = true;
            scratchCanvas.style.cursor = 'grabbing';
            updateScratchEffect(e);
        });
        
        scratchCanvas.addEventListener('mouseup', () => {
            isScratching = false;
            scratchCanvas.style.cursor = 'crosshair';
        });
        
        scratchCanvas.addEventListener('mouseleave', () => {
            isScratching = false;
            scratchCanvas.style.cursor = 'crosshair';
        });
        
        scratchCanvas.addEventListener('mousemove', (e) => {
            if (e.buttons === 1) { // Clic gauche maintenu
                isScratching = true;
                scratchCanvas.style.cursor = 'grabbing';
                updateScratchEffect(e);
            } else {
                isScratching = false;
                scratchCanvas.style.cursor = 'crosshair';
            }
        });
        
        // Événements pour le grattage tactile optimisés
        scratchCanvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            isScratching = true;
            scratchPath = []; // Réinitialiser le chemin
            const touch = e.touches[0];
            updateScratchEffect({ clientX: touch.clientX, clientY: touch.clientY });
        }, { passive: false });
        
        scratchCanvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (isScratching && e.touches.length > 0) {
                const touch = e.touches[0];
                // Utiliser requestAnimationFrame pour la fluidité tactile
                requestAnimationFrame(() => {
                    updateScratchEffect({ clientX: touch.clientX, clientY: touch.clientY });
                });
            }
        }, { passive: false });
        
        scratchCanvas.addEventListener('touchend', () => {
            isScratching = false;
            scratchPath = []; // Nettoyer le chemin
        });
        
        scratchCanvas.addEventListener('touchcancel', () => {
            isScratching = false;
            scratchPath = [];
        });
    }
    
    // Vérifier que le bouton surprise existe
    console.log('Bouton surprise trouvé:', surpriseButton);
    
    // Événement pour le bouton surprise
    if (surpriseButton) {
        surpriseButton.addEventListener('click', function(e) {
            console.log('🎉 CLIC DÉTECTÉ sur le bouton surprise !');
            e.preventDefault();
            e.stopPropagation();
            
            // Effet de clic sur le bouton
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Confettis massifs
            for (let i = 0; i < 3; i++) {
                setTimeout(() => createConfetti(), i * 200);
            }
            
            // Son de célébration
            try {
                playCelebrationSound();
            } catch (error) {
                console.log('Erreur avec le son:', error);
            }
            
            // Redirection vers la page de surprise après un délai
            console.log('Redirection dans 1 seconde...');
            setTimeout(() => {
                console.log('Redirection vers surprise.html...');
                window.location.href = 'surprise.html';
            }, 1000);
            
            console.log('🎉 Le bouton surprise a été cliqué ! Redirection vers la page de surprise... 🎉');
        });
        
        // Ajouter un event listener pour mouseover pour tester
        surpriseButton.addEventListener('mouseover', function() {
            console.log('Survol du bouton détecté !');
        });
    } else {
        console.error('❌ ERREUR: Le bouton surprise n\'a pas été trouvé !');
    }
    
    // Fonction pour jouer un son de célébration
    function playCelebrationSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Mélodie de célébration plus complexe
        const melody = [
            { freq: 523, duration: 0.2 }, // Do
            { freq: 659, duration: 0.2 }, // Mi
            { freq: 784, duration: 0.2 }, // Sol
            { freq: 1047, duration: 0.4 }, // Do aigu
            { freq: 784, duration: 0.2 }, // Sol
            { freq: 1047, duration: 0.6 } // Do aigu long
        ];
        
        let delay = 0;
        melody.forEach((note) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(note.freq, audioContext.currentTime);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + note.duration);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + note.duration);
            }, delay);
            delay += note.duration * 1000;
        });
    }

    // Gestion de la musique d'anniversaire
    const anniversaryMusic = document.getElementById('anniversaryMusic');
    const audioNotification = document.getElementById('audioNotification');
    let musicStarted = false;

    // Fonction pour démarrer la musique
    function startMusic() {
        if (!musicStarted) {
            anniversaryMusic.muted = false;
            anniversaryMusic.play().then(() => {
                console.log('Musique démarrée avec succès');
                audioNotification.style.display = 'none';
                musicStarted = true;
            }).catch((error) => {
                console.log('Autoplay bloqué:', error);
                audioNotification.style.display = 'block';
            });
        }
    }

    // Tentative de démarrage automatique après un court délai
    setTimeout(() => {
        startMusic();
    }, 1000);

    // Démarrer la musique lors du premier clic sur la page
    document.addEventListener('click', function() {
        if (!musicStarted) {
            startMusic();
        }
    }, { once: true });

    // Démarrer la musique lors du premier survol
    document.addEventListener('mouseover', function() {
        if (!musicStarted) {
            startMusic();
        }
    }, { once: true });

    // Gestionnaire pour la notification audio
    if (audioNotification) {
        audioNotification.addEventListener('click', function() {
            startMusic();
        });
    }

    // Tentative de démarrage lors du focus de la fenêtre
    window.addEventListener('focus', function() {
        if (!musicStarted) {
            setTimeout(startMusic, 500);
        }
    });
});
