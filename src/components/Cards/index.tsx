import React, { useCallback, useEffect, useMemo, useState } from "react";
import Card from "../Card";
import styles from "./cards.module.scss";
import { useSelector } from "react-redux";
import { selectFilterData } from "../../app/filters/selectors";
import { Film } from "../../app/films/types";
import { useResize } from "../../utils/useResize";
import {
  fetchCreateMovie,
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
import {
  ADDITIONAL_CARDS_MD,
  ADDITIONAL_CARDS_SM,
  INITIAL_DISPLAYED_CARDS,
} from "../../utils/constns";

const Cards: React.FC = () => {
  const dispatch = useAppDispatch();
  const windowParam = useResize();
  const { filterStatus } = useSelector(selectFilterData);

  const [displayedCards, setDisplayedCards] = useState(INITIAL_DISPLAYED_CARDS);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const { userFilms } = useSelector(selectApiData);
  const { resultFilms } = useSelector(selectFilterData);
  const displayedFilms = useMemo(
    () => resultFilms.slice(0, displayedCards),
    [resultFilms, displayedCards]
  );
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
      }
    } catch (err: any) {
      alert(`Произошла ошибка при добавлении фильма на сервер ${err.name}`);
    }
  };

  const showMoreCards = () => {
    setDisplayedCards((prevCount) => {
      if (!windowParam.isScreenMd) {
        return prevCount + ADDITIONAL_CARDS_SM;
      }
      return prevCount + ADDITIONAL_CARDS_MD;
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
      if (!windowParam.isScreenMd && windowParam.isScreenSm) {
        return prevCount - 4;
      }
      if (!windowParam.isScreenSm) {
        return prevCount - 7;
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

  return (
    <>
      <div className={styles.container}>
        {resultFilms.length >= 1 ? (
          displayedFilms.map((card: Film, i: number) => {
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
                key={card.id}
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
