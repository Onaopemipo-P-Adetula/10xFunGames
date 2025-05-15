const canvas = document.getElementById("flappy");
const ctx = canvas.getContext("2d");

let bird = { x: 50, y: 150, radius: 10, dy: 0 };
let pipes = [];
let gravity = 0.5;
let score = 0;
let gameOver = false;

function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawPipe(pipe) {
  ctx.fillStyle = "green";
  ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
  ctx.fillRect(pipe.x, pipe.top + pipe.gap, pipe.width, canvas.height);
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function update() {
  bird.dy += gravity;
  bird.y += bird.dy;

  if (bird.y + bird.radius > canvas.height || bird.y < 0) {
    gameOver = true;
  }

  pipes.forEach((pipe, i) => {
    pipe.x -= 2;
    if (
      bird.x + bird.radius > pipe.x &&
      bird.x - bird.radius < pipe.x + pipe.width &&
      (bird.y - bird.radius < pipe.top || bird.y + bird.radius > pipe.top + pipe.gap)
    ) {
      gameOver = true;
    }

    if (pipe.x + pipe.width === bird.x) score++;

    if (pipe.x + pipe.width < 0) {
      pipes.splice(i, 1);
    }
  });

  if (!pipes.length || pipes[pipes.length - 1].x < canvas.width - 150) {
    const top = Math.random() * 200 + 50;
    pipes.push({ x: canvas.width, top: top, gap: 120, width: 40 });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBird();
  pipes.forEach(drawPipe);
  drawScore();
}

function gameLoop() {
  if (!gameOver) {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  } else {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
  }
}

document.addEventListener("keydown", () => {
  bird.dy = -8;
});

gameLoop();
