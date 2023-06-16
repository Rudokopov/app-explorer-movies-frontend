import React from "react";
import styles from "./footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.container}>
      <p className={styles.paragraph}>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className={styles.content}>
        <div>
          <span className={styles.contentSpan}>
            &copy; {new Date().getFullYear()}
          </span>
        </div>
        <ul className={styles.contentList}>
          <li className={styles.contentListItem}>
            <a className={styles.link} href="/">
              Яндекс.Практикум
            </a>
          </li>
          <li className={styles.contentListItem}>
            <a className={styles.link} href="https://github.com/Rudokopov">
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
