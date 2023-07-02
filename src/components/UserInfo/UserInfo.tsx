import React, { useEffect, useState } from "react";
import styles from "./userinfo.module.scss";
import sharedStyles from "../SubmitForm/submitform.module.scss";
import { useAppDispatch } from "../../app/store";
import { useNavigate } from "react-router";
import { fetchUserUpdate, setLogin, setUser } from "../../app/api/slice";
import { useSelector } from "react-redux";
import { selectApiData } from "../../app/api/selectors";
import { User } from "../../app/api/types";
import { clearFilterState } from "../../app/filters/slice";

const UserInfo: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useSelector(selectApiData);

  const [inputName, setInputName] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [isNotCorrect, setCorrect] = useState<boolean>(true);

  const validateEmail = (value: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setEmailError("Некорректный формат электронной почты");
      setCorrect(true);
      return;
    }
    if (value === user.email) {
      setCorrect(true);
      return;
    }

    setCorrect(false);
    setEmailError("");
  };

  const validateName = (value: string) => {
    if (value.length < 2) {
      setNameError("Имя не может быть короче двух символов");
      setCorrect(true);
      return;
    }
    if (value === user.name) {
      setCorrect(true);
      return;
    }

    setCorrect(false);
    setNameError("");
  };

  useEffect(() => {
    setInputName(user.name);
    setInputEmail(user.email);
  }, [user]);

  const onChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value.charAt(0) === " ") {
      alert("Первый символ не может быть пробелом");
      return;
    }
    setInputName(evt.target.value);
    validateName(evt.target.value);
  };

  const onChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(evt.target.value);
    validateEmail(evt.target.value);
  };

  const onSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    try {
      if (emailError || nameError) {
        return;
      }
      const res = await dispatch(
        fetchUserUpdate({ name: inputName, email: inputEmail })
      );
      const currentUser = res.payload as User;
      if (currentUser) {
        dispatch(setUser(currentUser));
        setCorrect(true);
        alert(`Информация успешно обновлена!`);
        return;
      }
      alert(`Произошла ошибка, попробуйте в другой раз`);
    } catch (err: any) {
      alert(
        `Ошибка произошла при обновлении данных пользователя ${err.message}`
      );
    }
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    dispatch(setLogin(false));
    dispatch(clearFilterState());
    navigate("/", { replace: true });
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Привет, {user.name}</h2>
      <form onSubmit={onSubmit} action="submit">
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <p className={styles.listParagraph}>Имя</p>
            <input
              className={
                nameError
                  ? `${styles.listParagraphInput} ${sharedStyles.error}`
                  : `${styles.listParagraphInput}`
              }
              onChange={onChangeName}
              type="text"
              name="name"
              required
              value={inputName}
            />
          </li>
          {nameError && (
            <span className={sharedStyles.formMessage}>{nameError}</span>
          )}
          <li className={styles.listItem}>
            <p className={styles.listParagraph}>E-mail</p>
            <input
              className={
                emailError
                  ? `${styles.listParagraphInput} ${sharedStyles.error}`
                  : `${styles.listParagraphInput}`
              }
              onChange={onChangeEmail}
              type="email"
              name="email"
              required
              value={inputEmail}
            />
          </li>
          {emailError && (
            <span className={sharedStyles.formMessage}>{emailError}</span>
          )}
        </ul>
        <div className={styles.tools}>
          <button
            className={styles.button}
            disabled={isNotCorrect}
            type="submit"
          >
            Редактировать
          </button>

          <button
            className={`${styles.button} ${styles.button_red}`}
            type="button"
            onClick={signOut}
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
