import React from "react";
import studentPhoto from "../../images/student-photo.jpg";
import sharedStules from "../About/about.module.scss";
import styles from "./student.module.scss";
import arrowIcon from "../../images/arrow.svg";

const Student: React.FC = () => {
  return (
    <section className={styles.container}>
      <h2 className={sharedStules.title}>Студент</h2>
      <div className={styles.content}>
        <div className={styles.content__top}>
          <div>
            <h3>Виталий</h3>
            <h4>Фронтенд-разработчик, 30 лет</h4>
            <p>
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <a href="#">Github</a>
          </div>
          <img src={studentPhoto} alt="Фотография студента" />
        </div>
        <div className={styles.content__down}>
          <h3>Портфолио</h3>
          <ul>
            <li>
              <h4>Статичный сайт</h4>
              <img src={arrowIcon} />
            </li>
            <li>
              <h4>Адаптивный сайт</h4>
              <img src={arrowIcon} />
            </li>
            <li>
              <h4>Одностраничное приложение</h4>
              <img src={arrowIcon} />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Student;
