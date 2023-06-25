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
  films: CreateMovieParams[];
  user: User;
  status: Status;
  isLogin: boolean;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
  name: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  _id: string;
  name: string;
  email: string;
  token: string;
};

export type UpdateUserParams = {
  name: string;
  email: string;
};

export type CreateMovieParams = {
  movieId: string;
  nameRU: string;
  description: string;
  duration: number;
  trailerLink: string;
  image: string;
};

export type RemoveMovieParams = {
  movieId: number;
};
