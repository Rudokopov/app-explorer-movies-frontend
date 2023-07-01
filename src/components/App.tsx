import styles from "./app.module.scss";
import { useCallback, useEffect } from "react";
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
import {
  fetchLogin,
  fetchRegister,
  fetchUser,
  setLogin,
  setUser,
} from "../app/api/slice";
import { LoginResponse, User } from "../app/api/types";
import { useSelector } from "react-redux";
import { selectApiData } from "../app/api/selectors";
import { Film } from "../app/films/types";
import { fetchFilms } from "../app/films/slice";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import { clearFilterState } from "../app/filters/slice";

export type AuthParams = {
  name?: string;
  email: string;
  password: string;
};

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status } = useSelector(selectApiData);

  const getUser = async () => {
    try {
      const res = await dispatch(fetchUser());
      const currentUser = res.payload as User;
      if (currentUser) {
        dispatch(setUser(currentUser));
        dispatch(setLogin(true));
      }
      if (status === "error") {
        dispatch(clearFilterState());
        dispatch(setLogin(false));
        localStorage.removeItem("jwt"); // Если сервер вернет rejected то выполнится очистка данных о сессии пользователя
      }
    } catch (err: any) {
      alert(
        `Произошла ошибка при получении данных об пользователе ${err.message} `
      );
    }
  };

  const getFilms = useCallback(async () => {
    try {
      const response = await dispatch(fetchFilms());
      const films = response.payload as Film[];
      return films;
    } catch (err: any) {
      alert(`Произошла ошибка при получении фильмов ${err.message}`);
      return [];
    }
  }, [dispatch]);

  useEffect(() => {
    getUser();
    getFilms();
  }, [navigate]);

  const login = async (email: string, password: string) => {
    const res = await dispatch(fetchLogin({ email, password }));
    if (res.payload) {
      const token = res.payload as LoginResponse;
      localStorage.setItem("jwt", token.token);
      navigate("/films");
    } else {
      localStorage.removeItem("jwt");
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
        if (res && status === "success") {
          alert(`Вы успешно зарегестрировались!`);
          const token = res.payload as LoginResponse;
          localStorage.setItem("jwt", token.token);
          getUser();

          navigate("/films");
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
        <Route path="/me" element={<PrivateRoute element={<UserPage />} />} />
        <Route
          path="/films"
          element={<PrivateRoute element={<Films children={<Cards />} />} />}
        />
        <Route
          path="/films/saved"
          element={<PrivateRoute element={<Films children={<CardUser />} />} />}
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
