import React from "react";
import styles from "./error.module.scss";
import { Link, useNavigate } from "react-router-dom";

const Error: React.FC = () => {
  const navigate = useNavigate();

  const handleBackPage = () => {
    navigate(-1);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.paragraph}>Страница не найдена</p>
      <button className={styles.button} type="button">
        <button className={styles.button_link} onClick={handleBackPage}>
          Назад
        </button>
      </button>
    </div>
  );
};

export default Error;
