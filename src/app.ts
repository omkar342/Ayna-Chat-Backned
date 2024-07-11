import express from "express";
import bodyParser from 'body-parser';
require("dotenv").config();
import connectDB from "./utils/db";

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.json());

import userRouter from "./routes/user.routes";
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});