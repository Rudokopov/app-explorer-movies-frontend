import React, { ReactComponentElement } from "react";
import Header from "../components/Header/Header";
import Search from "../components/Search/Search";
import Cards from "../components/Cards";
import Footer from "../components/Footer/Footer";

type FilmsProps = {
  children: React.ReactNode;
};

const Films: React.FC<FilmsProps> = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      <Search />
      {children}
      <Footer />
    </>
  );
};

export default Films;
