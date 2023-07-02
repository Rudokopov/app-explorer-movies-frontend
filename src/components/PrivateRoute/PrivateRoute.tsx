import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectApiData } from "../../app/api/selectors";
import React, { useEffect, useState } from "react";

const PrivateRoute: React.FC<{
  element: JSX.Element;
}> = ({ element }) => {
  const { isLogin, user } = useSelector(selectApiData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLogin) {
    return <Navigate to="/" />;
  }

  return <React.Fragment>{element}</React.Fragment>;
};

export default PrivateRoute;
