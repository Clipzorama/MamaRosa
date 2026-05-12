import { lazy, Suspense, useState } from "react";

import Hero from "../src/HeroSection/Hero";
import Nav from "./components/Nav";

const Menu = lazy(() => import("./components/Menu"));
const ScrollStory = lazy(() => import("./components/ScrollStory"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  const [language, setLanguage] = useState("nl");

  return (
    <>
      <Nav language={language} setLanguage={setLanguage} />
      <Hero language={language} />
      <Suspense fallback={null}>
        <Menu language={language} />
        <ScrollStory language={language} />
        <About language={language} />
        <Contact language={language} />
        <Footer language={language} />
      </Suspense>
    </>
  );
}

export default App;
