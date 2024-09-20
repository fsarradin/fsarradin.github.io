var inhaleDuration = 5;
var exhaleDuration = 5;
var blockDuration = 0.25;

const coeff = 0.9;
const min_size = 100;

var circle = null;
var interval = null;
var action = null;
var time = null;

var inhale = null;
var exhale = null;
var block = null;

var gong = new Audio("zen-gong.mp3");

function play_gong() {
    gong.pause();
    gong.currentTime = 0.5;
    gong.play();
}

function start() {
    inhaleDuration = parseFloat(inhale.value);
    exhaleDuration = parseFloat(exhale.value);
    blockDuration = parseFloat(block.value);
    circle.className = 'animate';
    circle.style.animationDuration = `${inhaleDuration}s`;
    circle.style.animationName = 'inhale';
}

function stop() {
    action.innerText = "Breath normally";
    time.innerText = "";
    if (interval != null) {
        clearInterval(interval);
    }
    circle.style.animationName = null;
    circle.style.animationDuration = null;
    circle.className = null;
}

function restart() {
    stop();
    start();
}

function renderDuration(duration) {
    if (duration >= 1)
        return `${duration}s`;
    return `${duration * 1000}ms`;
}

addEventListener('load', (e) => {
    // output elements
    action = document.querySelector("#action");
    time = document.querySelector("#time");

    // breathing circle
    circle = document.querySelector("#circle");

    // input fields
    inhale = document.querySelector("#inhale");
    exhale = document.querySelector("#exhale");
    block = document.querySelector("#block");
    
    var head = document.querySelector("#head");

    inhale.value = inhaleDuration;
    exhale.value = exhaleDuration;
    block.value = blockDuration;

    function getNewSize() {
        return Math.max(
            min_size,
            Math.min(
                window.innerWidth,
                window.innerHeight - head.clientHeight
            ) * coeff - 55
        );
    }

    function setSize(value) {
        document.querySelector(":root").style.setProperty("--size", `${value}px`);
    }

    setSize(getNewSize());

    window.addEventListener('resize',
        (e) => {
            setSize(getNewSize());
        }
    );


    function startCountdown(duration) {
        var count = duration;
        time.innerText = count;
        interval = setInterval(
            () => {
                if (count < 1) {
                    clearInterval(interval);
                } else {
                    count--;
                    time.innerText = count;
                }
            },
            1000
        );
    }

    circle.addEventListener('animationstart',
        (e) => {
            if (circle.style.animationName === 'inhale') {
                play_gong();
                action.innerText = "Inhale";
                startCountdown(inhaleDuration);
            } else if (circle.style.animationName === 'exhale') {
                play_gong();
                action.innerText = "Exhale";
                startCountdown(exhaleDuration);
            } else {
                if (blockDuration > 0.5) {
                    play_gong();
                }
                action.innerText = "Block";
                startCountdown(blockDuration);
            }
        }
    );

    circle.addEventListener('animationend',
        (e) => {
            clearInterval(interval);
            if (circle.style.animationName === 'inhale') {
                if (blockDuration > 0) {
                    circle.style.animationDuration = `${blockDuration}s`;
                    circle.style.animationName = 'blockToRight';
                } else {
                    circle.style.animationDuration = `${exhaleDuration}s`;
                    circle.style.animationName = 'exhale';
                }
            } else if (circle.style.animationName === 'exhale') {
                if (blockDuration > 0) {
                    circle.style.animationDuration = `${blockDuration}s`;
                    circle.style.animationName = 'blockToLeft';
                } else {
                    circle.style.animationDuration = `${inhaleDuration}s`;
                    circle.style.animationName = 'inhale';
                }
            } else if (circle.style.animationName === 'blockToRight') {
                circle.style.animationDuration = `${exhaleDuration}s`;
                circle.style.animationName = 'exhale';
            } else {
                circle.style.animationDuration = `${inhaleDuration}s`;
                circle.style.animationName = 'inhale';
            }
        }
    );

    stop();
});
