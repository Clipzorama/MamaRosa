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
    <header className="fixed left-0 top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 sm:px-8 lg:px-16">
        <a href="#home">
          <div className="font-cinzel text-xl font-semibold tracking-[0.16em] text-[#efc06f] sm:text-2xl lg:text-4xl">
            MAMAROSA
          </div>

          <p className="hidden text-center font-poppins text-[9px] font-medium uppercase tracking-[0.32em] text-white/75 sm:block lg:text-[10px]">
            Surinaamse Fusion Cuisine
          </p>
        </a>

        <div className="hidden items-center gap-8 font-poppins text-sm font-medium text-white lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative transition-colors duration-300 hover:text-[#efc06f]"
            >
              {link.label}

              {link.label === "Home" && (
                <span className="absolute -bottom-3 left-0 h-[2px] w-full rounded-full bg-[#efc06f]" />
              )}
            </a>
          ))}
        </div>

        <a
          href="#bestel"
          className="hidden items-center gap-3 rounded-lg border border-[#efc06f]/80 px-6 py-3 font-poppins text-sm font-semibold text-[#efc06f] transition duration-300 hover:bg-[#efc06f] hover:text-black lg:flex"
        >
          Bestel Nu
          <ShoppingCart size={18} />
        </a>

        <button className="flex h-11 w-11 items-center justify-center rounded-lg text-[#efc06f] lg:hidden">
          <Menu size={30} />
        </button>
      </nav>
    </header>
  );
}

export default Nav;