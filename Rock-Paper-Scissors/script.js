let playerScore = 0;
let computerScore = 0;

function play(playerChoice) {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  document.getElementById("playerChoice").textContent = capitalize(playerChoice);
  document.getElementById("computerChoice").textContent = capitalize(computerChoice);

  let result = "";

  if (playerChoice === computerChoice) {
    result = "It's a draw!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "You win!";
    playerScore++;
  } else {
    result = "You lose!";
    computerScore++;
  }

  document.getElementById("resultText").textContent = result;
  document.getElementById("playerScore").textContent = playerScore;
  document.getElementById("computerScore").textContent = computerScore;
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  document.getElementById("playerScore").textContent = "0";
  document.getElementById("computerScore").textContent = "0";
  document.getElementById("playerChoice").textContent = "-";
  document.getElementById("computerChoice").textContent = "-";
  document.getElementById("resultText").textContent = "Make your move!";
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
