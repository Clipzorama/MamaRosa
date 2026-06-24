// src/components/Menu.jsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Star,
  Soup,
  Sandwich,
  CupSoda,
  Utensils,
  Leaf,
  Sprout,
  Flame,
  MoveRight,
  ChevronDown,
} from "lucide-react";
import food from "../adds/Food.json";
import { Player } from "@lottiefiles/react-lottie-player";
import {
  easeOut,
  fadeScale,
  fadeUp,
  staggerContainer,
  viewport,
} from "../lib/motion";

function Menu({ language }) {
  const menuText = {
    nl: {
      customTitle: "Liever iets op maat?",
      customDescription:
        "Laat het ons weten! We denken graag met je mee voor speciale wensen of dieetopties.",
      contactButton: "Neem contact op",
      titleStart: "Ons",
      titleHighlight: "Menu",
      description:
        "Onze gerechten worden met uiterste zorg en perfectie, volledig vanaf de basis, bereid met pure, verse ingrediënten.",
      veganTitle: "Vegan Choice",
      veganDescription:
        "Alle vegan gerechten kosten €15,00. Vraag ons naar de beschikbare opties.",
      viewAll: "Alles bekijken",
    },
    en: {
      customTitle: "Prefer something custom?",
      customDescription:
        "Let us know! We're happy to help with special requests or dietary options.",
      contactButton: "Contact us",
      titleStart: "Our",
      titleHighlight: "Menu",
      description:
        "Our dishes are carefully created from scratch with clean, fresh ingredients.",
      veganTitle: "Vegan Choice",
      veganDescription:
        "All vegan dishes are €15,00. Ask us about the available options.",
      viewAll: "View all",
    },
  };

  const currentText = menuText[language];

  const categories = [
    {
      id: "broodjes",
      label: language === "nl" ? "Broodjes" : "Sandwiches",
      icon: Sandwich,
      items: [
        [
          language === "nl" ? "Tempeh / kousenband" : "Tempeh / long beans",
          "€6,50",
        ],
        [language === "nl" ? "Kerrie ei" : "Curry egg", "€6,50"],
        ["Avocado", "€6,50"],
        [language === "nl" ? "Ketjap kip" : "Soy sauce chicken", "€6,50"],
        [language === "nl" ? "Tjaseuw kip" : "Char siu chicken", "€6,50"],
        ["Fa-chong", "€6,50"],
        [language === "nl" ? "Kerrie kip" : "Curry chicken", "€6,50"],
        [language === "nl" ? "Lever" : "Liver", "€6,50"],
        ["Pom", "€6,50"],
        [
          language === "nl" ? "Garnalen / kousenband" : "Shrimp / long beans",
          "€7,50",
        ],
        [
          language === "nl"
            ? "Zoutvlees / kousenband"
            : "Salted beef / long beans",
          "€7,50",
        ],
        ["Bakkeljauw", "€6,50"],
        ["Trie", "€6,50"],
        [language === "nl" ? "Gambas" : "Prawns", "€7,00"],
        [language === "nl" ? "Sardines olie" : "Sardines in oil", "€5,00"],
      ],
    },
    {
      id: "hoofdgerechten",
      label: language === "nl" ? "Hoofdgerechten" : "Main dishes",
      icon: Utensils,
      items: [
        [language === "nl" ? "Bami kip" : "Bami chicken", "€17,00"],
        [language === "nl" ? "Tjauwmin kip" : "Chow mein chicken", "€17,00"],
        [
          language === "nl" ? "Tjauwmin speciaal" : "Special chow mein",
          "€19,00",
        ],
        [language === "nl" ? "Nasi kip" : "Fried rice chicken", "€17,00"],
        [
          language === "nl" ? "Nasi speciaal" : "Special fried rice",
          "€19,00",
        ],
        ["Bakkeljauw saltfish", "€17,00"],
        ["Jar pesi Moxi Alesi", "€22,00"],
        [
          language === "nl"
            ? "Bruine bonen zoutvlees / gerookte kip"
            : "Brown beans salted beef / smoked chicken",
          "€17,00",
        ],
        [
          language === "nl"
            ? "Char-siu bake met nasi/chow mein"
            : "Char-siu bake with fried rice/chow mein",
          "€19,00",
        ],
        [
          language === "nl"
            ? "Ketjap kip met nasi/chow mein"
            : "Soy sauce chicken with fried rice/chow mein",
          "€17,00",
        ],
      ],
    },
    {
      id: "roti",
      label: "Roti",
      icon: Leaf,
      items: [
        [language === "nl" ? "Rotirol vega" : "Vegetarian roti roll", "€12,00"],
        [language === "nl" ? "Rotirol kip" : "Chicken roti roll", "€14,00"],
        [
          language === "nl" ? "Roti kip met ei" : "Chicken roti with egg",
          "€16,50",
        ],
        [
          language === "nl"
            ? "Kip filet met kousenband"
            : "Chicken fillet with long beans",
          "€16,00",
        ],
        [
          language === "nl"
            ? "Kip met bot / kousenband"
            : "Chicken on the bone / long beans",
          "€15,00",
        ],
        [language === "nl" ? "Vega / kousenband" : "Vegetarian / long beans", "€14,50"],
        [language === "nl" ? "Roti plaat" : "Roti flatbread", "€3,00"],
      ],
    },
    {
      id: "fusion",
      label: "Fusion",
      icon: Flame,
      groups: [
        {
          title: language === "nl" ? "Vlees opties" : "Meat options",
          options: [
            "Jerk chicken",
            "BBQ chicken",
            "Bake chicken",
            "Char siu chicken",
          ],
        },
        {
          title: language === "nl" ? "Bijgerechten" : "Side options",
          options: [
            "Mash potato",
            "Mac & cheese",
            "Caesar salad",
            "Chow mein",
            "Nasi",
          ],
        },
      ],
      items: [
        [
          language === "nl" ? "Alle combinaties" : "All combination",
          "€20,00",
        ],
        [
          language === "nl" ? "Gerechten zonder vlees" : "Dishes without meat",
          "€13,50",
        ],
        ["Taco: shrimp, chicken, and ground beef", "€13,00"],
        ["Tortilla wrap"],
        ["Pepper water", "€16,00"],
        ["Collagen soup"],
      ],
    },
    {
      id: "soepen",
      label: language === "nl" ? "Soepen" : "Soups",
      icon: Soup,
      items: [
        [language === "nl" ? "Pinda soep" : "Peanut soup", "€13,00"],
        [language === "nl" ? "Sauto soep" : "Saoto soup", "€10,00"],
        [language === "nl" ? "Brafu soep" : "Brafu soup", "€13,00"],
        ["Pepperpot", "€16,00"],
        [language === "nl" ? "Koul soep" : "Chicken soup", "€16,00"],
      ],
    },
    {
      id: "snacks",
      label: "Snacks",
      icon: Star,
      items: [
        [
          language === "nl" ? "Teloh bakkeljauw" : "Teloh with salted cod",
          "€10,00",
        ],
        [
          language === "nl"
            ? "Speciaal / trie / lever / bakkeljauw"
            : "Special / trie / liver / salted cod",
          "€15,00",
        ],
        [language === "nl" ? "Baka bana" : "Fried plantain", "€7,50"],
        [language === "nl" ? "Sate kip" : "Chicken satay", "€7,50"],
        [language === "nl" ? "Sate gambas" : "Prawn satay", "€8,50"],
        [language === "nl" ? "Pom ballen" : "Pom balls", "€7,50"],
        [language === "nl" ? "Mais Pap" : "Corn porridge", "€7,50"],
        [language === "nl" ? "Banaan Pap" : "Banana porridge", "€7,50"],
      ],
    },
    {
      id: "dranken",
      label: language === "nl" ? "Dranken" : "Drinks",
      icon: CupSoda,
      items: [
        ["Fernandes", "€3,50"],
        ["Fanta", "€3,00"],
        ["Red Bull", "€3,75"],
        ["Water", "€3,00"],
        ["Cola", "€3,00"],
        ["Markoesa siroop", "€3,50"],
        [language === "nl" ? "Gember" : "Ginger", "€3,00"],
        [
          language === "nl" ? "Cola siroop" : "Cola siroop ",
          "€3,50",
        ],
        ["Dawet slush", "€3,00"],
        ["Camber beer", "€3,50"],
        ["Osawadt", "€3,50"],
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const notifyLayoutChange = () => {
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("mamarosa:layout-change"));
    });
  };

  useEffect(() => {
    notifyLayoutChange();

    const refreshAfterAnimation = window.setTimeout(notifyLayoutChange, 500);

    return () => window.clearTimeout(refreshAfterAnimation);
  }, [selectedCategory]);

  const visibleCategories =
    selectedCategory === "all"
      ? categories
      : categories.filter((cat) => cat.id === selectedCategory);

  const renderMenuRow = ([name, price], index) => (
    <motion.div
      key={`${name}-${price || "no-price"}`}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.025, duration: 0.35, ease: easeOut }}
      className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-primary/15 py-3.5 font-poppins text-sm leading-6 text-foreground/90 sm:text-[15px]"
    >
      <p className="min-w-0 break-words font-medium">{name}</p>
      {price && (
        <p className="whitespace-nowrap text-right font-semibold text-primary">
          {price}
        </p>
      )}
    </motion.div>
  );

  const renderCategoryCard = (cat, className = "") => {
    const Icon = cat.icon;

    return (
      <motion.article
        layout
        key={cat.id}
        variants={fadeScale}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        whileHover={{ y: -4 }}
        className={`scroll-mt-28 rounded-2xl border border-primary/30 bg-black p-5 shadow-lg shadow-primary/5 transition-colors duration-500 hover:border-primary/60 sm:p-6 ${className}`}
      >
        <div className="mb-5 flex items-center gap-3 border-b border-primary/20 pb-5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 text-primary">
            <Icon size={21} />
          </span>
          <h2 className="min-w-0 break-words font-playfair text-3xl leading-none text-primary sm:text-[34px] xl:text-4xl">
            {cat.label}
          </h2>
        </div>

        {cat.groups && (
          <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
            {cat.groups.map((group) => (
              <div
                key={group.title}
                className="rounded-xl border border-primary/20 bg-background/70 p-4"
              >
                <h3 className="font-poppins text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                  {group.title}
                </h3>
                <ul className="mt-3 space-y-2 font-poppins text-[13px] leading-6 text-foreground/75">
                  {group.options.map((option) => (
                    <li key={option} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="min-w-0 break-words">{option}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div>{cat.items.map(renderMenuRow)}</div>
      </motion.article>
    );
  };

  return (
    <section
      id="menu"
      className="min-h-screen bg-background px-5 py-24 text-foreground sm:px-8 sm:py-28 lg:px-10 xl:px-12"
    >
      <div className="mx-auto grid max-w-[1600px] gap-8 lg:grid-cols-[270px_1fr] xl:grid-cols-[300px_1fr]">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -26 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ duration: 0.75, ease: easeOut }}
          className="sticky top-40 hidden h-fit self-start rounded-3xl border border-primary/70 bg-background/80 px-4 pb-4 lg:flex lg:flex-col"
        >
          <div className="mt-10 flex flex-col gap-5">
            <Player src={food} loop autoplay className="h-[190px] w-full" />
          </div>

          <motion.div
            whileHover={{ y: -5 }}
            className="mt-6 rounded-2xl border border-primary/40 bg-icons p-6 shadow-lg shadow-primary/10"
          >
            <Soup className="mb-5 text-black" size={42} />

            <h3 className="font-playfair text-2xl text-background">
              {currentText.customTitle}
            </h3>

            <p className="mt-3 font-poppins text-sm leading-7 text-background/80">
              {currentText.customDescription}
            </p>

            <motion.a
              href="#contact"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl border border-primary/60 bg-white px-8 py-4 font-poppins text-[12px] font-bold text-black transition-colors duration-500 hover:bg-primary/70"
            >
              {currentText.contactButton}
              <MoveRight />
            </motion.a>
          </motion.div>
        </motion.aside>

        <div>
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <motion.h1
                variants={fadeUp}
                className="font-playfair text-6xl leading-none sm:text-7xl xl:text-8xl"
              >
                {currentText.titleStart}{" "}
                <span className="text-primary">
                  {currentText.titleHighlight}
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-[620px] font-poppins text-base leading-8 text-foreground/75 sm:text-lg"
              >
                {currentText.description}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-6 flex max-w-[620px] items-center gap-4 rounded-2xl border border-primary/35 bg-primary/10 px-4 py-4 sm:px-5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-background text-primary">
                  <Sprout size={21} />
                </span>

                <div className="min-w-0">
                  <p className="font-poppins text-sm font-bold text-primary sm:text-base">
                    {currentText.veganTitle} · €15,00
                  </p>
                  <p className="mt-1 font-poppins text-xs leading-5 text-foreground/75 sm:text-sm">
                    {currentText.veganDescription}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Dropdown */}
          <div className="mb-10 lg:hidden">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-primary/60 bg-background px-5 py-5 pr-14 font-poppins text-base font-semibold text-primary outline-none"
              >
                <option value="all">{currentText.viewAll}</option>
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

          {/* Phone / tablet grid */}
          <motion.div
            layout
            onLayoutAnimationComplete={notifyLayoutChange}
            className="grid gap-6 md:grid-cols-2 lg:hidden"
          >
            <AnimatePresence mode="popLayout">
              {visibleCategories.map((cat) => renderCategoryCard(cat))}
            </AnimatePresence>
          </motion.div>

          {/* Phone / tablet contact card */}
          <motion.aside
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: easeOut }}
            className="mt-8 rounded-[2rem] border border-primary/60 bg-black/80 p-5 shadow-lg shadow-primary/10 lg:hidden"
          >
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
                {currentText.customTitle}
              </h3>

              <p className="mt-4 font-poppins text-base leading-8 text-background/80">
                {currentText.customDescription}
              </p>

              <motion.a
                href="#contact"
                whileTap={{ scale: 0.98 }}
                className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-primary/60 bg-white px-7 py-4 font-poppins text-sm font-bold text-black transition-colors duration-500 hover:bg-primary/70 sm:w-auto"
              >
                {currentText.contactButton}
                <MoveRight size={22} />
              </motion.a>
            </div>
          </motion.aside>

          {/* Desktop grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="hidden gap-6 lg:grid lg:grid-cols-2 2xl:grid-cols-3"
          >
            {categories.map((cat) => renderCategoryCard(cat))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Menu;
