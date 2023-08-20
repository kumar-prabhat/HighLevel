const ErrorCode = require("./ErrorCode");
const NotFoundError = (message = "Route not found") => {
  const error = new Error(message);
  error.statusCode = 404;
  error.errorCode = ErrorCode.NOT_FOUND;
  return error;
};
module.exports = NotFoundError;
