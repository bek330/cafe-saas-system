const errorHandler = (err, req, res, next) => {
  console.error('[Error]', err.message);

  const statusCode = err.statusCode || (err.name === 'MulterError' ? 400 : 500);
  const response = { error: statusCode >= 500 ? 'Internal Server Error' : err.message || 'Request failed' };

  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
