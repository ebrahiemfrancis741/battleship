import { Ship } from "./ship.js";

class Gameboard {
  #board;
  #coordinatesHit; // coordinates the enemy has chosen to hit
  #ships; // the ships

  get board() {
    return this.#board;
  }

  set board(board) {
    this.#board = board;
  }

  get coordinatesHit() {
    return this.#coordinatesHit;
  }

  set coordinatesHit(coordinatesHit) {
    this.#coordinatesHit = coordinatesHit;
  }

  set shipCoordinates(coordinatesHit) {
    this.#coordinatesHit = coordinatesHit;
  }

  get ships() {
    return this.#ships;
  }

  set ships(ships) {
    this.#ships = ships;
  }
  /*
    4 - 1 length
    3 - 2 length
    2 - 3 length
    1 - 4 length
  */

  constructor(populate) {
    this.board = this.#createEmptyBoard();
    this.coordinatesHit = [];
    this.ships = [];
    if (populate) this.placeAllShips();
  }

  placeAllShips() {
    let coordinateList;

    // add 4-length ships
    coordinateList = this.getAvailableCoordinates(4);
    this.placeShip(4, coordinateList);

    // add 3-length ships
    for (let i = 0; i < 2; i++) {
      coordinateList = this.getAvailableCoordinates(3);
      this.placeShip(3, coordinateList);
    }

    // add 2-length ships
    for (let i = 0; i < 3; i++) {
      coordinateList = this.getAvailableCoordinates(2);
      this.placeShip(2, coordinateList);
    }

    // add 1-length ships
    for (let i = 0; i < 4; i++) {
      coordinateList = this.getAvailableCoordinates(1);
      this.placeShip(1, coordinateList);
    }
  }

  /**
   *
   * @param {Number} length - length of ship
   */
  getAvailableCoordinates(length) {
    let direction;
    let x, y;
    let coordinateList;
    let validSpace = false;
    do {
      direction = Math.floor(Math.random() * 2);
      [x, y] = this.#getRandomCoordinates();
      coordinateList = this.isValidPosition(length, direction, y, x);
      if (coordinateList != null) {
        validSpace = this.isValidSpace(coordinateList);
      }
    } while (!validSpace || coordinateList == null);

    return coordinateList;
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
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
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
   * has atleast 1 space all around the ship, which means if a ship will be
   * placed here it doesnt touch any other ship (not directly adjacent)
   */
  isValidSpace(coordinateList) {
    let direction = Gameboard.getDirection(coordinateList);

    if (direction == 0) {
      // check if there is top and bottom space first
      for (let i = 0; i < coordinateList.length; i++) {
        let y = coordinateList[i][0];
        let x = coordinateList[i][1];

        // check top
        if (y > 0 && this.board[y - 1][x] != null) {
          return false;
        }
        // check bottom
        if (y < 9 && this.board[y + 1][x] != null) {
          return false;
        }
      }

      // now we need to check the left side of the first coordinate,
      // the top and bottom of that left coordinate, the right side
      // of the last coordinate, the top and bottom of that
      // right coordinate
      let firstY = coordinateList[0][0];
      let firstX = coordinateList[0][1];

      if (firstX > 0) {
        // left coordinate
        if (this.board[firstY][firstX - 1] != null) {
          return false;
        }

        // top of left coordinate
        if (firstY > 0 && this.board[firstY - 1][firstX - 1] != null) {
          return false;
        }
        // bottom of left coordinate
        if (firstY < 9 && this.board[firstY + 1][firstX - 1] != null) {
          return false;
        }
      }

      // right coordinate of last coordinate
      let lastY = coordinateList[coordinateList.length - 1][0];
      let lastX = coordinateList[coordinateList.length - 1][1];

      if (lastX < 9) {
        // right coordinate
        if (this.board[lastY][lastX + 1] != null) {
          return false;
        }

        // top of right coordinate
        if (lastY > 0 && this.board[lastY - 1][lastX + 1] != null) {
          return false;
        }
        // bottom of right coordinate
        if (lastY < 9 && this.board[lastY + 1][lastX + 1] != null) {
          return false;
        }
      }
      return true;
    } else {
      // Handle vertical direction
      for (let i = 0; i < coordinateList.length; i++) {
        let y = coordinateList[i][0];
        let x = coordinateList[i][1];

        // check left
        if (x > 0 && this.board[y][x - 1] != null) {
          return false;
        }
        // check right
        if (x < 9 && this.board[y][x + 1] != null) {
          return false;
        }
      }

      // now we need to check the top side of the first coordinate,
      // the left and right of that top coordinate, the bottom side
      // of the last coordinate, the left and right of that
      // bottom coordinate
      let firstY = coordinateList[0][0];
      let firstX = coordinateList[0][1];

      if (firstY > 0) {
        // top coordinate
        if (this.board[firstY - 1][firstX] != null) {
          return false;
        }

        // left of top coordinate
        if (firstX > 0 && this.board[firstY - 1][firstX - 1] != null) {
          return false;
        }
        // right of top coordinate
        if (firstX < 9 && this.board[firstY - 1][firstX + 1] != null) {
          return false;
        }
      }

      // bottom coordinate of last coordinate
      let lastY = coordinateList[coordinateList.length - 1][0];
      let lastX = coordinateList[coordinateList.length - 1][1];

      if (lastY < 9) {
        // bottom coordinate
        if (this.board[lastY + 1][lastX] != null) {
          return false;
        }

        // left of bottom coordinate
        if (lastX > 0 && this.board[lastY + 1][lastX - 1] != null) {
          return false;
        }
        // right of bottom coordinate
        if (lastX < 9 && this.board[lastY + 1][lastX + 1] != null) {
          return false;
        }
      }
      return true;
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
    this.ships.push([
      ship,
      Gameboard.getDirection(coordinateList),
      coordinateList,
    ]);
    for (let i = 0; i < coordinateList.length; i++) {
      this.board[coordinateList[i][0]][coordinateList[i][1]] = ship;
    }
    return ship;
  }

  /*
    figures out the direction of the ship based on its coordinate list.
    if the ship length is 1, direction does not matter and therefore we 
    just set it to 0(horizontal) by default. 1(vertical)
  */
  static getDirection(coordinateList) {
    if (coordinateList == null) return null;
    else if (coordinateList.length == 1) return 0;
    else {
      // if the y-values are the same in the next set of coordinates
      // then it is horizontal
      if (coordinateList[0][0] == coordinateList[1][0]) return 0;
      else return 1;
    }
  }

  receiveAttack(y, x) {
    let ship = this.board[y][x];
    //check if those coordinates were already hit
    for (let i = 0; i < this.coordinatesHit.length; i++) {
      if (this.coordinatesHit[i][0] == y && this.coordinatesHit[i][1] == x)
        return;
    }
    // add coordinates to list of hits enemy has made
    this.coordinatesHit.push([y, x]);
    if (ship) ship.hit();
  }

  // check if these coordinates were already hit
  alreadyHit(y, x) {
    for (let i = 0; i < this.coordinatesHit.length; i++) {
      if (this.coordinatesHit[i][0] == y && this.coordinatesHit[i][1] == x) {
        return true;
      }
    }
    return false;
  }

  allShipsSunk() {
    for (let i = 0; i < this.ships.length; i++) {
      if (!this.ships[i][0].isSunk()) return false;
    }
    return true;
  }

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
