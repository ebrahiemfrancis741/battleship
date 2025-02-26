import { Gameboard } from "./gameboard";

class Player {
  #board;

  get board() {
    return this.#board;
  }

  set board(board) {
    this.#board = board;
  }

  constructor(){
    this.board = new Gameboard();
  }
}
