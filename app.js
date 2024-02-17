let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let high = 0;
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("started");
        started = true;
        levelUp();
    }
});
function flashBtn(Btn) {
    Btn.classList.add("flash");
    setTimeout(() => {
        Btn.classList.remove("flash");
    }, 250);
}
function userFlash(Btn) {
    Btn.classList.add("click");
    setTimeout(() => {
        Btn.classList.remove("click");
    }, 250);
}
function currLvl(indx) {
    // console.log(`curr leve is ${level}`);

    if (userSeq[indx] === gameSeq[indx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over!! Your score was <b>${level}</b> <br> press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}


function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let RandIdx = Math.floor(Math.random() * 3);
    let RandColor = btns[RandIdx];
    let randBtn = document.querySelector(`.${RandColor}`);
    flashBtn(randBtn);
    gameSeq.push(RandColor);
}
function btnPress() {
    console.log(this);
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    currLvl(userSeq.length - 1);

}
let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
    btn.addEventListener("click", btnPress);
}
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];

    highScore(level);
    level = 0;


}
function highScore(level) {
    if (high > level) {
        h3.innerHTML = `High Score: ${high}`;
    } else {
        high = level;
        h3.innerHTML = `High Score: ${level}`;
    }
}