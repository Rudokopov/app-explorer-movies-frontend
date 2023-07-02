import React, { useCallback, useEffect, useState } from "react";
import styles from "./search.module.scss";
import { debounce, styled, Switch } from "@mui/material";
import { useAppDispatch } from "../../app/store";
import { useLocation } from "react-router";
import {
  clearResultFilms,
  setFilterStatus,
  setResultFilms,
  setSearchValue,
  setShortType,
} from "../../app/filters/slice";
import { Film } from "../../app/films/types";
import { useSelector } from "react-redux";
import { selectFilterData } from "../../app/filters/selectors";
import {
  clearUserResultFilms,
  setUserResultFilms,
  setUserSearchValue,
  setUserShortType,
} from "../../app/userFilterFilms/slice";
import { fetchGetUserMovies } from "../../app/api/slice";
import { MovieFromBackend, Status } from "../../app/api/types";
import { selectFilmData } from "../../app/films/selectors";

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
  const location = useLocation();
  const { searchValue, isShort, resultFilms } = useSelector(selectFilterData);
  const { films } = useSelector(selectFilmData);

  const [short, setShort] = useState<boolean>(isShort || false);
  const [value, setValue] = useState<string>(searchValue || "");

  const [savedFilmValue, setSavedFilmValue] = useState<string>("");
  const [savedFilmIsShort, setSavedFilmIsShort] = useState<boolean>(false);

  const [searchValid, setSearchValid] = useState<boolean>(false);

  const validateSearchInput = (value: string) => {
    if (value.length <= 0) {
      alert(`Введите ключевое слово, чтобы начать поиск`);
      setSearchValid(false);
      return false;
    }

    const regex = /^[a-zA-Zа-яА-Я0-9\s]+$/;

    if (!regex.test(value)) {
      alert(`Ключевое слово может содержать только цифры и буквы`);
      setSearchValid(false);
      return false;
    }

    if (value.charAt(0) === " ") {
      alert("Первый символ не может быть пробелом");
      setSearchValid(false);
      return false;
    }
    setSearchValid(true);
    return true;
  };

  useEffect(() => {
    dispatch(setShortType(short));
  }, [dispatch, short]);

  useEffect(() => {
    if (searchValid) {
      filterFilms();
    }
  }, [short]);

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
      validateSearchInput(str);
    }, 800),
    [dispatch]
  );

  const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = evt.target.value;
    setValue(inputValue);
    updateSearchValue(inputValue);
  };

  const handleShortParam = () => {
    setShort((prevShort) => !prevShort);
  };

  const filterFilms = async () => {
    try {
      dispatch(setFilterStatus(Status.LOADING));
      if (films) {
        const filteredFilms = films.filter((film: Film) => {
          const isMatch = film.nameRU
            .toLowerCase()
            .includes(value.toLowerCase());
          const hasValidDuration = film.duration > 40;

          if (short) {
            return isMatch && !hasValidDuration;
          } else {
            return isMatch;
          }
        });
        setTimeout(() => {
          dispatch(setResultFilms(filteredFilms));
        }, 800); // Поскольку поиск происходит по уже загруженным фильмам, он быстрый, поэтому это нужно для иммитации загрузки

        if (filteredFilms.length <= 0) {
          dispatch(setFilterStatus(Status.ERROR)); // Импровизированная проверка для отображения пейлоудера на клиенте
        }
      }
    } catch (err: any) {
      alert(`Произошла ошибка при поиске фильмов ${err.message}`);
    }
  };

  const onSubmitFilter = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (validateSearchInput(value)) {
      dispatch(clearResultFilms());
      filterFilms();
    }
  };

  /* -----------------------------------------Логика для поиска по сохраненным фильмам----------------------------------------------- */

  useEffect(() => {
    filterUserFilms();
  }, [savedFilmIsShort]);

  const onChangeUserInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const userInputValue = evt.target.value;
    setSavedFilmValue(userInputValue);
    dispatch(setUserSearchValue(userInputValue));
  };

  const handleUserShortParam = () => {
    setSavedFilmIsShort((prevSavedFilmIsShort) => !prevSavedFilmIsShort);
  };

  useEffect(() => {
    dispatch(setUserShortType(savedFilmIsShort));
  }, [dispatch, savedFilmIsShort]);

  const filterUserFilms = useCallback(async () => {
    try {
      const response = await dispatch(fetchGetUserMovies());
      if (response.payload) {
        const userFilmsData = response.payload as MovieFromBackend[];
        const filteredFilms = userFilmsData.filter((film: MovieFromBackend) => {
          const isMatch = film.nameRU
            .toLowerCase()
            .includes(savedFilmValue.toLowerCase());
          const hasValidDuration = film.duration > 40;

          if (savedFilmIsShort) {
            return isMatch && !hasValidDuration;
          } else {
            return isMatch;
          }
        });
        dispatch(setUserResultFilms(filteredFilms));
      }
    } catch (err: any) {
      alert(`Произошла ошибка при получении фильмов юзера ${err.message}`);
    }
  }, [dispatch, savedFilmIsShort, savedFilmValue]);

  const onSubmitUserFilter = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (validateSearchInput(savedFilmValue)) {
      dispatch(clearUserResultFilms());
      await filterUserFilms();
    }
  };

  return (
    <section className={styles.container}>
      {location.pathname === "/films" && (
        <>
          <form
            onSubmit={onSubmitFilter}
            className={styles.form}
            action="submit"
          >
            <input
              value={value}
              onChange={onChangeInput}
              className={styles.formInput}
              placeholder="Фильмы"
              type="text"
            />
            <button className={styles.button} type="submit">
              Найти
            </button>
          </form>
          <div className={styles.switch}>
            <CustomSwitch checked={short} onClick={handleShortParam} />
            <p className={styles.switchDescription}>Короткометражки</p>
          </div>
        </>
      )}
      {location.pathname === "/films/saved" && (
        <>
          <form
            onSubmit={onSubmitUserFilter}
            className={styles.form}
            action="submit"
          >
            <input
              value={savedFilmValue}
              onChange={onChangeUserInput}
              className={styles.formInput}
              placeholder="Фильмы"
              type="text"
            />
            <button className={styles.button} type="submit">
              Найти
            </button>
          </form>
          <div className={styles.switch}>
            <CustomSwitch
              checked={savedFilmIsShort}
              onClick={handleUserShortParam}
            />
            <p className={styles.switchDescription}>Короткометражки</p>
          </div>
        </>
      )}
    </section>
  );
};

export default Search;
