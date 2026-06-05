const menuBtn = document.getElementById("menu-btn");
const sidebar = document.querySelector(".sidebar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const overlay = document.querySelector(".overlay");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("show");
});
overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("show");
});
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});
navLinks.forEach(link => {
    link.addEventListener("click", () => {

        navLinks.forEach(l =>
            l.classList.remove("active")
        );

        link.classList.add("active");

        if(window.innerWidth <= 900){
            sidebar.classList.remove("active");
        }
    });
});







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
// Typing Animation
const nameText = "JOVIET BITANG GETALLA";
let index = 0;
function typing() {
    document.getElementById("typing").innerHTML =
        nameText.slice(0, index);
    index++;
    if (index > nameText.length) {
        index = 0;
    }
    setTimeout(typing, 200);
}
typing();


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
        const color =
        btn.dataset.color;
        document.documentElement
        .style.setProperty("--accent", color);
        localStorage.setItem(
            "accentColor",
            color
        );
    });

});

const savedColor =
localStorage.getItem("accentColor");
if(savedColor){
    document.documentElement
    .style.setProperty(
        "--accent",
        savedColor
    );
}

// Dark Light Mode

const toggle =
    document.getElementById("themeToggle");

toggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

});
