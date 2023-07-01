import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectApiData } from "../../app/api/selectors";
import React from "react";

const PrivateRoute: React.FC<{
  element: JSX.Element;
}> = ({ element }) => {
  // Проверяем, авторизован ли пользователь (ваша логика проверки)
  const { isLogin } = useSelector(selectApiData); // Реализуйте проверку авторизации

  return isLogin ? (
    <React.Fragment>{element}</React.Fragment>
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default PrivateRoute;
