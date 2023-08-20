const exceptionHandler = (handler) => {
  return async function (req, res, next) {
    try {
      await handler(req, res);
    } catch (ex) {
      console.error(ex.message, ex, handler.name);
      next(ex);
    }
  };
};

module.exports = exceptionHandler;
