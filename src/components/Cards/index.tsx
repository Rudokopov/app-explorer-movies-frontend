import React, { useCallback, useEffect, useState } from "react";
import Card from "../Card";
import styles from "./cards.module.scss";
import { useSelector } from "react-redux";
import { selectFilterData } from "../../app/filters/selectors";
import { Film } from "../../app/films/types";
import { useResize } from "../../utils/useResize";
import {
  fetchCreateMovie,
  fetchGetUserMovies,
  fetchRemoveMovie,
  removeFilm,
  setFilms,
} from "../../app/api/slice";
import { useAppDispatch } from "../../app/store";
import { MovieFromBackend } from "../../app/api/types";
import { selectApiData } from "../../app/api/selectors";
import Loaded from "../Loader/Loader";
import { setFilterStatus } from "../../app/filters/slice";
import { Status } from "../../app/filters/types";

const Cards: React.FC = () => {
  const dispatch = useAppDispatch();
  const windowParam = useResize();
  const { resultFilms, filterStatus } = useSelector(selectFilterData);
  const [displayedCards, setDisplayedCards] = useState(12);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const { userFilms } = useSelector(selectApiData);

  const addFavoriteMovie = async (params: MovieFromBackend) => {
    const { movieId, nameRU, description, duration, trailerLink, image } =
      params;
    try {
      const res = await dispatch(
        fetchCreateMovie({
          movieId,
          nameRU,
          description,
          duration,
          trailerLink,
          image,
        })
      );
      if (res.payload) {
        const newMovie = res.payload as MovieFromBackend;
        dispatch(setFilms([...userFilms, newMovie]));
        getUserFilms();
      }
    } catch (err: any) {
      alert(`Произошла ошибка при добавлении фильма на сервер ${err.name}`);
    }
  };

  const showMoreCards = () => {
    setDisplayedCards((prevCount) => {
      if (!windowParam.isScreenMd) {
        return prevCount + 2;
      }
      return prevCount + 3;
    });
  };

  const removeUserFilm = async (movieId: number) => {
    dispatch(setFilterStatus(Status.LOADING));
    try {
      const res = await dispatch(fetchRemoveMovie(movieId));

      if (res.payload) {
        const deletedMovie = res.payload as MovieFromBackend;
        dispatch(removeFilm(deletedMovie.movieId));
        dispatch(setFilterStatus(Status.SUCCESS));
      }
    } catch (err: any) {
      dispatch(setFilterStatus(Status.ERROR));
      alert(`Произошла ошибка при удалении фильма ${err.message}`);
    }
  };

  useEffect(() => {
    setDisplayedCards((prevCount) => {
      if (!windowParam.isScreenMd) {
        return prevCount - 4;
      }
      return prevCount;
    });
  }, []);

  useEffect(() => {
    if (resultFilms && displayedCards >= resultFilms.length) {
      setShowMoreButton(false);
    } else {
      setShowMoreButton(true);
    }
  }, [resultFilms, displayedCards]);

  const getUserFilms = useCallback(async () => {
    try {
      await dispatch(fetchGetUserMovies());
    } catch (err: any) {
      alert(
        `Произошла ошибка при получении фильмов юзака в компоненте Cards ${err.message}`
      );
    }
  }, [dispatch]);

  useEffect(() => {
    getUserFilms();
  }, [getUserFilms]);

  return (
    <>
      <div className={styles.container}>
        {resultFilms.length >= 1 ? (
          resultFilms.slice(0, displayedCards).map((card: Film, i: number) => {
            const isAddedUser =
              Array.isArray(userFilms) &&
              userFilms.some((userFilm) => userFilm.nameRU === card.nameRU);

            return (
              <Card
                movieId={card.id}
                nameRU={card.nameRU}
                description={card.description}
                image={`https://api.nomoreparties.co/${card.image.url}`}
                duration={card.duration}
                trailerLink={card.trailerLink}
                key={i}
                addFavoriteMovie={addFavoriteMovie}
                removeUserFilm={removeUserFilm}
                isAddedUser={isAddedUser}
              />
            );
          })
        ) : (
          <>
            {filterStatus === "loading" && <Loaded />}
            {filterStatus === "error" && (
              <h2 className={styles.badRequest}>Ничего не найдено</h2>
            )}
            {filterStatus === "firstTime" && (
              <h2 className={styles.badRequest}>
                Введите ключевое слово для поиска
              </h2>
            )}
          </>
        )}
      </div>
      <div className={styles.buttonContainer}>
        {showMoreButton && (
          <button
            onClick={showMoreCards}
            type="button"
            className={styles.buttonContainerButton}
          >
            Ещё
          </button>
        )}
      </div>
    </>
  );
};

export default Cards;
