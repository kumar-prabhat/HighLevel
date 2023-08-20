const ErrorCode = require("./ErrorCode");
const BadRequestError = (message) => {
  const error = new Error(message);
  error.statusCode = 400;
  error.errorCode = ErrorCode.INVALID_REQUEST;
  return error;
};

module.exports = BadRequestError;
