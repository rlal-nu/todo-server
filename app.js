import express from "express";
import "dotenv/config";
import todoRoutes from "./routes/todo";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/task";
import mongoose from "mongoose";
import errorHandler from "./utils/errorHandler";

const app = express();
const port = process.env.APP_PORT;
app.use(express.json());
app.use("/todo", todoRoutes);
app.use("/auth", authRoutes);
app.use('/task', taskRoutes)
app.use(errorHandler);
app.listen(port, async (error) => {
  if (error) {
    throw error;
  } else {
    console.log("Trying to login to mongo cluster...");
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB_NAME}`,
      { autoIndex: true }
    );
    console.log("Server started on port " + port);
  }
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "error:"));
db.once("open", () => {
  console.log("Connected to mongodb cluster");
});

process.on("uncaughtException", (err) => {
  console.error("error ", err);
});
