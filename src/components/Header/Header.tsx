import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from "../../images/logo.svg";
import styles from "./header.module.scss";
import profileLogo from "../../images/profile-logo.png";
import burgerIcon from "../../images/burger.svg";
import BurgerMenu from "../BurgerMenu";
import { useSelector } from "react-redux";
import { selectApiData } from "../../app/api/selectors";
import { Link, NavLink } from "react-router-dom";

const Header: React.FC = () => {
  const [isMobile, setMobile] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const { isLogin } = useSelector(selectApiData);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node;
    const menuButton = menuButtonRef.current;
    const menuRefElement = menuRef.current;
    if (
      menuRefElement &&
      menuButton &&
      !menuRefElement.contains(target) &&
      target !== menuButton &&
      !menuButton.contains(target)
    ) {
      setMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.container}>
      {!isLogin ? (
        <>
          <a className={styles.link} href="/">
            <img src={logo} alt="logo" />
          </a>
          <ul className={styles.list}>
            <>
              <li className={styles.listItem}>
                <Link className={styles.buttonLink} to="/signup">
                  <button className={styles.button} type="button">
                    Регистрация
                  </button>
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link className={styles.buttonLink} to="/signin">
                  <button
                    className={`${styles.button} ${styles.dedicated}`}
                    type="button"
                  >
                    Войти
                  </button>
                </Link>
              </li>
            </>
          </ul>
        </>
      ) : (
        <>
          {isMobile ? (
            <>
              <a className={styles.link} href="/">
                <img src={logo} alt="logo" />
              </a>
              <ul className={`${styles.list}`}>
                <li className={styles.listItem}>
                  <button
                    ref={menuButtonRef}
                    className={styles.burgerButton}
                    type="button"
                  >
                    <img
                      src={burgerIcon}
                      alt="Иконка мобильного меню"
                      onClick={toggleMobileMenu}
                    />
                  </button>
                </li>
                <BurgerMenu
                  menuRef={menuRef}
                  closeMenu={toggleMobileMenu}
                  isOpen={isMenuOpen}
                />
              </ul>
            </>
          ) : (
            <>
              <ul className={`${styles.list}`}>
                <li className={styles.listItem}>
                  <a href="/">
                    <img src={logo} alt="logo" />
                  </a>
                </li>
                <li>
                  <button
                    className={`${styles.button} ${
                      isLogin ? styles.isLoggin : ""
                    }`}
                    type="button"
                  >
                    <NavLink to="/movies" className={styles.buttonLink}>
                      {({ isActive }) => (
                        <span
                          className={
                            isActive ? ` ${styles.buttonLinkActive}` : ""
                          }
                        >
                          Фильмы
                        </span>
                      )}
                    </NavLink>
                  </button>
                  <button className={styles.button} type="button">
                    <NavLink to="/films/saved" className={styles.buttonLink}>
                      {({ isActive }) => (
                        <span
                          className={
                            isActive ? ` ${styles.buttonLinkActive}` : ""
                          }
                        >
                          Сохраненные фильмы
                        </span>
                      )}
                    </NavLink>
                  </button>
                </li>
              </ul>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <button className={styles.button} type="button">
                    <Link to="/me">
                      <img src={profileLogo} alt="Иконка профиля" />
                    </Link>
                  </button>
                </li>
              </ul>
            </>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
