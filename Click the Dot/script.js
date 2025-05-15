const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
let score = 0;

function spawnDot() {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.style.top = Math.random() * 270 + 'px';
  dot.style.left = Math.random() * 270 + 'px';

  dot.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    dot.remove();
  });

  game.appendChild(dot);

  setTimeout(() => {
    if (game.contains(dot)) {
      dot.remove();
    }
  }, 1500);
}

setInterval(spawnDot, 1000);
