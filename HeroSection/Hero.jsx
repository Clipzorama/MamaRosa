import {
  ChefHat,
  Heart,
  Leaf,
  ShoppingBag,
  Star,
  Utensils,
} from "lucide-react";
import Effect from "./Effect";

function Hero() {
  return (
    <section id="home" className="hero-section">
      <Effect />

      <div className="absolute inset-0 z-10" />

      <div className="relative z-20 flex min-h-screen items-start px-6 pt-32 sm:px-10 sm:pt-40 lg:items-center lg:px-16 lg:pt-28 xl:px-24 2xl:px-32">
        <div className="max-w-[360px] sm:max-w-[430px] lg:max-w-2xl xl:max-w-[760px] xl:translate-y-10 2xl:translate-y-14 opacity-0 animate-fade-in-delay-2"> 
          <div className="mb-7 flex items-start gap-3 font-poppins font-semibold uppercase leading-6 tracking-[0.12em] text-primary text-[18px] xl:text-[22px]  xl:mb-9">
            <Star size={16} className="mt-1 fill-primary text-primary" />
            <span>
              Authentiek. <br className="sm:hidden" />
              Passie. <br className="sm:hidden" />
              Smaak.
            </span>
          </div>

          <h1 className="font-playfair text-[46px] font-semibold leading-[0.95] text-foreground sm:text-6xl lg:text-8xl xl:text-[112px] 2xl:text-[128px]">
            Welkom bij{" "}
            <span className="inline-flex items-center text-primary">
              Mamarosa
              <svg
                viewBox="0 0 240 190"
                className="ml-2 h-[1.35em] w-[1.35em] translate-y-3 text-primary"
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

          <p className="mt-6 max-w-xl font-poppins text-sm leading-7 text-foreground/80 sm:text-base lg:mt-8 lg:text-xl lg:leading-8 xl:max-w-[650px] xl:text-[22px] xl:leading-9">
            Waar Surinaamse tradities en Caribische smaken samenkomen in een
            verrassende fusion ervaring. Met liefde bereid, voor jou geserveerd.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:w-fit lg:mt-10 lg:flex-row xl:mt-12 xl:gap-6">
            <a
              href="#gerechten"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-primary px-7 py-4 font-poppins text-sm font-semibold text-black transition duration-300 hover:bg-[#ffd58a] xl:px-10 xl:py-5 xl:text-base"
            >
              <Utensils size={20} />
              Bekijk Menu
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 rounded-lg border border-icons/70 px-7 py-4 font-poppins text-sm font-semibold text-foreground transition duration-300 hover:bg-primary hover:text-black xl:px-10 xl:py-5 xl:text-base"
            >
              <ShoppingBag size={20} />
              Bestel Nu
            </a>
          </div>

          <div className="mt-14 hidden max-w-4xl items-center font-poppins text-primary lg:flex xl:mt-16">
            <div className="flex items-center gap-4 pr-8 xl:gap-5 xl:pr-10">
              <ChefHat className="h-8 w-8 text-icons xl:h-9 xl:w-9" />

              <div className="flex flex-col gap-2">
                <h3 className="text-4xl font-semibold text-primary xl:text-5xl">20+</h3>
                <p className="text-sm text-foreground/70 xl:text-base">Jaar ervaring</p>
              </div>
            </div>

            <div className="h-16 w-px bg-foreground/15 xl:h-20" />

            <div className="flex items-center gap-4 px-8 xl:gap-5 xl:px-10">
              <Heart className="h-8 w-8 text-icons xl:h-9 xl:w-9" />

              <div className="flex flex-col gap-2">
                <h3 className="text-4xl font-semibold text-primary xl:text-5xl">1000+</h3>
                <p className="text-sm text-foreground/70 xl:text-base">Tevreden klanten</p>
              </div>
            </div>

            <div className="h-16 w-px bg-foreground/15 xl:h-20" />

            <div className="flex items-center gap-4 pl-8 xl:gap-5 xl:pl-10">
              <Leaf className="h-8 w-8 text-icons xl:h-9 xl:w-9" />

              <div className="flex flex-col gap-2">
                <h3 className="text-4xl font-semibold text-primary xl:text-5xl">Verse</h3>
                <p className="text-sm text-foreground/70 xl:text-base">Ingrediënten</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default Hero;

