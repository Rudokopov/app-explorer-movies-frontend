import { Film } from "../films/types";

export type User = {
  _id: string;
  name: string;
  email: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type ApiSliceState = {
  films: Film[];
  user: User;
  status: Status;
  isLogin: boolean;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  _id: string;
  name: string;
  email: string;
  token: string;
};
