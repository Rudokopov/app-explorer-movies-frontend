import React, { useEffect } from "react";
import Card from "../Card";
import data from "../../cards.json";
// import { CardData } from "../Cards/Cards";
import sharedStyles from "../Cards/cards.module.scss";
import { useAppDispatch } from "../../app/store";
import {
  fetchGetUserMovies,
  fetchRemoveMovie,
  removeFilm,
  setFilms,
} from "../../app/api/slice";
import { MovieFromBackend } from "../../app/api/types";
import { useSelector } from "react-redux";
import { selectApiData } from "../../app/api/selectors";
import { selectFilterData } from "../../app/filters/selectors";

const displayedData = data.slice(0, 3); // Ограничение до 3 элементов
const showButton = displayedData.length > 5; // Проверка количества отображаемых элементов

const CardUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userFilms } = useSelector(selectApiData);
  const { resultFilms } = useSelector(selectFilterData);

  const getUserCards = async () => {
    const res = await dispatch(fetchGetUserMovies());
    try {
      if (res.payload) {
        const userFilms = res.payload as MovieFromBackend[];
        // dispatch(setFilms(userFilms));

        // Тут логика для поиска, сравниаем 2 массива, тот который содержит результат поиска и тот который прилетает с фильмами юзака
        const matchedFilms = userFilms.filter((userFilm) => {
          return resultFilms.some(
            (resultFilms) => resultFilms.nameRU === userFilm.nameRU
          );
        });
        dispatch(setFilms(matchedFilms));
      }
    } catch (err: any) {
      alert(`Произошла ошибка при получении фильмов юзера ${err.message}`);
    }
  };

  const removeUserFilm = async (movieId: number) => {
    const res = await dispatch(fetchRemoveMovie(movieId));

    if (res.payload) {
      const deletedMovie = res.payload as MovieFromBackend;
      dispatch(removeFilm(deletedMovie.movieId));
    }
  };

  useEffect(() => {
    getUserCards();
  }, [resultFilms]);

  return (
    <>
      <div className={sharedStyles.container}>
        {userFilms.length >= 1 ? (
          userFilms.map((item: MovieFromBackend, i: number) => {
            return (
              <Card
                movieId={item.movieId}
                nameRU={item.nameRU}
                description={item.description}
                duration={item.duration}
                trailerLink={item.trailerLink}
                image={item.image}
                key={i}
                myFilmsPage
                removeUserFilm={removeUserFilm}
              />
            );
          })
        ) : (
          <h2 className={sharedStyles.badRequest}>Ничего не найдено</h2>
        )}
      </div>
      <div
        className={`${sharedStyles.buttonContainer} ${
          showButton ? "" : sharedStyles.hidden
        }`}
      >
        <button type="button" className={sharedStyles.buttonContainerButton}>
          Ещё
        </button>
      </div>
    </>
  );
};

export default CardUser;
