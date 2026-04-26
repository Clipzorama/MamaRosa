import { useEffect, useState } from "react";
import UnicornScene from "unicornstudio-react";

function Effect() {
  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setDevice("mobile");
      } else if (window.innerWidth <= 1024) {
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
    mobile: "iDEoy5BJZ5G26Gid9nfR",
  };

  return (
      <div className="hero-unicorn opacity-0 animate-fade-in-delay-1">
        <UnicornScene
          key={device}
          projectId={projectIds[device]}
          scale={1}
          dpi={device === "desktop" ? 0.8 : 0.65}
        />
      </div>
    
  );
}

export default Effect;
