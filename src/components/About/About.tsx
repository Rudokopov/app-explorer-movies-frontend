import React from "react";
import styles from "./about.module.scss";

const About: React.FC = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>О проекте</h2>
      <ul className={`${styles.list} ${styles.list__info}`}>
        <li>
          <h3>Дипломный проект включал 5 этапов</h3>
          <p>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li>
          <h3>На выполнение диплома ушло 5 недель</h3>
          <p>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className={`${styles.list} ${styles.list__progress}`}>
        <li className={styles.active_item}>
          <h4>1 неделя</h4>
          <p>Back-end</p>
        </li>
        <li className={styles.default_item}>
          <h4>4 недели</h4>
          <p>Front-end</p>
        </li>
      </ul>
    </section>
  );
};

export default About;
