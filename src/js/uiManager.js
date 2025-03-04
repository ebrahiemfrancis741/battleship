import { Player } from "./player.js";

function getUiComponents() {
  return {
    playerOneBoard: document.querySelector("#player1-board"),
    playerOneRandomBtn: document.querySelector("#player1-randomize-btn"),
    playerTwoBoard: document.querySelector("#player2-board"),
    playerTwoRandomBtn: document.querySelector("#player2-randomize-btn"),
  };
}

function setUpEventHandlers(player1, player2) {
  getUiComponents().playerOneRandomBtn.addEventListener("click", () => {
    randomBtnEventHandler(1, player1);
  });
  getUiComponents().playerTwoRandomBtn.addEventListener("click", () => {
    randomBtnEventHandler(2, player2);
  });

  getUiComponents().playerTwoBoard.addEventListener("click", (e) => {
    receiveAttackEventHandler(2, player2, e.target);
  });
}

function receiveAttackEventHandler(playerNum, playerRef, gridCell) {
  let coordinates = gridCell.getAttribute("coordinates");
  coordinates = coordinates.split(",");
  let y = parseInt(coordinates[1]);
  let x = parseInt(coordinates[2]);

  let ship = playerRef.board.board[y][x];

  if (!playerRef.board.alreadyHit(y, x)) {
    if (ship == null) {
      gridCell.classList.add("missed-hit");
    } else {
      playerRef.board.receiveAttack(y, x);
      gridCell.classList.add("ship-hit");
      if (ship.isSunk()) {
        console.log(`${ship.length}-length ship sunk`);
        gridCell.classList.toggle("ship-hit");
        drawSunkShip(playerNum, playerRef, ship);
      }
    }
  }
}

// draws sunk ships in a specific way so it is easier to see
function drawSunkShip(playerNum, playerRef, ship) {
  let coordinateList;
  let direction;
  let playerBoard = getPlayerBoard(playerNum);
  let gridCell;

  // look for the ship, because its coordinate list is associated
  // with it in the ships array which we need
  for (let i = 0; i < playerRef.board.ships.length; i++) {
    if (playerRef.board.ships[i][0] == ship) {
      direction = playerRef.board.ships[i][1];
      coordinateList = playerRef.board.ships[i][2];
    }
  }

  if (coordinateList.length == 1) {
    gridCell = document.querySelector(
      `[coordinates="${playerNum},${coordinateList[0][0]},${coordinateList[0][1]}"]`
    );
    gridCell.classList.add("one-length-ship-sunk");
  } else {
    for (let i = 0; i < coordinateList.length; i++) {
      gridCell = document.querySelector(
        `[coordinates="${playerNum},${coordinateList[i][0]},${coordinateList[i][1]}"]`
      );
      if (direction == 0) {
        if (i == 0) {
          gridCell.classList.add("h-start-ship-sunk");
        } else if (i == coordinateList.length - 1) {
          gridCell.classList.add("h-end-ship-sunk");
        } else {
          gridCell.classList.add("h-mid-ship-sunk");
        }
      } else {
        if (i == 0) {
          gridCell.classList.add("v-start-ship-sunk");
        } else if (i == coordinateList.length - 1) {
          gridCell.classList.add("v-end-ship-sunk");
        } else {
          gridCell.classList.add("v-mid-ship-sunk");
        }
      }
    }
  }
}

function randomBtnEventHandler(playerNumber, player) {
  player = new Player();
  drawBoard(playerNumber, player.board);
  player.board.placeAllShips();
  drawAllShips(playerNumber, player.board);
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
  boardElement.replaceChildren();

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
