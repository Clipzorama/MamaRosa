import {
  ChefHat,
  Heart,
  Leaf,
  ShoppingBag,
  Star,
  Utensils,
} from "lucide-react";
import Effect from "./Effect";

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

  return (
    <section id="home" className="hero-section">
      <Effect />

      <div className="absolute inset-0 z-10" />

      <div className="relative z-20 flex min-h-screen items-start px-6 pt-25 sm:px-10 sm:pt-40 lg:items-center lg:px-16 lg:pt-24 xl:px-20 2xl:px-24">
        <div className="mb-96 max-w-[360px] sm:max-w-[430px] lg:max-w-[620px] xl:max-w-[660px] xl:translate-y-4 2xl:translate-y-6 opacity-0 animate-fade-in-delay-2">
          <div className="mt-5 lg:mt-20 mb-10 flex items-start gap-3 font-poppins font-medium uppercase leading-6 tracking-[0.12em] text-primary text-[15px] xl:mb-9">
            <Star size={16} className="mt-1 fill-primary text-primary" />
            <span>
              {currentText.badge[0]} <br className="sm:hidden" />
              {currentText.badge[1]} <br className="sm:hidden" />
              {currentText.badge[2]}
            </span>
          </div>

          <h1 className="font-playfair text-[46px] font-medium leading-[0.55] text-foreground sm:text-6xl lg:text-[92px] xl:text-[95px] 2xl:text-[98px]">
            {currentText.titleTop}{" "}
            <span className="inline-flex items-center text-primary">
              {currentText.titleHighlight}
              <svg
                viewBox="0 0 240 190"
                className="ml-2 h-[1.35em] w-[1.35em] translate-y-1 text-primary"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36 132 C68 166, 125 165, 165 134 C194 111, 221 55, 184 27 C150 1, 112 34, 120 91 C107 49, 61 35, 48 70 C35 107, 92 132, 165 134 C175 134, 182 142, 172 147"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </h1>

          <p className="max-w-xl font-poppins text-xs text-pretty leading-7 text-foreground/80 sm:text-base lg:text-[15px] lg:leading-8 xl:max-w-[500px] xl:text-[17px] xl:leading-9">
            {currentText.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:w-fit md:w-fit lg:mt-9 lg:flex-row xl:mt-10 xl:gap-5">
            <a
              href="#menu"
              className="inline-flex w-fit items-center justify-center gap-2 self-start rounded-lg bg-primary px-5 py-3 font-poppins text-sm font-semibold text-black transition duration-300 hover:bg-[#ffd58a] sm:px-6 sm:py-3 md:px-6 md:py-3 lg:px-7 lg:py-4 xl:px-8 xl:py-4 xl:text-base"
            >
              <Utensils size={18} />
              {currentText.menuButton}
            </a>

            <a
              href="#contact"
              className="inline-flex w-fit items-center justify-center gap-2 self-start rounded-lg border border-icons/70 px-5 py-3 font-poppins text-sm font-semibold text-primary transition duration-300 hover:bg-primary hover:text-black sm:px-6 sm:py-3 md:px-6 md:py-3 lg:px-7 lg:py-4 xl:px-8 xl:py-4 xl:text-base"
            >
              <ShoppingBag size={18} />
              {currentText.orderButton}
            </a>
          </div>

          <div className="mt-10 hidden max-w-4xl items-center font-poppins text-primary lg:flex">
            <div className="flex items-center gap-4 pr-5 xl:gap-5">
              <ChefHat className="h-6 w-6 text-icons xl:h-9 xl:w-9" />

              <div className="flex flex-col gap-2">
                <h3 className="text-4xl font-semibold text-primary xl:text-xl">20+</h3>
                <p className="text-xs text-foreground/80">{currentText.yearsLabel}</p>
              </div>
            </div>

            <div className="h-16 w-px bg-foreground/15 xl:h-20" />

            <div className="flex items-center gap-4 px-5 xl:gap-5 ">
              <Heart className="h-6 w-6 text-icons xl:h-9 xl:w-9" />

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-primary xl:text-lg">1000+</h3>
                <p className="text-xs text-foreground/80">{currentText.customersLabel}</p>
              </div>
            </div>

            <div className="h-16 w-px bg-foreground/15 xl:h-20" />

            <div className="flex items-center gap-4 pl-5 xl:gap-5">
              <Leaf className="h-6 w-6 text-icons xl:h-9 xl:w-9" />

              <div className="flex flex-col gap-2">
                <h3 className="text-4xl font-semibold text-primary xl:text-xl">
                  {currentText.freshTitle}
                </h3>
                <p className="text-xs text-foreground/80">{currentText.freshLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;