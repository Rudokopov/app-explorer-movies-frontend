import React from "react";
import styles from "./error.module.scss";
import { Link } from "react-router-dom";

const Error: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.paragraph}>Страница не найдена</p>
      <button className={styles.button} type="button">
        <Link className={styles.button_link} to="/">
          {" "}
          Назад{" "}
        </Link>
      </button>
    </div>
  );
};

export default Error;
