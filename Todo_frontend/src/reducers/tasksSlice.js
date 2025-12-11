import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to get tasks from backend
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const res = await fetch("http://localhost:3001/getTasks", {
    headers: { Authorization: "dinamorales" },
  });
  const data = await res.json();
  return data; // tasks array
});

// Thunk to add task to backend
export const postTask = createAsyncThunk("tasks/postTask", async (task) => {
  const res = await fetch("http://localhost:3001/addTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "dinamorales",
    },
    body: JSON.stringify(task),
  });
  const data = await res.json();
  return data.task;
});

// Thunk to delete task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  const res = await fetch(`http://localhost:3001/removeTask/${id}`, {
    method: "DELETE",
    headers: { Authorization: "dinamorales" },
  });
  if (!res.ok) throw new Error("Error deleting task");
  return id;
});

// Thunk to mark task as completed
export const completeTask = createAsyncThunk(
  "tasks/completeTask",
  async (id) => {
    const res = await fetch(`http://localhost:3001/completeTask/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "dinamorales",
      },
    });
    const data = await res.json();
    return data.task;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => action.payload)
      .addCase(postTask.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        return state.filter((task) => task._id !== action.payload);
      })
      .addCase(completeTask.fulfilled, (state, action) =>
        state.map((task) =>
          task._id === action.payload._id ? action.payload : task
        )
      );
  },
});

export default tasksSlice.reducer;
