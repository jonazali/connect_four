import { BOARDCOLS, BOARDROWS } from './constants.js';

// setup board
export function setupBoard() {
  let boardHTML = '';
  for (let row = BOARDROWS - 1; row >= 0; row--) {
    // iterate over rows, going down
    for (let col = 0; col < BOARDCOLS; col++) {
      // iterate over columns, going up
      // prettier-ignore
      boardHTML += `
        <div class="slot">
            <label for="slot${col}${row}">
            <input type="checkbox" ${row > 0 ? 'disabled' : ''} name="slot${col}${row}" id="slot${col}${row}" data-row="${row}" data-col="${col}" >
            </label>
        </div>
        `;
    }
  }

  return boardHTML;
}
