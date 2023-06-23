import styles from "./app.module.scss";
import { useEffect, useState } from "react";
import Main from "../pages/Main";
import { Route, Routes, useNavigate } from "react-router";
import Films from "../pages/Films";
import Cards from "./Cards";
import CardUser from "./CardUser";
import Auth from "../pages/Auth";
import UserForm from "./SubmitForm";
import Error from "./Error";
import UserPage from "../pages/UserPage";
import { useAppDispatch } from "../app/store";
import { fetchLogin, fetchUser, setLogin, setUser } from "../app/api/slice";
import { User } from "../app/api/types";

export type AuthParams = {
  name?: string;
  email: string;
  password: string;
};

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    const res = await dispatch(fetchUser());
    const currentUser = res.payload as User;
    if (currentUser) {
      setUser(currentUser);
      dispatch(setLogin(true));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const login = async (email: string, password: string) => {
    const res: any = await dispatch(fetchLogin({ email, password }));
    if (res.payload) {
      const token: string = res.payload.token;
      localStorage.setItem("jwt", token);
      navigate("/");
    }
  };

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
