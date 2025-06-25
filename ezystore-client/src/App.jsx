import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import React from "react";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
