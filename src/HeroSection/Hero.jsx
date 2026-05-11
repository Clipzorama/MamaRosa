import {
  ChefHat,
  Heart,
  Leaf,
  ShoppingBag,
  Star,
  Utensils,
} from "lucide-react";
import { motion } from "framer-motion";
import Effect from "./Effect";
import { easeOut, fadeUp, staggerContainer } from "../lib/motion";

const heroText = {
  nl: {
    badge: ["Authentiek.", "Passie.", "Smaak."],
    titleTop: "Welkom bij",
    titleHighlight: "Mamarosa",
    description:
      "Waar Surinaamse tradities en Caribische smaken samenkomen in een verrassende fusion ervaring. Met liefde bereid, voor jou geserveerd.",
    menuButton: "Bekijk Menu",
    orderButton: "Bestel Nu",
    yearsLabel: "Jaar ervaring",
    customersLabel: "Tevreden klanten",
    freshTitle: "Verse",
    freshLabel: "Ingrediënten",
  },

  en: {
    badge: ["Authentic.", "Passion.", "Flavor."],
    titleTop: "Welcome to",
    titleHighlight: "Mamarosa",
    description:
      "Where Surinamese traditions and Caribbean flavors come together in a surprising fusion experience. Prepared with love, served for you.",
    menuButton: "View Menu",
    orderButton: "Order Now",
    yearsLabel: "Years experience",
    customersLabel: "Happy customers",
    freshTitle: "Fresh",
    freshLabel: "Ingredients",
  },
};

function Hero({ language }) {
  const currentText = heroText[language];
  const stats = [
    { icon: ChefHat, value: "20+", label: currentText.yearsLabel },
    { icon: Heart, value: "1000+", label: currentText.customersLabel },
    { icon: Leaf, value: currentText.freshTitle, label: currentText.freshLabel },
  ];

  return (
    <section id="home" className="hero-section">
      <Effect />

      <div className="absolute inset-0 z-10" />

      <div className="relative z-20 flex min-h-screen items-start px-6 pt-25 sm:px-10 sm:pt-40 lg:items-center lg:px-16 lg:pt-24 xl:px-20 2xl:px-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-96 max-w-[360px] sm:max-w-[430px] lg:max-w-[620px] xl:max-w-[660px] xl:translate-y-4 2xl:translate-y-6"
        >
          <motion.div
            variants={fadeUp}
            className="mt-5 lg:mt-20 mb-10 flex items-start gap-3 font-poppins font-medium uppercase leading-6 tracking-[0.12em] text-primary text-[15px] xl:mb-9"
          >
            <Star size={16} className="mt-1 fill-primary text-primary" />
            <span>
              {currentText.badge[0]} <br className="sm:hidden" />
              {currentText.badge[1]} <br className="sm:hidden" />
              {currentText.badge[2]}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-playfair text-[46px] font-medium leading-[0.55] text-foreground sm:text-6xl lg:text-[92px] xl:text-[95px] 2xl:text-[98px]"
          >
            {currentText.titleTop}{" "}
            <span className="inline-flex items-center text-primary">
              {currentText.titleHighlight}
              <motion.svg
                viewBox="0 0 240 190"
                className="ml-2 h-[1.35em] w-[1.35em] translate-y-1 text-primary"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M36 132 C68 166, 125 165, 165 134 C194 111, 221 55, 184 27 C150 1, 112 34, 120 91 C107 49, 61 35, 48 70 C35 107, 92 132, 165 134 C175 134, 182 142, 172 147"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.4, delay: 0.55, ease: easeOut }}
                />
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-xl font-poppins text-xs text-pretty leading-7 text-foreground/80 sm:text-base lg:text-[15px] lg:leading-8 xl:max-w-[500px] xl:text-[17px] xl:leading-9"
          >
            {currentText.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:w-fit md:w-fit lg:mt-9 lg:flex-row xl:mt-10 xl:gap-5"
          >
            <motion.a
              href="#menu"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-fit items-center justify-center gap-2 self-start rounded-lg bg-primary px-5 py-3 font-poppins text-sm font-semibold text-black transition duration-300 hover:bg-[#ffd58a] sm:px-6 sm:py-3 md:px-6 md:py-3 lg:px-7 lg:py-4 xl:px-8 xl:py-4 xl:text-base"
            >
              <Utensils size={18} />
              {currentText.menuButton}
            </motion.a>

            <motion.a
              href="https://www.bistroo.nl/almere/restaurants/mama-rosa?utm_source=mama-rosa&utm_medium=reserve_with_google&distribution=1&rwg_token=AFd1xnG_sjXWzWpGgFemwNeVVAs_pwr22U_oPRwAOMIlG_VgfTQaTA1RbzOOg7ADl7cIdg3jymDL_X9lrA7LbFX-IwwBa1xjBg%3D%3D"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-fit items-center justify-center gap-2 self-start rounded-lg border border-icons/70 px-5 py-3 font-poppins text-sm font-semibold text-primary transition duration-300 hover:bg-primary hover:text-black sm:px-6 sm:py-3 md:px-6 md:py-3 lg:px-7 lg:py-4 xl:px-8 xl:py-4 xl:text-base"
            >
              <ShoppingBag size={18} />
              {currentText.orderButton}
            </motion.a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 hidden max-w-4xl items-center font-poppins text-primary lg:flex"
          >
            {stats.map(({ icon: Icon, value, label }, index) => (
              <div key={label} className="flex items-center">
                {index > 0 && <div className="h-16 w-px bg-foreground/15 xl:h-20" />}
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`flex items-center gap-4 xl:gap-5 ${
                    index === 0 ? "pr-5" : index === stats.length - 1 ? "pl-5" : "px-5"
                  }`}
                >
                  <Icon className="h-6 w-6 text-icons xl:h-9 xl:w-9" />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-4xl font-semibold text-primary xl:text-xl">
                      {value}
                    </h3>
                    <p className="text-xs text-foreground/80">{label}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
