import React from "react";
import Card from "../Card/Card";
import data from "../../cards.json";
import { CardData } from "../Cards/Cards";
import sharedStyles from "../Cards/cards.module.scss";
import styles from "./cardUser.module.scss";

const displayedData = data.slice(0, 3); // Ограничение до 3 элементов
const showButton = displayedData.length > 5; // Проверка количества отображаемых элементов

const CardUser: React.FC = () => {
  return (
    <>
      <div className={sharedStyles.container}>
        {data.slice(0, 3).map((card: CardData, i: number) => (
          <Card
            title={card.title}
            image={card.image}
            duration={card.duration}
            isSave={card.isSave}
            myFilmsPage={true}
            key={i}
          />
        ))}
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
