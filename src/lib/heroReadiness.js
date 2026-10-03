// Shared by the initial intro and later Home entrances. Observe the current
// artwork node because crossing a device breakpoint replaces it while loading.
export function waitForHero(site, signal) {
  return new Promise((resolve) => {
    const finish = () => {
      observer.disconnect();
      signal.removeEventListener("abort", finish);
      resolve();
    };
    const check = () => {
      const state = site.querySelector(".hero-unicorn")?.dataset.artworkState;
      if (state === "ready" || state === "fallback" || signal.aborted) finish();
    };
    const observer = new MutationObserver(check);
    observer.observe(site, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-artwork-state"] });
    signal.addEventListener("abort", finish, { once: true });
    check();
  });
}
