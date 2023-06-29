import styles from "./app.module.scss";
import { useEffect } from "react";
import Main from "../pages/Main";
import { Route, Routes, useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import Films from "../pages/Films";
import Cards from "./Cards";
import CardUser from "./CardUser";
import Auth from "../pages/Auth";
import UserForm from "./SubmitForm";
import Error from "./Error";
import UserPage from "../pages/UserPage";
import { useAppDispatch } from "../app/store";
import {
  fetchLogin,
  fetchRegister,
  fetchUser,
  setLogin,
  setUser,
} from "../app/api/slice";
import { LoginResponse, Status, User } from "../app/api/types";
import { clearFilterState } from "../app/filters/slice";

export type AuthParams = {
  name?: string;
  email: string;
  password: string;
};

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getUser = async () => {
    const res = await dispatch(fetchUser());
    const currentUser = res.payload as User;
    if (currentUser) {
      dispatch(setUser(currentUser));
      dispatch(setLogin(true));
    }
  };

  // useEffect(() => {
  //   if (location.pathname === "/films/saved") {
  //     dispatch(clearFilterState());
  //   }
  // }, [dispatch, location]);

  useEffect(() => {
    getUser();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await dispatch(fetchLogin({ email, password })); // не забыть типизировать, возвращает юзака
    if (res.payload) {
      const token = res.payload as LoginResponse;
      localStorage.setItem("jwt", token.token);
      navigate("/");
    }
  };

  const registration = async (
    email: string,
    password: string,
    name: string | undefined
  ) => {
    try {
      if (name) {
        const res = await dispatch(fetchRegister({ name, email, password }));
        if (res && Status.SUCCESS) {
          alert(`Вы успешно зарегестрировались!`);
          navigate("/signin");
        }
      }
    } catch (err: any) {
      alert(`Произошла ошибка ${err.message}`);
    }
  };

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
