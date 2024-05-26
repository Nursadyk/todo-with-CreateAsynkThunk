import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import TodoSlice from "./futures/slices/Todo.Slice";
export const store = configureStore({
  reducer: {
    TodoSlice,
  },
});
export const useUpDispatch: () => typeof store.dispatch = useDispatch;
export const useUpSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
