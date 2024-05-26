import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
interface IinitialState {
  todo: Person[];
}
const initialState: IinitialState = {
  todo: [],
};
const url = import.meta.env.VITE_API;
export const fetchData = createAsyncThunk("todo/fetchData", async () => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (e) {
    alert(e);
  }
});
export const postRec = createAsyncThunk("todo/postRec", async (obj: Person) => {
  try {
    const { data } = await axios.post(url, obj);
    return data;
  } catch (e) {
    alert(e);
  }
});
export const delRec = createAsyncThunk("todo/delRec", async (obj: Person) => {
  try {
    const { data } = await axios.delete(`${url}/${obj._id}`);
    return data;
  } catch (e) {
    alert(e);
  }
});
const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    completed(state, action: PayloadAction<number>) {
      const todo = state.todo.find(
        (user) => Number(user._id) === action.payload
      );
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      //getRec
      .addCase(
        fetchData.fulfilled,
        (state, action: PayloadAction<Person[]>) => {
          state.todo = action.payload;
        }
      )
      .addCase(postRec.fulfilled, (state, action: PayloadAction<Person[]>) => {
        state.todo = action.payload;
      })
      .addCase(delRec.fulfilled, (state, action) => {
        state.todo = action.payload;
      });
  },
});
export const { completed } = TodoSlice.actions;
export default TodoSlice.reducer;
