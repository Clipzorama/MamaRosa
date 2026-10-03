import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import "./Nav.css";

const navText = {
  nl: {
    subtitle: "Surinaamse Fusion Cuisine",
    languageLabel: "Taal",
    navigationLabel: "Hoofdnavigatie",
    openLabel: "Open navigatie",
    closeLabel: "Sluiten",
    welcome: "Aan tafel bij Mama Rosa",
    roots: "Surinaamse roots.",
    warmth: "Caribische warmte.",
    location: "Vind ons in Almere",
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
    navigationLabel: "Main navigation",
    openLabel: "Open navigation",
    closeLabel: "Close",
    welcome: "A seat at Mama Rosa",
    roots: "Surinamese roots.",
    warmth: "Caribbean warmth.",
    location: "Find us in Almere",
    links: [
      { label: "Home", href: "#home", id: "home" },
      { label: "Menu", href: "#menu", id: "menu" },
      { label: "About", href: "#about", id: "about" },
      { label: "Contact", href: "#contact", id: "contact" },
    ],
  },
};

function Wordmark({ subtitle }) {
  return (
    <>
      <span className="editorial-nav__wordmark">MAMAROSA</span>
      <span className="editorial-nav__subtitle">{subtitle}</span>
    </>
  );
}

function LanguageSwitch({ language, onChange, label }) {
  return (
    <div className="editorial-nav__languages" role="group" aria-label={label}>
      <button type="button" lang="nl" aria-label="Nederlands" aria-pressed={language === "nl"}
        onClick={() => onChange("nl")}>NL</button>
      <span aria-hidden="true">/</span>
      <button type="button" lang="en" aria-label="English" aria-pressed={language === "en"}
        onClick={() => onChange("en")}>EN</button>
    </div>
  );
}

export default function Nav({ language, setLanguage }) {
  const [isActive, setIsActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const brandRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const currentText = navText[language] ?? navText.nl;

  const closeMenu = () => {
    // Close before the anchor event bubbles to FoodJourney's #about handler.
    // That lets the destination receive focus outside the modal dialog.
    if (dialogRef.current?.open) dialogRef.current.close();
    setIsOpen(false);
  };

  const handleNavClick = (id) => {
    closeMenu();
    setIsActive(id);
  };

  const handleDialogKeyDown = (event) => {
    if (event.key !== "Tab") return;
    const controls = [...dialogRef.current.querySelectorAll('a[href], button:not([disabled])')]
      .filter((control) => control.getClientRects().length > 0);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "home";
      currentText.links.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && !section.closest("[inert]") && section.getBoundingClientRect().top <= 140) {
          currentSection = id;
        }
      });
      setIsActive(currentSection);
      setIsCompact(window.scrollY > 64);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mamarosa:story-change", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mamarosa:story-change", handleScroll);
    };
  }, [currentText.links]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const dialog = dialogRef.current;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousGutter = root.style.scrollbarGutter;
    root.style.scrollbarGutter = "stable";
    root.style.overflow = "hidden";
    dialog.showModal();
    closeButtonRef.current?.focus({ preventScroll: true });

    const desktop = window.matchMedia("(min-width: 1100px)");
    const closeOnDesktop = () => {
      if (!desktop.matches) return;
      dialog.close();
      setIsOpen(false);
      brandRef.current?.focus({ preventScroll: true });
    };
    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      if (dialog.open) dialog.close();
      root.style.overflow = previousOverflow;
      root.style.scrollbarGutter = previousGutter;
    };
  }, [isOpen]);

  return (
    <>
      <header className={`editorial-nav${isCompact ? " editorial-nav--compact" : ""}`}>
        <div className="editorial-nav__bar">
          <a ref={brandRef} href="#home" className="editorial-nav__brand" onClick={() => handleNavClick("home")}>
            <Wordmark subtitle={currentText.subtitle} />
          </a>

          <nav className="editorial-nav__desktop" aria-label={currentText.navigationLabel}>
            {currentText.links.map((link) => (
              <a key={link.id} href={link.href} onClick={() => handleNavClick(link.id)}
                aria-current={isActive === link.id ? "location" : undefined}>
                {link.label}
                {isActive === link.id && (
                  <motion.span className="editorial-nav__indicator" layoutId="editorial-nav-indicator"
                    transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 36 }} />
                )}
              </a>
            ))}
          </nav>

          <div className="editorial-nav__desktop-language">
            <LanguageSwitch language={language} onChange={setLanguage} label={currentText.languageLabel} />
          </div>
          <button type="button" className="editorial-nav__toggle" onClick={() => setIsOpen(true)}
            aria-label={currentText.openLabel} aria-expanded={isOpen} aria-controls="navigation-dialog" aria-haspopup="dialog">
            <span>Menu</span>
            <span className="editorial-nav__menu-icon" aria-hidden="true"><span /><span /></span>
          </button>
        </div>
      </header>

      <dialog ref={dialogRef} id="navigation-dialog" className="nav-dialog" aria-label={currentText.navigationLabel}
        onKeyDown={handleDialogKeyDown} onCancel={() => setIsOpen(false)} onClose={() => setIsOpen(false)}>
        <div className="nav-dialog__header">
          <a href="#home" className="editorial-nav__brand" onClick={() => handleNavClick("home")}>
            <Wordmark subtitle={currentText.subtitle} />
          </a>
          <button ref={closeButtonRef} type="button" className="editorial-nav__toggle" onClick={closeMenu}>
            <span>{currentText.closeLabel}</span><X size={23} strokeWidth={1.4} aria-hidden="true" />
          </button>
        </div>

        <div className="nav-dialog__body">
          <div className="nav-dialog__index">
            <p className="nav-dialog__eyebrow">{currentText.welcome}</p>
            <nav aria-label={currentText.navigationLabel} className="nav-dialog__links">
              {currentText.links.map((link, index) => (
                <a key={link.id} href={link.href} onClick={() => handleNavClick(link.id)}
                  aria-current={isActive === link.id ? "location" : undefined}
                  style={{ "--link-index": index }}>
                  <span className="nav-dialog__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span className="nav-dialog__link-label">{link.label}</span>
                  <ArrowUpRight className="nav-dialog__arrow" size={25} strokeWidth={1.3} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
          <aside className="nav-dialog__aside">
            <p>{currentText.roots}<br /><em>{currentText.warmth}</em></p>
            <span>{currentText.subtitle}</span>
          </aside>
        </div>

        <div className="nav-dialog__footer">
          <div className="nav-dialog__address">
            <span>{currentText.location}</span>
            <p>Cinemadreef 52 · Almere</p>
          </div>
          <div className="nav-dialog__language">
            <span>{currentText.languageLabel}</span>
            <LanguageSwitch language={language} onChange={setLanguage} label={currentText.languageLabel} />
          </div>
        </div>
      </dialog>
    </>
  );
}
