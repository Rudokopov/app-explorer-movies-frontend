import React, { useEffect } from "react";
import Card from "../Card";
import data from "../../cards.json";
// import { CardData } from "../Cards/Cards";
import sharedStyles from "../Cards/cards.module.scss";
import { useAppDispatch } from "../../app/store";
import {
  fetchGetUserMovies,
  fetchRemoveMovie,
  setFilms,
} from "../../app/api/slice";
import { CreateMovieParams } from "../../app/api/types";
import { useSelector } from "react-redux";
import { selectApiData } from "../../app/api/selectors";

const displayedData = data.slice(0, 3); // Ограничение до 3 элементов
const showButton = displayedData.length > 5; // Проверка количества отображаемых элементов

const CardUser: React.FC = () => {
  const dispatch = useAppDispatch();

  const { films } = useSelector(selectApiData);

  const getUserCards = async () => {
    const res = await dispatch(fetchGetUserMovies());

    if (res.payload) {
      const userFlims = res.payload as CreateMovieParams[];
      dispatch(setFilms(userFlims));
    }
    try {
    } catch (err: any) {
      alert(`Произошла ошибка при получении фильмов юзера ${err.message}`);
    }
  };

  const removeUserFilm = async (movieId: number) => {
    const res = await dispatch(fetchRemoveMovie(movieId));

    if (res.payload) {
      const deletedMovie = res.payload as CreateMovieParams;
      console.log(films);
      const updatedFilms = films.filter(
        (film) => film.movieId !== deletedMovie.movieId
      );
      dispatch(setFilms(updatedFilms));
    }
  };

  useEffect(() => {
    getUserCards();
  }, []);

  return (
    <>
      <div className={sharedStyles.container}>
        {films &&
          films.map((item: CreateMovieParams, i: number) => {
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
          })}
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
