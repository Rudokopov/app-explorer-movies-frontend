import React, { useEffect, useState } from "react";
import logo from "../../images/logo.svg";
import styles from "./header.module.scss";
import profileLogo from "../../images/profile-logo.png";
import burgerIcon from "../../images/burger.svg";

const Header: React.FC = () => {
  const [isLoggin, setLoggin] = useState(false);
  const [isMobile, setMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className={styles.container}>
      {!isLoggin ? (
        <>
          <a href="#">
            <img src={logo} alt="logo" />
          </a>

          <ul className={styles.content}>
            {isMobile ? (
              <li>
                <img src={burgerIcon} />
              </li>
            ) : (
              <>
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
              </>
            )}
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
