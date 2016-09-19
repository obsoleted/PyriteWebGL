class PyriteException {
  constructor(message, source) {
      this.message = message;
      this.source = source || '';
  }

  toString() {
      return `PyriteException: ${source}: ${message}`;
  }
}