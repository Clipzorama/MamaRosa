import { useState } from "react";

import Hero from "../src/HeroSection/Hero";
import Nav from "./components/Nav";
import Menu from "./components/Menu";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer"

function App() {
  const [language, setLanguage] = useState("nl");

  return (
    <>
      <Nav language={language} setLanguage={setLanguage} />
      <Hero language={language} />
      <Menu language={language} />
      <About language={language} />
      <Contact language={language} />
      <Footer language={language} />
    </>
  );
}

export default App;