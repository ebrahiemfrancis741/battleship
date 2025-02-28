function getUiComponents() {
  return {
    playerOneBoard: document.querySelector("#player1-board"),
    playerOneRandomBtn: document.querySelector("#player1-randomize-btn"),
    playerTwoBoard: document.querySelector("#player2-board"),
    playerTwoRandomBtn: document.querySelector("#player2-randomize-btn"),
  };
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
      boardElement.appendChild(gridCellElement);
    }
  }
}

export { drawBoard };
