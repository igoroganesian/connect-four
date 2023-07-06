"use strict";

const WIDTH = 7;
const HEIGHT = 6;

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for (let i = HEIGHT; i > 0; i--) {//change to y
    console.log(i);
    board.push(createRow());
  }
}

/** Generates new row array of BOARD_WIDTH nulls */

function createRow() {
  const newRow = new Array(WIDTH);
  return newRow.fill(null, 0, WIDTH);
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board');

  // create the top row, set the id and add interactivity
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // populate the top row with boxes and ids them with column numbers
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", `top-${x}`);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    let row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      let cell = document.createElement("td");
      cell.setAttribute("id", `c-${y}-${x}`);

      row.append(cell);

    }
    htmlBoard.append(row);

  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  for (let y = HEIGHT -1;y>=0;y--){
    const cell = document.getElementById(`c-${y}-${x}`);
    console.log(`cell is ${cell}`);
    if (!cell.hasChildNodes()) {
      return cell;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  console.log('placeInTable called', 'y: ', y,'x: ', x);
  const cell = document.getElementById(`c-${y}-${x}`);
  const piece = document.createElement('div');
  piece.classList.add('piece', 'playerOne');
  cell.append(piece);
  //div includes piece class, and p1/p2 class
  //CSS: make piece div round, match color to player
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player

  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert;
      let diagDL;
      let diagDR;

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
