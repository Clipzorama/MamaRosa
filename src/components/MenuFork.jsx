import { memo, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import food from "../adds/Food.json";

gsap.registerPlugin(ScrollTrigger);

// One persistent instance, independent of menu categories and translations.
const MenuFork = memo(function MenuFork({ menuRef }) {
  const ornamentRef = useRef(null);
  const playerRef = useRef(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 640px) and (max-width: 1439px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(ornamentRef.current, { opacity: 0, y: 12 }, {
        opacity: 1, y: 0, ease: "none",
        scrollTrigger: {
          trigger: menuRef.current,
          start: "top 92%", end: "top 50%", scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => media.revert();
  }, [menuRef]);

  useEffect(() => {
    const container = playerRef.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let visible = false;
    let animation;
    const syncPlayback = () => {
      if (!animation || disposed) return;
      if (preference.matches) animation.goToAndStop(30, true);
      else if (visible && !document.hidden) animation.play();
      else animation.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(ornamentRef.current);
    preference.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);

    // Use the original player's Lottie engine directly so StrictMode owns and
    // destroys each instance reliably. Keep the source artwork and speed intact.
    import("lottie-web/build/player/lottie_light").then(({ default: lottie }) => {
      if (disposed) return;
      animation = lottie.loadAnimation({
        container, renderer: "svg", loop: true, autoplay: false,
        animationData: structuredClone(food),
        rendererSettings: { progressiveLoad: false, focusable: false },
      });
      animation.addEventListener("DOMLoaded", syncPlayback);
      syncPlayback();
    }).catch(() => { /* A decorative asset must never block the menu. */ });

    return () => {
      disposed = true;
      observer.disconnect();
      preference.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      animation?.removeEventListener("DOMLoaded", syncPlayback);
      animation?.destroy();
    };
  }, []);

  return <div ref={ornamentRef} className="menu-fork" aria-hidden="true">
    <div ref={playerRef} className="menu-fork__player" />
  </div>;
});

export default MenuFork;
