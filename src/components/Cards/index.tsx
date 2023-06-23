import React, { useEffect, useState } from "react";
import Card from "../Card";
import styles from "./cards.module.scss";
import { useSelector } from "react-redux";
import { selectFilterData } from "../../app/filters/selectors";
import { Film } from "../../app/films/types";
import { convertToHours } from "../../utils/utils";
import { useResize } from "../../utils/useResize";

const Cards: React.FC = () => {
  const windowParam = useResize();
  const { resultFilms } = useSelector(selectFilterData);
  const [displayedCards, setDisplayedCards] = useState(12);
  const [showMoreButton, setShowMoreButton] = useState(true);

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
        {resultFilms ? (
          resultFilms.slice(0, displayedCards).map((card: Film, i: number) => {
            return (
              <Card
                title={card.nameRU}
                image={`https://api.nomoreparties.co/${card.image.url}`}
                duration={convertToHours(card.duration)}
                trailerLink={card.trailerLink}
                key={i}
              />
            );
          })
        ) : (
          <div>dsa</div>
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
