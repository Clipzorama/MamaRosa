import { Menu, ShoppingCart } from "lucide-react";

function Nav() {
  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Gerechten", href: "#gerechten" },
    { label: "Broodjes", href: "#broodjes" },
    { label: "Dranken & Sappen", href: "#dranken" },
    { label: "Over ons", href: "#over-ons" },
  ];

  return (
    <header className="fixed left-0 top-0 z-[90] w-full">
      <nav className="mx-auto grid max-w-[1800px] grid-cols-[1fr_auto] items-center px-5 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8 lg:grid-cols-[360px_1fr_220px] lg:px-16 xl:px-24 2xl:px-28">
        {/* Logo */}
        <a href="#home" className="leading-none flex flex-col items-center">
          <div className="font-cinzel text-[22px] lg:text-[42px] font-semibold leading-none tracking-[0.18em] text-primary xl:text-[48px] 2xl:text-[52px]">
            MAMAROSA
          </div>

          <p className="mt-2 text-center font-poppins hidden lg:flex text-[12px] font-semibold uppercase tracking-[0.22em] text-primary/85 xl:text-[13px]">
            Surinaamse Fusion Cuisine
          </p>
        </a>

        {/* Desktop nav */}
        <div className="hidden font-poppins items-center justify-center gap-14 font-poppins text-[19px] font-semibold text-foreground/80 lg:flex xl:gap-16 2xl:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative whitespace-nowrap transition-colors duration-500 hover:text-primary"
            >
              {link.label}

              {link.label === "Home" && (
                <span className="absolute -bottom-5 left-0 h-[3px] w-full rounded-full bg-primary" />
              )}
            </a>
          ))}
        </div>

        {/* Desktop button */}
        <a
          href="#bestel"
          className="hidden justify-self-end rounded-xl border-2 border-primary/70 px-8 py-5 font-poppins text-[21px] font-bold text-primary transition-colors duration-500 hover:bg-primary hover:text-black lg:flex items-center gap-4"
        >
          Bestel Nu
          <ShoppingCart size={26} strokeWidth={2.2} />
        </a>

        {/* Mobile / tablet menu */}
        <button
          type="button"
          aria-label="Open menu"
          className="flex justify-self-end text-primary lg:hidden"
        >
          <Menu size={36} strokeWidth={2.4} />
        </button>
      </nav>
    </header>
  );
}

export default Nav;