// src/components/Menu.jsx
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
import food from "../adds/Food.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { easeOut, fadeScale, fadeUp, staggerContainer, viewport } from "../lib/motion";

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
      [language === "nl" ? "Tempeh / kousenband" : "Tempeh / long beans", "€6,50"],
      [language === "nl" ? "Kerrie ei" : "Curry egg", "€6,50"],
      [language === "nl" ? "Avocado" : "Avocado", "€6,50"],
      [language === "nl" ? "Ketjap kip" : "Soy sauce chicken", "€6,50"],
      [language === "nl" ? "Tjaseuw kip" : "Char siu chicken", "€6,50"],
      ["Fa-chong", "€6,50"],
      [language === "nl" ? "Kerrie kip" : "Curry chicken", "€6,50"],
      [language === "nl" ? "Lever" : "Liver", "€6,50"],
      ["Pom", "€6,50"],
      [language === "nl" ? "Garnalen / kousenband" : "Shrimp / long beans", "€7,50"],
      [language === "nl" ? "Zoutvlees / kousenband" : "Salted beef / long beans", "€7,50"],
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
      [language === "nl" ? "Bami kip" : "Bami chicken", "€16,50"],
      [language === "nl" ? "Tjauwmin kip" : "Chow mein chicken", "€16,50"],
      [language === "nl" ? "Tjauwmin speciaal" : "Special chow mein", "€18,50"],
      [language === "nl" ? "Nasi kip" : "Fried rice chicken", "€16,50"],
      [language === "nl" ? "Nasi speciaal" : "Special fried rice", "€18,50"],
      ["Jar pesi Moxi Alesi", "€18,50"],
      [
        language === "nl"
          ? "Bruine bonen zoutvlees / gerookte kip"
          : "Brown beans salted beef / smoked chicken",
        "€16,50",
      ],
      [language === "nl"
        ? "Char-siu bake met nasi/chow mein"
        : "Char-siu bake with fried rice/chow mein",
      "€18,50"
      ],
      [language === "nl"
        ? "Ketjap kip met nasi/chow mein"
        : "Soy sauce chicken with fried rice/chow mein",
      "€16,50"
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
      [language === "nl" ? "Kip filet met kousenband" : "Chicken fillet with long beans", "€16,00"],
      [language === "nl" ? "Kip met bot / kousenband" : "Chicken on the bone / long beans", "€15,00"],
      [language === "nl" ? "Vega / kousenband" : "Vegetarian / long beans", "€14,50"],
      [language === "nl" ? "Roti plaat" : "Roti flatbread", "€3,00"],
    ],
  },
  {
    id: "fusion",
    label: "Fusion",
    icon: Flame,
    items: [
      [language === "nl"
        ? "Jerk, BBQ kip met nasi/chow mein/aardappelpuree/mac & cheese"
        : "Jerk, BBQ chicken with fried rice/chow mein/mashed potatoes/mac & cheese",
      "€21,50"
    ],
      [language === "nl" ? "Peperwater vis" : "Pepperwater fish", "€15,00"],
      ["Mac & Cheese", "€13,50"],
      ["Taco fusion", "€12,50"],
    ],
  },
  {
    id: "soepen",
    label: language === "nl" ? "Soepen" : "Soups",
    icon: Soup,
    items: [
      [language === "nl" ? "Pinda soep" : "Peanut soup", "€12,50"],
      [language === "nl" ? "Sauto soep" : "Saoto soup", "€8,50"],
      [language === "nl" ? "Brafu soep" : "Brafu soup", "€12,50"],
    ],
  },
  {
    id: "snacks",
    label: "Snacks",
    icon: Star,
    items: [
      [language === "nl" ? "Teloh bakkeljauw" : "Teloh with salted cod", "€8,50"],
      [
        language === "nl"
          ? "Speciaal / trie / lever / bakkeljauw"
          : "Special / trie / liver / salted cod",
        "€12,50",
      ],
      [language === "nl" ? "Baka bana" : "Fried plantain", "€7,00"],
      [language === "nl" ? "Sate kip" : "Chicken satay", "€7,00"],
      [language === "nl" ? "Sate gambas" : "Prawn satay", "€8,00"],
      [language === "nl" ? "Pom ballen" : "Pom balls", "€7,00"],
      [language === "nl" ? "Mais Pap" : "Corn porridge", "€7,00"],
      [language === "nl" ? "Banaan Pap" : "Banana porridge", "€7,00"],
    ],
  },
  {
    id: "dranken",
    label: language === "nl" ? "Dranken" : "Drinks",
    icon: CupSoda,
    items: [
      ["Fernandes", "€2,50"],
      ["Fanta", "€2,50"],
      ["Redbull", "€3,00"],
      [language === "nl" ? "Water" : "Water", "€2,00"],
      ["Markoesa slush", "€3,00"],
      [language === "nl" ? "Gember" : "Ginger", "€3,00"],
      [language === "nl" ? "Cola siroop slush" : "Cola syrup slush", "€2,50"],
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
        
        {/* Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -26 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewport}
        transition={{ duration: 0.75, ease: easeOut }}
        className="sticky top-40 hidden self-start rounded-3xl border border-primary/95 bg-background/80 px-4 pb-4 lg:flex lg:flex-col lg:h-fit"
      >
        <div className="mt-14 flex flex-col gap-5">
          <Player src={food} loop autoplay className="h-[200px] w-full" />
        </div>

        <motion.div
          whileHover={{ y: -5, boxShadow: "0 24px 70px rgba(218,162,80,0.16)" }}
          className="mt-8 rounded-2xl border border-primary/40 bg-icons p-6"
        >
          <Soup className="mb-5 text-black" size={42} />

          <h3 className="font-playfair text-2xl text-background">
            {currentText.customTitle}
          </h3>

          <p className="mt-3 font-poppins text-sm leading-7 text-foreground/70">
            {currentText.customDescription}
          </p>

          <motion.a
            href="#contact"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-xl border border-primary/60 bg-white px-8 py-4 font-poppins text-[12px] font-bold text-black transition-colors duration-500 hover:bg-primary/70"
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
                className="mt-5 max-w-[560px] font-poppins text-base leading-8 text-foreground/75 sm:text-lg"
              >
                {currentText.description}
              </motion.p>
            </div>
          </motion.div>

          {/* Dropdown */}
          <div className="mb-10 lg:hidden">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none rounded-xl border border-primary/60 bg-background px-5 py-5 pr-14 font-poppins text-base font-semibold text-primary outline-none"
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

          {/* Mobile grid */}
          <motion.div layout className="grid gap-6 md:grid-cols-2 lg:hidden">
            <AnimatePresence mode="popLayout">
              {visibleCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <motion.article
                    layout
                    key={cat.id}
                    variants={fadeScale}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.96, y: 16 }}
                    whileHover={{ y: -6 }}
                    className="scroll-mt-28 rounded-3xl border border-primary/30 bg-black p-6 sm:p-8"
                  >
                    <div className="mb-6 flex items-center gap-3">
                      <Icon className="text-primary" size={26} />
                      <h2 className="font-playfair text-3xl text-primary sm:text-4xl">
                        {cat.label}
                      </h2>
                    </div>
                    <div className="space-y-4 pt-5">
                      {cat.items.map(([name, price]) => (
                      <motion.div
                        key={name}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-between gap-4 border-b border-primary/20 pb-3"
                      >
                        <p>{name}</p>
                        <p className="font-bold text-primary">{price}</p>
                      </motion.div>
                    ))}
                    </div>
                    
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Phone / tablet contact card */}
          <motion.aside
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: easeOut }}
            className="mt-8 rounded-[2rem] border border-primary/60 bg-black/80 p-5 shadow-[0_0_35px_rgba(218,162,80,0.08)] lg:hidden"
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

              <p className="mt-4 font-poppins text-base leading-8 text-foreground/80">
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
            className="hidden gap-6 lg:grid xl:grid-cols-3"
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.article
                  key={cat.id}
                  variants={fadeScale}
                  whileHover={{ y: -8, borderColor: "rgba(218,162,80,0.68)" }}
                  className="scroll-mt-28 rounded-3xl border border-primary/30 bg-black p-6 sm:p-8"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <Icon className="text-primary" size={26} />
                    <h2 className="font-playfair text-3xl text-primary sm:text-4xl">
                      {cat.label}
                    </h2>
                  </div>
                  <div className="space-y-4 pt-5">
                    {cat.items.map(([name, price], index) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.025, duration: 0.35 }}
                      className="flex justify-between gap-4 border-b border-primary/20 pb-3"
                    >
                      <p>{name}</p>
                      <p className="font-bold text-primary">{price}</p>
                    </motion.div>
                  ))}
                  </div>
                  
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Menu;
