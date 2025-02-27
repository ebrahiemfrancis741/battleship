function getUiComponents() {
  return {
    playerOneBoard: document.querySelector("#player1-board"),
    playerOneRandomBtn: document.querySelector("#player1-randomize-btn"),
    playerTwoBoard: document.querySelector("#player2-board"),
    playerTwoRandomBtn: document.querySelector("#player2-randomize-btn"),
  };
}

function drawBoard(player, playerBoard) {
  let boardElement;
  if (player == 1) boardElement = getUiComponents().playerOneBoard;
  else if (player == 2) boardElement = getUiComponents().playerTwoBoard;

  let gridCellElement;
  for (let i = 0; i < playerBoard.board.length; i++) {
    gridCellElement = document.createElement("div");
    gridCellElement.classList.add("board-cell");
    boardElement.appendChild(gridCellElement);
  }
}

export { drawBoard };
