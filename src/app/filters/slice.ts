import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Film } from "../films/types";
import { FilterSliceState } from "./types";

const initialState: FilterSliceState = {
  resultFilms: [],
  searchValue: "",
  isShort: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setResultFilms(state, action: PayloadAction<Film[]>) {
      state.resultFilms = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setShortType(state, action: PayloadAction<boolean>) {
      state.isShort = action.payload;
    },
    clearResultFilms(state) {
      state.resultFilms = [];
    },
  },
});

export const {
  setResultFilms,
  setSearchValue,
  setShortType,
  clearResultFilms,
} = filterSlice.actions;
export default filterSlice.reducer;
