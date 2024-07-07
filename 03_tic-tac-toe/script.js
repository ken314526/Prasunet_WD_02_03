const boardElement = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("resetButton");
const messageElement = document.getElementById("message");
const turnMessageElement = document.getElementById("turnMessage");
const modal = document.getElementById("modal");
const player1Button = document.getElementById("player1Button");
const player2Button = document.getElementById("player2Button");

let board = Array(9).fill(null);
let currentPlayer;
let playerSymbol;
let opponentSymbol;
let isGameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = clickedCell.getAttribute("data-index");

  if (board[clickedCellIndex] !== null || !isGameActive) {
    return;
  }

  board[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;

  checkResult();
  switchPlayer();
}

function checkResult() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];

    if (a === null || b === null || c === null) {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    messageElement.innerHTML = `Player ${currentPlayer} has won!`;
    isGameActive = false;
    return;
  }

  if (!board.includes(null)) {
    messageElement.innerHTML = "Game is a draw!";
    isGameActive = false;
    return;
  }
}

function switchPlayer() {
  currentPlayer =
    currentPlayer === playerSymbol ? opponentSymbol : playerSymbol;
  turnMessageElement.innerHTML = `It's ${currentPlayer}'s turn`;
}

function resetBoard() {
  board = Array(9).fill(null);
  cells.forEach((cell) => (cell.innerHTML = ""));
  isGameActive = true;
  messageElement.innerHTML = "";
  turnMessageElement.innerHTML = `It's ${playerSymbol}'s turn`;
}

function choosePlayer(symbol) {
  playerSymbol = symbol;
  opponentSymbol = symbol === "X" ? "O" : "X";
  currentPlayer = playerSymbol;
  turnMessageElement.innerHTML = `It's ${currentPlayer}'s turn`;
  modal.style.display = "none";
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetBoard);
player1Button.addEventListener("click", () => choosePlayer("X"));
player2Button.addEventListener("click", () => choosePlayer("O"));

// Show modal on page load
window.onload = function () {
  modal.style.display = "flex";
};
