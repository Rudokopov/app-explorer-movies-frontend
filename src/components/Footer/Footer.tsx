import React from "react";
import styles from "./footer.module.scss";

const Footer: React.FC = () => {
  return (
    <section className={styles.container}>
      <p className={styles.paragraph}>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className={styles.content}>
        <div>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
        <ul className={styles.content__list}>
          <li>
            <a href="#">Яндекс.Практикум</a>
          </li>
          <li>
            <a href="#">Github</a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Footer;
