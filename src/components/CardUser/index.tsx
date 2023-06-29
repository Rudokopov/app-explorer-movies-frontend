import React, { useEffect, useState } from "react";
import Card from "../Card";
import data from "../../cards.json";
import sharedStyles from "../Cards/cards.module.scss";
import { useAppDispatch } from "../../app/store";
import {
  fetchGetUserMovies,
  fetchRemoveMovie,
  removeFilm,
} from "../../app/api/slice";
import { MovieFromBackend } from "../../app/api/types";
import { useSelector } from "react-redux";
import { selectUserFilterData } from "../../app/userFilterFilms/selectors";

const displayedData = data.slice(0, 3); // Ограничение до 3 элементов
const showButton = displayedData.length > 5; // Проверка количества отображаемых элементов

const CardUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const { resultFilms } = useSelector(selectUserFilterData);

  const [userDataFilms, setUserDataFilms] = useState<MovieFromBackend[]>([]);

  const removeUserFilm = async (movieId: number) => {
    const res = await dispatch(fetchRemoveMovie(movieId));

    if (res.payload) {
      const deletedMovie = res.payload as MovieFromBackend;
      dispatch(removeFilm(deletedMovie.movieId));
      getUserFilms();
    }
  };

  const getUserFilms = async () => {
    try {
      const res = await dispatch(fetchGetUserMovies());
      if (res.payload) {
        const userFilms = res.payload as MovieFromBackend[];
        if (userFilms) {
          setUserDataFilms(userFilms);
        }
      }
    } catch (err: any) {
      alert(
        `Произошла ошибка при получении фильмов пользователя ${err.message}`
      );
    }
  };

  useEffect(() => {
    getUserFilms();
  }, []);

  useEffect(() => {
    setUserDataFilms(resultFilms);
  }, [resultFilms]);

  return (
    <>
      <div className={sharedStyles.container}>
        {userDataFilms.length >= 1 ? (
          userDataFilms.map((item: MovieFromBackend, i: number) => {
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
