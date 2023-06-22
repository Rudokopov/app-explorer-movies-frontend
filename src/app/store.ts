import { configureStore } from "@reduxjs/toolkit";
import film from "./films/slice";
import filter from "./filters/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { film, filter },
});

type FuncType = typeof store.getState;
export type RootState = ReturnType<FuncType>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
