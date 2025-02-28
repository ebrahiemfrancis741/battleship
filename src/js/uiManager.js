function getUiComponents() {
  return {
    playerOneBoard: document.querySelector("#player1-board"),
    playerOneRandomBtn: document.querySelector("#player1-randomize-btn"),
    playerTwoBoard: document.querySelector("#player2-board"),
    playerTwoRandomBtn: document.querySelector("#player2-randomize-btn"),
  };
}

function setUpEventHandlers() {
  getUiComponents().playerOneRandomBtn.addEventListener("click", () => {});
  getUiComponents().playerTwoRandomBtn.addEventListener("click", () => {});
}

/*
  helper function, making it easier to get the specified players board
*/
function getPlayerBoard(player) {
  if (player == 1) return getUiComponents().playerOneBoard;
  else if (player == 2) return getUiComponents().playerTwoBoard;
}

function drawBoard(player, playerBoard) {
  let boardElement = getPlayerBoard(player);

  let gridCellElement;
  for (let i = 0; i < playerBoard.board.length; i++) {
    for (let j = 0; j < playerBoard.board.length; j++) {
      gridCellElement = document.createElement("div");
      gridCellElement.classList.add("board-cell");
      // value is in the form: player,y,x
      gridCellElement.setAttribute("coordinates", `${player},${i},${j}`);
      boardElement.appendChild(gridCellElement);
    }
  }
}

function getBoardCell(player, y, x) {
  let cell = document.querySelector(`[coordinates="${player},${y},${x}"]`);
  return cell;
}

function drawShip(player, coordinateList) {
  // let playerBoard = getPlayerBoard(player);
  let boardCell;
  for (let i = 0; i < coordinateList.length; i++) {
    boardCell = getBoardCell(
      player,
      coordinateList[i][0],
      coordinateList[i][1]
    );

    boardCell.classList.add("ship");
  }
}
/**
 *
 * @param {*} player
 * @param {*} gameBoard
 * Draw all ships stored in the sGameBoard object for the
 * specified player
 */
function drawAllShips(player, gameBoard) {
  for (let i = 0; i < gameBoard.ships.length; i++) {
    drawShip(player, gameBoard.ships[i][2]);
  }
}

export { drawBoard, setUpEventHandlers, drawAllShips };
