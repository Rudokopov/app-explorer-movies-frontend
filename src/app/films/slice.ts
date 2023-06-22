import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FilmSliceState, Film, Status } from "./types";

const initialState: FilmSliceState = {
  films: [],
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
    setFilms(state, action: PayloadAction<Film[]>) {
      state.films = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchFilms.pending, (state) => {
      state.films = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchFilms.fulfilled, (state, action) => {
      state.films = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchFilms.rejected, (state) => {
      state.status = Status.ERROR;
      state.films = [];
    });
  },
});
export const { setFilms } = filmSlice.actions;
export default filmSlice.reducer;
