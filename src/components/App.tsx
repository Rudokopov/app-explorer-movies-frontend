import styles from "./app.module.scss";
import About from "./About/About";
import Banner from "./Banner/Banner";
import Header from "./Header/Header";
import Student from "./Student/Student";
import Technologies from "./Technologies/Technologies";
import Footer from "./Footer/Footer";
import { useState } from "react";

const App: React.FC = () => {
  const [isLoggin, setLoggin] = useState(true);
  return (
    <div className={styles.container}>
      <Header />
      {!isLoggin ? (
        <>
          <Banner />
          <About />
          <Technologies />
          <Student />
        </>
      ) : (
        <About />
      )}

      <Footer />
    </div>
  );
};

export default App;