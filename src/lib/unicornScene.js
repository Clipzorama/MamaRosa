// Keep readiness checks in this adapter alongside the pinned SDK version.
// addScene resolves BEFORE planes/textures finish loading in SDK 2.1.4.
const SDK_URL = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.4/dist/unicornStudio.umd.js";
let sdkPromise;

export function loadUnicornSDK() {
  if (window.UnicornStudio?.addScene) return Promise.resolve(window.UnicornStudio);
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SDK_URL;
    script.async = true;
    const done = (error) => {
      clearTimeout(deadline);
      script.onload = script.onerror = null;
      if (error) {
        script.remove();
        reject(error);
      } else resolve(window.UnicornStudio);
    };
    const deadline = setTimeout(() => done(new Error("Unicorn SDK timed out")), 8000);
    script.onload = () => done(window.UnicornStudio?.addScene ? null : new Error("Unicorn SDK unavailable"));
    script.onerror = () => done(new Error("Unicorn SDK failed to load"));
    document.head.appendChild(script);
  }).catch((error) => {
    sdkPromise = undefined; // A failed script must be replaceable on the bounded retry.
    throw error;
  });
  return sdkPromise;
}

export function isSceneReady(scene) {
  const curtain = scene?.curtain;
  if (!scene?.initialized || scene.destroyed || !curtain?.gl ||
      curtain.gl.isContextLost() || !curtain.canvas?.width || !curtain.canvas?.height) return false;
  const textures = Object.values(scene.local?.preloadedImages ?? {});
  if (textures.some((image) => image.loading || !image.texture)) return false;
  if (scene.layers.some((layer) =>
    (layer.layerType === "image" && !layer.local.imageReady) ||
    (layer.layerType === "text" && !layer.local.loaded) ||
    (layer.isModel && !layer.local.modelLoaded) ||
    (layer.isFlattened && (!layer.areImageAssetsReady() || !layer.areTextAssetsReady() || !layer.areModelAssetsReady()))
  )) return false;
  return curtain.planes.length > 0 && curtain.planes.every((plane) => plane.userData?.isReady);
}

// Each attempt owns a distinct element. Late addScene resolutions can therefore
// be destroyed without removing a newer scene's canvas (including StrictMode).
export function mountUnicornScene(container, profile, onReady, {
  loadSDK = loadUnicornSDK, attemptTimeout = 10000, retryDelay = 700,
} = {}) {
  let disposed = false;
  let attempts = 0;
  let retryTimer;
  let stopAttempt = () => {};

  const attempt = () => {
    if (disposed) return;
    attempts += 1;
    const host = document.createElement("div");
    host.className = "hero-scene-mount";
    container.appendChild(host);
    let stopped = false;
    let scene;
    let canvas;
    let poll;
    let frame;
    let resizeFrame;
    let observer;
    let visibility;
    let redrawTimer;
    let deadline;

    const destroy = (ownedScene) => {
      try { ownedScene?.destroy(); } catch { /* Poster remains usable if SDK disposal fails. */ }
    };
    const stop = () => {
      if (stopped) return;
      stopped = true;
      clearTimeout(deadline);
      clearTimeout(poll);
      clearTimeout(redrawTimer);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(resizeFrame);
      observer?.disconnect();
      visibility?.disconnect();
      canvas?.removeEventListener("webglcontextlost", fail);
      destroy(scene);
      host.remove();
    };
    const fail = () => {
      if (stopped || disposed) return;
      onReady(false);
      stop();
      if (attempts < 2) retryTimer = setTimeout(attempt, retryDelay);
    };
    stopAttempt = stop;
    deadline = setTimeout(fail, attemptTimeout);

    const check = () => {
      if (stopped || disposed) return;
      try {
        if (!isSceneReady(scene)) {
          poll = setTimeout(check, 60);
          return;
        }
        // Submit the complete image, then allow a paint before the crossfade.
        scene.renderFrame();
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => {
            if (stopped || disposed) return;
            if (!isSceneReady(scene)) { check(); return; }
            clearTimeout(deadline);
            onReady(true);
          });
        });
      } catch { fail(); }
    };

    Promise.resolve().then(loadSDK).then((sdk) => {
      if (stopped || disposed) return null;
      return sdk.addScene({ ...profile, element: host, production: true, lazyLoad: false });
    }).then((created) => {
      if (stopped || disposed) { destroy(created); return; }
      if (!created) { fail(); return; }
      scene = created;
      canvas = scene.curtain?.canvas;
      canvas?.addEventListener("webglcontextlost", fail);
      const redraw = (delay = 0) => {
        if (stopped || disposed) return;
        onReady(false);
        clearTimeout(redrawTimer);
        clearTimeout(poll);
        cancelAnimationFrame(frame);
        clearTimeout(deadline);
        deadline = setTimeout(fail, attemptTimeout);
        redrawTimer = setTimeout(() => {
          if (stopped || disposed) return;
          try {
            // resize() clears cached static render targets without redrawing
            // them. refresh() re-enables all planes and rebuilds those targets.
            scene.refresh();
            check();
          } catch { fail(); }
        }, delay);
      };
      observer = new ResizeObserver(() => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(() => {
          if (stopped || disposed) return;
          if (host.clientWidth && host.clientHeight) redraw();
        });
      });
      observer.observe(host);
      let wasVisible = host.getBoundingClientRect().bottom > 0;
      visibility = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !wasVisible) {
          // Follow the SDK's 80ms scroll/resize debounce on re-entry.
          redraw(120);
        }
        wasVisible = entry.isIntersecting;
      });
      visibility.observe(host);
      check();
    }).catch(fail);
  };

  attempt();
  return () => {
    disposed = true;
    clearTimeout(retryTimer);
    stopAttempt();
  };
}
