import styles from "./app.module.scss";
import { useState } from "react";
import Main from "../pages/Main";
import { Route, Routes } from "react-router";
import Films from "../pages/Films";
import Cards from "./Cards";
import CardUser from "./CardUser";
import Auth from "../pages/Auth";
import UserForm from "./SubmitForm";
import Error from "./Error";
import UserInfo from "./UserInfo/UserInfo";
import UserPage from "../pages/UserPage";

const App: React.FC = () => {
  const [isLoggin, setLoggin] = useState(false);

  const login = () => {};

  const registration = () => {};

  return (
    <main className={styles.container}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/me" element={<UserPage />} />
        <Route path="/films" element={<Films children={<Cards />} />} />
        <Route
          path="/films/saved"
          element={<Films children={<CardUser />} />}
        />
        <Route
          path="/signin"
          element={
            <Auth
              children={
                <UserForm
                  title="Рады видеть!"
                  submitOption={login}
                  btnTitle="Войти"
                  formType="auth"
                />
              }
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Auth
              children={
                <UserForm
                  title="Добро пожаловать!"
                  submitOption={registration}
                  btnTitle="Зарегестрироваться"
                  formType="reg"
                />
              }
            />
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </main>
  );
};

export default App;
