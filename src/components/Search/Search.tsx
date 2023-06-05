import React, { useState } from "react";
import styles from "./search.module.scss";
import Switch from "@mui/material/Switch";
import styled from "@emotion/styled";

const CustomSwitch = styled(Switch)({
  "& .MuiSwitch-thumb": {
    backgroundColor: "#2BE080", // Измените цвет для выключенного состояния
    boxShadow: "0 0 0 1px white, 0 0 0 2px white",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#343434",
  },
});

const Search: React.FC = () => {
  const [short, setShort] = useState(false);

  const handleShortParam = () => {
    short ? setShort(false) : setShort(true);
  };

  console.log(short);
  return (
    <section className={styles.container}>
      <form className={styles.form} action="submit">
        <input placeholder="Фильмы" type="text" />
        <button type="submit">Найти</button>
      </form>
      <div className={styles.switch}>
        <CustomSwitch onClick={handleShortParam} />
        <p>Короткометражки</p>
      </div>
    </section>
  );
};

export default Search;
