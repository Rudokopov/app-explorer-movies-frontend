import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ApiSliceState,
  CreateMovieParams,
  LoginParams,
  LoginResponse,
  RegisterParams,
  RemoveMovieParams,
  Status,
  UpdateUserParams,
  User,
} from "./types";

const initialState: ApiSliceState = {
  films: [],
  user: {
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
    const response = await axios.get<User>("http://localhost:3000/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
);

export const fetchLogin = createAsyncThunk<LoginResponse, LoginParams>(
  "user/fetchLogin",
  async ({ email, password }) => {
    const response = await axios.post("http://localhost:3000/signin", {
      email: email,
      password: password,
    });
    return response.data;
  }
);

export const fetchRegister = createAsyncThunk<User, RegisterParams>(
  "user/fetchRegister",
  async ({ name, email, password }) => {
    const response = await axios.post("http://localhost:3000/signup", {
      name: name,
      email: email,
      password: password,
    });
    return response.data;
  }
);

export const fetchUserUpdate = createAsyncThunk<User, UpdateUserParams>(
  "user/fetchUserUpdate",
  async ({ name, email }, { getState }) => {
    const token = localStorage.getItem("jwt");
    const headers = { Authorization: `Bearer ${token}` };

    const response = await axios.patch(
      "http://localhost:3000/users/me",
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
  CreateMovieParams[],
  CreateMovieParams
>(
  "user/fetchUserMovies",
  async ({ movieId, nameRU, description, duration, trailerLink, image }) => {
    const token = localStorage.getItem("jwt");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.post(
      "http://localhost:3000/movies",
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

export const fetchGetUserMovies = createAsyncThunk<CreateMovieParams[]>(
  "user/fetchGetUserMovies",
  async () => {
    const token = localStorage.getItem("jwt");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get("http://localhost:3000/movies", {
      headers,
    });

    return response.data;
  }
);

export const fetchRemoveMovie = createAsyncThunk<CreateMovieParams[], Number>(
  "user/fetchRemoveMovie",
  async (movieId) => {
    const token = localStorage.getItem("jwt");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.delete("http://localhost:3000/movies", {
      data: { movieId },
      headers,
    });

    return response.data;
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setFilms(state, action: PayloadAction<CreateMovieParams[]>) {
      state.films = action.payload;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setLogin(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
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
      state.films = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchCreateMovie.rejected, (state) => {
      state.status = Status.ERROR;
    });

    // Поулчение фильмов с сервера
    builder.addCase(fetchGetUserMovies.pending, (state) => {
      state.films = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchGetUserMovies.fulfilled, (state, action) => {
      state.films = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchGetUserMovies.rejected, (state) => {
      state.films = [];
      state.status = Status.ERROR;
    });

    // Удаление фильма с сервера
    builder.addCase(fetchRemoveMovie.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchRemoveMovie.fulfilled, (state, action) => {
      state.films = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchRemoveMovie.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});
export const { setFilms, setLogin, setUser } = apiSlice.actions;
export default apiSlice.reducer;
