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
  async (_, { getState }) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await axios.get<User>(
      "https://api.movie-app.nomoredomains.rocks/users/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);

export const fetchLogin = createAsyncThunk<LoginResponse, LoginParams>(
  "user/fetchLogin",
  async ({ email, password }) => {
    const response = await axios.post<LoginResponse>(
      "https://api.movie-app.nomoredomains.rocks/signin",
      {
        email: email,
        password: password,
      }
    );
    return response.data as LoginResponse;
  }
);

export const fetchRegister = createAsyncThunk<User, RegisterParams>(
  "user/fetchRegister",
  async ({ name, email, password }) => {
    const response = await axios.post(
      "https://api.movie-app.nomoredomains.rocks/signup",
      {
        name: name,
        email: email,
        password: password,
      }
    );
    return response.data;
  }
);

export const fetchUserUpdate = createAsyncThunk<User, UpdateUserParams>(
  "user/fetchUserUpdate",
  async ({ name, email }, { getState }) => {
    const token = localStorage.getItem("jwt");
    const headers = { Authorization: `Bearer ${token}` };

    const response = await axios.patch(
      "https://api.movie-app.nomoredomains.rocks/users/me",
      {
        name: name,
        email: email,
      },
      { headers }
    );

    return response.data;
  }
);

export const fetchCreateMovie = createAsyncThunk<
  MovieFromBackend[],
  MovieFromBackend
>(
  "user/fetchUserMovies",
  async ({ movieId, nameRU, description, duration, trailerLink, image }) => {
    const token = localStorage.getItem("jwt");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.post(
      "https://api.movie-app.nomoredomains.rocks/movies",
      {
        movieId,
        nameRU,
        description,
        duration,
        trailerLink,
        image,
      },
      { headers }
    );

    return response.data;
  }
);

export const fetchGetUserMovies = createAsyncThunk<MovieFromBackend[]>(
  "user/fetchGetUserMovies",
  async () => {
    const token = localStorage.getItem("jwt");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(
      "https://api.movie-app.nomoredomains.rocks/movies",
      {
        headers,
      }
    );

    return response.data;
  }
);

export const fetchRemoveMovie = createAsyncThunk<MovieFromBackend[], Number>(
  "user/fetchRemoveMovie",
  async (movieId) => {
    const token = localStorage.getItem("jwt");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.delete(
      "https://api.movie-app.nomoredomains.rocks/movies",
      {
        data: { movieId },
        headers,
      }
    );

    return response.data;
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
    removeFilm(state, action: PayloadAction<number>) {
      const movieId = action.payload;
      state.userFilms = state.userFilms.filter(
        (film) => film.movieId !== movieId
      );
    },
  },

  extraReducers: (builder) => {
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
export const { setFilms, setLogin, setUser, removeFilm } = apiSlice.actions;
export default apiSlice.reducer;
