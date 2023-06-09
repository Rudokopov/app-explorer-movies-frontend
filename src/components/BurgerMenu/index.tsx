import React, { useRef, useState } from "react";
import styles from "./burgermenu.module.scss";
import closeBtnIcon from "../../images/closeButton.svg";
import profileIcon from "../../images/profile.svg";
import { Link, useLocation } from "react-router-dom";

type BurgerMenuProps = {
  isOpen: boolean;
  closeMenu: () => void;
  menuRef: any;
};

const BurgerMenu: React.FC<BurgerMenuProps> = (props) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isOpen, closeMenu, menuRef } = props;

  return (
    <div
      ref={menuRef}
      className={`${styles.burgerMenu} ${isOpen ? styles.open : ""}`}
    >
      <img
        className={styles.burgerIcon}
        src={closeBtnIcon}
        onClick={closeMenu}
        alt="Закрыть"
      />
      <div className={styles.menuLinks}>
        <Link className={currentPath === "/" ? styles.active : ""} to="/">
          Главная
        </Link>
        <Link
          className={currentPath === "/movies" ? styles.active : ""}
          to="/movies"
        >
          Фильмы
        </Link>
        <Link
          className={currentPath === "/films/saved" ? styles.active : ""}
          to="/films/saved"
        >
          Сохраненный фильмы
        </Link>
      </div>
      <div className={styles.iconProfile}>
        <img src={profileIcon} alt="Иконка профиля" />
      </div>
    </div>
  );
};

export default BurgerMenu;
