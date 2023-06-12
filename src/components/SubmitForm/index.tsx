import React from "react";
import logo from "../../images/logo.svg";
import styles from "./submitform.module.scss";
import { Link } from "react-router-dom";

type UserFormProps = {
  title: "Добро пожаловать!" | "Рады видеть!";
  submitOption: () => void;
  btnTitle: "Зарегестрироваться" | "Войти";
  formType: "auth" | "reg";
};

const UserForm: React.FC<UserFormProps> = (props) => {
  const { title, submitOption, btnTitle, formType } = props;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img className={styles.image} src={logo} alt="логотип" />
        <h2 className={styles.title}>{title}</h2>
        <form onSubmit={submitOption} className={styles.form}>
          <fieldset className={styles.form__container}>
            {formType === "reg" && (
              <>
                <label className={styles.form__label} htmlFor="name">
                  Имя
                </label>
                <input
                  className={styles.form__input}
                  type="text"
                  id="name"
                  name="name"
                  value={"Василий"}
                />
              </>
            )}
            <label className={styles.form__label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.form__input}
              type="email"
              id="email"
              name="email"
              value={"pochta@yandex.ru"}
            />

            <label className={styles.form__label} htmlFor="password">
              Пароль
            </label>
            <input
              className={`${styles.form__input} ${styles.error}`}
              type="password"
              id="password"
              name="password"
              value={"1234567890"}
            />
            <span className={styles.form__message}>Что-то пошло не так...</span>
          </fieldset>
        </form>
        <div className={styles.tools}>
          <button className={styles.tools__submit} type="submit">
            {btnTitle}
          </button>
          {formType === "auth" ? (
            <>
              <p className={styles.tools__paragraph}>
                Ещё не зарегистрированы?
                <Link to="/signup" className={styles.tools__paragraph_link}>
                  Регистрация
                </Link>
              </p>
            </>
          ) : (
            <>
              <p className={styles.tools__paragraph}>
                Уже зарегестрированы?
                <Link to="/signin" className={styles.tools__paragraph_link}>
                  Войти
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserForm;
