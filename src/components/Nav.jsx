import { Menu, X, Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { easeOut } from "../lib/motion";

const navText = {
  nl: {
    subtitle: "Surinaamse Fusion Cuisine",
    languageLabel: "Taal",
    links: [
      { label: "Home", href: "#home", id: "home" },
      { label: "Menu", href: "#menu", id: "menu" },
      { label: "Over ons", href: "#about", id: "about" },
      { label: "Contact", href: "#contact", id: "contact" },
    ],
  },

  en: {
    subtitle: "Surinamese Fusion Cuisine",
    languageLabel: "Language",
    links: [
      { label: "Home", href: "#home", id: "home" },
      { label: "Menu", href: "#menu", id: "menu" },
      { label: "About", href: "#about", id: "about" },
      { label: "Contact", href: "#contact", id: "contact" },
    ],
  },
};

function Nav({ language, setLanguage }) {
  const [isActive, setIsActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const navPadding = useTransform(scrollY, [0, 140], [16, 10]);
  const navBackground = useTransform(
    scrollY,
    [0, 140],
    ["rgba(0,0,0,0.70)", "rgba(0,0,0,0.88)"]
  );

  const currentText = navText[language];

  const handleNavClick = (id) => {
    setIsActive(id);
    setIsOpen(false);
  };

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setIsOpen(false);
  };


  // scroll detection on nav 
  useEffect(() => {
    const sectionIds = currentText.links.map((link) => link.id);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      let currentSection = "home";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);

        if (section && section.offsetTop <= scrollPosition) {
          currentSection = id;
        }
      });

      setIsActive(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentText.links]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
      className="fixed left-0 top-0 z-[90] w-full px-4 pt-4 sm:px-6 lg:px-8"
    >
      <motion.nav
        style={{ paddingTop: navPadding, paddingBottom: navPadding, backgroundColor: navBackground }}
        className="mx-auto flex max-w-[1920px] items-center justify-between rounded-[26px] border border-primary/55 px-5 shadow-[0_0_40px_rgba(218,162,80,0.14)] backdrop-blur-xl sm:px-7 lg:px-10 xl:px-14"
      >
        <a
          href="#home"
          onClick={() => handleNavClick("home")}
          className="flex flex-col leading-none"
        >
          <div className="font-cinzel text-[22px] font-semibold leading-none tracking-[0.13em] text-primary sm:text-[28px] lg:text-[34px] xl:text-[38px]">
            MAMAROSA
          </div>

          <p className="mt-2 hidden text-center font-poppins text-[9px] font-semibold uppercase tracking-[0.23em] text-primary/80 sm:block lg:text-[11px]">
            {currentText.subtitle}
          </p>
        </a>

        {/* Desktop nav */}
        <div className="hidden flex-1 items-center justify-center font-poppins text-[14px] font-medium uppercase tracking-[0.04em] text-foreground/80 xl:flex">
          <div className="grid grid-cols-4 place-items-center gap-16 2xl:gap-20">
            {currentText.links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => handleNavClick(link.id)}
                className={`relative whitespace-nowrap transition-colors duration-300 hover:text-primary ${
                  isActive === link.id ? "text-primary" : ""
                }`}
              >
                {link.label}

                {isActive === link.id && (
                  <motion.span
                    layoutId="active-nav-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute -bottom-4 left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_14px_rgba(218,162,80,0.7)]"
                  />
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Desktop language switcher */}
        <div className="hidden items-center gap-7 xl:flex">
          <button
            type="button"
            onClick={() => handleLanguageChange("nl")}
            className={`font-poppins text-[15px] font-bold transition-colors ${
              language === "nl"
                ? "text-primary"
                : "text-foreground/55 hover:text-primary"
            }`}
          >
            NL
          </button>

          <span className="text-primary/50">/</span>

          <button
            type="button"
            onClick={() => handleLanguageChange("en")}
            className={`font-poppins text-[15px] font-bold transition-colors ${
              language === "en"
                ? "text-primary"
                : "text-foreground/55 hover:text-primary"
            }`}
          >
            EN
          </button>

          <div className="h-12 w-px bg-primary/35" />

          <button
            type="button"
            aria-label="Switch language"
            onClick={() =>
              handleLanguageChange(language === "nl" ? "en" : "nl")
            }
            className="grid h-14 w-14 place-items-center rounded-full border border-primary/60 text-primary transition duration-300 hover:bg-primary hover:text-black"
          >
            <Languages size={25} strokeWidth={2.1} />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen(!isOpen)}
          className="grid h-12 w-12 place-items-center rounded-full border border-primary/45 text-primary transition-colors hover:bg-primary hover:text-black xl:hidden"
        >
          {isOpen ? <X size={25} /> : <Menu size={27} />}
        </button>
      </motion.nav>

      {/* Mobile / tablet dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.45, ease: easeOut }}
            className="mx-auto mt-3 max-w-[1920px] overflow-hidden rounded-[24px] border border-primary/35 bg-black/90 shadow-[0_0_35px_rgba(218,162,80,0.12)] backdrop-blur-xl xl:hidden"
          >
            <div className="flex flex-col px-6 py-6">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06 } },
                }}
                className="flex flex-col gap-1"
              >
                {currentText.links.map((link) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    onClick={() => handleNavClick(link.id)}
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-2xl px-4 py-4 font-poppins text-[15px] font-medium uppercase tracking-[0.08em] transition-colors ${
                      isActive === link.id
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/75 hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>

              <div className="my-5 h-px w-full bg-primary/25" />

              <div className="flex items-center justify-between rounded-2xl border border-primary/35 px-4 py-4">
                <span className="font-poppins text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground/70">
                  {currentText.languageLabel}
                </span>

                <div className="flex items-center gap-4 font-poppins text-[15px] font-bold">
                  <button
                    type="button"
                    onClick={() => handleLanguageChange("nl")}
                    className={
                      language === "nl" ? "text-primary" : "text-foreground/45"
                    }
                  >
                    NL
                  </button>

                  <span className="text-primary/40">/</span>

                  <button
                    type="button"
                    onClick={() => handleLanguageChange("en")}
                    className={
                      language === "en" ? "text-primary" : "text-foreground/45"
                    }
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Nav;
