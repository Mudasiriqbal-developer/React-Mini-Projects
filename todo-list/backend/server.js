import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import todoRoutes from "./src/routes/todoroutes.js";
app.use("/api/todos", todoRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log(err));

// Server Start
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});