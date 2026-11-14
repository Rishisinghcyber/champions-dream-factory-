
let travelling = false;

// =====================================
// CINEMATIC FIRECRACKER TRANSITION
// =====================================

function travelToDimension(callback) {

    if (travelling) return;

    travelling = true;

    const overlay = document.createElement("div");
    overlay.className = "dimension-overlay";

    const canvas = document.createElement("canvas");
    canvas.className = "spark-portal-canvas";

    overlay.appendChild(canvas);
    document.body.appendChild(overlay);

    const ctx = canvas.getContext("2d");

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.scale(dpr, dpr);

    const particles = [];
    const embers = [];

    let running = true;

    for (let i = 0; i < 100; i++) {
        embers.push({
            x: Math.random() * width,
            y: Math.random() * height,
            speed: Math.random() * 1.2 + 0.3,
            size: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.7 + 0.2
        });
    }

    function explode(x, y) {

        const colors = [
            "#FFD700",
            "#FF8C00",
            "#FF3D5A",
            "#FFFFFF",
            "#40CFFF",
            "#D88BFF"
        ];

        for (let i = 0; i < 130; i++) {

            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 7 + 1.5;

            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 65 + Math.random() * 35,
                maxLife: 100,
                size: Math.random() * 2 + 0.5,
                color: colors[
                    Math.floor(Math.random() * colors.length)
                ]
            });
        }
    }

    explode(width * 0.20, height * 0.30);
    explode(width * 0.80, height * 0.25);

    const burstTimers = [
        setTimeout(() => explode(width * 0.50, height * 0.40), 250),
        setTimeout(() => explode(width * 0.30, height * 0.65), 500),
        setTimeout(() => explode(width * 0.70, height * 0.60), 750)
    ];

    function animate() {

        if (!running) return;

        ctx.clearRect(0, 0, width, height);

        embers.forEach(p => {

            p.y -= p.speed;

            if (p.y < 0) {
                p.y = height;
                p.x = Math.random() * width;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

            ctx.fillStyle = `rgba(255,190,80,${p.alpha})`;

            ctx.shadowBlur = 12;
            ctx.shadowColor = "#FFAA33";
            ctx.fill();
        });

        for (let i = particles.length - 1; i >= 0; i--) {

            const p = particles[i];

            const oldX = p.x;
            const oldY = p.y;

            p.x += p.vx;
            p.y += p.vy;

            p.vy += 0.045;

            p.vx *= 0.985;
            p.vy *= 0.985;

            p.life--;

            const opacity = Math.max(0, p.life / p.maxLife);

            ctx.beginPath();
            ctx.moveTo(oldX, oldY);
            ctx.lineTo(p.x, p.y);

            ctx.strokeStyle = p.color;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = p.size;
            ctx.shadowBlur = 14;
            ctx.shadowColor = p.color;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

            ctx.fillStyle = "#FFFFFF";
            ctx.fill();

            ctx.globalAlpha = 1;

            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        }

        ctx.shadowBlur = 0;

        requestAnimationFrame(animate);
    }

    animate();

    setTimeout(() => {

        if (typeof callback === "function") {
            callback();
        }

    }, 1000);

    setTimeout(() => {

        running = false;

        burstTimers.forEach(clearTimeout);

        overlay.remove();

        travelling = false;

    }, 1800);
}


// =====================================
// FIRST SCREEN
// =====================================

function startJourney() {

    travelToDimension(() => {

        document.querySelector(".welcome-box").innerHTML = `

            <div class="emoji">🌌 🚀 ⭐</div>

            <h1>Welcome, Champion!</h1>

            <h2>Your Magical Universe Awaits!</h2>

            <p>
                Every great dream begins with imagination.
                Let's discover your future!
            </p>

            <button onclick="showDreams()">
                ENTER MY DREAM WORLD ✨
            </button>

        `;
    });
}


// =====================================
// CAREER SELECTION
// =====================================

function showDreams() {

    travelToDimension(() => {

        document.querySelector(".welcome-box").innerHTML = `

            <h1>Who Will You Become? ✨</h1>

            <p>Choose the future you dream of!</p>

            <div class="career-grid">

                <button onclick="selectCareer('Astronaut')">
                    🚀 Astronaut
                </button>

                <button onclick="selectCareer('Doctor')">
                    🩺 Doctor
                </button>

                <button onclick="selectCareer('Scientist')">
                    🔬 Scientist
                </button>

                <button onclick="selectCareer('Pilot')">
                    ✈️ Pilot
                </button>

                <button onclick="selectCareer('Teacher')">
                    📚 Teacher
                </button>

                <button onclick="selectCareer('Artist')">
                    🎨 Artist
                </button>

            </div>
        `;
    });
}


// =====================================
// FUTURE REVEAL
// =====================================

function selectCareer(career) {

    const dreams = {

        Astronaut: {
            image: "photos/astronaut.jpeg",
            emoji: "🚀",
            message: "The universe is full of mysteries. Keep exploring, keep learning and never stop reaching for the stars!",
            quote: "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action."
        },

        Doctor: {
            image: "photos/doctor.jpeg",
            emoji: "🩺",
            message: "A caring heart can make a big difference. Your kindness, knowledge and courage could one day save lives!",
            quote: "Excellence is a continuous process and not an accident."
        },

        Scientist: {
            image: "photos/scientist.jpeg",
            emoji: "🔬",
            message: "Every great invention begins with a question. Stay curious, experiment bravely and discover something extraordinary!",
            quote: "Learning gives creativity, creativity leads to thinking, thinking provides knowledge, knowledge makes you great."
        },

        Pilot: {
            image: "photos/pilot.jpeg",
            emoji: "✈️",
            message: "Be brave enough to fly beyond your comfort zone. Your dedication can take you to heights you have never imagined!",
            quote: "Winners are not those who never fail but those who never quit."
        },

        Teacher: {
            image: "photos/teacher.jpeg",
            emoji: "📚",
            message: "A teacher lights the path for others. Your wisdom and kindness could inspire generations to dream bigger!",
            quote: "Small aim is a crime; have great aim."
        },

        Artist: {
            image: "photos/artist.jpeg",
            emoji: "🎨",
            message: "Your imagination makes you unique. Never be afraid to create, express yourself and colour the world with your ideas!",
            quote: "Creativity is seeing the same thing as everybody else, but thinking of something different."
        }
    };

    const dream = dreams[career];

    if (!dream) return;

    travelToDimension(() => {

        document.querySelector(".welcome-box").innerHTML = `

            <div class="dream-result">

                <h1>${dream.emoji} Future ${career}!</h1>

                <p class="dream-subtitle">
                    Look at the amazing future you can create!
                </p>

                <img
                    class="dream-photo"
                    src="${dream.image}"
                    alt="Future ${career}"
                >

                <h2>Dear Little Champion ❤️</h2>

                <p class="dream-message">
                    ${dream.message}
                </p>

                <div class="kalam-quote">

                    <p>${dream.quote}</p>

                    <strong>
                        — Dr. A.P.J. Abdul Kalam
                    </strong>

                </div>

                <button onclick="showDreams()">
    ✨ EXPLORE ANOTHER DREAM
</button>

<button onclick="showFinalMessage()">
    ❤️ A SPECIAL MESSAGE FOR ME
</button>

            </div>
        `;
    });
}


function showFinalMessage() {

    travelToDimension(() => {

        document.querySelector(".welcome-box").innerHTML = `

            <div class="final-celebration">

                <div class="emoji">✨ 🌈 ⭐</div>

                <h1>One Last Thing, My Champions!</h1>

                <h2>A Special Message From Your Teacher ❤️</h2>

                <p>
                    Dear Champions,
                </p>

                <p>
                    Every one of you carries a beautiful dream,
                    a unique talent and endless possibilities
                    within yourself.
                </p>

                <p>
                    I may teach you lessons from books,
                    but I also wish to see you learn lessons
                    from life — kindness, courage, honesty
                    and never giving up.
                </p>

                <p>
                    Never compare your journey with anyone else's.
                    Believe in yourself, work hard and remember
                    that even the smallest steps can lead
                    to extraordinary destinations.
                </p>

                <h2>
                    The world is waiting for your magic! 🌟
                </h2>

                <div class="kalam-quote">
                    <p>
                        "You have to dream before your dreams
                        can come true."
                    </p>
                    <strong>— Dr. A.P.J. Abdul Kalam</strong>
                </div>

                <h2>Happy Children's Day! 🎈</h2>

                <p>
                    With endless blessings, love and best wishes,
                </p>

               
<h2>With endless love and blessings,</h2>

<h1 class="rishi-signature">
    ✨ Rishi Sir ✨
</h1>

<h2>Dear Aveer and Ayaan ❤️</h2>

<p>
    I am eagerly waiting to meet you both soon!
    Until then, keep smiling, keep learning
    and keep shining like the little stars you are.
</p>

<h2>Lots of love! 🌟</h2>

                <div class="emoji">🎉 🌟 🎊</div>

            </div>

        `;
    });
}


// BACKGROUND MUSIC CONTROLS

function toggleMusic() {

    const music = document.getElementById("backgroundMusic");
    const button = document.getElementById("musicButton");

    if (!music || !button) return;

    if (music.paused) {

        music.play()
            .then(() => {
                button.innerHTML = "⏸ Pause Music";
            })
            .catch(error => {
                console.log("Music playback error:", error);
            });

    } else {

        music.pause();
        button.innerHTML = "🎵 Play Music";

    }
}
