class ErrorResponse extends Error {
  constructor(message = 'Something went wrong', errors = null, statusCode = 500) {
    super(message);
    this.errors = errors;
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
