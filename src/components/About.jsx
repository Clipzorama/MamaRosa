import { motion } from "framer-motion";
import {
  Flame,
  Users,
  Star,
  Soup
} from "lucide-react";

import { FaInstagram, FaTiktok, FaSnapchat } from "react-icons/fa";

import aboutPic from "../assets/aboutpic.webp";

const values = [
  {
    icon: Soup,
    title: "Authentiek",
    text: "Traditionele Surinaamse recepten, met respect voor onze roots.",
  },
  {
    icon: Flame,
    title: "Met passie",
    text: "Elke maaltijd wordt bereid met liefde, aandacht en echte vakmanschap.",
  },
  {
    icon: Users,
    title: "Voor iedereen",
    text: "Van familie diners tot speciale gelegenheden, wij heten je welkom.",
  },
  {
    icon: Star,
    title: "Kwaliteit",
    text: "Alleen de beste ingrediënten voor de meest smaakvolle ervaring.",
  },
];

const socials = [
  {
    label: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/surinamecuisine",
    className: "bg-pink-600 text-white shadow-pink-600/30",
  },
  {
    label: "Snapchat",
    icon: FaSnapchat,
    href: "https://www.snapchat.com/add/surinamefusion",
    className: "bg-yellow-300 text-black shadow-yellow-300/30",
  },
  {
    label: "TikTok",
    icon: FaTiktok,
    href: "https://www.tiktok.com/@surinamecuisine?_r=1&_t=zn-95azwbstrzo",
    className: "border border-foreground/25 bg-black text-foreground",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-background px-6 pt-36 pb-24 text-foreground sm:px-8 md:px-10 lg:px-12 xl:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(205,151,79,0.16),transparent_35%),radial-gradient(circle_at_15%_85%,rgba(205,151,79,0.10),transparent_30%)]" />

      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] xl:gap-20">
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-5 flex items-center gap-3 font-poppins text-xs font-bold uppercase tracking-[0.25em] text-primary sm:text-sm">
              <Star size={16} fill="currentColor" />
              Meer dan eten. Een ervaring.
            </div>

            <h2 className="font-playfair text-[72px] leading-[0.9] text-foreground sm:text-[96px] md:text-[130px] lg:text-[112px]">
              Over <span className="text-primary">Ons</span>
            </h2>

            <div className="mt-8 h-[3px] w-24 md:w-48 rounded-full bg-primary" />

            <p className="mt-9 max-w-xl font-poppins text-[18px] leading-[2] text-foreground/80 sm:text-[14px] md:text-[18px] lg:text-[16px] text-balance">
              Mama Rosa is ontstaan uit een duidelijke vraag naar iets nieuws en unieks in Almere. 
              Er was geen plek die Surinaams/Caribisch eten aanbood met een fusion twist. 
              Wij zijn trots de enigen in Almere te zijn die onder andere Jerk Chicken serveren. 
              Daarom zijn wij begonnen: om een leegte te vullen en iets bijzonders te creëren voor de gemeenschap.
            </p>

            <p className="mt-8 font-playfair text-3xl italic text-primary sm:text-4xl">
              Met liefde, Mama Rosa
            </p>

            <div className="mt-14">
              <h3 className="mb-5 font-poppins text-md font-bold uppercase tracking-[0.18em] text-primary">
                Volg ons
              </h3>

              <p className="mb-6 max-w-md font-poppins sm:text-[14px] md:text-[16px] lg:text-[16px] xl:text-[18px] leading-7 text-foreground/75">
                Blijf op de hoogte van nieuwe gerechten, specials en acties!
              </p>

              <div className="flex flex-wrap gap-4">
                {socials.map(({ label, icon: Icon, href, className }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    whileHover={{ y: -4, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center gap-3 rounded-xl px-6 py-4 font-poppins text-sm font-bold shadow-lg transition-all ${className}`}
                  >
                    <Icon size={20} />
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <motion.div
              initial={{ y: 0 }}
              whileInView={{ y: [-10, 10, -10] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="overflow-hidden rounded-[2rem] border border-primary/50 bg-black/40 shadow-[0_0_60px_rgba(205,151,79,0.12)]"
            >
              <img
                src={aboutPic}
                alt="Mamarosa Surinaamse kruiden en ingrediënten"
                className="h-[360px] w-full object-cover sm:h-[430px] md:h-[500px] lg:h-[600px] xl:h-[650px]"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Desktop cards */}
        <div className="mt-16 hidden grid-cols-4 gap-6 lg:grid">
          {values.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="rounded-2xl border border-primary/35 bg-black/40 p-8 text-center backdrop-blur-sm hover:bg-primary/10 transition-colors duration-500"
            >
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full border border-primary/50 text-primary">
                <Icon size={32} />
              </div>

              <h3 className="mb-4 font-poppins text-lg font-bold uppercase tracking-wide text-primary">
                {title}
              </h3>

              <p className="font-poppins text-sm leading-7 text-foreground/75">
                {text}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Mobile / tablet cards */}
        <div className="mt-10 grid gap-4 lg:hidden">
          {values.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex gap-5 rounded-2xl border border-primary/35 bg-black/40 p-5"
            >
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-primary/50 text-primary">
                <Icon size={26} />
              </div>

              <div>
                <h3 className="font-poppins text-lg font-bold uppercase text-primary">
                  {title}
                </h3>
                <p className="mt-2 font-poppins text-sm leading-6 text-foreground/75">
                  {text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}