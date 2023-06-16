import React from "react";
import Card from "../Card/Card";
import data from "../../cards.json";
import styles from "./cards.module.scss";

export type CardData = {
  image: string;
  title: string;
  duration: number;
  isSave: boolean;
};

const Cards: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        {data.map((card: CardData, i: number) => (
          <Card
            title={card.title}
            image={card.image}
            duration={card.duration}
            isSave={card.isSave}
            key={i}
          />
        ))}
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
