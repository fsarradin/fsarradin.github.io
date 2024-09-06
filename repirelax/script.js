var inhaleDuration = 5;
var exhaleDuration = 5;
var blockDuration = 0.25;


function renderDuration(duration) {
    if (duration >= 1)
        return `${duration}s`;
    return `${duration * 1000}ms`;
}

addEventListener('load', (e) => {
    var coeff = 0.9;
    var min_size = 100;

    var action = document.querySelector("#action");
    var time = document.querySelector("#time");
    var circle = document.querySelector("#circle");

    var inhale = document.querySelector("#inhale");
    var exhale = document.querySelector("#exhale");
    var block = document.querySelector("#block");
    
    var head = document.querySelector("#head");

    var interval = null;

    inhale.value = inhaleDuration;
    exhale.value = exhaleDuration;
    block.value = blockDuration;

    function getNewSize() {
        return Math.max(min_size, Math.min(window.innerWidth, window.innerHeight - head.clientHeight) * coeff - 55);
    }

    document.querySelector(":root").style.setProperty("--size", `${getNewSize()}px`);

    window.addEventListener('resize',
        (e) => {
            document.querySelector(":root").style.setProperty("--size", `${getNewSize()}px`);
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
                action.innerText = "Inhale";
                startCountdown(inhaleDuration);
            } else if (circle.style.animationName === 'exhale') {
                action.innerText = "Exhale";
                startCountdown(exhaleDuration);
            } else {
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

    function restart() {
        circle.style.animationName = null;
        circle.style.animationDuration = null;
        circle.className = 'animate';
        circle.style.animationDuration = `${inhaleDuration}s`;
        circle.style.animationName = 'inhale';
        // console.log(`inhale: ${inhaleDuration}`);
        // console.log(`exhale: ${exhaleDuration}`);
        // console.log(`block: ${blockDuration}`);
    }

    inhale.addEventListener('change',
        (e) => {
            if (interval != null) {
                clearInterval(interval);
            }
            inhaleDuration = parseFloat(inhale.value);
            restart();
        }
    );
    exhale.addEventListener('change',
        (e) => {
            if (interval != null) {
                clearInterval(interval);
            }
            exhaleDuration = parseFloat(exhale.value);
            restart();
        }
    );
    block.addEventListener('change',
        (e) => {
            if (interval != null) {
                clearInterval(interval);
            }
            blockDuration = parseFloat(block.value);
            restart();
        }
    ),

    restart();
});
