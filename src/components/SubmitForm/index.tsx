import React, { useState } from "react";
import logo from "../../images/logo.svg";
import styles from "./submitform.module.scss";
import { Link } from "react-router-dom";

type UserFormProps = {
  title: "Добро пожаловать!" | "Рады видеть!";
  submitOption: (email: string, pasword: string) => void;
  btnTitle: "Зарегестрироваться" | "Войти";
  formType: "auth" | "reg";
};

const UserForm: React.FC<UserFormProps> = (props) => {
  const { title, submitOption, btnTitle, formType } = props;
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  const onChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  const onChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  const onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    submitOption(email, password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img className={styles.image} src={logo} alt="логотип" />
        <h2 className={styles.title}>{title}</h2>
        <form onSubmit={onSubmit} className={styles.form}>
          <fieldset className={styles.formContainer}>
            {formType === "reg" && (
              <>
                <label className={styles.formLabel} htmlFor="name">
                  Имя
                </label>
                <input
                  className={styles.formInput}
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={onChangeName}
                  required
                />
              </>
            )}
            <label className={styles.formLabel} htmlFor="email">
              Email
            </label>
            <input
              className={styles.formInput}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
              required
            />

            <label className={styles.formLabel} htmlFor="password">
              Пароль
            </label>
            <input
              className={`${styles.formInput} ${styles.error}`}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
              required
            />
            <span className={styles.formMessage}>Что-то пошло не так...</span>
          </fieldset>

          <div className={styles.tools}>
            <button className={styles.toolsSubmit} type="submit">
              {btnTitle}
            </button>
            {formType === "auth" ? (
              <>
                <p className={styles.toolsParagraph}>
                  Ещё не зарегистрированы?
                  <Link to="/signup" className={styles.toolsParagraph_link}>
                    Регистрация
                  </Link>
                </p>
              </>
            ) : (
              <>
                <p className={styles.toolsParagraph}>
                  Уже зарегестрированы?
                  <Link to="/signin" className={styles.toolsParagraph_link}>
                    Войти
                  </Link>
                </p>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
