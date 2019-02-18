import { BOARDCOLS, BOARDROWS } from './constants.js';

export function checkWin(col, row, currPlayer) {
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