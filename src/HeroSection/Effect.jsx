import { useEffect, useState } from "react";
import UnicornScene from "unicornstudio-react";
import phoner from "../adds/phoner.webp";


function Effect() {
  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 570) {
        setDevice("mobile");
      } else if (window.innerWidth <= 1030) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const projectIds = {
    desktop: "lrYTiuLBVWmOfPRhCTBU",
    tablet: "xnRwB8iye1MeiSPw8wcA",
  };

  return (
    <>
      {/* Desktop + Tablet: keep Unicorn */}
      {device !== "mobile" && (
        <div className="hero-unicorn opacity-0 animate-fade-in-delay-1">
          <UnicornScene
            key={device}
            projectId={projectIds[device]}
            scale={1}
            dpi={device === "desktop" ? 0.8 : 0.75}
          />
        </div>
      )}

      {/* Phone: use high-quality static image */}
      {device === "mobile" && (
        <div className="hero-unicorn opacity-0 animate-fade-in-delay-1">
          <img
            src={phoner}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-bottom"
          />
        </div>
      )}
    </>
  );
}

export default Effect;