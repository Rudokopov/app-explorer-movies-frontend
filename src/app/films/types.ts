export type Film = {
  id: string;
  nameRU: string;
  description: string;
  duration: number;
  trailerLink: string;
  image: {
    url: string;
  };
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type FilmSliceState = {
  films: Film[];
  status: Status.LOADING | Status.SUCCESS | Status.ERROR;
};
