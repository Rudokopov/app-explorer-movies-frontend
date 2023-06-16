import React from "react";
import styles from "./banner.module.scss";

const Banner: React.FC = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <button className={styles.button} type="button">
            О проекте
          </button>
        </li>
        <li className={styles.listItem}>
          <button className={styles.button} type="button">
            Технологии
          </button>
        </li>
        <li className={styles.listItem}>
          <button className={styles.button} type="button">
            Студент
          </button>
        </li>
      </ul>
    </section>
  );
};

export default Banner;
