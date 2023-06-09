import styles from "./app.module.scss";
import { useState } from "react";
import Main from "../pages/Main";
import { Route, Routes } from "react-router";

const App: React.FC = () => {
  const [isLoggin, setLoggin] = useState(false);

  const registration = () => {};

  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
};

export default App;
