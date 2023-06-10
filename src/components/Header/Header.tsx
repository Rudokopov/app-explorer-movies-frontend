import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from "../../images/logo.svg";
import styles from "./header.module.scss";
import profileLogo from "../../images/profile-logo.png";
import burgerIcon from "../../images/burger.svg";
import BurgerMenu from "../BurgerMenu";

const Header: React.FC = () => {
  const [isLoggin, setLoggin] = useState(true);
  const [isMobile, setMobile] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);

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
    <section className={styles.container}>
      {!isLoggin ? (
        <>
          <a>
            <img src={logo} alt="logo" />
          </a>
          <ul className={styles.content}>
            <>
              <li>
                <button className={styles.button} type="button">
                  Регистрация
                </button>
              </li>
              <li>
                <button
                  className={`${styles.button} ${styles.dedicated}`}
                  type="button"
                >
                  Войти
                </button>
              </li>
            </>
          </ul>
        </>
      ) : (
        <>
          {isMobile ? (
            <>
              <a>
                <img src={logo} alt="logo" />
              </a>
              <li>
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
            </>
          ) : (
            <>
              <ul className={`${styles.content}`}>
                <li>
                  <a href="#">
                    <img src={logo} alt="logo" />
                  </a>
                </li>
                <li>
                  <button
                    className={`${styles.button} ${
                      isLoggin ? styles.isLoggin : ""
                    }`}
                    type="button"
                  >
                    Фильмы
                  </button>
                  <button className={styles.button} type="button">
                    Сохраненный фильмы
                  </button>
                </li>
              </ul>
              <ul className={styles.content}>
                <li>
                  <button className={styles.button} type="button">
                    <img src={profileLogo} alt="Иконка профиля" />
                  </button>
                </li>
              </ul>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Header;
