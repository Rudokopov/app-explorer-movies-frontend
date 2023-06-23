import React from "react";
import styles from "./userinfo.module.scss";
import { useAppDispatch } from "../../app/store";
import { useNavigate } from "react-router";
import { setLogin } from "../../app/api/slice";

type UserInfoProps = {
  title: string;
  email: string;
};

const UserInfo: React.FC<UserInfoProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const signOut = () => {
    localStorage.removeItem("jwt");
    dispatch(setLogin(false));
    navigate("/", { replace: true });
  };

  const { title, email } = props;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Привет, {title}</h2>
      <form className={styles.list}>
        <li className={styles.listItem}>
          <p className={styles.listParagraph}>Имя</p>
          <p className={styles.listParagraph}>{title}</p>
        </li>
        <li className={styles.listItem}>
          <p className={styles.listParagraph}>E-mail</p>
          <p className={styles.listParagraph}>{email}</p>
        </li>
      </form>
      <div className={styles.tools}>
        <button className={`${styles.button}`} type="button">
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
    </div>
  );
};

export default UserInfo;
