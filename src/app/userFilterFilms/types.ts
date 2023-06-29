import { MovieFromBackend } from "../api/types";

export type FilterSliceState = {
  resultFilms: MovieFromBackend[];
  searchValue: string;
  isShort: boolean;
};
