import { useLayoutEffect } from "react";
import gsap from "gsap";

export function shouldPlayIntro() {
  if (typeof window === "undefined") return false;
  return !window.location.hash || window.location.hash === "#home";
}

export function useHomepageIntro(siteRef, active, onComplete) {
  useLayoutEffect(() => {
    if (!active) return undefined;
    const site = siteRef.current;
    const select = gsap.utils.selector(site);
    const brand = select("[data-intro-brand]")[0];
    const hero = select(".hero-section")[0];
    const media = select(".hero-unicorn")[0];
    const heart = select("[data-intro-heart]")[0];
    const copy = select("[data-intro-copy]");
    const nav = select(".editorial-nav")[0];
    const chrome = select(".intro-chrome")[0];
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let finished = false;
    let frame;
    let fontDeadline;
    let safetyDeadline;
    let context;
    const homeLinkHadFocus = document.activeElement?.closest?.('a[href="#home"]');
    const previousScrollRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    const inertTargets = [nav, ...select("[data-intro-actions]")].filter(Boolean);
    const previousInert = inertTargets.map((element) => element.inert);
    const restoreInteraction = () => {
      history.scrollRestoration = previousScrollRestoration;
      inertTargets.forEach((element, index) => { element.inert = previousInert[index]; });
    };

    const finish = () => {
      if (disposed || finished) return;
      finished = true;
      cancelAnimationFrame(frame);
      clearTimeout(fontDeadline);
      clearTimeout(safetyDeadline);
      // Revert all owned styles before removing the initial-state CSS gate.
      context?.revert();
      site.removeAttribute("data-intro");
      restoreInteraction();
      if (homeLinkHadFocus && shouldPlayIntro()) nav?.querySelector("a")?.focus({ preventScroll: true });
      onComplete();
    };

    // Hidden navigation/CTAs should never receive focus during the entrance.
    inertTargets.forEach((element) => { element.inert = true; });
    window.scrollTo({ top: 0, behavior: "instant" });
    // A script/animation failure must never leave an invisible, inert homepage.
    safetyDeadline = window.setTimeout(finish, 3400);

    const start = (simple = false) => {
      if (disposed || finished) return;
      if (motionPreference.matches || !shouldPlayIntro() || !brand || !hero || !media || !heart || !nav || !chrome) {
        finish();
        return;
      }

      try {
        context = gsap.context(() => {}, site);
        context.add(() => {
          if (simple) {
            gsap.set(brand, { visibility: "visible" });
            gsap.fromTo([brand, media, nav, ...copy], { opacity: 0 },
              { opacity: 1, duration: 0.2, onComplete: finish });
            return;
          }
          // Measure the real, final headline once. Its space stays in the document;
          // only its transform moves, so there is no clone or handoff frame.
          const bounds = brand.getBoundingClientRect();
          const stage = hero.getBoundingClientRect();
          const phone = stage.width < 641;
          const scale = Math.min((stage.width - (phone ? 44 : 120)) / bounds.width,
            phone ? 1.15 : 2.15);
          const x = (stage.width - bounds.width * scale) / 2 - bounds.left;
          const y = stage.height * (phone ? 0.43 : 0.47) -
            bounds.height * scale / 2 - bounds.top;

          gsap.set(brand, { x, y, scale, transformOrigin: "0 0", visibility: "visible",
            clipPath: "inset(0% 0% 100% 0%)" });
          gsap.set(copy, { opacity: 0, y: 18 });
          gsap.set(nav, { opacity: 0, y: -12 });
          gsap.set(media, { opacity: 0,
            clipPath: phone ? `inset(${stage.height < 700 ? 76 : 60}% 8% 5% 35%)` : "inset(62% 8% 8% 68%)" });
          const length = heart.getTotalLength();
          gsap.set(heart, { strokeDasharray: length, strokeDashoffset: length });

          gsap.timeline({ onComplete: finish, defaults: { ease: "power3.inOut" } })
            .to(brand, { clipPath: "inset(-15% -5% -15% -5%)", duration: 0.75, ease: "power3.out" }, 0.08)
            .fromTo(".intro-chrome__note, .intro-chrome__invitation", { opacity: 0, y: 8 },
              { opacity: 1, y: 0, duration: 0.55, stagger: 0.12 }, 0.12)
            .to(heart, { strokeDashoffset: 0, duration: 0.95, ease: "power2.out" }, 0.38)
            .to(media, { opacity: 1, duration: 0.5 }, phone ? 0.65 : 0.95)
            .to(".intro-chrome__note, .intro-chrome__invitation, .intro-chrome__place",
              { opacity: 0, y: -10, duration: 0.4 }, 1.02)
            .to(brand, { x: 0, y: 0, scale: 1, duration: 1.3 }, 1.05)
            .to(media, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5 }, 0.95)
            .to(copy, { opacity: 1, y: 0, duration: 0.65, stagger: 0.075, ease: "power3.out" }, 1.65)
            .to(nav, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 1.95);
        });
      } catch { finish(); }
    };

    // Give the existing display font a small, bounded opportunity to settle.
    // The intro never waits for the network-dependent WebGL scene.
    frame = requestAnimationFrame(() => {
      if (motionPreference.matches) { finish(); return; }
      Promise.race([
        document.fonts.load('500 98px "Playfair Display"', "Mamarosa")
          .then(() => document.fonts.ready).then(() => true).catch(() => false),
        new Promise((resolve) => { fontDeadline = window.setTimeout(() => resolve(false), 350); }),
      ]).then((fontsReady) => {
        // Slow fonts receive a brief entrance without moving typography that
        // could change dimensions. Scene loading never delays either version.
        if (disposed || finished) return;
        if (fontsReady) frame = requestAnimationFrame(() => start());
        else frame = requestAnimationFrame(() => start(true));
      });
    });

    // Keep the viewport stable without hiding the scrollbar or changing layout.
    const preventScroll = (event) => { if (!finished) event.preventDefault(); };
    const onKey = (event) => {
      if (["Escape", "Tab", "ArrowDown", "PageDown", "End", " "].includes(event.key)) finish();
    };
    const onVisibility = () => { if (document.hidden) finish(); };
    const onPageShow = (event) => { if (event.persisted) finish(); };
    const onMotionChange = () => { if (motionPreference.matches) finish(); };
    const onHashChange = () => { if (!shouldPlayIntro()) finish(); };
    const onScroll = () => { if (window.scrollY > 1) finish(); };
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", finish);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVisibility);
    motionPreference.addEventListener("change", onMotionChange);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      clearTimeout(fontDeadline);
      clearTimeout(safetyDeadline);
      context?.revert();
      restoreInteraction();
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", finish);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVisibility);
      motionPreference.removeEventListener("change", onMotionChange);
    };
  }, [active, onComplete, siteRef]);

}
