export type Film = {
  id: number;
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
  filmStatus: Status.LOADING | Status.SUCCESS | Status.ERROR;
};
