import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ApiSliceState,
  LoginParams,
  LoginResponse,
  Status,
  User,
} from "./types";
import { Film } from "../films/types";

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

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setFilms(state, action: PayloadAction<Film[]>) {
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
  },
});
export const { setFilms, setLogin, setUser } = apiSlice.actions;
export default apiSlice.reducer;
