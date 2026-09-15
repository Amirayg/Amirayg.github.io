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
   LANGUAGE SYSTEM
========================= */

const languageToggle =
    document.getElementById("languageToggle");


const translations = {

    en: {

        pageTitle:
            "AYG | Amirhossein Ranjbar – Personal Website",

        metaDescription:
            "Personal website of Amirhossein Ranjbar, also known as AYG. Explore his interests, skills, projects, gaming, programming, mathematics, and music.",

        languageButton:
            "فارسی",

        languageAria:
            "Switch to Persian",

        navAria:
            "Main navigation",

        menuOpen:
            "Open navigation menu",

        menuClose:
            "Close navigation menu",

        navWelcome:
            "Welcome",

        navAbout:
            "About Me",

        navSkills:
            "My Skills",

        navProjects:
            "Projects",

        navSocial:
            "Social Media",

        navHobbies:
            "My Hobbies",

        navThankYou:
            "Thank You",

        heroEyebrow:
            "WELCOME TO MY WEBSITE",

        heroTitle:
            "I'm Amirhossein Ranjbar — AYG",

        heroDescription:
            "Hello! My name is Amirhossein and I am learning web design.",

        heroButton:
            "Explore My Website",

        profileImageAlt:
            "Photo of Amirhossein Ranjbar",

        aboutLabel:
            "WHO I AM",

        aboutTitle:
            "About Me",

        aboutText1:
            `Hi! I'm <strong>Amirhossein Ranjbar</strong>, also known as <strong>AYG</strong>, an Iranian student born on <strong>June 24, 2012</strong>. I’m passionate about technology, computers, mathematics, and programming, and I enjoy learning new things and challenging myself.`,

        aboutText2:
            `I’m currently learning <strong>Python and web development</strong>, while working on personal projects to improve my programming and problem-solving skills. I’m especially interested in understanding how technology works and turning my ideas into real projects.`,

        aboutText3:
            `I am a big fan of <strong>gaming</strong>, and my favorite game is <strong>Dota 2</strong>. My brother introduced me to Dota 2 when I was <strong>seven years old</strong>, and it became one of my favorite games. Interestingly, Dota 2 also played an important role in my interest in <strong>technology</strong> and helped me improve my <strong>English</strong> by exposing me to English words, phrases, and communication while playing.`,

        aboutText4:
            `I am also very passionate about <strong>music</strong>. I listen to music in my free time, and my favorite artist is <strong>Eminem</strong>. Music is an important part of my interests and something I really enjoy.`,

        aboutText5:
            `I enjoy playing Dota 2 competitively, especially in the <strong>Mid Lane</strong>. Gaming has also helped me develop skills such as <strong>strategic thinking, decision-making, patience, and teamwork</strong>.`,

        aboutText6:
            `I would describe myself as <strong>curious, hardworking, competitive, creative, and always willing to learn.</strong>`,

        skillsLabel:
            "WHAT I CAN DO",

        skillsTitle:
            "My Skills",

        skillComputerTitle:
            "Computer Skills",

        skillComputerText:
            "I have strong computer skills and good knowledge of working with Windows, software, files, and everyday computer tools.",

        skillWebTitle:
            "Web Development",

        skillWebText:
            "I am learning HTML and CSS and currently building my own websites to improve my web development skills.",

        skillPythonTitle:
            "Python Programming",

        skillPythonText:
            "I am currently learning Python and practicing programming through small projects and problem-solving.",

        skillProblemTitle:
            "Problem Solving",

        skillProblemText:
            "I enjoy solving challenging problems and finding different ways to reach a solution.",

        skillTypingTitle:
            "Fast Typing",

        skillTypingText:
            "I can type at around <strong>80 words per minute</strong>, allowing me to work quickly and efficiently.",

        skillEnglishTitle:
            "English",

        skillEnglishText:
            "I have <strong>Upper-Intermediate English skills</strong> and continue improving my vocabulary, reading, and communication.",

        skillGamingTitle:
            "Gaming & Strategy",

        skillGamingText:
            "As a competitive Dota 2 player, I have developed skills in strategic thinking, decision-making, teamwork, and staying focused under pressure.",

        skillMathTitle:
            "Mathematics",

        skillMathText:
            "I have a strong interest in mathematics and enjoy logical thinking, calculations, and solving mathematical problems.",

        skillLearningTitle:
            "Learning & Self-Improvement",

        skillLearningText:
            "I am always interested in learning new technologies, improving my skills, and challenging myself with new projects.",

        projectsLabel:
            "WHAT I HAVE BUILT",

        projectsTitle:
            "My Projects",

        socialLabel:
            "FIND ME ONLINE",

        socialTitle:
            "My Social Media",

        socialGithub:
            "My coding projects and repositories.",

        socialEmailTitle:
            "Email",

        socialEmail:
            "Contact me by email.",

        socialTelegram:
            "Connect with me on Telegram.",

        socialSpotify:
            "Listen to my favorite music.",

        hobbiesLabel:
            "THINGS I ENJOY",

        hobbiesTitle:
            "My Hobbies",

        hobbyGamingTitle:
            "Gaming",

        hobbyGamingText:
            `I enjoy playing video games in my free time, and my favorite game is <strong>Dota 2</strong>. I mainly play <strong>Mid Lane</strong>, and some of my favorite heroes are <strong>Tinker, Invoker, Lina, Storm Spirit, Ember Spirit, Puck, Pangolier, and Void Spirit</strong>. I enjoy the strategic and competitive side of Dota 2, especially making decisions during difficult situations, adapting to different opponents, and trying to improve with every game. Gaming is not only a way for me to have fun, but also something that has helped me develop skills like strategic thinking, decision-making, patience, and teamwork.`,

        hobbyMusicTitle:
            "Music",

        hobbyMusicText:
            "I listen to music almost every day, whether I’m relaxing, studying, working on my projects, or just spending some free time. Music is something I always enjoy having around, and I like exploring different songs and artists. I usually listen to Eminem, but I also enjoy discovering new music and adding my favorite songs to my playlists.",

        hobbyProgrammingTitle:
            "Programming",

        hobbyProgrammingText:
            "Programming is one of my favorite hobbies because I enjoy creating things and solving problems with code. I am currently learning Python and web development, and I like working on personal projects to improve my skills.",

        hobbyMathTitle:
            "Mathematics & Problem Solving",

        hobbyMathText:
            "I enjoy mathematics and challenging problems. I like using logical thinking to find solutions, understand different concepts, and challenge myself with problems that require creativity and careful thinking.",

        hobbyTechnologyTitle:
            "Technology",

        hobbyTechnologyText:
            "I am very interested in technology and computers. I enjoy exploring new technologies, learning how they work, and discovering new things about the digital world. I also like keeping up with the tools and technologies that can help me learn and create new projects.",

        thankYouTitle:
            "Thank You!",

        thankYouText:
            "Thank you for visiting my website.",

        backToTop:
            "Back to Top",

        footerName:
            "Amirhossein Ranjbar"

    },


    fa: {

        pageTitle:
            "AYG | امیرحسین رنجبر – وب‌سایت شخصی",

        metaDescription:
            "وب‌سایت شخصی امیرحسین رنجبر، معروف به AYG. آشنایی با علایق، مهارت‌ها، پروژه‌ها، برنامه‌نویسی، ریاضیات، بازی و موسیقی او.",

        languageButton:
            "English",

        languageAria:
            "Switch to English",

        navAria:
            "منوی اصلی",

        menuOpen:
            "باز کردن منوی ناوبری",

        menuClose:
            "بستن منوی ناوبری",

        navWelcome:
            "خوش آمدید",

        navAbout:
            "درباره من",

        navSkills:
            "مهارت‌های من",

        navProjects:
            "پروژه‌ها",

        navSocial:
            "شبکه‌های اجتماعی",

        navHobbies:
            "علایق من",

        navThankYou:
            "تشکر",

        heroEyebrow:
            "به وب‌سایت من خوش آمدید",

        heroTitle:
            "من امیرحسین رنجبر — AYG هستم",

        heroDescription:
            "سلام! من امیرحسین هستم و در حال یادگیری طراحی وب هستم.",

        heroButton:
            "مشاهده وب‌سایت من",

        profileImageAlt:
            "عکس امیرحسین رنجبر",

        aboutLabel:
            "من کی هستم",

        aboutTitle:
            "درباره من",

        aboutText1:
            `سلام! من <strong>امیرحسین رنجبر</strong> هستم که با نام <strong>AYG</strong> نیز شناخته می‌شوم. من یک دانش‌آموز ایرانی هستم که در <strong>4 تیر 1391</strong> متولد شده‌ام. به فناوری، کامپیوتر، ریاضیات و برنامه‌نویسی علاقه زیادی دارم و از یادگیری چیزهای جدید و به چالش کشیدن خودم لذت می‌برم.`,

        aboutText2:
            `در حال حاضر مشغول یادگیری <strong>پایتون و توسعه وب</strong> هستم و روی پروژه‌های شخصی کار می‌کنم تا مهارت‌های برنامه‌نویسی و حل مسئله خودم را بهتر کنم. مخصوصاً به این موضوع علاقه دارم که فناوری چگونه کار می‌کند و چگونه می‌توانم ایده‌هایم را به پروژه‌های واقعی تبدیل کنم.`,

        aboutText3:
            `من علاقه زیادی به <strong>بازی‌های ویدیویی</strong> دارم و بازی مورد علاقه‌ام <strong>Dota 2</strong> است. برادرم وقتی <strong>هفت ساله</strong> بودم Dota 2 را به من معرفی کرد و این بازی به یکی از بازی‌های مورد علاقه‌ام تبدیل شد. جالب اینجاست که Dota 2 نقش مهمی در علاقه‌مند شدن من به <strong>فناوری</strong> داشت و با قرار گرفتن در معرض کلمات، عبارت‌ها و ارتباطات انگلیسی هنگام بازی، به بهتر شدن <strong>زبان انگلیسی</strong> من نیز کمک کرد.`,

        aboutText4:
            `من همچنین علاقه زیادی به <strong>موسیقی</strong> دارم. در اوقات فراغتم به موسیقی گوش می‌دهم و هنرمند مورد علاقه‌ام <strong>Eminem</strong> است. موسیقی بخش مهمی از علایق من است و واقعاً از آن لذت می‌برم.`,

        aboutText5:
            `من از بازی رقابتی Dota 2، مخصوصاً در نقش <strong>Mid Lane</strong> لذت می‌برم. بازی کردن همچنین به من کمک کرده مهارت‌هایی مانند <strong>تفکر استراتژیک، تصمیم‌گیری، صبر و کار تیمی</strong> را تقویت کنم.`,

        aboutText6:
            `اگر بخواهم خودم را توصیف کنم، می‌گویم فردی <strong>کنجکاو، سخت‌کوش، رقابت‌جو، خلاق و همیشه آماده یادگیری</strong> هستم.`,

        skillsLabel:
            "چه کارهایی می‌توانم انجام دهم",

        skillsTitle:
            "مهارت‌های من",

        skillComputerTitle:
            "مهارت‌های کامپیوتری",

        skillComputerText:
            "مهارت‌های کامپیوتری خوبی دارم و با ویندوز، نرم‌افزارها، فایل‌ها و ابزارهای روزمره کامپیوتر آشنایی خوبی دارم.",

        skillWebTitle:
            "توسعه وب",

        skillWebText:
            "در حال یادگیری HTML و CSS هستم و در حال حاضر با ساخت وب‌سایت‌های شخصی، مهارت‌های توسعه وب خودم را تقویت می‌کنم.",

        skillPythonTitle:
            "برنامه‌نویسی پایتون",

        skillPythonText:
            "در حال یادگیری پایتون هستم و با استفاده از پروژه‌های کوچک و حل مسئله، برنامه‌نویسی را تمرین می‌کنم.",

        skillProblemTitle:
            "حل مسئله",

        skillProblemText:
            "از حل مسائل چالش‌برانگیز و پیدا کردن راه‌های مختلف برای رسیدن به یک راه‌حل لذت می‌برم.",

        skillTypingTitle:
            "تایپ سریع",

        skillTypingText:
            "می‌توانم حدود <strong>۸۰ کلمه در دقیقه</strong> تایپ کنم و به همین دلیل می‌توانم سریع و کارآمد کار کنم.",

        skillEnglishTitle:
            "زبان انگلیسی",

        skillEnglishText:
            "مهارت زبان انگلیسی من در سطح <strong>Upper-Intermediate</strong> است و همچنان روی واژگان، خواندن و ارتباطات خود کار می‌کنم.",

        skillGamingTitle:
            "بازی و استراتژی",

        skillGamingText:
            "به عنوان یک بازیکن رقابتی Dota 2، مهارت‌هایی مانند تفکر استراتژیک، تصمیم‌گیری، کار تیمی و حفظ تمرکز در شرایط سخت را تقویت کرده‌ام.",

        skillMathTitle:
            "ریاضیات",

        skillMathText:
            "علاقه زیادی به ریاضیات دارم و از تفکر منطقی، محاسبات و حل مسائل ریاضی لذت می‌برم.",

        skillLearningTitle:
            "یادگیری و پیشرفت",

        skillLearningText:
            "همیشه به یادگیری فناوری‌های جدید، بهتر کردن مهارت‌هایم و به چالش کشیدن خودم با پروژه‌های جدید علاقه دارم.",

        projectsLabel:
            "چیزهایی که ساخته‌ام",

        projectsTitle:
            "پروژه‌های من",

        socialLabel:
            "من را آنلاین پیدا کنید",

        socialTitle:
            "شبکه‌های اجتماعی من",

        socialGithub:
            "پروژه‌ها و مخازن برنامه‌نویسی من.",

        socialEmailTitle:
            "ایمیل",

        socialEmail:
            "از طریق ایمیل با من در ارتباط باشید.",

        socialTelegram:
            "در تلگرام با من در ارتباط باشید.",

        socialSpotify:
            "به موسیقی‌های مورد علاقه من گوش دهید.",

        hobbiesLabel:
            "چیزهایی که دوست دارم",

        hobbiesTitle:
            "علایق من",

        hobbyGamingTitle:
            "بازی",

        hobbyGamingText:
            `در اوقات فراغتم از بازی‌های ویدیویی لذت می‌برم و بازی مورد علاقه‌ام <strong>Dota 2</strong> است. بیشتر در نقش <strong>Mid Lane</strong> بازی می‌کنم و تعدادی از هیروهای مورد علاقه‌ام <strong>Tinker، Invoker، Lina، Storm Spirit، Ember Spirit، Puck، Pangolier و Void Spirit</strong> هستند. از بخش استراتژیک و رقابتی Dota 2 لذت می‌برم، مخصوصاً تصمیم‌گیری در شرایط سخت، سازگار شدن با حریفان مختلف و تلاش برای بهتر شدن در هر بازی. بازی کردن فقط برای سرگرمی نیست؛ بلکه به من کمک کرده مهارت‌هایی مثل تفکر استراتژیک، تصمیم‌گیری، صبر و کار تیمی را نیز تقویت کنم.`,

        hobbyMusicTitle:
            "موسیقی",

        hobbyMusicText:
            "تقریباً هر روز به موسیقی گوش می‌دهم؛ چه در حال استراحت باشم، چه درس بخوانم، روی پروژه‌هایم کار کنم یا فقط کمی وقت آزاد داشته باشم. موسیقی چیزی است که همیشه از بودنش لذت می‌برم و دوست دارم آهنگ‌ها و هنرمندان مختلف را کشف کنم. معمولاً به Eminem گوش می‌دهم، اما از پیدا کردن موسیقی‌های جدید و اضافه کردن آهنگ‌های مورد علاقه‌ام به پلی‌لیست‌هایم هم لذت می‌برم.",

        hobbyProgrammingTitle:
            "برنامه‌نویسی",

        hobbyProgrammingText:
            "برنامه‌نویسی یکی از سرگرمی‌های مورد علاقه من است، چون از ساختن چیزهای جدید و حل مسائل با کد لذت می‌برم. در حال حاضر مشغول یادگیری پایتون و توسعه وب هستم و دوست دارم با کار روی پروژه‌های شخصی مهارت‌هایم را بهتر کنم.",

        hobbyMathTitle:
            "ریاضیات و حل مسئله",

        hobbyMathText:
            "از ریاضیات و مسائل چالش‌برانگیز لذت می‌برم. دوست دارم از تفکر منطقی برای پیدا کردن راه‌حل، درک مفاهیم مختلف و به چالش کشیدن خودم با مسائلی که به خلاقیت و دقت نیاز دارند استفاده کنم.",

        hobbyTechnologyTitle:
            "فناوری",

        hobbyTechnologyText:
            "علاقه زیادی به فناوری و کامپیوتر دارم. از بررسی فناوری‌های جدید، یادگیری نحوه کار آن‌ها و کشف چیزهای جدید درباره دنیای دیجیتال لذت می‌برم. همچنین دوست دارم با ابزارها و فناوری‌هایی که می‌توانند به یادگیری و ساخت پروژه‌های جدید کمک کنند، آشنا بمانم.",

        thankYouTitle:
            "ممنون!",

        thankYouText:
            "از اینکه از وب‌سایت من بازدید کردید متشکرم.",

        backToTop:
            "بازگشت به بالا",

        footerName:
            "امیرحسین رنجبر"

    }

};


/* =========================
   PROJECTS JSON SYSTEM
========================= */

let projectsData = [];


function renderProjects(language) {

    const projectsGrid =
        document.getElementById("projectsGrid");


    if (!projectsGrid) {
        return;
    }


    projectsGrid.innerHTML = "";


    projectsData.forEach((project) => {

        const article =
            document.createElement("article");

        article.className =
            "project-card";


        const icon =
            document.createElement("div");

        icon.className =
            "project-icon";

        icon.textContent =
            project.icon;


        const content =
            document.createElement("div");

        content.className =
            "project-content";


        const type =
            document.createElement("p");

        type.className =
            "project-type";

        type.textContent =
            project.type[language];


        const title =
            document.createElement("h3");

        title.textContent =
            project.title[language];


        const description =
            document.createElement("p");

        description.textContent =
            project.description[language];


        const technologies =
            document.createElement("div");

        technologies.className =
            "project-tech";


        project.technologies.forEach(
            (technology) => {

                const span =
                    document.createElement("span");


                if (
                    typeof technology === "object"
                ) {

                    span.textContent =
                        technology[language];

                } else {

                    span.textContent =
                        technology;

                }


                technologies.appendChild(
                    span
                );

            }
        );


        content.appendChild(type);
        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(technologies);


        article.appendChild(icon);
        article.appendChild(content);


        projectsGrid.appendChild(article);

    });

}


/* -------------------------
   Load Projects JSON
------------------------- */

fetch("projects.json")
    .then((response) => {

        if (!response.ok) {

            throw new Error(
                "Could not load projects.json"
            );

        }

        return response.json();

    })
    .then((data) => {

        projectsData =
            data.projects;


        const currentLanguage =
            document.documentElement.lang === "fa"
                ? "fa"
                : "en";


        renderProjects(
            currentLanguage
        );

    })
    .catch((error) => {

        console.error(
            "Error loading projects:",
            error
        );

    });


/* =========================
   APPLY LANGUAGE
========================= */

function applyLanguage(language) {

    const translation =
        translations[language];


    if (!translation) {
        return;
    }


    /* Direction */

    document.documentElement.lang =
        language === "fa"
            ? "fa"
            : "en";


    document.documentElement.dir =
        language === "fa"
            ? "rtl"
            : "ltr";


    /* Page title */

    document.title =
        translation.pageTitle;


    /* Meta description */

    const metaDescription =
        document.getElementById(
            "metaDescription"
        );


    if (metaDescription) {

        metaDescription.setAttribute(
            "content",
            translation.metaDescription
        );

    }


    /* Text translations */

    const elements =
        document.querySelectorAll(
            "[data-i18n]"
        );


    elements.forEach((element) => {

        const key =
            element.getAttribute(
                "data-i18n"
            );


        if (
            Object.prototype.hasOwnProperty.call(
                translation,
                key
            )
        ) {

            element.innerHTML =
                translation[key];

        }

    });


    /* Image alt */

    const altElements =
        document.querySelectorAll(
            "[data-i18n-alt]"
        );


    altElements.forEach((element) => {

        const key =
            element.getAttribute(
                "data-i18n-alt"
            );


        if (
            Object.prototype.hasOwnProperty.call(
                translation,
                key
            )
        ) {

            element.setAttribute(
                "alt",
                translation[key]
            );

        }

    });


    /* Navigation aria label */

    const mainNav =
        document.getElementById(
            "mainNav"
        );


    if (mainNav) {

        mainNav.setAttribute(
            "aria-label",
            translation.navAria
        );

    }


    /* Language button */

    if (languageToggle) {

        languageToggle.textContent =
            translation.languageButton;


        languageToggle.setAttribute(
            "aria-label",
            translation.languageAria
        );

    }


    /* Render projects in selected language */

    renderProjects(language);


    /* Save selected language */

    localStorage.setItem(
        "siteLanguage",
        language
    );

}


/* =========================
   LANGUAGE TOGGLE
========================= */

if (languageToggle) {

    languageToggle.addEventListener(
        "click",
        () => {

            const currentLanguage =
                document.documentElement.lang;


            const nextLanguage =
                currentLanguage === "fa"
                    ? "en"
                    : "fa";


            applyLanguage(
                nextLanguage
            );

        }
    );

}


/* =========================
   LOAD SAVED LANGUAGE
========================= */

const savedLanguage =
    localStorage.getItem(
        "siteLanguage"
    );


if (
    savedLanguage === "fa" ||
    savedLanguage === "en"
) {

    applyLanguage(
        savedLanguage
    );

} else {

    applyLanguage("en");

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


        const currentLanguage =
            document.documentElement.lang;


        const translation =
            translations[
                currentLanguage === "fa"
                    ? "fa"
                    : "en"
            ];


        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? translation.menuClose
                : translation.menuOpen
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


            const currentLanguage =
                document.documentElement.lang;


            const translation =
                translations[
                    currentLanguage === "fa"
                        ? "fa"
                        : "en"
                ];


            menuToggle.setAttribute(
                "aria-label",
                translation.menuOpen
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
