import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import phoner from "../adds/phoner.webp";
import { mountUnicornScene } from "../lib/unicornScene";

const sceneProfiles = {
  desktop: { projectId: "lrYTiuLBVWmOfPRhCTBU", scale: 1, dpi: 0.9, fps: 120 },
  tablet: { projectId: "xnRwB8iye1MeiSPw8wcA", scale: 1, dpi: 0.75, fps: 60 },
};

const getDevice = () => window.innerWidth <= 640 ? "mobile" : window.innerWidth <= 1030 ? "tablet" : "desktop";

function Effect() {
  const [device, setDevice] = useState(getDevice);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDevice());
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <HeroArtwork key={`${device}-${reducedMotion}`} device={device} reducedMotion={reducedMotion} />
  );
}

function HeroArtwork({ device, reducedMotion }) {
  const [loaded, setLoaded] = useState(false);
  const [settled, setSettled] = useState(false);
  const [posterReady, setPosterReady] = useState(false);
  const sceneRef = useRef(null);
  const posterRef = useRef(null);
  const staticArtwork = device === "mobile" || reducedMotion;
  useEffect(() => {
    if (staticArtwork) return undefined;
    let disposed = false;
    let deadline;
    const stop = mountUnicornScene(sceneRef.current, sceneProfiles[device], (ready) => {
      if (disposed) return;
      setLoaded(ready);
      if (ready) {
        clearTimeout(deadline);
        setSettled(true);
      }
    });
    // Commit to a static fallback on a slow/failed connection. Do not replace
    // it with a differently cropped live scene after the page is revealed.
    deadline = setTimeout(() => {
      disposed = true;
      stop();
      setSettled(true);
    }, 6000);
    return () => { disposed = true; clearTimeout(deadline); stop(); };
  }, [device, staticArtwork]);

  useEffect(() => {
    let disposed = false;
    const image = posterRef.current;
    const finish = () => { if (!disposed) setPosterReady(true); };
    image.decode().then(finish, finish);
    // A failed or hung poster must not hold the page closed either.
    const deadline = setTimeout(finish, 6000);
    return () => { disposed = true; clearTimeout(deadline); };
  }, []);

  return (
    <div className="hero-unicorn" aria-hidden="true"
      data-artwork-state={loaded ? "ready" : (staticArtwork || settled) && posterReady ? "fallback" : "loading"}>
      {/* The existing phone artwork also gives the network scene a local poster. */}
      <img
        ref={posterRef}
        src={phoner}
        alt=""
        fetchPriority="high"
        decoding="async"
        className={`hero-poster hero-poster--${device}${loaded ? " hero-poster--loaded" : ""}`}
      />
      {device !== "mobile" && !reducedMotion && (
        <div ref={sceneRef} className={`hero-live-scene${loaded ? " hero-live-scene--ready" : ""}`} />
      )}

    </div>
  );
}

export default Effect;
