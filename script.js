// --- 0. Navigation Logic ---
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    if (pages.length === 0) return; 
    pages.forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    if (target) target.classList.add('active');
    window.scrollTo(0, 0);
}

// --- 1. Theme Logic ---
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

// --- 2. Students Logic ---
const students = [
    {nama: "Ahmad Romi Al-Khoiri", ig: "https://www.instagram.com/wromiy9?igsh=MW03NzF0NXQ3OG4xbg=="},
    {nama: "Khotimah Zalfa Salsabil", ig: "https://www.instagram.com/zlfslsabil_?igsh=MWRxZmtiZG5mM3Z4eA=="},
    {nama: "Aurellia Syintia M.", ig: "https://www.instagram.com/aurelliasyntia?igsh=MTJjMGt5Y2Y4N2duMQ=="},
    {nama: "Muhammad Ardhatama Ghulam R.", ig: "https://www.instagram.com/_ardhatama?igsh=emFsa3p1em94enBo"},
    {nama: "Rindiani Nurul H.", ig: "https://www.instagram.com/indi_cinul014?igsh=MTRvNnU2Yng2cG96aw=="},
    {nama: "Mahfud Afandi H.", ig: "https://www.instagram.com/m44put?igsh=Z3g4M2d0OXZtYTVt"},
    {nama: "Vanesa Diah Pitaloca", ig: "https://www.instagram.com/neesaelrr_?igsh=MTRyczQ1M2ZwM2Y0Nw=="},
    {nama: "Zaida Munayasari", ig: "https://www.instagram.com/swtyzaa?igsh=NzBmMHBjb21peGU4"},
    {nama: "Reno Dwi S.", ig: "https://www.instagram.com/rnosptraa_?igsh=NXVmdjhlejA3Z3M5"},
    {nama: "Jesika Ayunda", ig: "https://www.instagram.com/jesiccaayu._?igsh=eTB4ZGt3MWx1YnUx"},
    {nama: "Rifki Dwi O.", ig: "https://www.instagram.com/ripkyyy.21?igsh=ejV5ZnA5eXJzM2Jh"},
    {nama: "Desy Puspita Sari", ig: "-"},
    {nama: "Mohamad Faizur F.", ig: "https://www.instagram.com/zennutiiv2?igsh=djc5ZnMyMzg5bW1t"},
    {nama: "Wildan Farid E.", ig: "https://www.instagram.com/maswilzstar_?igsh=eXRpc3k4bmd3dm1v"},
    {nama: "Bima Galang", ig: "https://www.instagram.com/vnthree_?igsh=MTE2MHYzNDVpdm40NA=="}
];

function renderStudents() {
    const list = document.getElementById('studentList');
    if(!list) return;
    list.innerHTML = students.map(s => {
        // Cek apakah data ig berupa URL lengkap atau hanya username
        const isFullUrl = s.ig.startsWith('http');
        const link = isFullUrl ? s.ig : `https://instagram.com/${s.ig}`;
        
        // Bersihkan tampilan nama user agar rapi (menghapus URL & query params)
        let displayHandle = s.ig;
        if (isFullUrl) {
            displayHandle = s.ig.split('/').filter(p => p).pop().split('?')[0];
        }

        return `
            <div class="student-card">
                <h3 style="font-size: 1.1rem; word-wrap: break-word; min-height: 2rem; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">${s.nama}</h3>
                <a href="${link}" target="_blank" rel="noopener noreferrer" style="color: var(--neon-purple); text-decoration: none; display: inline-block; font-size: 0.9rem;">
                    <i class="fab fa-instagram"></i> @${displayHandle}
                </a>
            </div>
        `;
    }).join('');
}

function filterStudents() {
    const q = document.getElementById('studentSearch').value.toLowerCase();
    document.querySelectorAll('.student-card').forEach(card => {
        const name = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = name.includes(q) ? 'block' : 'none';
    });
}

// --- 3. Gallery Logic ---
const images = [
    "https://picsum.photos/600/400?random=1",
    "https://picsum.photos/600/400?random=2",
    "https://picsum.photos/600/400?random=3",
    "https://picsum.photos/600/400?random=4",
    "https://picsum.photos/600/400?random=5",
    "https://picsum.photos/600/400?random=6",
    "https://picsum.photos/600/400?random=6",
    "https://picsum.photos/600/400?random=7",
    "https://picsum.photos/600/400?random=8",
    "https://picsum.photos/600/400?random=9",
    "https://picsum.photos/600/400?random=10",
    "https://picsum.photos/600/400?random=11",
    "https://picsum.photos/600/400?random=12",
    "https://picsum.photos/600/400?random=13"
];

function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if(!grid) return;
    // Menggunakan data foto yang lebih deskriptif
    grid.innerHTML = images.map(img => `
        <div class="gallery-item" onclick="openLightbox('${img}')">
            <img src="${img}" loading="lazy">
            <div class="overlay">
                <p>Kenangan XII RPL</p>
                <small>Digital Portfolio</small>
            </div>
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

// --- 4. Music Player Logic ---
const playlist = [
    {
        title: "Sampai Jadi Debu",
        artist: "Banda Neira",
        src: "https://mp3tourl.com/audio/1777300508407-9b196423-0e37-4908-bc3a-d221315ad050.mp3"
    },
    {
        title: "Dari Jendela Kelas",
        artist: "Chrisye",
        src: "https://mp3tourl.com/audio/1777338148804-72fe9aa6-60f1-48dd-b00f-7b88d256867d.mp3"
    },
    {
        title: "33 x",
        artist: "Perunggu",
        src: "https://mp3tourl.com/audio/1777374003543-e14e93a9-658b-4f0d-9757-c6fd17b475b2.mp3"
    }
];
let currentTrackIndex = 0;

function setupAudio() {
    const audio = document.getElementById('mainAudio');
    const progress = document.getElementById('progressBar');
    if(!audio || !progress) return;
    
    // Update progress bar saat lagu diputar
    audio.ontimeupdate = () => {
        progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    };

    // Geser progress bar untuk mencari durasi
    progress.oninput = () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
    };

    // Auto-play next song when current one ends
    audio.onended = () => {
        changeSong(1);
    };
}

function changeSong(direction) {
    currentTrackIndex = (currentTrackIndex + direction + playlist.length) % playlist.length;

    const track = playlist[currentTrackIndex];
    const audio = document.getElementById('mainAudio');
    const title = document.getElementById('songTitle');
    const artist = document.getElementById('songArtist');
    const icon = document.getElementById('playIcon');
    const vinyl = document.getElementById('vinyl');

    if (!audio) return;
    
    audio.src = track.src;
    if (title) title.innerText = track.title;
    if (artist) artist.innerText = track.artist;

    audio.play().then(() => {
        if (icon) icon.className = 'fas fa-pause';
        if (vinyl) vinyl.classList.add('playing');
    }).catch(error => console.warn("Playback error:", error));
}

function togglePlay() {
    const audio = document.getElementById('mainAudio');
    const icon = document.getElementById('playIcon');
    const vinyl = document.getElementById('vinyl');
    if (!audio) return;
    
    // Toggle Play/Pause state
    if(audio.paused) {
        audio.play().catch(error => console.warn("Autoplay blocked:", error));
        if (icon) icon.className = 'fas fa-pause';
        if (vinyl) vinyl.classList.add('playing');
    } else {
        audio.pause();
        if (icon) icon.className = 'fas fa-play';
        if (vinyl) vinyl.classList.remove('playing');
    }
}

function drawVisualizer() {
    const canvas = document.getElementById('visualizer');
    const audio = document.getElementById('mainAudio');
    
    if (!canvas || !audio) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gunakan warna neon yang sesuai dengan tema
    if (!audio.paused) {
        ctx.fillStyle = '#00ff88'; 
        for(let i = 0; i < 30; i++) {
            const h = Math.random() * 50;
            ctx.fillRect(i * 12, canvas.height - h, 8, h);
        }
    }
    requestAnimationFrame(drawVisualizer);
}

// --- 5. About Page Counters ---
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const speed = 200;
            const inc = target / speed;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// --- 5. Initialization ---
function initApp() {
    initTheme();
    renderStudents();
    renderGallery();
    setupAudio();
    drawVisualizer();
    initCounters();
    // Inisialisasi Particles
    // Render student photos for both index and album pages

    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 80 },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5 },
                "size": { "value": 3 },
                "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 2 }
            },
            "interactivity": {
                "events": { "onhover": { "enable": true, "mode": "repulse" } }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initApp);