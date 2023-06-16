import React from "react";
import sharedStyles from "../About/about.module.scss";
import styles from "./technologies.module.scss";

const Technologies: React.FC = () => {
  return (
    <section className={styles.container}>
      <h2 className={`${sharedStyles.title} ${styles.title}`}>Технологии</h2>
      <div className={styles.content}>
        <h3 className={styles.contentTitle}>7 технологий</h3>
        <p className={styles.contentParagraph}>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className={styles.contentList}>
          <li className={styles.contentListItem}>
            <span className={styles.contentListItemSpan}>HTML</span>
          </li>
          <li className={styles.contentListItem}>
            <span className={styles.contentListItemSpan}>CSS</span>
          </li>
          <li className={styles.contentListItem}>
            <span className={styles.contentListItemSpan}>JS</span>
          </li>
          <li className={styles.contentListItem}>
            <span className={styles.contentListItemSpan}>React</span>
          </li>
          <li className={styles.contentListItem}>
            <span className={styles.contentListItemSpan}>Git</span>
          </li>
          <li className={styles.contentListItem}>
            <span className={styles.contentListItemSpan}>Express.js</span>
          </li>
          <li className={styles.contentListItem}>
            <span className={styles.contentListItemSpan}>mongoDB</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Technologies;
