const cells = document.querySelectorAll('.cell');

const statusText = document.getElementById('status-text');

const resetButton = document.getElementById('reset-btn');

let currentPlayer = 'X';

let gameActive = true;

let board = ['', '', '', '', '', '', '', '', ''];

// Check for win conditions

const winningCombinations = [

 [0, 1, 2],

 [3, 4, 5],

 [6, 7, 8],

 [0, 3, 6],

 [1, 4, 7],

 [2, 5, 8],

 [0, 4, 8],

 [2, 4, 6]

];

// Update the board and check for win

function handleCellClick(e) {

 const cellIndex = e.target.dataset.cell;

 // If cell is already filled or game is over, do nothing

 if (board[cellIndex] || !gameActive) return;

 board[cellIndex] = currentPlayer;

 e.target.textContent = currentPlayer;

 checkForWinner();

 if (gameActive) {

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  statusText.textContent = `Player ${currentPlayer}'s turn`;

 }

}

// Check for a winner or a draw

function checkForWinner() {

 for (const combo of winningCombinations) {

  const [a, b, c] = combo;

  if (board[a] && board[a] === board[b] && board[a] === board[c]) {

   gameActive = false;

   statusText.textContent = `Player ${board[a]} wins!`;

   highlightWinningCells(combo);

   return;

  }

 }

 if (!board.includes('')) {

  gameActive = false;

  statusText.textContent = "It's a draw!";

 }

}

// Highlight the winning cells

function highlightWinningCells(combo) {

 combo.forEach(index => {

  cells[index].style.backgroundColor = '#4CAF50'; // Green for winner

 });

}

// Reset the game

function resetGame() {

 board = ['', '', '', '', '', '', '', '', ''];

 gameActive = true;

 currentPlayer = 'X';

 statusText.textContent = `Player ${currentPlayer}'s turn`;

 cells.forEach(cell => {

  cell.textContent = '';

  cell.disabled = false;

  cell.style.backgroundColor = ''; // Reset background color

 });

}

// Event Listeners

cells.forEach(cell => {

 cell.addEventListener('click', handleCellClick);

});

resetButton.addEventListener('click', resetGame);
