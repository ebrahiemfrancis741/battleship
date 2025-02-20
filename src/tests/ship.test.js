import { Ship } from "../ship";

test("Ship class", ()=>{
  let ship = new Ship(3);
  ship.hit();
  expect(ship.numHits).toEqual(1);
  expect(ship.isSunk()).toEqual(false);
  ship.hit();
  expect(ship.numHits).toEqual(2);
  expect(ship.isSunk()).toEqual(false);
  ship.hit();
  expect(ship.numHits).toEqual(3);
  expect(ship.isSunk()).toEqual(true);
  ship.hit();
  expect(ship.numHits).toEqual(3);
  expect(ship.isSunk()).toEqual(true);
});