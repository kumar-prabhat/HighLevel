const formatResponse = (
  statusCode,
  error = false,
  errorCode = "",
  message,
  data
) => {
  return { statusCode, error, errorCode, message, data };
};

module.exports = formatResponse;
