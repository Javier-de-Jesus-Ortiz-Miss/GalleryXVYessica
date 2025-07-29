window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
    }, 1500);

    // Desplegable de pasos
    const stepsToggleBtn = document.getElementById('stepsToggleBtn');
    const stepsContent = document.getElementById('stepsContent');
    if (stepsToggleBtn && stepsContent) {
        stepsToggleBtn.addEventListener('click', function() {
            const isOpen = stepsContent.style.display === 'block';
            stepsContent.style.display = isOpen ? 'none' : 'block';
            stepsToggleBtn.setAttribute('aria-expanded', !isOpen);
        });
    }


    // --- Partículas de fondo ---
    const canvas = document.getElementById('particles-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        function randomColor() {
            const colors = ['#f9d6c1', '#923231', '#b94a4a', '#FCEDE2', '#fff8f3', '#e2b8a1', '#ffb347', '#ff6961', '#f7cac9'];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const PARTICLE_COUNT = 60;
        const particles = [];

        function randomShape() {
            return Math.random() < 0.5 ? 'rect' : 'circle';
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                r: 6 + Math.random() * 10,
                color: randomColor(),
                speed: 1 + Math.random() * 2,
                angle: Math.random() * Math.PI * 2,
                shape: randomShape(),
                rotate: Math.random() * Math.PI * 2,
                rotateSpeed: (Math.random() - 0.5) * 0.1
            });
        }

        function drawParticle(p) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotate);
            ctx.globalAlpha = 0.85;
            ctx.fillStyle = p.color;
            if (p.shape === 'rect') {
                ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r * 0.6);
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, p.r/2, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const p of particles) {
                p.y += p.speed;
                p.x += Math.sin(p.angle) * 0.5;
                p.rotate += p.rotateSpeed;
                if (p.y > canvas.height + 20) {
                    p.y = -20;
                    p.x = Math.random() * canvas.width;
                    p.color = randomColor();
                    p.shape = randomShape();
                    p.r = 6 + Math.random() * 10;
                }
                drawParticle(p);
            }
            requestAnimationFrame(animate);
        }
        animate();
    }

    // --- Modal Tutorial Paso a Paso ---
    const tutorialSteps = [
        {
            html: `<strong>Paso 1:</strong> Escoge tu cuenta de Google y haz clic en <b>Ver álbum</b>. <span style="font-size:0.97em;color:#b94a4a;">(Ten en cuenta haber dado los permisos necesarios a la aplicación)</span><br>
            <img src="assets/img/step1.webp" alt="Paso 1" class="tutorial-img" style="display:block;width:100%;max-width:260px;margin:12px auto 0 auto;border-radius:12px;box-shadow:0 2px 12px #f9d6c1;">
            `
        },
        {
            html: `<strong>Paso 2:</strong> Haz clic en el botón <b>Agregar fotos</b> (<span class="icon">＋</span>).<br>
            <img src="assets/img/step2.webp" alt="Paso 2" class="tutorial-img" style="display:block;width:100%;max-width:260px;margin:12px auto 0 auto;border-radius:12px;box-shadow:0 2px 12px #f9d6c1;">
            `
        },
        {
            html: `<div style="display:flex;align-items:center;justify-content:center;text-align:center;">
                <div>
                    <strong>Paso 3:</strong> Escoge tus fotos favoritas y súbelas. :)
                </div>
            </div>`
        }
    ];
    let tutorialIndex = 0;

    const openTutorialBtn = document.getElementById('openTutorial');
    const tutorialModal = document.getElementById('tutorialModal');
    const tutorialStepsDiv = document.getElementById('tutorialSteps');
    const prevStepBtn = document.getElementById('prevStep');
    const nextStepBtn = document.getElementById('nextStep');
    const finishTutorialBtn = document.getElementById('finishTutorial');

    function renderTutorialStep() {
        tutorialStepsDiv.innerHTML = tutorialSteps[tutorialIndex].html;
        prevStepBtn.style.display = tutorialIndex === 0 ? 'none' : '';
        nextStepBtn.style.display = tutorialIndex === tutorialSteps.length - 1 ? 'none' : '';
        finishTutorialBtn.style.display = tutorialIndex === tutorialSteps.length - 1 ? '' : 'none';
    }

    if (openTutorialBtn && tutorialModal) {
        openTutorialBtn.addEventListener('click', function(e) {
            e.preventDefault();
            tutorialIndex = 0;
            renderTutorialStep();
            tutorialModal.style.display = 'flex';
        });
    }
    if (prevStepBtn) prevStepBtn.onclick = function() {
        if (tutorialIndex > 0) {
            tutorialIndex--;
            renderTutorialStep();
        }
    };
    if (nextStepBtn) nextStepBtn.onclick = function() {
        if (tutorialIndex < tutorialSteps.length - 1) {
            tutorialIndex++;
            renderTutorialStep();
        }
    };
    if (finishTutorialBtn) finishTutorialBtn.onclick = function() {
        tutorialModal.style.display = 'none';
        window.open('https://photos.app.goo.gl/kMA5CRYqVhfZGh1y9', '_blank');
    };
    // Cerrar modal al hacer click fuera del card
    if (tutorialModal) {
        tutorialModal.addEventListener('click', function(e) {
            if (e.target === tutorialModal) tutorialModal.style.display = 'none';
        });
    }

    // --- Modal Ayuda ---
    const openHelpBtn = document.getElementById('openHelp');
    const helpModal = document.getElementById('helpModal');
    const closeHelpBtn = document.getElementById('closeHelp');

    if (openHelpBtn && helpModal) {
        openHelpBtn.addEventListener('click', function() {
            helpModal.style.display = 'flex';
        });
    }
    if (closeHelpBtn && helpModal) {
        closeHelpBtn.onclick = function() {
            helpModal.style.display = 'none';
        };
    }
    if (helpModal) {
        helpModal.addEventListener('click', function(e) {
            if (e.target === helpModal) helpModal.style.display = 'none';
        });
    }
});