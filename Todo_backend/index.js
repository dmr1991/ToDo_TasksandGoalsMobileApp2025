const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;
const authMiddleware = require("./middleware");
const { Task, Goal } = require("./models");

require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());
/* app.use(authMiddleware); */

// GET all tasks
app.get("/getTasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

// GET all goals
app.get("/getGoals", async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: "Error fetching goals" });
  }
});

// POST new task
app.post("/addTask", async (req, res) => {
  const { name, description, type, dueDate } = req.body;

  if (!name || !description || !type || !dueDate) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const newTask = new Task({
      name,
      description,
      type,
      dueDate,
      completed: false,
    });
    await newTask.save();
    res.status(200).json({ message: "Task added successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ error: "Error saving task" });
  }
});

// POST new goal
app.post("/addGoal", async (req, res) => {
  const { name, description, type, dueDate } = req.body;

  if (!name || !description || !type || !dueDate) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const newGoal = new Goal({
      name,
      description,
      type,
      dueDate,
      completed: false,
    });
    await newGoal.save();
    res.status(200).json({ message: "Goal added successfully", goal: newGoal });
  } catch (error) {
    res.status(500).json({ error: "Error saving goal" });
  }
});

// DELETE task
app.delete("/removeTask/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ message: "Task removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

// DELETE goal
app.delete("/removeGoal/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedGoal = await Goal.findByIdAndDelete(id);
    if (!deletedGoal) return res.status(404).json({ error: "Goal not found" });
    res.status(200).json({ message: "Goal removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting goal" });
  }
});

// PATCH task - mark as completed
app.patch("/completeTask/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ error: "Task not found" });
    res
      .status(200)
      .json({ message: "Task marked as completed", task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
});

// PATCH goal - mark as completed
app.patch("/completeGoal/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );
    if (!updatedGoal) return res.status(404).json({ error: "Goal not found" });
    res
      .status(200)
      .json({ message: "Goal marked as completed", goal: updatedGoal });
  } catch (error) {
    res.status(500).json({ error: "Error updating goal" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
