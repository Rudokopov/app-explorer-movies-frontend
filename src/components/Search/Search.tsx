import React, { useState } from "react";
import styles from "./search.module.scss";
import { styled, Switch } from "@mui/material";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  marginRight: "12px",
  display: "flex",
  alignItems: "center",
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#343434",
        opacity: 1,
        border: "none",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#2BE080",
    boxShadow: "0 0 0 1px white, 0 0 0 1px white",
    width: 12,
    height: 12,
    margin: "2px",
  },
  "& .MuiSwitch-track": {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    opacity: 1,
    transition: "background-color 0.2s ease",
  },
}));

const Search: React.FC = () => {
  const [short, setShort] = useState(false);

  const handleShortParam = () => {
    short ? setShort(false) : setShort(true);
  };

  console.log(short);
  return (
    <section className={styles.container}>
      <form className={styles.form} action="submit">
        <input className={styles.formInput} placeholder="Фильмы" type="text" />
        <button className={styles.button} type="submit">
          Найти
        </button>
      </form>
      <div className={styles.switch}>
        <CustomSwitch onClick={handleShortParam} />
        <p className={styles.switchDescription}>Короткометражки</p>
      </div>
    </section>
  );
};

export default Search;
