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
import { setStatus } from "../../app/userFilterFilms/slice";
import { Status } from "../../app/userFilterFilms/types";
import Loaded from "../Loader/Loader";

const displayedData = data.slice(0, 3); // Ограничение до 3 элементов
const showButton = displayedData.length > 5; // Проверка количества отображаемых элементов

const CardUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const { resultFilms, status } = useSelector(selectUserFilterData);
  const [userDataFilms, setUserDataFilms] = useState<MovieFromBackend[]>([]);

  const removeUserFilm = async (movieId: number) => {
    const res = await dispatch(fetchRemoveMovie(movieId));

    if (res.payload) {
      const deletedMovie = res.payload as MovieFromBackend;
      dispatch(removeFilm(deletedMovie.movieId));

      setUserDataFilms((prevFilms) =>
        prevFilms.filter((film) => film.movieId !== movieId)
      );
    }
  };

  const getUserFilms = async () => {
    dispatch(setStatus(Status.LOADING));
    try {
      const res = await dispatch(fetchGetUserMovies());
      if (res.payload) {
        const userFilms = res.payload as MovieFromBackend[];
        if (userFilms) {
          setUserDataFilms(userFilms);
          dispatch(setStatus(Status.SUCCESS));
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
      {status === "loading" ? (
        <Loaded />
      ) : (
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
                  key={item.movieId}
                  myFilmsPage
                  removeUserFilm={removeUserFilm}
                />
              );
            })
          ) : (
            <>
              <h2 className={sharedStyles.badRequest}>Ничего не найдено</h2>
            </>
          )}
        </div>
      )}

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
