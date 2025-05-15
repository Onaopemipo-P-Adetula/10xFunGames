const words = ['apple', 'banana', 'coding', 'speed', 'challenge', 'keyboard'];
const wordDisplay = document.getElementById('word');
const input = document.getElementById('input');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');

let score = 0;
let time = 10;

function randomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function newWord() {
  wordDisplay.textContent = randomWord();
}

input.addEventListener('input', () => {
  if (input.value === wordDisplay.textContent) {
    score++;
    scoreEl.textContent = score;
    input.value = '';
    newWord();
    time += 2;
  }
});

newWord();
const timer = setInterval(() => {
  time--;
  timeEl.textContent = time;
  if (time === 0) {
    clearInterval(timer);
    wordDisplay.textContent = "Game Over!";
    input.disabled = true;
  }
}, 1000);
