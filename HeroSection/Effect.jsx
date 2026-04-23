
import UnicornScene from "unicornstudio-react";

function IntroEffect() {
  return (
    <UnicornScene
      projectId="PbKDXKVbu1Nj1CAdGGIp"
      scale={1}
      dpi={0.7}
      sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.9/dist/unicornStudio.umd.js"
    />
  );
}

function Effect() {
    return (
        <IntroEffect/>
    );
}

export default Effect