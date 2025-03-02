import { Player } from "./player.js";
import { drawAllShips, drawBoard, setUpEventHandlers } from "./uiManager.js";

let player1;
let player2;

function setUpPlayers() {
  player1 = new Player();
  player2 = new Player();

  drawBoard(1, player1.board);
  drawBoard(2, player2.board);
  
  player1.board.placeAllShips();
  drawAllShips(1, player1.board);
  player2.board.placeAllShips();
  drawAllShips(2, player2.board);
}

setUpPlayers();
setUpEventHandlers();
