import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Dotenv from "dotenv";
import mongoose from "mongoose";
import dbConnect from "./db/db.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
Dotenv.config();

app.use(bodyParser.json());
app.use(cors());

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import questionRoutes from "./routes/question.js";
import quizRoutes from "./routes/quiz.js";

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", questionRoutes);
app.use("/api", quizRoutes);


app.use(express.static(path.join(__dirname, './build')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './build/index.html'))
})
mongoose.set("strictQuery", false);

dbConnect();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
