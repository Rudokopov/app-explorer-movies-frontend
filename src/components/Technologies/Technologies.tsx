import React from "react";
import sharedStyles from "../About/about.module.scss";
import styles from "./technologies.module.scss";

const Technologies: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={`${sharedStyles.title} ${styles.title}`}>Технологии</h2>
      <div className={styles.content}>
        <h3>7 технологий</h3>
        <p>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul>
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
