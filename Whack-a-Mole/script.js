const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
let score = 0;
let molePosition = null;

for (let i = 0; i < 9; i++) {
  const square = document.createElement('div');
  square.classList.add('square');
  square.id = i;
  square.addEventListener('click', () => {
    if (square.id == molePosition) {
      score++;
      scoreDisplay.textContent = score;
      molePosition = null;
    }
  });
  grid.appendChild(square);
}

function randomMole() {
  document.querySelectorAll('.square').forEach(sq => sq.classList.remove('mole'));
  const randIndex = Math.floor(Math.random() * 9);
  const mole = document.getElementById(randIndex);
  mole.classList.add('mole');
  molePosition = randIndex;
}

setInterval(randomMole, 800);
