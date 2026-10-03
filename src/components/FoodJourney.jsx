import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollStory from "./ScrollStory";
import About from "./About";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export default function FoodJourney({ language }) {
  const journeyRef = useRef(null);

  useLayoutEffect(() => {
    const journey = journeyRef.current;
    const media = gsap.matchMedia();

    media.add(
      "(min-height: 560px) and (prefers-reduced-motion: no-preference)",
      () => {
        const story = journey.querySelector(".scroll-story");
        const chapters = [...journey.querySelectorAll(".scroll-story__chapter")];
        const screens = [journey.querySelector(".scroll-story__header"), ...chapters];
        const next = journey.querySelector(".food-journey__next");
        const about = next.querySelector("#about");
        const progress = journey.querySelector(".food-journey__progress span");
        const markers = [...journey.querySelectorAll(".scroll-story__waypoint-fill")];
        let refreshFrame;
        let anchorFrame;
        let disposed = false;
        let pendingInitialAnchor = window.location.hash === "#about";
        let aboutIsActive;

        journey.dataset.animated = "true";
        next.inert = true;
        gsap.set(next, { xPercent: 100 });
        gsap.set(chapters, { autoAlpha: 0, y: 22 });
        gsap.set(progress, { scaleX: 0 });
        gsap.set(markers, { scaleX: 0 });

        // Pin the complete flow, including About's natural height. After the
        // horizontal handoff it unpins, so all of About and Contact remain in
        // ordinary document flow with no duplicated sections or nested scroll.
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: journey,
            pin: journey,
            start: "top top",
            end: () => `+=${story.offsetHeight * (window.innerWidth < 960 ? 4.5 : 3.8)}`,
            scrub: 0.55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        markers.forEach((marker, index) => {
          timeline.to(marker, {
            scaleX: 1, duration: 0.9, ease: "none",
          }, (index + 1) * 0.9);
        });

        screens.forEach((screen, index) => {
          if (index === 0) return;
          const at = index * 0.9;
          timeline
            .to(screens[index - 1], {
              autoAlpha: 0, y: -16, duration: 0.18, ease: "power1.in",
            }, at)
            .to(screen, {
              autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out",
            }, at + 0.18);
        });

        timeline
          .to(progress, { scaleX: 1, duration: 4.5, ease: "none" }, 0)
          .to(next, { xPercent: 0, duration: 1, ease: "power2.inOut" }, 4.7)
          .to(story, { xPercent: -12, duration: 1, ease: "power2.inOut" }, 4.7);

        const syncAccessibility = () => {
          const arrived = timeline.progress() >= 0.999;
          if (arrived === aboutIsActive) return;
          aboutIsActive = arrived;
          next.inert = !arrived;
          story.inert = arrived;
          window.dispatchEvent(new Event("mamarosa:story-change"));
        };
        timeline.eventCallback("onUpdate", syncAccessibility);
        syncAccessibility();

        const goToAbout = () => {
          window.scrollTo({ top: timeline.scrollTrigger.end, behavior: "instant" });
          ScrollTrigger.update();
          timeline.scrollTrigger.getTween()?.progress(1);
          timeline.progress(1);
          syncAccessibility();
          about.focus({ preventScroll: true });
        };

        // Native #about would otherwise land at the start of the pinned story,
        // while About is still off-screen. Preserve hashes and keyboard access.
        const handleAnchor = (event) => {
          const link = event.target.closest?.('a[href="#about"]');
          if (!link || event.defaultPrevented || event.button !== 0 ||
              event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          if (window.location.hash !== "#about") history.pushState(null, "", "#about");
          goToAbout();
        };
        const handleHash = () => {
          if (window.location.hash === "#about") goToAbout();
        };
        const refresh = () => {
          if (disposed) return;
          cancelAnimationFrame(refreshFrame);
          refreshFrame = requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            if (pendingInitialAnchor) goToAbout();
          });
        };
        const cancelInitialAnchor = () => { pendingInitialAnchor = false; };
        // A browser may resolve its initial hash after lazy content or fonts
        // load. Correct that native landing until the visitor takes control.
        const alignInitialAnchor = () => {
          if (!pendingInitialAnchor || Math.abs(window.scrollY - timeline.scrollTrigger.end) < 2) return;
          cancelAnimationFrame(anchorFrame);
          anchorFrame = requestAnimationFrame(() => {
            if (pendingInitialAnchor) goToAbout();
          });
        };
        const initialFrame = requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          handleHash();
        });

        document.addEventListener("click", handleAnchor);
        window.addEventListener("hashchange", handleHash);
        window.addEventListener("mamarosa:layout-change", refresh);
        window.addEventListener("load", refresh);
        window.addEventListener("wheel", cancelInitialAnchor, { passive: true });
        window.addEventListener("pointerdown", cancelInitialAnchor, { passive: true });
        window.addEventListener("keydown", cancelInitialAnchor);
        window.addEventListener("scroll", alignInitialAnchor, { passive: true });
        document.fonts?.ready.then(refresh);

        return () => {
          disposed = true;
          cancelAnimationFrame(initialFrame);
          cancelAnimationFrame(refreshFrame);
          cancelAnimationFrame(anchorFrame);
          document.removeEventListener("click", handleAnchor);
          window.removeEventListener("hashchange", handleHash);
          window.removeEventListener("mamarosa:layout-change", refresh);
          window.removeEventListener("load", refresh);
          window.removeEventListener("wheel", cancelInitialAnchor);
          window.removeEventListener("pointerdown", cancelInitialAnchor);
          window.removeEventListener("keydown", cancelInitialAnchor);
          window.removeEventListener("scroll", alignInitialAnchor);
          delete journey.dataset.animated;
          next.inert = false;
          story.inert = false;
          window.dispatchEvent(new Event("mamarosa:story-change"));
        };
      },
      journey,
    );

    return () => media.revert();
  }, [language]);

  return (
    <div ref={journeyRef} className="food-journey">
      <ScrollStory language={language} />
      <div className="food-journey__progress" aria-hidden="true"><span /></div>
      <div className="food-journey__next"><About language={language} /></div>
    </div>
  );
}
