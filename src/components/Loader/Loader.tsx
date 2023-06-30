import React from "react";
import styles from "./Loader.module.scss";

const Loaded: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img
          src="https://usagif.com/wp-content/uploads/loading-96.gif"
          className={styles.image}
          alt="Загрузка"
        />
      </div>
    </div>
  );
};

export default Loaded;
