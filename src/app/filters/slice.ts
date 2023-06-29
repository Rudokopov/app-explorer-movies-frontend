import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Film } from "../films/types";
import { FilterSliceState } from "./types";

const initialState: FilterSliceState = {
  resultFilms: JSON.parse(localStorage.getItem("resultFilms") || "[]"),
  searchValue: localStorage.getItem("searchValue") || "",
  isShort: localStorage.getItem("isShort") === "true" || false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setResultFilms(state, action: PayloadAction<Film[]>) {
      state.resultFilms = action.payload;
      localStorage.setItem("resultFilms", JSON.stringify(action.payload));
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
      localStorage.setItem("searchValue", action.payload);
    },
    setShortType(state, action: PayloadAction<boolean>) {
      state.isShort = action.payload;
      localStorage.setItem("isShort", action.payload.toString());
    },
    clearResultFilms(state) {
      state.resultFilms = [];
      localStorage.removeItem("resultFilms");
    },
    clearFilterState(state) {
      state.resultFilms = [];
      state.searchValue = "";
      state.isShort = false;
      localStorage.removeItem("resultFilms");
      localStorage.removeItem("searchValue");
      localStorage.removeItem("isShort");
    },
  },
});

export const {
  setResultFilms,
  setSearchValue,
  setShortType,
  clearResultFilms,
  clearFilterState,
} = filterSlice.actions;

export default filterSlice.reducer;
