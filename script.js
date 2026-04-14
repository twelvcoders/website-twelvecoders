// --- RENDER DATA SISWA (15) ---
const siswaContainer = document.getElementById('siswa-container');
for (let i = 1; i <= 15; i++) {
    const card = document.createElement('div');
    card.className = 'card-siswa reveal';
    card.innerHTML = `
        <img src="https://i.pravatar.cc/150?img=${i + 10}" alt="Siswa ${i}" class="foto-siswa">
        <h3>Siswa RPL ${i}</h3>
        <p style="font-size: 0.8rem; color: #00f3ff;">Software Engineer</p>
    `;
    siswaContainer.appendChild(card);
}

// --- RENDER ALBUM (25) ---
const albumContainer = document.getElementById('album-container');
for (let i = 1; i <= 25; i++) {
    const height = Math.floor(Math.random() * 200) + 200;
    const item = document.createElement('div');
    item.className = 'masonry-item reveal';
    item.innerHTML = `<img src="https://picsum.photos/400/${height}?random=${i}" alt="Memori ${i}">`;
    albumContainer.appendChild(item);
}

// --- SCROLL REVEAL LOGIC ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- SMOKE CURSOR LOGIC ---
const canvas = document.getElementById('smoke-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
let hue = 0;

window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 3; i++) particlesArray.push(new Particle(e.x, e.y));
});

class Particle {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.size = Math.random() * 15 + 5;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${hue}, 100%, 50%)`;
        this.life = 1;
    }
    update() {
        this.x += this.speedX; this.y -= this.speedY;
        this.size += 0.2; this.life -= 0.02;
    }
    draw() {
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].life <= 0) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
    hue += 2;
    requestAnimationFrame(animate);
}
animate();