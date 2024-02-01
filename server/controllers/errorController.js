const AppError = require("../utils/appError");

const handelCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handelDuplicateFieldsDB = (err) => {
  const value = Object.keys(err?.keyValue).join(",");
  const message = `Duplicate value:${value}. Please use another value.`;
  return new AppError(message, 400);
};

const handelValidationErrorDB = (err) => {
  const value = Object.values(err.errors)
    .map((el) => el?.properties?.message)
    .join(",");

  const message = `Validation errors: ${value}.`;
  return new AppError(message, 400);
};

const handelJWTError = () =>
  new AppError("Invalid token.Please login in again.", 401);

const handelJWTExpiredError = () =>
  new AppError("Your token has expired. Pleaase log in again.", 401);

const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: {
      err,
    },
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  if (err.operational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error("ERROR 💥", err);
  // 2) Send generic message
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};

module.exports = (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "developement") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { message: err.message, ...err };
    // console.log(error);
    if (error.reason?.name === "BSONError") error = handelCastErrorDB(error);
    if (error?.code === 11000) error = handelDuplicateFieldsDB(error);
    if (error?._message?.includes("validation"))
      error = handelValidationErrorDB(error);
    if (error?.name === "JsonWebTokenError") error = handelJWTError();
    if (error?.name === "TokenExpiredError") error = handelJWTExpiredError();
    sendErrorProd(error, res);
  }
};
