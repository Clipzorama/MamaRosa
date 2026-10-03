import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";

import Hero from "../src/HeroSection/Hero";
import Nav from "./components/Nav";
import { shouldPlayIntro, useHomepageIntro } from "./lib/useHomepageIntro";
import "./HeroSection/Intro.css";

const Menu = lazy(() => import("./components/Menu"));
const FoodJourney = lazy(() => import("./components/FoodJourney"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  const [language, setLanguage] = useState("nl");
  const [introActive, setIntroActive] = useState(shouldPlayIntro);
  const siteRef = useRef(null);
  const introBusy = useRef(introActive);
  const completeIntro = useCallback(() => {
    introBusy.current = false;
    setIntroActive(false);
  }, []);
  useHomepageIntro(siteRef, introActive, completeIntro);

  useEffect(() => {
    const enterHome = () => {
      if (introBusy.current) return;
      introBusy.current = true;
      window.scrollTo({ top: 0, behavior: "instant" });
      setIntroActive(true);
    };
    // Delegation includes the header, mobile dialog and footer Home links.
    // Nav closes its dialog before this handler runs; no page reload is needed.
    const handleHome = (event) => {
      const link = event.target.closest?.('a[href="#home"]');
      if (!link || event.defaultPrevented || event.button !== 0 ||
          event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (window.location.hash !== "#home") history.pushState(null, "", "#home");
      enterHome();
    };
    const handleHash = () => {
      if (shouldPlayIntro()) enterHome();
    };
    document.addEventListener("click", handleHome);
    window.addEventListener("hashchange", handleHash);
    return () => {
      document.removeEventListener("click", handleHome);
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  useEffect(() => {
    // These lazy sections may not exist when the browser first resolves a URL
    // fragment. Menu and the pinned About journey own their special landings.
    const hash = window.location.hash;
    if (!["#contact", "#about"].includes(hash)) return undefined;
    let cancelled = false;
    let frame;
    const align = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (cancelled || window.location.hash !== hash) return;
        const target = document.querySelector(hash);
        if (!target || (hash === "#about" && target.closest('[data-animated="true"]'))) return;
        const header = document.querySelector(".editorial-nav");
        window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top -
          (header?.getBoundingClientRect().height ?? 0), behavior: "instant" });
      });
    };
    const cancel = () => { cancelled = true; };
    const mutations = new MutationObserver(align);
    const sizes = new ResizeObserver(align);
    mutations.observe(siteRef.current, { childList: true, subtree: true });
    sizes.observe(siteRef.current);
    window.addEventListener("mamarosa:layout-change", align);
    window.addEventListener("load", align);
    window.addEventListener("pointerdown", cancel, { passive: true });
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", cancel);
    document.fonts?.ready.then(align);
    align();
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      mutations.disconnect();
      sizes.disconnect();
      window.removeEventListener("mamarosa:layout-change", align);
      window.removeEventListener("load", align);
      window.removeEventListener("pointerdown", cancel);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
    };
  }, []);

  return (
    <div ref={siteRef} className="site-shell" data-intro={introActive ? "playing" : undefined}>
      <Nav language={language} setLanguage={setLanguage} />
      <Hero language={language} cinematic />
      {introActive && (
        <div className="intro-chrome">
          <div className="intro-chrome__note" aria-hidden="true">
            <span>Surinaams · Caribisch · Fusion</span>
          </div>
          <div className="intro-chrome__invitation" aria-hidden="true">
            <span className="intro-chrome__rule" />
            <p>Met liefde bereid.</p>
            <span>Voor jou geserveerd.</span>
          </div>
          <span className="intro-chrome__place" aria-hidden="true">Almere, Nederland</span>
        </div>
      )}
      <Suspense fallback={null}>
        <Menu language={language} />
        <FoodJourney language={language} />
        <Contact language={language} />
        <Footer language={language} />
      </Suspense>
    </div>
  );
}

export default App;
