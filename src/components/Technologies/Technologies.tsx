import React from "react";
import sharedStyles from "../About/about.module.scss";
import styles from "./technologies.module.scss";

const Technologies: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={`${sharedStyles.title} ${styles.title}`}>Технологии</h2>
      <div className={styles.content}>
        <h3 className={styles.content__title}>7 технологий</h3>
        <p className={styles.content__paragraph}>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className={styles.content__list}>
          <li>
            <span>HTML</span>
          </li>
          <li>
            <span>CSS</span>
          </li>
          <li>
            <span>JS</span>
          </li>
          <li>
            <span>React</span>
          </li>
          <li>
            <span>Git</span>
          </li>
          <li>
            <span>Express.js</span>
          </li>
          <li>
            <span>mongoDB</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Technologies;
