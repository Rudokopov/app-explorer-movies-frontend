import { Film } from "../films/types";

export type FilterSliceState = {
  resultFilms: Film[];
  searchValue: string;
  isShort: boolean;
};
