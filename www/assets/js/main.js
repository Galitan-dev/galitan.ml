VanillaTilt.init(document.querySelectorAll(".media"), {
    max: 1,
    scale: 1.5
});

const topPage = document.querySelector(".top-page"),
    rect = topPage.getBoundingClientRect();

const trans = 1000;
let holding = false, x = 42, delay = -1, transiting = false;

topPage.addEventListener("mousedown", e => {
    if (transiting) return;
    const newX = Math.round(e.clientX / rect.width * 100);
    if (Math.abs(x - newX) < 1) holding = true;
});

topPage.addEventListener("mousemove", e => {
    if (!holding) return;
    x = fork(e.clientX / rect.width * 100, 5, 55);
    topPage.style.gridTemplateColumns = `${x}% ${100 - x}%`
});

topPage.addEventListener("mouseup", e => {
    holding = false;
    delay = 2;
});

setInterval(() => {
    if (delay < 0) return;
    if (delay > 0) return delay--;

    transiting = true;
    topPage.style.transition = `${trans}ms`;
    topPage.style.gridTemplateColumns = "42% 58%";
    setTimeout(() => {
        topPage.style.transition = "";
        x = 42;
        transiting = false;
    }, trans);

    delay = -1;
}, 1000)

function fork(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
}