import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectApiData } from "../app/api/selectors";
import { useNavigate } from "react-router";

type AuthProps = {
  children: React.ReactNode;
};

const Auth: React.FC<AuthProps> = (props) => {
  const navigate = useNavigate();
  const { isLogin } = useSelector(selectApiData);

  useEffect(() => {
    if (isLogin) {
      navigate("/movies");
    }
  }, [isLogin]);
  const { children } = props;
  return <>{children}</>;
};

export default Auth;
