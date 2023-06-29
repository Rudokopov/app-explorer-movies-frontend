import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filmReducer from "./films/slice";
import filterReducer from "./filters/slice";
import apiReducer from "./api/slice";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
  film: filmReducer,
  filter: filterReducer,
  api: apiReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
