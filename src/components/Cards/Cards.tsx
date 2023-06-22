import React from "react";
import Card from "../Card/Card";
import data from "../../cards.json";
import styles from "./cards.module.scss";
import { useSelector } from "react-redux";
import { selectFilterData } from "../../app/filters/selectors";
import { Film } from "../../app/films/types";

export type CardData = {
  image: string;
  title: string;
  duration: number;
  isSave: boolean;
};

const Cards: React.FC = () => {
  const { resultFilms } = useSelector(selectFilterData);
  return (
    <>
      <div className={styles.container}>
        {resultFilms ? (
          resultFilms.map((card: Film, i: number) => {
            return (
              <Card
                title={card.nameRU}
                image={`https://api.nomoreparties.co/${card.image.url}`}
                duration={card.duration}
                key={i}
              />
            );
          })
        ) : (
          <h1>Начните искать</h1>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <button type="button" className={styles.buttonContainerButton}>
          Ещё
        </button>
      </div>
    </>
  );
};

export default Cards;
