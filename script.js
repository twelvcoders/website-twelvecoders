// 1. Particle JS Config
function initParticles() {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 100 },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 1.5 }
        },
        "interactivity": {
            "events": { "onhover": { "enable": true, "mode": "repulse" } }
        }
    });
}

// 2. Theme Switcher
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    const theme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    if(icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    const icon = document.getElementById('theme-icon');
    if(icon) icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// 3. Data Siswa logic
const students = [
    {nama: "Aris Munandar", nis: "2101", hobi: "Coding"},
    {nama: "Bima Sakti", nis: "2102", hobi: "Gaming"},
    {nama: "Clara Ayu", nis: "2103", hobi: "Design"},
    {nama: "Dewi Lestari", nis: "2104", hobi: "Musik"},
    {nama: "Erlangga", nis: "2105", hobi: "Basket"},
    {nama: "Fahmi Nur", nis: "2106", hobi: "Membaca"},
    {nama: "Gisella", nis: "2107", hobi: "Masak"},
    {nama: "Handoko", nis: "2108", hobi: "Robotik"},
    {nama: "Indra", nis: "2109", hobi: "Catur"},
    {nama: "Jasmine", nis: "2110", hobi: "Traveling"}
];

function renderStudents() {
    const list = document.getElementById('studentList');
    if(!list) return;
    list.innerHTML = students.map((s, i) => `
        <div class="student-card" style="animation-delay: ${i * 0.1}s">
            <h4>${s.nama}</h4>
            <p>NIS: ${s.nis}</p>
            <p>Hobi: ${s.hobi}</p>
        </div>
    `).join('');
}

function filterStudents() {
    const q = document.getElementById('studentSearch').value.toLowerCase();
    document.querySelectorAll('.student-card').forEach(card => {
        const name = card.querySelector('h4').innerText.toLowerCase();
        card.style.display = name.includes(q) ? 'block' : 'none';
    });
}

// 4. Gallery logic
const images = [
    "https://picsum.photos/600/400?random=1",
    "https://picsum.photos/600/400?random=2",
    "https://picsum.photos/600/400?random=3",
    "https://picsum.photos/600/400?random=4",
    "https://picsum.photos/600/400?random=5",
    "https://picsum.photos/600/400?random=6"
];

function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if(!grid) return;
    grid.innerHTML = images.map(img => `
        <div class="gallery-item" onclick="openLightbox('${img}')">
            <img src="${img}" loading="lazy">
        </div>
    `).join('');
}

function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    if(lb && img) {
        lb.style.display = 'flex';
        img.src = src;
    }
}

// 5. Music Player
function setupAudio() {
    const audio = document.getElementById('mainAudio');
    const progress = document.getElementById('progressBar');
    if(!audio || !progress) return;
    
    audio.ontimeupdate = () => {
        progress.value = (audio.currentTime / audio.duration) * 100;
    };
    
    progress.oninput = () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
    };
}

function togglePlay() {
    const audio = document.getElementById('mainAudio');
    const icon = document.getElementById('playIcon');
    const vinyl = document.getElementById('vinyl');
    
    if(audio.paused) {
        audio.play();
        icon.className = 'fas fa-pause';
        vinyl.classList.add('playing');
    } else {
        audio.pause();
        icon.className = 'fas fa-play';
        vinyl.classList.remove('playing');
    }
}

function drawVisualizer() {
    const canvas = document.getElementById('visualizer');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    
    function animate() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--neon').trim();
        
        for(let i=0; i<30; i++) {
            const h = Math.random() * (document.getElementById('mainAudio').paused ? 5 : 50);
            ctx.fillRect(i * 12, canvas.height - h, 8, h);
        }
        requestAnimationFrame(animate);
    }
    animate();
}
