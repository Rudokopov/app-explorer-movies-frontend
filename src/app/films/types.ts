export type Film = {
  id: string;
  nameRu: string;
  description: string;
  duration: number;
  trailerLink: string;
  image: {};
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type FilmSliceState = {
  items: Film[];
  status: Status.LOADING | Status.SUCCESS | Status.ERROR;
};
