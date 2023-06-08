import styles from "./app.module.scss";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useState } from "react";
import Main from "../pages/Main";
import SaveFilms from "../pages/SaveFilms";
import Unathorized from "../pages/Unathorized";
import UserInfo from "./UserInfo/UserInfo";

const App: React.FC = () => {
  const [isLoggin, setLoggin] = useState(false);
  return (
    <div className={styles.container}>
      <Header />
      {/* {isLoggin ? <Main /> : <Unathorized />} */}
      {/* <SaveFilms /> */}
      <UserInfo title="Иван" email="megan@fox.ru" />
      {/* <Footer /> */}
    </div>
  );
};

export default App;
