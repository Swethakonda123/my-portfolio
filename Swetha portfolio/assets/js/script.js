// ================= Navbar Toggle & Scroll =================
$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        // Scroll-to-top button
        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // Scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // Smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });
});

// ================= Contact Form using EmailJS =================
emailjs.init("IztvmEQJun8BcL27s"); // Your Public Key

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    emailjs.sendForm("service_2plzf3s", "template_5lqex9b", this)
        .then(() => {
            alert("✅ Message sent successfully!");
            this.reset(); // Clear form
        }, (error) => {
            console.error("❌ Failed...", error);
            alert("❌ Failed to send message. Please try again.");
        });
});

// ================= Visibility Change =================
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | Jigar Sable";
        $("#favicon").attr("href", "assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "assets/images/favhand.png");
    }
});

// ================= Typed.js Effect =================
var typed = new Typed(".typing-text", {
    strings: ["Web Developer", "React JS", "TypeScript", "Tailwind Css", "Mongo DB"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});

// ================= Fetch Skills & Projects =================
async function fetchData(type = "skills") {
    const response = await fetch(type === "skills" ? "skills.json" : "./projects/projects.json");
    return await response.json();
}

function showSkills(skills) {
    const skillsContainer = document.getElementById("skillsContainer");
    skillsContainer.innerHTML = skills.map(skill => `
        <div class="bar">
            <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
            </div>
        </div>
    `).join('');
}

function showProjects(projects) {
    const projectsContainer = document.querySelector("#work .box-container");
    projectsContainer.innerHTML = projects.slice(0, 10).filter(p => p.category != "android").map(project => `
        <div class="box tilt">
            <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
            <div class="content">
                <div class="tag"><h3>${project.name}</h3></div>
                <div class="desc">
                    <p>${project.desc}</p>
                    <div class="btns">
                        <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                        <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Initialize Tilt.js
    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

    // Scroll Reveal Projects
    ScrollReveal().reveal('.work .box', { origin: 'top', distance: '80px', duration: 1000, reset: true, interval: 200 });
}

fetchData().then(showSkills);
fetchData("projects").then(showProjects);

// ================= ScrollReveal Animations =================
const srtop = ScrollReveal({ origin: 'top', distance: '80px', duration: 1000, reset: true });

// Home
srtop.reveal('.home .content h3, .home .content p, .home .content .btn', { delay: 200 });
srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram, .home .instagram, .home .dev', { interval: 600 });

// About
srtop.reveal('.about .content h3, .about .content .tag, .about .content p, .about .content .box-container, .about .content .resumebtn', { delay: 200 });

// Skills
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

// Education
srtop.reveal('.education .box', { interval: 200 });

// Projects
srtop.reveal('.work .box', { interval: 200 });

// Experience
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

// Contact
srtop.reveal('.contact .container, .contact .container .form-group', { delay: 400 });

// ================= Disable Developer Tools =================
document.onkeydown = function(e) {
    if(e.keyCode == 123 || (e.ctrlKey && e.shiftKey && ['I','C','J'].includes(String.fromCharCode(e.keyCode))) || (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
        return false;
    }
};
