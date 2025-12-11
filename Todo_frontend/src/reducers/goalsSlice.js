import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to get goals from backend
export const fetchGoals = createAsyncThunk("goals/fetchGoals", async () => {
  const res = await fetch("http://localhost:3001/getGoals", {
    headers: { Authorization: "dinamorales" },
  });
  const data = await res.json();
  return data;
});

// Thunk to add goal
export const postGoal = createAsyncThunk("goals/postGoal", async (goal) => {
  const res = await fetch("http://localhost:3001/addGoal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "dinamorales",
    },
    body: JSON.stringify(goal),
  });
  const data = await res.json();
  return data.goal;
});

// Thunk to delete goal
export const deleteGoal = createAsyncThunk("goals/deleteGoal", async (id) => {
  const res = await fetch(`http://localhost:3001/removeGoal/${id}`, {
    method: "DELETE",
    headers: { Authorization: "dinamorales" },
  });
  if (!res.ok) throw new Error("Error deleting goal");
  return id;
});

// Thunk to complete goal
export const completeGoal = createAsyncThunk(
  "goals/completeGoal",
  async (id) => {
    const res = await fetch(`http://localhost:3001/completeGoal/${id}`, {
      method: "PATCH",
      headers: { Authorization: "dinamorales" },
    });
    const data = await res.json();
    return data.goal;
  }
);

const goalsSlice = createSlice({
  name: "goals",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.fulfilled, (state, action) => action.payload)
      .addCase(postGoal.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      // CORREGIDO: Usando RETURN para devolver el nuevo array filtrado
      .addCase(deleteGoal.fulfilled, (state, action) => {
        return state.filter((goal) => goal._id !== action.payload);
      })
      // CORREGIDO/ADAPTADO: Usando .map con return para actualizar el elemento (al igual que tasksSlice)
      .addCase(completeGoal.fulfilled, (state, action) =>
        state.map((goal) =>
          goal._id === action.payload._id ? action.payload : goal
        )
      );
  },
});

export default goalsSlice.reducer;
  