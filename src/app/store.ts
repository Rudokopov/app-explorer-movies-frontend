import { configureStore } from "@reduxjs/toolkit";
import film from "./films/slice";
import filter from "./filters/slice";
import { useDispatch } from "react-redux";
import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: { film, filter },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

type FuncType = typeof store.getState;
export type RootState = ReturnType<FuncType>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
