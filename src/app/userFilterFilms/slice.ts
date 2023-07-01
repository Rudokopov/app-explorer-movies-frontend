import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, Status } from "./types";
import { MovieFromBackend } from "../api/types";

const initialState: FilterSliceState = {
  resultFilms: JSON.parse(localStorage.getItem("userResultFilms") || "[]"),
  searchValue: localStorage.getItem("userSearchValue") || "",
  isShort: localStorage.getItem("userStateIsShort") === "true" || false,
  status: Status.SUCCESS,
};

const userFilterSlice = createSlice({
  name: "userFilterFilms",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setUserResultFilms(state, action: PayloadAction<MovieFromBackend[]>) {
      state.resultFilms = action.payload;
    },
    setUserSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setUserShortType(state, action: PayloadAction<boolean>) {
      state.isShort = action.payload;
    },
    clearUserResultFilms(state) {
      state.resultFilms = [];
    },
  },
});

export const {
  setUserResultFilms,
  setUserSearchValue,
  setUserShortType,
  clearUserResultFilms,
  setStatus,
} = userFilterSlice.actions;

export default userFilterSlice.reducer;
