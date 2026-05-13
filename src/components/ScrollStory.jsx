import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const storyText = {
  nl: {
    eyebrow: "Het verhaal van Mama Rosa",
    title: "Van roots naar ritme",
    intro:
      "Een korte smaakreis door Surinaamse traditie, Caribische warmte en moderne fusion.",
    cta: "Ontdek het menu",
    stages: [
      {
        kicker: "Eerst herkenning",
        headline: "Surinaamse roots",
        detail: "Roti, pom, saoto en bami brengen de vertrouwde basis.",
        accent: "Roti",
      },
      {
        kicker: "Daarna energie",
        headline: "Caribische warmte",
        detail: "Masala, gember, peper en verse kruiden geven elk gerecht karakter.",
        accent: "Kruiden",
      },
      {
        kicker: "Dan de twist",
        headline: "Fusion met lef",
        detail: "Jerk, BBQ en comfort dishes maken Mama Rosa onderscheidend in Almere.",
        accent: "Fusion",
      },
      {
        kicker: "Tot slot het gevoel",
        headline: "Gemaakt voor samen",
        detail: "Een warme plek voor lunch, avondeten en smaken die blijven hangen.",
        accent: "Samen",
      },
    ],
  },
  en: {
    eyebrow: "The Mama Rosa story",
    title: "From roots to rhythm",
    intro:
      "A short flavor journey through Surinamese tradition, Caribbean warmth, and modern fusion.",
    cta: "Explore the menu",
    stages: [
      {
        kicker: "First, familiarity",
        headline: "Surinamese roots",
        detail: "Roti, pom, saoto, and bami bring the trusted foundation.",
        accent: "Roti",
      },
      {
        kicker: "Then, energy",
        headline: "Caribbean warmth",
        detail: "Masala, ginger, pepper, and fresh herbs give each dish character.",
        accent: "Herbs",
      },
      {
        kicker: "Then, the twist",
        headline: "Fusion with confidence",
        detail: "Jerk, BBQ, and comfort dishes make Mama Rosa distinct in Almere.",
        accent: "Fusion",
      },
      {
        kicker: "Finally, the feeling",
        headline: "Made for togetherness",
        detail: "A warm place for lunch, dinner, and flavors that stay with you.",
        accent: "Together",
      },
    ],
  },
};

export default function ScrollStory({ language }) {
  const currentText = storyText[language] ?? storyText.nl;
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const ctx = gsap.context(() => {
      const pin = section.querySelector("[data-story-pin]");
      const progress = section.querySelector("[data-story-progress]");
      const introItems = gsap.utils.toArray("[data-story-intro]");
      const stages = gsap.utils.toArray("[data-story-stage]");
      const accents = gsap.utils.toArray("[data-story-accent]");
      const rings = gsap.utils.toArray("[data-story-ring]");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([...introItems, ...stages, ...accents, ...rings, progress].filter(Boolean), {
          clearProps: "all",
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(progress, { scaleX: 0 });
        gsap.set(introItems, { autoAlpha: 0, y: 22 });
        gsap.set(stages, { autoAlpha: 0, y: 34, scale: 0.96 });
        gsap.set(stages[0], { autoAlpha: 1, y: 0, scale: 1 });
        gsap.set(accents, { autoAlpha: 0, y: 18, rotate: -4 });
        gsap.set(accents[0], { autoAlpha: 1, y: 0, rotate: 0 });

        gsap.to(rings, {
          rotate: 360,
          duration: 42,
          ease: "none",
          repeat: -1,
          stagger: 6,
        });

        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerWidth < 768 ? 1900 : 2600}`,
            scrub: 0.75,
            pin,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(progress, { scaleX: 1, ease: "none", duration: stages.length }, 0)
          .to(introItems, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.45 }, 0);

        stages.forEach((stage, index) => {
          if (index === 0) return;

          timeline
            .to(
              stages[index - 1],
              { autoAlpha: 0, y: -28, scale: 0.98, duration: 0.32 },
              index
            )
            .to(
              accents[index - 1],
              { autoAlpha: 0, y: -18, rotate: 4, duration: 0.28 },
              index
            )
            .to(stage, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4 }, index + 0.16)
            .to(
              accents[index],
              { autoAlpha: 1, y: 0, rotate: 0, duration: 0.36 },
              index + 0.2
            );
        });
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, [language]);

  return (
    <section ref={sectionRef} className="relative bg-background text-foreground">
      <div
        data-story-pin
        className="relative isolate flex min-h-[100svh] overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-primary/25" />
        <div
          data-story-progress
          className="absolute inset-x-0 top-0 h-1 origin-left bg-primary"
        />

        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl sm:h-[520px] sm:w-[520px] lg:h-[720px] lg:w-[720px]" />

        <div className="relative mx-auto grid w-full max-w-[1240px] gap-10 self-center md:grid-cols-[0.9fr_1.1fr] md:items-center lg:gap-16">
          <div className="max-w-xl">
            <div
              data-story-intro
              className="mb-5 flex items-center gap-3 font-poppins text-[11px] font-bold uppercase tracking-[0.2em] text-primary sm:text-xs lg:text-sm"
            >
              <Sparkles size={17} />
              {currentText.eyebrow}
            </div>

            <h2
              data-story-intro
              className="font-playfair text-[42px] leading-[0.96] sm:text-[58px] md:text-[64px] lg:text-[82px]"
            >
              {currentText.title}
            </h2>

            <p
              data-story-intro
              className="mt-5 max-w-lg font-poppins text-sm leading-7 text-foreground/76 sm:text-base lg:text-lg"
            >
              {currentText.intro}
            </p>

            <a
              data-story-intro
              href="#menu"
              className="mt-7 inline-flex items-center gap-3 rounded-lg border border-primary/60 bg-primary px-5 py-3.5 font-poppins text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-[#ffd58a] sm:px-6 sm:py-4"
            >
              {currentText.cta}
              <ArrowRight size={20} />
            </a>
          </div>

          <div className="relative min-h-[360px] sm:min-h-[430px] lg:min-h-[520px]">
            <div
              data-story-ring
              className="absolute left-1/2 top-1/2 aspect-square w-[min(78vw,380px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 sm:w-[430px] lg:w-[520px]"
            />
            <div
              data-story-ring
              className="absolute left-1/2 top-1/2 aspect-square w-[min(58vw,280px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/10 sm:w-[320px] lg:w-[390px]"
            />

            {currentText.stages.map((stage) => (
              <article
                key={stage.headline}
                data-story-stage
                className="absolute left-1/2 top-1/2 w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2 text-center"
              >
                <p className="font-poppins text-xs font-bold uppercase tracking-[0.22em] text-primary sm:text-sm">
                  {stage.kicker}
                </p>
                <h3 className="mx-auto mt-4 max-w-[10ch] font-playfair text-[44px] leading-[0.95] text-foreground sm:text-[64px] md:text-[72px] lg:text-[88px]">
                  {stage.headline}
                </h3>
                <p className="mx-auto mt-5 max-w-md font-poppins text-[12px] leading-7 text-foreground/74 sm:text-base lg:text-lg">
                  {stage.detail}
                </p>
              </article>
            ))}

            {currentText.stages.map((stage, index) => {
              const positions = [
                "left-[3%] top-[14%]",
                "right-[-1%] top-[14%]",
                "right-[0%] bottom-[15%]",
                "left-[1%] bottom-[15%]",
              ];

              return (
                <span
                  key={stage.accent}
                  data-story-accent
                  className={`absolute ${positions[index]} rounded-full border border-primary/45 bg-black/80 px-3 py-2 font-poppins text-[10px] font-bold uppercase tracking-[0.14em] text-primary backdrop-blur sm:px-4 sm:text-xs lg:px-5 lg:py-3`}
                >
                  {stage.accent}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
