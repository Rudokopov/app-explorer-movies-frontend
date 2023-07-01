import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ApiSliceState,
  MovieFromBackend,
  LoginParams,
  LoginResponse,
  RegisterParams,
  Status,
  UpdateUserParams,
  User,
} from "./types";

import {
  fetchUserData,
  loginUser,
  registerUser,
  updateUser,
  createMovie,
  getUserMovies,
  removeMovie,
} from "./api";

const initialState: ApiSliceState = {
  userFilms: [],
  user: {
    token: "",
    _id: "",
    name: "",
    email: "",
  },
  status: Status.LOADING,
  isLogin: false,
};

export const fetchUser = createAsyncThunk<User>(
  "user/fetchUserData",
  async (_) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      throw new Error("Token not found");
    }

    return fetchUserData(token);
  }
);

export const fetchLogin = createAsyncThunk<LoginResponse, LoginParams>(
  "user/fetchLogin",
  async ({ email, password }) => {
    return loginUser(email, password);
  }
);

export const fetchRegister = createAsyncThunk<User, RegisterParams>(
  "user/fetchRegister",
  async ({ name, email, password }) => {
    return registerUser(name, email, password);
  }
);

export const fetchUserUpdate = createAsyncThunk<User, UpdateUserParams>(
  "user/fetchUserUpdate",
  async ({ name, email }) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      return updateUser(name, email, token);
    }
    return;
  }
);

export const fetchCreateMovie = createAsyncThunk<
  MovieFromBackend[],
  MovieFromBackend
>("user/fetchUserMovies", async (props) => {
  const token = localStorage.getItem("jwt");

  if (token) {
    return createMovie(token, {
      ...props,
    });
  }
  return;
});

export const fetchGetUserMovies = createAsyncThunk<MovieFromBackend[]>(
  "user/fetchGetUserMovies",
  async () => {
    const token = localStorage.getItem("jwt");

    if (token) {
      return getUserMovies(token);
    }
    return;
  }
);

export const fetchRemoveMovie = createAsyncThunk<MovieFromBackend[], number>(
  "user/fetchRemoveMovie",
  async (movieId) => {
    const token = localStorage.getItem("jwt");

    if (token) {
      return removeMovie(token, movieId);
    }
    return;
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setFilms(state, action: PayloadAction<MovieFromBackend[]>) {
      state.userFilms = action.payload;
    },
    setUser(state, action: PayloadAction<LoginResponse>) {
      state.user = action.payload;
    },
    setLogin(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    removeFilm(state, action: PayloadAction<number>) {
      const movieId = action.payload;
      state.userFilms = state.userFilms.filter(
        (film) => film.movieId !== movieId
      );
    },
  },

  extraReducers: (builder) => {
    // Получение данных пользователя
    builder.addCase(fetchUser.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchUser.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.status = Status.ERROR;
    });

    // Авторизация
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = Status.SUCCESS;
      state.isLogin = true;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.status = Status.ERROR;
    });

    // Регистрация
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchRegister.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = Status.ERROR;
    });

    // Обновление юзера
    builder.addCase(fetchUserUpdate.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchUserUpdate.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchUserUpdate.rejected, (state) => {
      state.status = Status.ERROR;
    });

    // Добавление фильма на сервере
    builder.addCase(fetchCreateMovie.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchCreateMovie.fulfilled, (state, action) => {
      state.userFilms = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchCreateMovie.rejected, (state) => {
      state.status = Status.ERROR;
    });

    // Поулчение фильмов с сервера
    builder.addCase(fetchGetUserMovies.pending, (state) => {
      state.userFilms = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchGetUserMovies.fulfilled, (state, action) => {
      state.userFilms = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchGetUserMovies.rejected, (state) => {
      state.userFilms = [];
      state.status = Status.ERROR;
    });

    // Удаление фильма с сервера
    builder.addCase(fetchRemoveMovie.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchRemoveMovie.fulfilled, (state, action) => {
      state.userFilms = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchRemoveMovie.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});
export const { setFilms, setLogin, setUser, removeFilm, setStatus } =
  apiSlice.actions;
export default apiSlice.reducer;
