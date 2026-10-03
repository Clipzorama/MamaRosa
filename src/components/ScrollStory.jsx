import { ArrowUpRight } from "lucide-react";
import "./ScrollStory.css";

const storyText = {
  nl: {
    eyebrow: "Het verhaal van Mama Rosa",
    titleLead: "Van roots",
    titleEnd: "naar ritme.",
    journey: "Scroll om onze smaken te ontdekken",
    intro:
      "Een korte smaakreis door Surinaamse traditie, Caribische warmte en moderne fusion.",
    cta: "Ontdek het menu",
    stages: [
      {
        kicker: "Eerst herkenning",
        headline: "Surinaamse roots",
        detail: "Roti, pom, saoto en bami brengen de vertrouwde basis.",
        accent: "Roti",
        notes: "Roti · Pom · Saoto · Bami",
      },
      {
        kicker: "Daarna energie",
        headline: "Caribische warmte",
        detail: "Masala, gember, peper en verse kruiden geven elk gerecht karakter.",
        accent: "Kruiden",
        notes: "Masala · Gember · Peper",
      },
      {
        kicker: "Dan de twist",
        headline: "Fusion met lef",
        detail: "Jerk, BBQ en comfort dishes maken Mama Rosa onderscheidend in Almere.",
        accent: "Fusion",
        notes: "Jerk · BBQ · Comfort food",
      },
      {
        kicker: "Met aandacht bereid",
        headline: "Vanaf de basis",
        detail: "Onze gerechten worden vanaf de basis bereid, met pure, verse ingrediënten.",
        accent: "Bereiding",
        notes: "Vers · Puur · Met aandacht",
      },
    ],
  },
  en: {
    eyebrow: "The Mama Rosa story",
    titleLead: "From roots",
    titleEnd: "to rhythm.",
    journey: "Scroll to discover our flavors",
    intro:
      "A short flavor journey through Surinamese tradition, Caribbean warmth, and modern fusion.",
    cta: "Explore the menu",
    stages: [
      {
        kicker: "First, familiarity",
        headline: "Surinamese roots",
        detail: "Roti, pom, saoto, and bami bring the trusted foundation.",
        accent: "Roti",
        notes: "Roti · Pom · Saoto · Bami",
      },
      {
        kicker: "Then, energy",
        headline: "Caribbean warmth",
        detail: "Masala, ginger, pepper, and fresh herbs give each dish character.",
        accent: "Herbs",
        notes: "Masala · Ginger · Pepper",
      },
      {
        kicker: "Then, the twist",
        headline: "Fusion with confidence",
        detail: "Jerk, BBQ, and comfort dishes make Mama Rosa distinct in Almere.",
        accent: "Fusion",
        notes: "Jerk · BBQ · Comfort food",
      },
      {
        kicker: "Prepared with care",
        headline: "Made from scratch",
        detail: "Our dishes are prepared from scratch, with clean, fresh ingredients.",
        accent: "Preparation",
        notes: "Fresh · Simple · With care",
      },
    ],
  },
};

// Lightweight kitchen sketches give each chapter its own visual character.
// They are decorative SVGs: no photos, network requests, or animation loops.
function FoodSketch({ index }) {
  const drawings = [
    <g key="roti">
      <path d="M24 89C28 52 70 30 113 42c26 7 43 26 45 48-23 25-101 39-134-1Z" />
      <path d="M25 89c32 7 73-3 109-31M26 90c22 30 81 37 126 7M43 100c29 9 66 4 91-7" />
      <path d="m54 72 6-3m17 10 7-3m16-20 5 2m-6 33 7-2m-60-5 4-2m59-14 5-3" strokeWidth="3" />
      <path d="M64 34c-8-7 7-12 1-20m20 17c-7-8 7-11 2-19" opacity=".55" />
    </g>,
    <g key="pepper">
      <path d="M114 49c-3 41-43 77-86 61 30-1 34-25 43-47 8-21 26-26 43-14Z" />
      <path d="M112 47c2-17 13-22 23-18m-27 19 13 4M94 61c-7 22-15 38-34 44" />
      <path d="M119 91c-3-30 16-48 37-51 7 25-5 49-37 51Zm0 0 28-37m-19 22 18-3m-8-9-2-13" />
      <circle cx="81" cy="121" r="3" /><circle cx="98" cy="115" r="2" /><circle cx="110" cy="124" r="3" />
    </g>,
    <g key="fusion">
      <path d="m32 122 115-103M51 105l-13-17 19-21 22 15-16 21ZM88 76 71 61l19-19 21 16-17 19Zm31-29-17-13 14-15 20 15-11 13Z" />
      <path d="m51 82 9 8m28-33 11 7m15-35 8 6M121 109c-12-17 13-18 3-35m18 30c-8-11 8-14 4-25" />
      <path d="M33 131h115" opacity=".45" />
    </g>,
    <g key="preparation">
      <path d="M28 65h128c-5 40-28 56-64 56S34 105 28 65Zm-5 0c0-9 29-15 69-15s69 6 69 15M62 123l-5 7h69l-5-7" />
      <path d="m103 61 30-43c4-6 12-1 8 5l-24 37M41 78c5 17 13 24 25 28M65 40c-8-9 6-13 0-23m19 22c-7-8 7-14 2-22" />
    </g>,
  ];

  return (
    <svg className="scroll-story__sketch" viewBox="0 0 180 145" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false">
      {drawings[index]}
    </svg>
  );
}

export default function ScrollStory({ language }) {
  const currentText = storyText[language] ?? storyText.nl;

  return (
    <section className="scroll-story" aria-labelledby="story-title">
      <div className="scroll-story__inner">
        <div className="scroll-story__eyebrow">
          <span>{currentText.eyebrow}</span>
          <span>Mama Rosa · Almere</span>
        </div>

        <header className="scroll-story__header">
          <h2 id="story-title" className="scroll-story__title">
            {currentText.titleLead}{" "}
            <em>{currentText.titleEnd}</em>
          </h2>
          <p className="scroll-story__intro">{currentText.intro}</p>
        </header>

        <ol className="scroll-story__chapters" role="list">
          {currentText.stages.map((stage, index) => (
            <li key={stage.accent} className="scroll-story__chapter">
              <div className="scroll-story__emblem">
                <span className="scroll-story__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <FoodSketch index={index} />
              </div>
              <div className="scroll-story__chapter-title">
                <p className="scroll-story__kicker">{stage.kicker}</p>
                <h3>{stage.headline}</h3>
              </div>
              <p className="scroll-story__detail">{stage.detail}</p>
              <p className="scroll-story__notes" aria-hidden="true">{stage.notes}</p>
            </li>
          ))}
        </ol>

        <div className="scroll-story__waypoints" aria-hidden="true">
          {currentText.stages.map((stage, index) => (
            <div className="scroll-story__waypoint" key={stage.accent}>
              <span className="scroll-story__waypoint-line"><span className="scroll-story__waypoint-fill" /></span>
              <span>{String(index + 1).padStart(2, "0")} / {stage.accent}</span>
            </div>
          ))}
        </div>

        <footer className="scroll-story__footer">
          <p>{currentText.journey}</p>
          <a href="#menu" className="scroll-story__link">
            {currentText.cta}
            <ArrowUpRight size={21} aria-hidden="true" />
          </a>
        </footer>
      </div>
    </section>
  );
}
