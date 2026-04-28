// src/components/Menu.jsx
import { useState } from "react";
import {
  Star,
  Soup,
  Sandwich,
  CupSoda,
  Utensils,
  Leaf,
  Flame,
  MoveRight,
  ChevronDown,
} from "lucide-react";
import food from "../src/assets/food.json";
import { Player } from "@lottiefiles/react-lottie-player";

function Menu() {
  const categories = [
    {
      id: "broodjes",
      label: "Broodjes",
      icon: Sandwich,
      items: [
        ["Tempeh / kousenband", "€6,50"],
        ["Kerrie ei", "€6,50"],
        ["Advocado", "€6,50"],
        ["Ketjap kip", "€6,50"],
        ["Tjaseuw kip", "€6,50"],
        ["Fa-chong", "€6,50"],
        ["Kerrie kip", "€6,50"],
        ["Lever", "€6,50"],
        ["Pom", "€6,50"],
        ["Garnalen / kousenband", "€7,50"],
        ["Zoutvlees / kousenband", "€7,50"],
        ["Bakkeljauw", "€6,50"],
        ["Trie", "€6,50"],
        ["Gambas", "€7,00"],
        ["Sardines olie", "€5,00"],
      ],
    },
    {
      id: "hoofdgerechten",
      label: "Hoofdgerechten",
      icon: Utensils,
      items: [
        ["Bami kip", "€16,50"],
        ["Tjauwmin kip", "€16,50"],
        ["Tjauwmin speciaal", "€18,50"],
        ["Nasi kip", "€16,50"],
        ["Nasi speciaal", "€18,50"],
        ["Jar pesi Moxi Alesi", "€18,50"],
        ["Bruine bonen zoutvlees / gerookte kip", "€16,50"],
        ["Rijst doks", "€17,50"],
        ["Rijst lams", "€18,00"],
      ],
    },
    {
      id: "roti",
      label: "Roti",
      icon: Leaf,
      items: [
        ["Rotirol vega", "€12,00"],
        ["Rotirol kip", "€14,00"],
        ["Rotirol lams", "€16,00"],
        ["Lams / kousenband", "€18,00"],
        ["Kip filet met kousenband", "€16,00"],
        ["Kip met bot / kousenband", "€15,00"],
        ["Doks / kousenband", "€17,50"],
        ["Vega / kousenband", "€14,50"],
        ["Roti plaat", "€3,00"],
      ],
    },
    {
      id: "fusion",
      label: "Fusion",
      icon: Flame,
      items: [
        ["Jerk chicken", "€21,50"],
        ["Peperwater vis", "€15,00"],
        ["Mac & Cheese", "€13,50"],
        ["Taco fusion", "€12,50"],
      ],
    },
    {
      id: "soepen",
      label: "Soepen",
      icon: Soup,
      items: [
        ["Pinda soep", "€12,50"],
        ["Sauto soep", "€8,50"],
        ["Brafu soep", "€12,50"],
      ],
    },
    {
      id: "snacks",
      label: "Snacks",
      icon: Star,
      items: [
        ["Teloh bakkeljauw", "€8,50"],
        ["Speciaal / trie / lever / bakkeljauw", "€12,50"],
        ["Baka bana", "€7,00"],
        ["Sate kip", "€7,00"],
        ["Sate gambas", "€8,00"],
        ["Pom ballen", "€7,00"],
        ["Mais Pap", "€7,00"],
        ["Banaan Pap", "€7,00"],
      ],
    },
    {
      id: "dranken",
      label: "Dranken",
      icon: CupSoda,
      items: [
        ["Fernandes", "€2,50"],
        ["Fanta", "€2,50"],
        ["Redbull", "€3,00"],
        ["Water", "€2,00"],
        ["Markoesa slush", "€3,00"],
        ["Gember", "€3,00"],
        ["Cola siroop slush", "€2,50"],
        ["Dawet slush", "€3,00"],
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const visibleCategories =
    selectedCategory === "all"
      ? categories
      : categories.filter((cat) => cat.id === selectedCategory);

  return (
    <section
      id="menu"
      className="min-h-screen bg-background px-5 py-30 text-foreground sm:px-8 lg:px-10 xl:px-12"
    >
      <div className="mx-auto grid max-w-[1600px] gap-8 lg:grid-cols-[270px_1fr] xl:grid-cols-[300px_1fr]">
        {/* Desktop sidebar */}
        <aside className="sticky top-40 hidden self-start rounded-3xl border border-primary/95 bg-background/80 px-4 pb-4 lg:block">
          <div className="mt-14 flex flex-col gap-5">
            <div className="w-full opacity-90">
              <Player
                src={food}
                loop
                autoplay
                className="h-[200px] w-full"
              />
            </div>
          </div>

          <div className="mt-20 rounded-2xl border border-primary/40 bg-icons p-6">
            <Soup className="mb-5 text-black" size={42} />
            <h3 className="font-playfair text-2xl text-background">
              Liever iets op maat?
            </h3>
            <p className="mt-3 font-poppins text-sm leading-7 text-foreground/70">
              Laat het ons weten! We denken graag met je mee voor speciale
              wensen of dieetopties.
            </p>
            <a
              href="#contact"
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-xl border border-primary/60 bg-white px-8 py-4 font-poppins text-[12px] font-bold text-black transition-colors duration-500 hover:bg-primary/70"
            >
              Neem contact op
              <MoveRight />
            </a>
          </div>
        </aside>

        <div>
          {/* Header */}
          <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-playfair text-6xl leading-none sm:text-7xl xl:text-8xl">
                Ons <span className="text-primary">Menu</span>
              </h1>

              <p className="mt-5 max-w-[560px] font-poppins text-base leading-8 text-foreground/75 sm:text-lg">
                Laat je verrassen door de rijke smaken van Suriname, met een
                moderne twist van Mamarosa.
              </p>
            </div>
          </div>

          {/* Phone / tablet dropdown */}
          <div className="mb-10 lg:hidden">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none rounded-xl border border-primary/60 bg-background px-5 py-5 pr-14 font-poppins text-base font-semibold text-primary outline-none"
              >
                <option value="all">Alles bekijken</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>

              <ChevronDown
                className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-primary"
                size={24}
              />
            </div>
          </div>

          {/* Phone / tablet menu grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:hidden">
            {visibleCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <article
                  key={cat.id}
                  id={cat.id}
                  className="scroll-mt-28 rounded-3xl border border-primary/30 bg-black p-6 sm:p-8"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <Icon className="text-primary" size={26} />
                    <h2 className="font-playfair text-3xl text-primary sm:text-4xl">
                      {cat.label}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {cat.items.map(([name, price]) => (
                      <div
                        key={name}
                        className="flex items-start justify-between gap-5 border-b border-primary/20 pb-3"
                      >
                        <p className="font-poppins text-sm leading-6 text-foreground/85 sm:text-base">
                          {name}
                        </p>
                        <p className="shrink-0 font-poppins text-sm font-bold text-primary sm:text-base">
                          {price}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

        {/* Phone / tablet contact card */}
        <aside className="mt-8 rounded-[2rem] border border-primary/60 bg-black/80 p-5 shadow-[0_0_35px_rgba(218,162,80,0.08)] lg:hidden">
            <div className="rounded-[1.5rem] border border-primary/20 bg-background/70 px-4 py-6">
                <Player
                src={food}
                loop
                autoplay
                className="mx-auto h-[150px] w-full max-w-[220px]"
                />
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-primary/40 bg-icons p-6 sm:p-8">
                <Soup className="mb-5 text-black" size={38} />

                <h3 className="font-playfair text-3xl leading-tight text-background sm:text-4xl">
                Liever iets op maat?
                </h3>

                <p className="mt-4 font-poppins text-base leading-8 text-foreground/80">
                Laat het ons weten! We denken graag met je mee voor speciale wensen of
                dieetopties.
                </p>

                <a
                href="#contact"
                className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-primary/60 bg-white px-7 py-4 font-poppins text-sm font-bold text-black transition-colors duration-500 hover:bg-primary/70 sm:w-auto"
                >
                Neem contact op
                <MoveRight size={22} />
                </a>
            </div>
        </aside>

          {/* Desktop menu grid - untouched */}
          <div className="hidden gap-6 lg:grid xl:grid-cols-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <article
                  key={cat.id}
                  id={cat.id}
                  className="scroll-mt-28 rounded-3xl border border-primary/30 bg-black p-6 sm:p-8"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <Icon className="text-primary" size={26} />
                    <h2 className="font-playfair text-3xl text-primary sm:text-4xl">
                      {cat.label}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {cat.items.map(([name, price]) => (
                      <div
                        key={name}
                        className="flex items-start justify-between gap-5 border-b border-primary/20 pb-3"
                      >
                        <p className="font-poppins text-sm leading-6 text-foreground/85 sm:text-base">
                          {name}
                        </p>
                        <p className="shrink-0 font-poppins text-sm font-bold text-primary sm:text-base">
                          {price}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu;