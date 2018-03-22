const Error = (status, error = {}, message = '') => ({
  status,
  error,
  message,
  errors: error.errors
});

const NotFound = (err = {}, msg = '') => Error(404, err, msg);
const InternalServerError = (err = {}, msg = '') => Error(500, err, msg);

const devHandler = (err, req, res, next) => {
  console.error(err.error || err);
  next(err);
};

const handler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = 'Something went wrong';
  let errors;

  if (status === 404) {
    message = 'Resource not found';
  }
  res.status(status).json({ message, errors });
};

module.exports = {
  Error,
  NotFound,
  InternalServerError,
  devHandler,
  handler
};
