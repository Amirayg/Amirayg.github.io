/* =========================
   PARTICLE BACKGROUND
========================= */

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

const mouse = {
    x: null,
    y: null,
    radius: 140
};


const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);


/* -------------------------
   Canvas Size
------------------------- */

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createParticles();

    if (reducedMotion.matches) {
        drawParticles();
    }
}


/* -------------------------
   Particle Count
------------------------- */

function getParticleCount() {

    if (window.innerWidth <= 600) {
        return 28;
    }

    if (window.innerWidth <= 1000) {
        return 45;
    }

    return 65;
}


/* -------------------------
   Create Particles
------------------------- */

function createParticles() {

    particles = [];

    const particleCount = getParticleCount();

    for (let i = 0; i < particleCount; i++) {

        particles.push({

            x: Math.random() * canvas.width,

            y: Math.random() * canvas.height,

            vx:
                (Math.random() - 0.5) *
                (reducedMotion.matches ? 0 : 0.35),

            vy:
                (Math.random() - 0.5) *
                (reducedMotion.matches ? 0 : 0.35),

            size:
                Math.random() * 2 + 1

        });
    }
}


/* -------------------------
   Draw Particles
------------------------- */

function drawParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const connectionDistance =
        window.innerWidth <= 600
            ? 95
            : 125;


    /* Draw and move particles */

    particles.forEach((particle) => {

        if (!reducedMotion.matches) {

            particle.x += particle.vx;
            particle.y += particle.vy;


            /* Bounce from screen edges */

            if (
                particle.x <= 0 ||
                particle.x >= canvas.width
            ) {
                particle.vx *= -1;
            }


            if (
                particle.y <= 0 ||
                particle.y >= canvas.height
            ) {
                particle.vy *= -1;
            }


            /* Mouse interaction */

            if (
                mouse.x !== null &&
                mouse.y !== null
            ) {

                const dx =
                    particle.x - mouse.x;

                const dy =
                    particle.y - mouse.y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance < mouse.radius &&
                    distance > 0
                ) {

                    const force =
                        (mouse.radius - distance) /
                        mouse.radius;

                    particle.x +=
                        (dx / distance) *
                        force *
                        1.2;

                    particle.y +=
                        (dy / distance) *
                        force *
                        1.2;
                }
            }
        }


        /* Particle */

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(65, 200, 255, 0.65)";

        ctx.fill();

    });


    /* Draw connections */

    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance <
                connectionDistance
            ) {

                const opacity =
                    (1 - distance / connectionDistance) *
                    0.18;


                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );


                ctx.strokeStyle =
                    `rgba(30, 170, 255, ${opacity})`;

                ctx.lineWidth = 1;

                ctx.stroke();
            }
        }
    }
}


/* -------------------------
   Animation
------------------------- */

function animateParticles() {

    drawParticles();

    requestAnimationFrame(
        animateParticles
    );
}


/* -------------------------
   Mouse Movement
------------------------- */

window.addEventListener(
    "pointermove",
    (event) => {

        if (event.pointerType !== "mouse") {
            return;
        }

        mouse.x = event.clientX;
        mouse.y = event.clientY;

    }
);


window.addEventListener(
    "pointerleave",
    () => {

        mouse.x = null;
        mouse.y = null;

    }
);


/* -------------------------
   Start Canvas
------------------------- */

window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();


if (!reducedMotion.matches) {
    animateParticles();
}


/* =========================
   MOBILE MENU
========================= */

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");


menuToggle.addEventListener(
    "click",
    () => {

        const isOpen =
            mainNav.classList.toggle("open");


        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );


        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    }
);


/* -------------------------
   Close Menu After Click
------------------------- */

const navLinks =
    document.querySelectorAll(".nav-link");


navLinks.forEach((link) => {

    link.addEventListener(
        "click",
        () => {

            mainNav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }
    );

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                const currentId =
                    entry.target.getAttribute(
                        "id"
                    );


                navLinks.forEach((link) => {

                    const linkTarget =
                        link.getAttribute("href");


                    if (
                        linkTarget ===
                        `#${currentId}`
                    ) {

                        link.classList.add(
                            "active"
                        );

                    } else {

                        link.classList.remove(
                            "active"
                        );

                    }

                });

            });

        },
        {
            threshold: 0.45
        }
    );


sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* =========================
   FOOTER YEAR
========================= */

const year =
    document.getElementById("year");


year.textContent =
    new Date().getFullYear();
