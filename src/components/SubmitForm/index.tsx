import React, { useState } from "react";
import logo from "../../images/logo.svg";
import styles from "./submitform.module.scss";
import { Link } from "react-router-dom";
import { Status } from "../../app/api/types";

type UserFormProps = {
  title: "Добро пожаловать!" | "Рады видеть!";
  submitOption: (
    email: string,
    pasword: string,
    name?: string
  ) => Promise<void>;
  btnTitle: "Зарегестрироваться" | "Войти";
  formType: "auth" | "reg";
};

const UserForm: React.FC<UserFormProps> = (props) => {
  const { title, submitOption, btnTitle, formType } = props;
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const validateEmail = (value: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setEmailError("Некорректный формат электронной почты");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value: string) => {
    if (value.length < 4) {
      setPasswordError("Пароль должен содержать не менее 4 символов");
    } else {
      setPasswordError("");
    }
  };

  const onChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value.includes(" ")) {
      return;
    }
    setName(evt.target.value);
  };

  const onChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
    validateEmail(evt.target.value);
  };

  const onChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value.includes(" ")) {
      return;
    }
    setPassword(evt.target.value);
    validatePassword(evt.target.value);
  };

  const reseter = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (emailError || passwordError) {
      return;
    }

    submitOption(email, password, name);
    if (Status.SUCCESS) {
      reseter();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link className={styles.logoLink} to="/">
          <img className={styles.image} src={logo} alt="логотип" />
        </Link>
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
              className={
                emailError
                  ? `${styles.formInput} ${styles.error}`
                  : `${styles.formInput}`
              }
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
              required
            />
            {emailError && (
              <span className={styles.formMessage}>{emailError}</span>
            )}

            <label className={styles.formLabel} htmlFor="password">
              Пароль
            </label>
            <input
              className={
                passwordError
                  ? `${styles.formInput} ${styles.error}`
                  : `${styles.formInput}`
              }
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
              required
            />
            {passwordError && (
              <span className={styles.formMessage}>{passwordError}</span>
            )}
          </fieldset>

          <div className={styles.tools}>
            <button className={styles.toolsSubmit} type="submit">
              {btnTitle}
            </button>
            {formType === "auth" ? (
              <>
                <p className={styles.toolsParagraph}>
                  Ещё не зарегистрированы?
                  <Link to="/signup" className={styles.toolsParagraphLink}>
                    Регистрация
                  </Link>
                </p>
              </>
            ) : (
              <>
                <p className={styles.toolsParagraph}>
                  Уже зарегестрированы?
                  <Link to="/signin" className={styles.toolsParagraphLink}>
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
