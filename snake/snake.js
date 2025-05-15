const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const gridSize = 20;
let snake = [{ x: 160, y: 200 }];
let dx = gridSize;
let dy = 0;
let food = randomFood();
let score = 0;

function randomFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize,
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'lime';
  snake.forEach(p => ctx.fillRect(p.x, p.y, gridSize, gridSize));

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = randomFood();
    score++;
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const [head, ...body] = snake;
  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    body.some(part => part.x === head.x && part.y === head.y)
  ) {
    alert('Game Over! Score: ' + score);
    document.location.reload();
  }
}

function gameLoop() {
  moveSnake();
  checkCollision();
  draw();
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && dy === 0) {
    dx = 0; dy = -gridSize;
  } else if (e.key === 'ArrowDown' && dy === 0) {
    dx = 0; dy = gridSize;
  } else if (e.key === 'ArrowLeft' && dx === 0) {
    dx = -gridSize; dy = 0;
  } else if (e.key === 'ArrowRight' && dx === 0) {
    dx = gridSize; dy = 0;
  }
});

setInterval(gameLoop, 100);
