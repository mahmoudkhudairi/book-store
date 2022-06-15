class ErrorResponse extends Error {
  constructor(message = 'Something went wrong', errors = null) {
    super(message);
    this.errors = errors;
  }
}

module.exports = ErrorResponse;
