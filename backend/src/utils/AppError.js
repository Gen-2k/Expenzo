// Custom error class for handling operational errors.
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Indicates an error that can be safely shown to the client.

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;