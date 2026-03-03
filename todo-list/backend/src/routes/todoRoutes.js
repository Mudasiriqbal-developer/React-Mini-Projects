import express from "express";
const router = express.Router();
import Todo from "../models/todo.js";

// CREATE Todo
router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET All Todos
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// UPDATE Todo
router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE Todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
 export default router;