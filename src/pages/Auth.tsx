import React from "react";

type AuthProps = {
  children: React.ReactNode;
};

const Auth: React.FC<AuthProps> = (props) => {
  const { children } = props;
  return <>{children}</>;
};

export default Auth;
