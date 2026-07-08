const menuBtn = document.getElementById("menu-btn");
const sidebar = document.querySelector(".sidebar");
const sidebarClose = document.getElementById("sidebarClose");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const overlay = document.querySelector(".overlay");

function openSidebar() {
    sidebar.classList.add("active");
    overlay.classList.add("show");
    menuBtn.setAttribute("aria-expanded", "true");
}

function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", "false");
}

menuBtn.addEventListener("click", () => {
    sidebar.classList.contains("active") ? closeSidebar() : openSidebar();
});
sidebarClose.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);

// Close the menu with the Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
        closeSidebar();
    }
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {

        navLinks.forEach(l =>
            l.classList.remove("active")
        );

        link.classList.add("active");

        if(window.innerWidth <= 900){
            closeSidebar();
        }
    });
});

// If the window is resized from mobile to desktop while the menu is open,
// reset it so it doesn't get stuck mid-transition
window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        closeSidebar();
    }
});

function updateGlow(color){

    const hex = color.replace("#","");

    const r = parseInt(hex.substring(0,2),16);
    const g = parseInt(hex.substring(2,4),16);
    const b = parseInt(hex.substring(4,6),16);

    const opacity =
    document.body.classList.contains("light")
    ? 0.15
    : 0.25;

    document.documentElement.style.setProperty(
        "--accent-glow",
        `rgba(${r}, ${g}, ${b}, ${opacity})`
    );
}





// Scroll behavior (auto highlight section)
window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});
// Typing Animation (types out, pauses while "waiting", then erases and retypes)
const nameText = "JOVIET BITANG GETALLA";
const typingEl = document.getElementById("typing");

const TYPE_SPEED = 110;
const DELETE_SPEED = 55;
const PAUSE_AFTER_TYPING = 1800;
const PAUSE_AFTER_DELETING = 500;

let charIndex = 0;
let isDeleting = false;

function typeLoop() {
    typingEl.textContent = nameText.slice(0, charIndex);

    if (!isDeleting) {
        charIndex++;
        if (charIndex > nameText.length) {
            charIndex = nameText.length;
            isDeleting = true;
            setTimeout(typeLoop, PAUSE_AFTER_TYPING); // pause while "waiting"
            return;
        }
        setTimeout(typeLoop, TYPE_SPEED);
    } else {
        charIndex--;
        if (charIndex < 0) {
            charIndex = 0;
            isDeleting = false;
            setTimeout(typeLoop, PAUSE_AFTER_DELETING); // brief pause before retyping
            return;
        }
        setTimeout(typeLoop, DELETE_SPEED);
    }
}
typeLoop();


// Theme Color
const paletteBtn =
document.getElementById("colorToggle");

const colorOptions =
document.querySelector(".color-options");
paletteBtn.addEventListener("click", () => {
    colorOptions.classList.toggle("show");
});

document.querySelectorAll(".color-btn")
.forEach(btn => {

    btn.addEventListener("click", () => {

        const color = btn.dataset.color;

        document.documentElement.style.setProperty(
            "--accent",
            color
        );

        updateGlow(color);

        localStorage.setItem(
            "accentColor",
            color
        );

    });

});

// Dark Light Mode

const toggle =
    document.getElementById("themeToggle");

toggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const currentColor =
        getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();

    updateGlow(currentColor);

})
;const savedColor =
localStorage.getItem("accentColor");

if(savedColor){

    document.documentElement.style.setProperty(
        "--accent",
        savedColor
    );

    updateGlow(savedColor);
}
const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

});

document.querySelectorAll("section").forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
});

// Footer: current year + the page's real last-modified date (no fake dates)
const footerYear = document.getElementById("footerYear");
const lastUpdated = document.getElementById("lastUpdated");
if (footerYear) footerYear.textContent = new Date().getFullYear();
if (lastUpdated) {
    lastUpdated.textContent = new Date(document.lastModified).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

// Contact form (no backend yet, so this opens the visitor's email client
// pre-filled with what they typed, and shows a quick status message)
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        if (!name || !email || !message) {
            formStatus.textContent = "Please fill in all fields.";
            formStatus.classList.add("error");
            return;
        }

        const subject = encodeURIComponent(`Portfolio contact from ${name}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        window.location.href = `mailto:jovietgetalla02@email.com?subject=${subject}&body=${body}`;

        formStatus.textContent = "Opening your email app…";
        formStatus.classList.remove("error");
        contactForm.reset();
    });
}
