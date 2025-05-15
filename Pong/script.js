const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
const playAgainBtn = document.getElementById('playAgain');

const hitSound = new Audio('sounds/hit.wav');
const wallSound = new Audio('sounds/wall.wav');
const scoreSound = new Audio('sounds/score.wav');
const winSound = new Audio('sounds/win.wav');

const paddleWidth = 10, paddleHeight = 80;
const player = { x: 10, y: canvas.height/2 - paddleHeight/2, score: 0 };
const ai = { x: canvas.width - 20, y: canvas.height/2 - paddleHeight/2, score: 0 };
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 8,
  speed: 5,
  dx: 5,
  dy: 5
};

let loop;

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

function drawScore(text, x, y) {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(text, x, y);
}

function draw() {
  drawRect(0, 0, canvas.width, canvas.height, "black");
  drawRect(player.x, player.y, paddleWidth, paddleHeight, "white");
  drawRect(ai.x, ai.y, paddleWidth, paddleHeight, "white");
  drawCircle(ball.x, ball.y, ball.radius, "white");
  drawScore(`Player: ${player.score}`, 50, 30);
  drawScore(`AI: ${ai.score}`, canvas.width - 120, 30);
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = -ball.dx;
  ball.dy = (Math.random() * 4 - 2);
}

function update() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
    wallSound.play();
  }

  if (
    ball.x < player.x + paddleWidth &&
    ball.y > player.y &&
    ball.y < player.y + paddleHeight
  ) {
    ball.dx = -ball.dx;
    hitSound.play();
  }

  if (
    ball.x + ball.radius > ai.x &&
    ball.y > ai.y &&
    ball.y < ai.y + paddleHeight
  ) {
    ball.dx = -ball.dx;
    hitSound.play();
  }

  if (ball.x - ball.radius < 0) {
    ai.score++;
    scoreSound.play();
    resetBall();
  }

  if (ball.x + ball.radius > canvas.width) {
    player.score++;
    scoreSound.play();
    resetBall();
  }

  const aiCenter = ai.y + paddleHeight / 2;
  if (aiCenter < ball.y - 10) ai.y += 4;
  else if (aiCenter > ball.y + 10) ai.y -= 4;

  ai.y = Math.max(0, Math.min(canvas.height - paddleHeight, ai.y));
}

function handleInput() {
  document.onkeydown = function (e) {
    if (e.key === "w" && player.y > 0) player.y -= 20;
    else if (e.key === "s" && player.y < canvas.height - paddleHeight) player.y += 20;
  };
}

function endGame(winner) {
  clearInterval(loop);
  winSound.play();
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(`${winner} Wins!`, canvas.width / 2 - 70, canvas.height / 2);
  playAgainBtn.style.display = "block";
}

function game() {
  draw();
  update();
  handleInput();

  if (player.score >= 5) endGame("You");
  else if (ai.score >= 5) endGame("AI");
}

function startGame() {
  player.score = 0;
  ai.score = 0;
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = 5;
  ball.dy = 5;
  playAgainBtn.style.display = "none";
  loop = setInterval(game, 1000 / 60);
}

playAgainBtn.onclick = startGame;

// Start game on first load
startGame();
