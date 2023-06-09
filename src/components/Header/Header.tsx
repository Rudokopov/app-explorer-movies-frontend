import React, { useState } from "react";
import logo from "../../images/logo.svg";
import styles from "./header.module.scss";
import profileLogo from "../../images/profile-logo.png";

const Header: React.FC = () => {
  const [isLoggin, setLoggin] = useState(false);
  return (
    <section className={styles.container}>
      {!isLoggin ? (
        <>
          <a href="#">
            <img src={logo} alt="logo" />
          </a>

          <ul className={styles.content}>
            <li>
              <button className={styles.button} type="button">
                Регистрация
              </button>
            </li>
            <li>
              <button
                className={`${styles.button} ${styles.dedicated}`}
                type="button"
              >
                Войти
              </button>
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul className={`${styles.content}`}>
            <li>
              <a href="#">
                <img src={logo} alt="logo" />
              </a>
            </li>
            <li>
              <button
                className={`${styles.button} ${
                  isLoggin ? styles.isLoggin : ""
                }`}
                type="button"
              >
                Фильмы
              </button>
              <button className={styles.button} type="button">
                Сохраненный фильмы
              </button>
            </li>
          </ul>
          <ul className={styles.content}>
            <li>
              <button className={styles.button} type="button">
                <img src={profileLogo} alt="Иконка профиля" />
              </button>
            </li>
          </ul>
        </>
      )}
    </section>
  );
};

export default Header;
