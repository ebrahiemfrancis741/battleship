
class Ship {
  #length;
  #numHits;
  #sunk;

  get length() {
    return this.#length;
  }

  set length(length) {
    this.#length = length;
  }

  get numHits() {
    return this.#numHits;
  }

  set numHits(numHits) {
    this.#numHits = numHits;
  }

  get sunk() {
    return this.#sunk;
  }

  set sunk(sunk) {
    this.#sunk = sunk;
  }

  constructor(length) {
    this.#length = length;
    this.#numHits = 0;
    this.#sunk = false;
  }

  hit() {
    if (this.numHits != this.length) this.numHits++;
  }

  isSunk() {
    if (this.numHits == this.length) this.sunk = true;
    else this.sunk = false;
    return this.sunk;
  }
}

export { Ship };
