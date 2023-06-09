import React from "react";
import Header from "../components/Header/Header";
import UserInfo from "../components/UserInfo/UserInfo";

const UserPage: React.FC = () => {
  return (
    <>
      <Header />
      <UserInfo title="Педро" email="mech@mail.ru" />
    </>
  );
};

export default UserPage;
