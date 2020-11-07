export class UserUndefinedError extends Error {
  constructor() {
    super('User Document is undefined'); // 'Error' breaks prototype chain here
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}
