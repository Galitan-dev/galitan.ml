const topPage = document.querySelector(".top-page"),
    rect = topPage.getBoundingClientRect();

const trans = 1000;
let holding = false, x = 42, delay = -1, transiting = false;

topPage.addEventListener("mousedown", e => {
    if (transiting) return;
    const newX = Math.round(e.clientX / rect.width * 100);
    if (Math.abs(x - newX) < 2) holding = true;
    delay = -1;
    console.log("hey");
});

topPage.addEventListener("mousemove", e => {
    const oldX = x;
    if (!holding) return;
    x = fork(e.clientX / rect.width * 100, 5, 63);
    topPage.style.gridTemplateColumns = `${x}% ${100 - x}%`;
    if (oldX >= 20 && x < 20) topPage.classList.add('left-is-small');
    else if (oldX <= 20 && x > 20) topPage.classList.remove('left-is-small');
    if (oldX <= 55 && x > 55) topPage.querySelector("h1").innerHTML = "Hey!";
    else if (oldX >= 55 && x < 55) topPage.querySelector("h1").innerHTML = "Salut!";
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
    topPage.classList.remove('left-is-small');
    setTimeout(() => {
        topPage.style.transition = "";
        x = 42;
        transiting = false;
        topPage.querySelector("h1").innerHTML = "Salut!";
    }, trans);

    delay = -1;
}, 1000)

function fork(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
}