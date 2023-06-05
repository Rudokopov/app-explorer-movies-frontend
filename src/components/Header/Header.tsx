import React from "react";
import logo from "../../images/logo.svg";
import styles from "./header.module.scss";

const Header: React.FC = () => {
  return (
    <section className={styles.container}>
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
    </section>
  );
};

export default Header;
