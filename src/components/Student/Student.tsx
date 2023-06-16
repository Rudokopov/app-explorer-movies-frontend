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
        <div className={styles.contentTop}>
          <div>
            <h3 className={styles.contentTopTitle}>Виталий</h3>
            <h4 className={styles.contentTopSubtitle}>
              Фронтенд-разработчик, 30 лет
            </h4>
            <p className={styles.contentTopDescription}>
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Rudokopov"
              className={styles.contentTopLink}
            >
              Github
            </a>
          </div>
          <img
            className={styles.contentTopImage}
            src={studentPhoto}
            alt="Фотография студента"
          />
        </div>
        <div className={styles.contentDown}>
          <h3 className={styles.contentDownTitle}>Портфолио</h3>
          <ul className={styles.contentDownList}>
            <li className={styles.contentDownListItem}>
              <h4 className={styles.contentDownListItemTitle}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://rudokopov.github.io/how-to-learn/"
                  className={styles.contentDownListItemLink}
                >
                  Статичный сайт
                </a>
              </h4>
              <img src={arrowIcon} alt="иконка стрелки" />
            </li>
            <li className={styles.contentDownListItem}>
              <h4 className={styles.contentDownListItemTitle}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://rudokopov.github.io/russian-travel/"
                  className={styles.contentDownListItemLink}
                >
                  Адаптивный сайт
                </a>
              </h4>
              <img src={arrowIcon} alt="иконка стрелки" />
            </li>
            <li className={styles.contentDownListItem}>
              <h4 className={styles.contentDownListItemTitle}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://mesto-photo-social-media.vercel.app/login"
                  className={styles.contentDownListItemLink}
                >
                  Одностраничное приложение
                </a>
              </h4>
              <img src={arrowIcon} alt="иконка стрелки" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Student;
