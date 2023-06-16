import React from "react";
import styles from "./about.module.scss";

const About: React.FC = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>О проекте</h2>
      <ul className={`${styles.list} ${styles.listInfo}`}>
        <li className={styles.listItem}>
          <h3 className={styles.itemTitle}>
            Дипломный проект включал 5 этапов
          </h3>
          <p className={styles.itemDescription}>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className={styles.listItem}>
          <h3 className={styles.itemTitle}>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className={styles.itemDescription}>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className={`${styles.list} ${styles.listProgress}`}>
        <li className={styles.listProgress_active}>
          <h4
            className={`${styles.listProgressTitle} ${styles.listProgress_activeTitle}`}
          >
            1 неделя
          </h4>
          <p className={styles.listProgressDescription}>Back-end</p>
        </li>
        <li className={styles.listProgress_default}>
          <h4
            className={`${styles.listProgressTitle} ${styles.listProgress_defaultTitle}`}
          >
            4 недели
          </h4>
          <p className={styles.listProgressDescription}>Front-end</p>
        </li>
      </ul>
    </section>
  );
};

export default About;
