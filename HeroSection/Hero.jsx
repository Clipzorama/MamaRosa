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

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/30 lg:bg-gradient-to-r lg:from-black lg:via-black/80 lg:to-black/10" />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-[1500px] items-start px-6 pt-32 sm:px-10 sm:pt-40 lg:items-center lg:px-16 lg:pt-28">
        <div className="max-w-[360px] sm:max-w-[430px] lg:max-w-2xl">
          <div className="mb-7 flex items-start gap-3 font-poppins text-xs font-bold uppercase leading-6 tracking-[0.12em] text-[#efc06f] sm:text-sm lg:text-base">
            <Star size={16} className="mt-1 fill-[#efc06f] text-[#efc06f]" />
            <span>
              Authentiek. <br className="sm:hidden" />
              Passie. <br className="sm:hidden" />
              Smaak.
            </span>
          </div>

          <h1 className="font-playfair text-[46px] font-semibold leading-[0.95] text-white sm:text-6xl lg:text-8xl">
            Welkom bij{" "}
            <span className="block text-[#efc06f]">
              Mamarosa<span className="ml-1 font-light">♡</span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl font-poppins text-sm leading-7 text-white/80 sm:text-base lg:mt-8 lg:text-lg lg:leading-8">
            Waar Surinaamse tradities en Caribische smaken samenkomen in een
            verrassende fusion ervaring. Met liefde bereid, voor jou geserveerd.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:w-fit lg:mt-10 lg:flex-row">
            <a
              href="#gerechten"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#efc06f] px-7 py-4 font-poppins text-sm font-semibold text-black transition duration-300 hover:bg-[#ffd58a]"
            >
              <Utensils size={18} />
              Bekijk Menu
            </a>

            <a
              href="#bestel"
              className="inline-flex items-center justify-center gap-3 rounded-lg border border-[#efc06f]/70 px-7 py-4 font-poppins text-sm font-semibold text-white transition duration-300 hover:bg-[#efc06f] hover:text-black"
            >
              <ShoppingBag size={18} />
              Bestel Nu
            </a>
          </div>

          <div className="mt-14 hidden max-w-2xl grid-cols-3 gap-4 text-[#efc06f] lg:grid">
            <Stat icon={<ChefHat />} number="20+" text="Jaar ervaring" />
            <Stat icon={<Heart />} number="1000+" text="Tevreden klanten" />
            <Stat icon={<Leaf />} number="Verse" text="Ingrediënten" last />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, number, text, last }) {
  return (
    <div
      className={`flex items-center gap-3 pr-4 ${
        !last ? "border-r border-white/15" : ""
      }`}
    >
      {icon}
      <div>
        <h3 className="font-poppins text-3xl font-bold">{number}</h3>
        <p className="font-poppins text-sm text-white/70">{text}</p>
      </div>
    </div>
  );
}

export default Hero;