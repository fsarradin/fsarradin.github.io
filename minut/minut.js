// Minuteur palette flip
const digits = {
  min1: 0,
  min2: 0,
  sec1: 0,
  sec2: 0
};
let initialDigits = { ...digits };
let timer = null;
let state = 'init'; // init, running, stopped

function updateDisplay(flip = false, prev = {}) {
  for (const key of Object.keys(digits)) {
    const el = document.getElementById(key);
    if (flip && prev[key] !== undefined && prev[key] !== digits[key]) {
      // Animation flip
      const flipDiv = document.createElement('div');
      flipDiv.className = 'flip';
      flipDiv.textContent = prev[key];
      el.innerHTML = digits[key];
      el.appendChild(flipDiv);
      setTimeout(() => {
        if (el.contains(flipDiv)) el.removeChild(flipDiv);
      }, 400);
    } else {
      el.textContent = digits[key];
    }
  }
}

function getTotalSeconds() {
  return digits.min1 * 10 * 60 + digits.min2 * 60 + digits.sec1 * 10 + digits.sec2;
}
function setFromTotalSeconds(total) {
  let m = Math.floor(total / 60);
  let s = total % 60;
  digits.min1 = Math.floor(m / 10);
  digits.min2 = m % 10;
  digits.sec1 = Math.floor(s / 10);
  digits.sec2 = s % 10;
}

function tick() {
  const prev = { ...digits };
  let total = getTotalSeconds();
  if (total > 0) {
    total--;
    setFromTotalSeconds(total);
    updateDisplay(true, prev);
  } else {
    stopTimer();
    // Passage à l'état Reset
    const btn = document.getElementById('startStopBtn');
    btn.textContent = 'Reset';
    state = 'stopped';
    disableArrows(true);
  }
}

function startTimer() {
  if (!timer) {
    timer = setInterval(tick, 1000);
  }
}
function stopTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}
function resetTimer() {
  Object.assign(digits, initialDigits);
  updateDisplay();
}

function handleBtn() {
  const btn = document.getElementById('startStopBtn');
  if (state === 'init') {
    initialDigits = { ...digits };
    startTimer();
    btn.textContent = 'Stop';
    state = 'running';
    disableArrows(true);
  } else if (state === 'running') {
    stopTimer();
    btn.textContent = 'Reset';
    state = 'stopped';
  } else if (state === 'stopped') {
    resetTimer();
    btn.textContent = 'Start';
    state = 'init';
    disableArrows(false);
  }
}

function disableArrows(disable) {
  document.querySelectorAll('.arrow').forEach(btn => {
    btn.disabled = disable;
    btn.style.opacity = disable ? 0.4 : 1;
  });
}

function arrowClick(e) {
  if (state !== 'init') return;
  const type = e.target.getAttribute('data-type');
  if (!type) return;
  const prev = { ...digits };
  if (e.target.classList.contains('up')) {
    if (type === 'min1') digits.min1 = (digits.min1 + 1) % 10;
    if (type === 'min2') digits.min2 = (digits.min2 + 1) % 10;
    if (type === 'sec1') digits.sec1 = (digits.sec1 + 1) % 6;
    if (type === 'sec2') digits.sec2 = (digits.sec2 + 1) % 10;
  } else {
    if (type === 'min1') digits.min1 = (digits.min1 + 9) % 10;
    if (type === 'min2') digits.min2 = (digits.min2 + 9) % 10;
    if (type === 'sec1') digits.sec1 = (digits.sec1 + 5) % 6;
    if (type === 'sec2') digits.sec2 = (digits.sec2 + 9) % 10;
  }
  updateDisplay(true, prev);
}

document.addEventListener('DOMContentLoaded', () => {
  updateDisplay();
  document.getElementById('startStopBtn').addEventListener('click', handleBtn);
  document.querySelectorAll('.arrow').forEach(btn => {
    btn.addEventListener('click', arrowClick);
  });
});
