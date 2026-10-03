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
    <div className="hero-unicorn" aria-hidden="true">
      <HeroArtwork key={`${device}-${reducedMotion}`} device={device} reducedMotion={reducedMotion} />
    </div>
  );
}

function HeroArtwork({ device, reducedMotion }) {
  const [loaded, setLoaded] = useState(false);
  const sceneRef = useRef(null);
  useEffect(() => {
    if (device === "mobile" || reducedMotion) return undefined;
    return mountUnicornScene(sceneRef.current, sceneProfiles[device], setLoaded);
  }, [device, reducedMotion]);

  return (
    <>
      {/* The existing phone artwork also gives the network scene a local poster. */}
      <img
        src={phoner}
        alt=""
        fetchPriority="high"
        decoding="async"
        className={`hero-poster hero-poster--${device}${loaded ? " hero-poster--loaded" : ""}`}
      />
      {device !== "mobile" && !reducedMotion && (
        <div ref={sceneRef} className={`hero-live-scene${loaded ? " hero-live-scene--ready" : ""}`} />
      )}

    </>
  );
}

export default Effect;
