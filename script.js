const menuBtn =
document.getElementById("menu-btn");
const sidebar =
document.querySelector(".sidebar");
menuBtn.addEventListener("click",()=>{
    sidebar.classList.toggle("active");
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