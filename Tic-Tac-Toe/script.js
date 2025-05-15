const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let board = Array(9).fill('');

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

cells.forEach(cell => cell.addEventListener('click', handleClick));

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== '' || checkWinner()) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
  } else if (board.every(cell => cell !== '')) {
    statusText.textContent = 'It\'s a draw!';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winPatterns.some(pattern => 
    pattern.every(index => board[index] === currentPlayer)
  );
}

function resetGame() {
  board = Array(9).fill('');
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  statusText.textContent = `Player X's turn`;
}
