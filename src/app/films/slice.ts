import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FilmSliceState, Film, Status } from "./types";

const initialState: FilmSliceState = {
  films: [],
  filmStatus: Status.LOADING,
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
    setFilmStatus(state, action: PayloadAction<Status>) {
      state.filmStatus = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchFilms.pending, (state) => {
      state.films = [];
      state.filmStatus = Status.LOADING;
    });
    builder.addCase(fetchFilms.fulfilled, (state, action) => {
      state.films = action.payload;
      state.filmStatus = Status.SUCCESS;
    });
    builder.addCase(fetchFilms.rejected, (state) => {
      state.filmStatus = Status.ERROR;
      state.films = [];
    });
  },
});
export const { setFilms, setFilmStatus } = filmSlice.actions;
export default filmSlice.reducer;
