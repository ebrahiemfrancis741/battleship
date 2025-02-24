import { Ship } from "./ship";

class Gameboard {
  #board;
  #shipCoordinates;

  get board() {
    return this.#board;
  }

  set board(board) {
    this.#board = board;
  }

  get shipCoordinates() {
    return this.#shipCoordinates;
  }

  set shipCoordinates(shipCoordinates) {
    this.#shipCoordinates = shipCoordinates;
  }
  /*
    4 - 1 length
    3 - 2 length
    2 - 3 length
    1 - 4 length
  */

  constructor() {
    this.#board = this.#createEmptyBoard();
    // this.#shipCoordinates
  }

  /**
   * 
   * @returns A 10x10 array filled with null values
   */
  #createEmptyBoard() {
    let board = [];
    for (let i = 0; i < 10; i++) {
      board[i] = new Array(10).fill(null);
    }
    return board;
  }
  /**
   * 
   * @returns Random x and y coordinates as a 2-length array
   */
  #getRandomCoordinates() {
    return [Math.random() * 10, Math.random() * 10];
  }

  /**
   * 
   * @param {Number} length - how many cells the ship would occupy
   * @param {Number} direction - 0 is for horizontal, 1 is for vertical
   * @param {Number} y 
   * @param {Number} x 
   * @returns 
   */
  isValidPosition(length, direction, y, x) {
    let coordinateList = [];

    // check if index would be out of bounds
    if (direction == 0 && x + (length - 1) > 9) return null;
    if (direction == 1 && y + (length - 1) > 9) return null;

    if (length == 1) {
      if (this.board[y][x] == null) {
        coordinateList.push([y, x]);
        return coordinateList;
      }
    } else {
      let gridCell = this.board[y][x];
      if (gridCell) return null;
      else coordinateList.push([y, x]);

      for (let i = 1; i < length; i++) {
        if (direction == 0) gridCell = this.board[y][++x];
        else gridCell = this.board[++y][x];

        if (gridCell == null) coordinateList.push([y, x]);
        else return null;
      }
      return coordinateList;
    }
  }


  /**
   * placeShip creates a new ship object of the specified length and places
   * a reference to that ship at all coordinates specified in the coordinateList
   * parameter 
   * @param {Number} length - Length of the ship
   * @param {Array[]} coordinateList - An array of coordinates the ship would occupy in the board
   * @returns the ship object that is created
   */
  placeShip(length, coordinateList) {
    let ship = new Ship(length);
    for(let i = 0; i < coordinateList.length; i++){
      this.board[coordinateList[i][0]][coordinateList[i][1]] = ship;
    }
    return ship;
  }

  receiveAttack(y, x) {

  }

  allShipsSunk() {}

  /*
    we want to place a total of 10 ships on the gameboard currently we are 
    representing this gameboard as a 10x10 array (each array element contains an array of length 10).
    Not sure if this is correct, but lets go. 

    We have 4 one-length ships, 3 two-length ships, 2 three-length ships and 1 4-length ship. 
    These need to be arranged randomly throughout the board, either horizontally or verically.
    1 length is 1 'block' or element in the array.

    We have the empty 10x10 board. Lets place these ships.
    -----------------------------------------------------------------------------------
    For every ship that needs to be placed
      find a random coordinate that is empty
      if the ship can fit horizontally or vertically from the coordinate
        place that ship there
    -----------------------------------------------------------------------------------
    functions that can make us do this:

    *getRandomCoordinates() - returns an array of two numbers representing coordinates from the gameboard

    isValidPosition(L,D,X,Y) - checks if a ship of length L, with direction D, starting from coordinates X,Y
                               can be successfully placed and returns an array of all the coordinates that ship uses 
                               in the game board 
                               
    placeShip(L, C) - creates a new Ship object and places it on the board using the first element of the coordinate list 
                      C (origin coordinate from which the ship starts increasing vertically/horizontally). If the length 
                      of the ship is more than 1, the other coordinates the ship takes up is filled with a REFERENCE to 
                      this ship object.

    We need an easy way to know which coordinates hold which ship therefore:
      Each coordinate in the list C will be used as a key that stores a reference to ship within those coordinates in the 
      'shipCoordinates' field within the GameBoard class. This is so that when a receiveAttack() is called 
      we need only to look within the 'shipCoordinates' field to check if and what ship was attacked.
  */
}

export { Gameboard };
