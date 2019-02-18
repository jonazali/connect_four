const BOARDCOLS = 7;
const BOARDROWS = 6;

const board = document.getElementById('board');
const playerIndicator = document.getElementById('player-indicator');

// setup board
let boardHTML = '';
for (let row = BOARDROWS - 1; row >= 0; row--) {
  // iterate over rows, going down
  for (let col = 0; col < BOARDCOLS; col++) {
    // iterate over columns, going up
    // prettier-ignore
    boardHTML += `
      <div class="slot">
        <label for="slot${col}${row}">
          <input onchange="runTurn(this)" type="checkbox" ${row > 0 ? 'disabled' : ''} name="slot${col}${row}" id="slot${col}${row}" data-row="${row}" data-col="${col}" >
        </label>
      </div>
    `;
  }
}

// set the board's HTML
board.innerHTML = boardHTML;

let player1Turn = true;
// eslint-disable-next-line no-unused-vars
function runTurn(input) {
  // change color of label
  input.parentElement.className = player1Turn ? 'player1' : 'player2';

  // disable the input
  input.disabled = true;
  // enable the slot at (row + 1, col)
  const { col, row } = input.dataset;
  // check if input is on the top row
  if (row < BOARDROWS - 1) {
    const neighbor = document.getElementById(`slot${col}${parseInt(row) + 1}`);
    neighbor.disabled = false;
  }

  // check if it's a win
  const isWin = checkWin(parseInt(col), parseInt(row), player1Turn ? 'player1' : 'player2');
  if (isWin) {
    // update win text
    const turnIndicator = document.getElementById('turn-indicator');
    const player = player1Turn ? 'player1' : 'player2';
    turnIndicator.innerHTML = `🎉 <span class="${player}" id="player-indicator">Player 1</span> wins 🎉`;

    // get all checkboxs
    const checkboxes = document.querySelectorAll('.slot input[type=checkbox]');
    // and disable all of them
    checkboxes.forEach(checkbox => {
      checkbox.disabled = true;
    });

    return;
  }
  // update win text (win celebrations)

  // change whose turn it is
  player1Turn = !player1Turn;

  // update player-indicator text
  if (player1Turn) {
    playerIndicator.innerText = 'Player 1';
    playerIndicator.className = 'player1';
  } else {
    playerIndicator.innerText = 'Player 2';
    playerIndicator.className = 'player2';
  }
}

function checkWin(col, row, currPlayer) {
  return checkDown(col, row, currPlayer) || checkAcross(col, row, currPlayer) || checkDiagonal(col, row, currPlayer);
  // check diagonals
}

function checkDown(col, row, currPlayer) {
  if (row < 3) return false; // can't connect 4 if it's only stacked 3 or less

  for (let j = row - 1; j > row - 4; j--) {
    const currSlotPlayer = document.getElementById(`slot${col}${j}`).parentElement.className;
    if (currSlotPlayer !== currPlayer) return false;
  }

  return true;
}

function checkAcross(col, row, currPlayer) {
  let sameColorNeighbors = 0;

  // check to the right
  for (let i = col + 1; i < col + 4; i++) {
    // break if out of bounds
    if (i >= BOARDCOLS) break;
    const currSlotPlayer = document.getElementById(`slot${i}${row}`).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }

  // check to the left
  for (let i = col - 1; i > col - 4; i--) {
    // break if out of bounds
    if (i < 0) break;
    const currSlotPlayer = document.getElementById(`slot${i}${row}`).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }

  return sameColorNeighbors >= 3;
}

function checkDiagonal(col, row, currPlayer) {
  return checkUpLeft(col, row, currPlayer) || checkUpRight(col, row, currPlayer);
}

function checkUpRight(col, row, currPlayer) {
  let sameColorNeighbors = 0;

  // search up right
  for (let i = 1; i < 4; i++) {
    // break if out of bounds
    if (col + i >= BOARDCOLS || row + i >= BOARDROWS) break;
    const currSlotPlayer = document.getElementById(`slot${col + i}${row + i}`).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }

  // search down left
  for (let i = 1; i < 4; i++) {
    // break if out of bounds
    if (col - i < 0 || row - i < 0) break;
    const currSlotPlayer = document.getElementById(`slot${col - i}${row - i}`).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }

  return sameColorNeighbors >= 3;
}

function checkUpLeft(col, row, currPlayer) {
  let sameColorNeighbors = 0;

  // search up left
  for (let i = 1; i < 4; i++) {
    // break if out of bounds
    if (col - i < 0 || row + i >= BOARDROWS) break;
    const currSlotPlayer = document.getElementById(`slot${col - i}${row + i}`).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }

  // search down right
  for (let i = 1; i < 4; i++) {
    // break if out of bounds
    if (col + i >= BOARDCOLS || row - i < 0) break;
    const currSlotPlayer = document.getElementById(`slot${col + i}${row - i}`).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }

  return sameColorNeighbors >= 3;
}
