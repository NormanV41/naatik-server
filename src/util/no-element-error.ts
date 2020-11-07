export class NoElementError extends Error {
  constructor() {
    super("Didn't find element"); // 'Error' breaks prototype chain here
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}
