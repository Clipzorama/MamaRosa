// Browser regression probe. From the local site's DevTools console:
// await (await import('/tests/hero-browser-probe.js')).observeHero()
// Reload first; use Network throttling/cache controls for cold/warm/failure runs.
export async function observeHero(duration = 10500) {
  const events = [];
  const errors = new Set();
  let previous;
  const started = performance.now();
  const loaderSeen = !!document.getElementById("startup-loader");
  return new Promise((resolve) => {
    function frame() {
      const media = document.querySelector(".hero-unicorn");
      const canvas = media?.querySelector("canvas");
      const live = media?.querySelector(".hero-live-scene--ready");
      const loader = document.getElementById("startup-loader");
      const covered = loader && !loader.hasAttribute("data-leaving");
      const mediaVisible = media && Number(getComputedStyle(media).opacity) > 0.01;
      const state = {
        loader: !!loader, covered: !!covered,
        intro: document.querySelector(".site-shell")?.dataset.intro ?? "complete",
        artwork: media?.dataset.artworkState ?? "absent",
        visible: !!mediaVisible,
        canvas: canvas ? [canvas.clientWidth, canvas.clientHeight] : null,
      };
      if (!covered && mediaVisible && state.artwork === "loading") errors.add("hero revealed before artwork settled");
      if (live && canvas && media) {
        const bounds = media.getBoundingClientRect();
        if (Math.abs(canvas.clientWidth - bounds.width) > 1 || Math.abs(canvas.clientHeight - bounds.height) > 1) {
          errors.add("ready canvas dimensions differ from hero");
        }
      }
      const key = JSON.stringify(state);
      if (previous !== key) { events.push({ ms: Math.round(performance.now()), ...state }); previous = key; }
      if (performance.now() - started < duration) requestAnimationFrame(frame);
      else {
        if (loader) errors.add("loader never dismissed");
        if (state.intro !== "complete") errors.add("intro never completed");
        resolve({ loaderSeen, errors: [...errors], events });
      }
    }
    frame();
  });
}
