const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const authRouter = require("./routes/authRoutes");
const healthRouter = require("./routes/healthRoute");
const quizRouter = require("./routes/quizRoutes");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const app = express();
if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}

app.use(express.json());

const corsOptions = {
  origin: "https://quizze-frontend-8sii.vercel.app",
  credentials: true,
};

app.use(helmet());
app.use(mongoSanitize());
// app.use(cors());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/user", authRouter);
app.use("/api/v1/quiz", quizRouter);

app.all("*", (req, res, next) => {
  next(new AppError("Route not found!", 404));
});

app.use(globalErrorHandler);

module.exports = app;
