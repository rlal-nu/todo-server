const errorHandler = (error, req, res, next) => {
  console.log(error);
  console.error(error);
  const statusCode = error.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: error,
  });
};

export default errorHandler
