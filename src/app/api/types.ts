export type User = {
  token: string;
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
  userFilms: MovieFromBackend[];
  user: User | undefined;
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
  token: string;
  _id: string;
  name: string;
  email: string;
};

export type UpdateUserParams = {
  name: string;
  email: string;
};

export type MovieFromBackend = {
  movieId: number;
  nameRU: string;
  description: string;
  duration: number;
  trailerLink: string;
  image: string;
};

export type RemoveMovieParams = {
  movieId: number;
};
