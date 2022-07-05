const errorHandler = (error, req, res, next) => {
  console.log(error);
  const statusCode = error.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    error: error || 'Internal Server Error',
  });
};

export default errorHandler
