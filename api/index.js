// dependencies
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// routes
import authRoute from "./routes/authRoute.js";
import usersRoute from "./routes/usersRoute.js";
import housesRoute from "./routes/housesRoute.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Db connecting...");
  } catch (err) {
    throw err;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected!");
});
mongoose.connection.on("connected", () => {
  console.log("mongodb connected!");
});

// middleware and routes
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/users", usersRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/houses", housesRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "somethings went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const port = process.env.PORT || 5500;
app.listen(port, async () => {
  await connect();
  console.log("server is running on port: ", port);
});
