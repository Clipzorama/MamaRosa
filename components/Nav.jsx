import { Menu, Earth } from "lucide-react";
import { useState } from "react";


function Nav() {
  
  const [isEnglish, setIsEnglish] = useState(false); 
  const [isActive, setisActive] = useState("Home");

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Menu", href: "#menu" },
    { label: "Over ons", href: "#about" },
    { label: "Horeca", href: "#catering" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed left-0 top-0 z-[90] w-full">
      <nav className="mt-3 mx-auto grid max-w-[1700px] grid-cols-[1fr_auto] items-center px-5 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8 lg:grid-cols-[360px_1fr_220px] lg:px-14 xl:px-16 2xl:px-20 opacity-0 animate-fade-in-delay-2">
        {/* Logo */}
        <a href="#home" className="flex flex-col justify-self-start leading-none lg:items-center">
          <div className="font-cinzel text-[22px] lg:text-[34px] font-semibold leading-none tracking-[0.18em] text-primary xl:text-[38px] 2xl:text-[42px]">
            MAMAROSA
          </div>

          <p className="mt-2 text-center font-poppins hidden lg:flex text-[9px] font-semibold uppercase tracking-[0.22em] text-primary/85 xl:text-[12px]">
            Surinaamse Fusion Cuisine
          </p>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center justify-center gap-10 font-poppins text-[13px] font-normal text-foreground/80 xl:flex xl:gap-11 2xl:gap-15">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setisActive(link.label)}
              className="relative whitespace-nowrap transition-colors duration-500 hover:text-primary"
            >
              {link.label}

              {isActive === link.label && (
                <span className="absolute -bottom-3 left-0 h-[3px] w-full rounded-full bg-primary" />
              )}
            </a>
          ))}
        </div>

        {/* Desktop button */}
        <button
          onClick={() => setIsEnglish(!isEnglish)}
          className="hidden justify-self-end rounded-xl border-2 border-primary/70 px-3 py-3 font-poppins text-[17px] font-bold text-primary transition-colors duration-500 hover:bg-primary/30 xl:flex items-center gap-4"
        >
          <span className="flex gap-2">
            <span
              className={`${
                !isEnglish ? "underline text-primary" : "opacity-60"
              }`}
            >
              NL
            </span>

            /

            <span
              className={`${
                isEnglish ? "underline text-primary" : "opacity-60"
              }`}
            >
              EN
            </span>
          </span>

          <Earth size={26} strokeWidth={2.2} />
        </button>

        {/* Mobile / tablet menu */}
        <button
          type="button"
          aria-label="See Nav"
          className="flex justify-self-end text-primary xl:hidden"
        >
          <Menu size={36} strokeWidth={2.4} />
        </button>
      </nav>
    </header>
  );
}

export default Nav;