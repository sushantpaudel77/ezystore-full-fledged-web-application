import React from "react";
import { Footer } from "./components/footer/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Pageheading from "./components/Pageheading";


function App() {
  return (
    <>
      <Header />
      {/* <Pageheading /> */}
      <Home />
      <Footer />
    </>
  );
}

export default App;
