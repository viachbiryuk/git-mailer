module.exports = (err, req, res, next) => {

  const statusCode = err.status || ((typeof err === 'string' || err.message) ? 422 : 500);
  res.status(statusCode).json({
    message: typeof err === 'string' ? err : err.message,
    error: err.error,
    detailed: err.detailed
  });

};


