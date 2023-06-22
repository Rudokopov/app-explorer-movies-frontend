import React, { useCallback, useEffect, useState } from "react";
import styles from "./search.module.scss";
import { debounce, styled, Switch } from "@mui/material";
import { useAppDispatch } from "../../app/store";
import {
  clearResultFilms,
  setResultFilms,
  setSearchValue,
  setShortType,
} from "../../app/filters/slice";
import { fetchFilms } from "../../app/films/slice";
import { Film } from "../../app/films/types";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  marginRight: "12px",
  display: "flex",
  alignItems: "center",
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#343434",
        opacity: 1,
        border: "none",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#2BE080",
    boxShadow: "0 0 0 1px white, 0 0 0 1px white",
    width: 12,
    height: 12,
    margin: "2px",
  },
  "& .MuiSwitch-track": {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    opacity: 1,
    transition: "background-color 0.2s ease",
  },
}));

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const [short, setShort] = useState(false);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    dispatch(setShortType(short));
  }, [short]);

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 500),
    []
  ); // Сделал что бы снять лишнюю нагрузку на апдейт редакса и в дальнейшем если логику придется прикрутить к поиску на сервере, не спамилось слишком много запросов

  const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
    updateSearchValue(evt.target.value);
  };

  const handleShortParam = () => {
    short ? setShort(false) : setShort(true);
  };

  const getFilms = useCallback(async () => {
    try {
      const films = await dispatch(fetchFilms());
      const result = films.payload as Film[];
      return result;
    } catch (err: any) {
      alert(`Произошла ошибка при получении фильмов ${err.message}`);
    }
  }, []);

  const filterFilms = (filmData: Film[] | undefined) => {
    try {
      if (filmData) {
        const filteredFilms = filmData.filter((film: Film) =>
          film.nameRU.toLowerCase().includes(value.toLowerCase())
        );
        dispatch(setResultFilms(filteredFilms));
      }
    } catch (err: any) {
      alert(`Произошла ошибка при поиске фильмов ${err.message}`);
    }
  };

  const onSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    dispatch(clearResultFilms()); // Чищу предыдущий результат
    const res = await getFilms();
    filterFilms(res);
  };

  return (
    <section className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form} action="submit">
        <input
          value={value}
          onChange={(evt) => onChangeInput(evt)}
          className={styles.formInput}
          placeholder="Фильмы"
          type="text"
        />
        <button className={styles.button} type="submit">
          Найти
        </button>
      </form>
      <div className={styles.switch}>
        <CustomSwitch onClick={handleShortParam} />
        <p className={styles.switchDescription}>Короткометражки</p>
      </div>
    </section>
  );
};

export default Search;
