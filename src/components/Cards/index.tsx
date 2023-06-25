import React, { useEffect, useState } from "react";
import Card from "../Card";
import styles from "./cards.module.scss";
import { useSelector } from "react-redux";
import { selectFilterData } from "../../app/filters/selectors";
import { Film } from "../../app/films/types";
import { useResize } from "../../utils/useResize";
import { fetchCreateMovie, setFilms } from "../../app/api/slice";
import { useAppDispatch } from "../../app/store";
import { MovieFromBackend } from "../../app/api/types";
import { selectApiData } from "../../app/api/selectors";

const Cards: React.FC = () => {
  const dispatch = useAppDispatch();
  const windowParam = useResize();
  const { resultFilms } = useSelector(selectFilterData);
  const [displayedCards, setDisplayedCards] = useState(12);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const { films } = useSelector(selectApiData);

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
        dispatch(setFilms([...films, newMovie]));
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
          resultFilms.slice(0, displayedCards).map((card: Film, i: number) => {
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
              />
            );
          })
        ) : (
          <h2 className={styles.badRequest}>Ничего не найдено</h2>
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
