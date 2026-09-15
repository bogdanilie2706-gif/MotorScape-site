// Schimbarea imaginilor
let slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showNextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % (slides.length-1);
    slides[currentSlide].classList.add('active');
}

setInterval(showNextSlide, 5000); // Schimbă imaginea la 5 secunde




// Efectul de scriere literă cu literă
const titleText = "Bine ai venit la Motorscape";
const typingTitle = document.getElementById('typing-title');

function typeWriter(text, i = 0) {
    if (i < text.length) {
        const span = document.createElement('span');
        span.textContent = text[i] === ' ' ? '\u00A0' : text[i]; // spațiu corect
        typingTitle.appendChild(span);
        span.classList.add('show');

        setTimeout(() => {
            span.style.opacity = 1;
        }, 50);

        setTimeout(() => typeWriter(text, i + 1), 100); // viteza între litere
    }
}

window.addEventListener('load', () => {
    typeWriter(titleText);
});



//particule
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 120;

// Mouse position
const mouse = {
    x: null,
    y: null,
    radius: 150
};

// Update mouse position
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Redimensionare fereastră
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Clasa Particulă
class Particle {
    constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'white';
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 6;
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce particles from edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speedX = (Math.random() - 0.5) * 1;
        let speedY = (Math.random() - 0.5) * 1;
        particlesArray.push(new Particle(x, y, size, speedX, speedY));
    }
}

function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                let opacity = 1 - distance / 100;

                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }

        // Connect to mouse
        const dx = mouse.x - particlesArray[a].x;
        const dy = mouse.y - particlesArray[a].y;
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);

        if (distanceToMouse < mouse.radius) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distanceToMouse / mouse.radius})`;
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => particle.update());
    connectParticles();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

let textIndex = 0;

function changeText(n) {
    textIndex += n;
    showText(textIndex);
}

function showText(n) {
    let texts = document.getElementsByClassName("text-slide");
    if (n >= texts.length) {textIndex = 0}
    if (n < 0) {textIndex = texts.length - 1}

    // Ascunde toate textele
    for (let i = 0; i < texts.length; i++) {
        texts[i].style.display = "none";
    }

    // Arată textul curent
    texts[textIndex].style.display = "block";
}

// Inițializează vizibilitatea primului text
showText(textIndex);

