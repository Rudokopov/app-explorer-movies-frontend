import { MovieFromBackend } from "../api/types";

export type FilterSliceState = {
  resultFilms: MovieFromBackend[];
  searchValue: string;
  isShort: boolean;
  status: Status;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
  FIRST_TIME = "firstTime",
}
