import styles from "./app.module.scss";
import About from "./About/About";
import Banner from "./Banner/Banner";
import Header from "./Header/Header";
import Student from "./Student/Student";
import Technologies from "./Technologies/Technologies";
import Footer from "./Footer/Footer";

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Banner />
      <About />
      <Technologies />
      <Student />
      <Footer />
    </div>
  );
}

export default App;
