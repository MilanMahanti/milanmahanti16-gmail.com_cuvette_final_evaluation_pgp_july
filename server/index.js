const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

process.on("unhandledRejection", (err) => {
  console.log("UNHANDELED REJECTION! SHUTTING DOWN....");
  console.log(err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("UNCCAUGHT EXCEPTION! SHUTTING DOWN....");
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD);
mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App ruunning on port:${port}`);
});
