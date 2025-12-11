const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["work", "home", "business"],
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const goalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["work", "home", "business"],
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", taskSchema);
const Goal = mongoose.model("Goal", goalSchema);

module.exports = { Task, Goal };
