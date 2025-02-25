import { Gameboard } from "../gameboard";

// isValidPosition() ---------------------------------------------------------------------

test("GameBoard objects board is initialised properly", () => {
  let gameBoard = new Gameboard();
  expect(gameBoard.board).toEqual([
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ]);
});

test("isValidPosition returns correct coordinate list for horizontal one-length", () => {
  let gameBoard = new Gameboard();
  expect(gameBoard.isValidPosition(1, 0, 0, 0)).toEqual([[0, 0]]);
});

test("isValidPosition returns correct coordinate list for vertical one-length", () => {
  let gameBoard = new Gameboard();
  expect(gameBoard.isValidPosition(1, 1, 0, 0)).toEqual([[0, 0]]);
});

test("isValidPosition returns correct coordinate list for horizontal two-length ships", () => {
  let gameBoard = new Gameboard();
  expect(gameBoard.isValidPosition(2, 0, 0, 0)).toEqual([
    [0, 0],
    [0, 1],
  ]);
  expect(gameBoard.isValidPosition(2, 0, 0, 8)).toEqual([
    [0, 8],
    [0, 9],
  ]);
});

test("isValidPosition returns null when out of bounds index would be accessed for horizontal two-length ships", () => {
  let gameBoard = new Gameboard();
  expect(gameBoard.isValidPosition(2, 0, 0, 9)).toEqual(null);
});

test("isValidPosition returns correct coordinate list for vertical two-length ships", () => {
  let gameBoard = new Gameboard();
  expect(gameBoard.isValidPosition(2, 1, 0, 0)).toEqual([
    [0, 0],
    [1, 0],
  ]);
});

test("isValidPosition returns null when out of bounds index would be accessed for vertical two-length ships", () => {
  let gameBoard = new Gameboard();
  expect(gameBoard.isValidPosition(2, 1, 9, 0)).toEqual(null);
});

test("isValidPosition returns correct coordinate list for horizontal three-length ships", () => {
  let gameBoard = new Gameboard();
  expect(gameBoard.isValidPosition(3, 0, 0, 0)).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
});

test("isValidPosition returns null when out of bounds index would be accessed for horizontal three-length ships", () => {
  let gameBoard = new Gameboard();
  expect(gameBoard.isValidPosition(3, 0, 0, 8)).toEqual(null);
});

test("isValidPosition returns correct coordinate list for vertical three-length ships", () => {
  let gameBoard = new Gameboard();
  expect(gameBoard.isValidPosition(3, 1, 0, 0)).toEqual([
    [0, 0],
    [1, 0],
    [2, 0],
  ]);
});

test("isValidPosition returns correct coordinate list for horizontal four-length ships", () => {
  let gameBoard = new Gameboard();
  expect(gameBoard.isValidPosition(4, 0, 0, 0)).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ]);
});

test("isValidPosition returns correct coordinate list for vertical four-length ships", () => {
  let gameBoard = new Gameboard();
  expect(gameBoard.isValidPosition(4, 1, 0, 0)).toEqual([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ]);
});

test("isValidPosition returns correct coordinate list for horizontal five-length ships", () => {
  let gameBoard = new Gameboard();
  expect(gameBoard.isValidPosition(5, 0, 0, 0)).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);
});

test("isValidPosition returns correct coordinate list for vertical five-length ships", () => {
  let gameBoard = new Gameboard();
  expect(gameBoard.isValidPosition(5, 1, 0, 0)).toEqual([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
  ]);
});

//-----------------------------------------------------------------------------------------------
// PlaceShip

test("Placeship correctly places a horizontal one-length ship", () => {
  let gameBoard = new Gameboard();
  let ship = gameBoard.placeShip(1, gameBoard.isValidPosition(1, 0, 0, 0));
  expect(gameBoard.board).toEqual([
    [ship, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ]);
});

test("Placeship correctly places a vertical one-length ship", () => {
  let gameBoard = new Gameboard();
  let ship = gameBoard.placeShip(1, gameBoard.isValidPosition(1, 1, 0, 0));
  expect(gameBoard.board).toEqual([
    [ship, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ]);
});

test("Placeship correctly places a horinztal two-length ship", () => {
  let gameBoard = new Gameboard();
  let ship = gameBoard.placeShip(2, gameBoard.isValidPosition(2, 0, 0, 0));
  expect(gameBoard.board).toEqual([
    [ship, ship, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ]);
});

test("Placeship correctly places a vertical two-length ship", () => {
  let gameBoard = new Gameboard();
  let ship = gameBoard.placeShip(2, gameBoard.isValidPosition(2, 1, 0, 0));
  expect(gameBoard.board).toEqual([
    [ship, null, null, null, null, null, null, null, null, null],
    [ship, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ]);
});

test("Placeship correctly places a horizontal three-length ship", () => {
  let gameBoard = new Gameboard();
  let ship = gameBoard.placeShip(2, gameBoard.isValidPosition(3, 0, 2, 1));
  expect(gameBoard.board).toEqual([
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, ship, ship, ship, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ]);
});

//--------------------------------------------------------------------------------
// receiveAttack

test("receiveAttack() functions correctly for 1-length ships", () => {
  let gameBoard = new Gameboard();
  let ship = gameBoard.placeShip(1, gameBoard.isValidPosition(1, 0, 0, 0));
  gameBoard.receiveAttack(0, 0);
  expect(ship.numHits).toEqual(1);
  expect(ship.isSunk()).toEqual(true);
  expect(gameBoard.coordinatesHit).toEqual([[0, 0]]);
});

test("receiveAttack() functions correctly for 2-length ships", () => {
  let gameBoard = new Gameboard();
  let ship = gameBoard.placeShip(2, gameBoard.isValidPosition(2, 0, 0, 0));
  gameBoard.receiveAttack(0, 0);
  expect(ship.numHits).toEqual(1);
  expect(ship.isSunk()).toEqual(false);
  expect(gameBoard.coordinatesHit).toEqual([[0, 0]]);

  gameBoard.receiveAttack(0, 1);
  expect(ship.numHits).toEqual(2);
  expect(ship.isSunk()).toEqual(true);
  expect(gameBoard.coordinatesHit).toEqual([
    [0, 0],
    [0, 1],
  ]);
});

test("receiveAttack() functions correctly for 3-length ships", () => {
  let gameBoard = new Gameboard();
  let ship = gameBoard.placeShip(3, gameBoard.isValidPosition(3, 0, 0, 0));
  gameBoard.receiveAttack(0, 0);
  expect(ship.numHits).toEqual(1);
  expect(ship.isSunk()).toEqual(false);
  expect(gameBoard.coordinatesHit).toEqual([[0, 0]]);

  gameBoard.receiveAttack(0, 1);
  expect(ship.numHits).toEqual(2);
  expect(ship.isSunk()).toEqual(false);
  expect(gameBoard.coordinatesHit).toEqual([
    [0, 0],
    [0, 1],
  ]);

  gameBoard.receiveAttack(0, 2);
  expect(ship.numHits).toEqual(3);
  expect(ship.isSunk()).toEqual(true);
  expect(gameBoard.coordinatesHit).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
});

test("receiveAttack() functions correctly for 3-length ships on missed hits", () => {
  let gameBoard = new Gameboard();
  let ship = gameBoard.placeShip(3, gameBoard.isValidPosition(3, 0, 0, 0));
  gameBoard.receiveAttack(5, 5);
  expect(ship.numHits).toEqual(0);
  expect(ship.isSunk()).toEqual(false);
  expect(gameBoard.coordinatesHit).toEqual([[5, 5]]);

  gameBoard.receiveAttack(2, 2);
  expect(ship.numHits).toEqual(0);
  expect(ship.isSunk()).toEqual(false);
  expect(gameBoard.coordinatesHit).toEqual([
    [5, 5],
    [2, 2],
  ]);

  gameBoard.receiveAttack(3, 3);
  expect(ship.numHits).toEqual(0);
  expect(ship.isSunk()).toEqual(false);
  expect(gameBoard.coordinatesHit).toEqual([
    [5, 5],
    [2, 2],
    [3, 3],
  ]);
});
//------------------------------------------------------------------------------
//allShipsSunk

test("allShipsSunk() returns true when all 1-length ships are sunk", () => {
  let gameBoard = new Gameboard();
  let ship1 = gameBoard.placeShip(1, gameBoard.isValidPosition(1, 0, 0, 0));
  let ship2 = gameBoard.placeShip(1, gameBoard.isValidPosition(1, 0, 0, 1));
  let ship3 = gameBoard.placeShip(1, gameBoard.isValidPosition(1, 0, 0, 2));
  gameBoard.receiveAttack(0,0);
  expect(gameBoard.allShipsSunk()).toEqual(false);
  gameBoard.receiveAttack(0,1);
  expect(gameBoard.allShipsSunk()).toEqual(false);
  gameBoard.receiveAttack(0,2);
  expect(gameBoard.allShipsSunk()).toEqual(true);
});

test("allShipsSunk() returns true when all 1-length ships are sunk", () => {
  let gameBoard = new Gameboard();
  let ship1 = gameBoard.placeShip(2, gameBoard.isValidPosition(2, 0, 0, 0));
  let ship2 = gameBoard.placeShip(2, gameBoard.isValidPosition(2, 0, 0, 2));
  let ship3 = gameBoard.placeShip(2, gameBoard.isValidPosition(2, 0, 0, 4));
  gameBoard.receiveAttack(0,0);
  expect(gameBoard.allShipsSunk()).toEqual(false);
  gameBoard.receiveAttack(0,1);
  expect(gameBoard.allShipsSunk()).toEqual(false);
  gameBoard.receiveAttack(0,2);
  expect(gameBoard.allShipsSunk()).toEqual(false);
  gameBoard.receiveAttack(0,3);
  expect(gameBoard.allShipsSunk()).toEqual(false);
  gameBoard.receiveAttack(0,4);
  expect(gameBoard.allShipsSunk()).toEqual(false);
  gameBoard.receiveAttack(0,5);
  expect(gameBoard.allShipsSunk()).toEqual(true);
});