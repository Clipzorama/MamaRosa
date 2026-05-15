import { lazy, Suspense, useEffect, useState } from "react";
import phoner from "../adds/phoner.webp";

const UnicornScene = lazy(() => import("unicornstudio-react"));

function Effect() {
  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
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

  const sceneProfiles = {
    desktop: {
      projectId: "lrYTiuLBVWmOfPRhCTBU",
      scale: 1,
      dpi: 0.9,
      fps: 120,
    },
    tablet: {
      projectId: "xnRwB8iye1MeiSPw8wcA",
      scale: 1,
      dpi: 0.75,
      fps: 60,
    },
  };

  const sceneProfile = sceneProfiles[device];

  return (
    <>
      {/* Desktop + Tablet: keep Unicorn */}
      {device !== "mobile" && (
        <div className="hero-unicorn opacity-0 animate-fade-in-delay-1">
          <Suspense fallback={null}>
            <UnicornScene
              key={device}
              projectId={sceneProfile.projectId}
              scale={sceneProfile.scale}
              dpi={sceneProfile.dpi}
              fps={sceneProfile.fps}
              lazyLoad
            />
          </Suspense>
        </div>
      )}

      {/* Phone: use high-quality static image */}
      {device === "mobile" && (
        <div className="hero-unicorn opacity-0 animate-fade-in-delay-1">
          <img
            src={phoner}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-[62%_bottom] scale-[1.02]"
          />
        </div>
      )}
    </>
  );
}

export default Effect;
