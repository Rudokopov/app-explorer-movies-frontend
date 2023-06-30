import { Film } from "../films/types";

export type FilterSliceState = {
  resultFilms: Film[];
  searchValue: string;
  isShort: boolean;
  filterStatus: Status;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
  FIRST_TIME = "firstTime",
}
