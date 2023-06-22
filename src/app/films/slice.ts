import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FilmSliceState, Film, Status } from "./types";

const initialState: FilmSliceState = {
  items: [],
  status: Status.LOADING,
};

export const fetchFilms = createAsyncThunk<Film[]>(
  "film/fetchFilmsData",
  async () => {
    const { data } = await axios.get<Film[]>(
      `https://api.nomoreparties.co/beatfilm-movies`
    );
    return data;
  }
);

const filmSlice = createSlice({
  name: "film",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Film[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchFilms.pending, (state) => {
      state.items = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchFilms.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchFilms.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});
export const { setItems } = filmSlice.actions;
export default filmSlice.reducer;
