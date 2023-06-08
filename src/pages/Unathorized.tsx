import React from "react";
import Banner from "../components/Banner/Banner";
import Technologies from "../components/Technologies/Technologies";
import Student from "../components/Student/Student";
import About from "../components/About/About";

const Unathorized: React.FC = () => {
  return (
    <>
      <Banner />
      <About />
      <Technologies />
      <Student />
    </>
  );
};

export default Unathorized;
