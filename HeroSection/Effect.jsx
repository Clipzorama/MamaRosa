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
    desktop: "Sl6vFlXySafcYi4PmeSn",
    tablet: "xnRwB8iye1MeiSPw8wcA",
    mobile: "4TkcqonJEPQgHScHutOe",
  };

  return (
    <UnicornScene
      projectId={projectIds[device]}
      scale={1}
      dpi={0.8}
    />
  );
}

export default Effect;
