import { Heart, MapPin, Phone, Mail, ArrowUp } from "lucide-react";

const footerText = {
  nl: {
    tagline: "Surinaamse fusion cuisine met liefde bereid.",
    navTitle: "Navigatie",
    contactTitle: "Contact",
    home: "Home",
    menu: "Menu",
    about: "Over ons",
    contact: "Contact",
    backTop: "Terug naar boven",
    madeBy: "Website gemaakt door",
    rights: "Alle rechten voorbehouden.",
  },
  en: {
    tagline: "Surinamese fusion cuisine, prepared with love.",
    navTitle: "Navigation",
    contactTitle: "Contact",
    home: "Home",
    menu: "Menu",
    about: "About",
    contact: "Contact",
    backTop: "Back to top",
    madeBy: "Website made by",
    rights: "All rights reserved.",
  },
};

export default function Footer({ language }) {
  const currentText = footerText[language];

  return (
    <footer className="relative overflow-hidden border-t border-primary/25 bg-background px-6 py-12 text-foreground sm:px-8 md:px-10 lg:px-12 xl:px-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(205,151,79,0.14),transparent_35%)]" />

      <div className="relative mx-auto max-w-[1350px]">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr] lg:items-start">
          <div>
            <a href="#home" className="inline-block">
              <h2 className="font-cinzel text-4xl font-semibold tracking-[0.18em] text-primary sm:text-5xl">
                MAMAROSA
              </h2>

              <p className="mt-2 font-poppins text-[11px] font-bold uppercase tracking-[0.35em] text-primary/90">
                Surinamese Fusion Cuisine
              </p>
            </a>

            <p className="mt-6 max-w-md font-poppins text-sm leading-7 text-foreground/75 sm:text-base">
              {currentText.tagline}
            </p>

            <div className="mt-6 flex items-center gap-2 font-playfair text-2xl italic text-primary">
              <span>Mama Rosa</span>
              <Heart size={22} />
            </div>
          </div>

          <div>
            <h3 className="font-poppins text-sm font-bold uppercase tracking-[0.2em] text-primary">
              {currentText.navTitle}
            </h3>

            <nav className="mt-5 flex flex-col gap-3 font-poppins text-sm text-foreground/75">
              <a href="#home" className="transition hover:text-primary">
                {currentText.home}
              </a>
              <a href="#menu" className="transition hover:text-primary">
                {currentText.menu}
              </a>
              <a href="#about" className="transition hover:text-primary">
                {currentText.about}
              </a>
              <a href="#contact" className="transition hover:text-primary">
                {currentText.contact}
              </a>
            </nav>
          </div>

          <div>
            <h3 className="font-poppins text-sm font-bold uppercase tracking-[0.2em] text-primary">
              {currentText.contactTitle}
            </h3>

            <div className="mt-5 space-y-4 font-poppins text-sm leading-6 text-foreground/75">
              <div className="flex gap-3">
                <MapPin className="mt-1 shrink-0 text-primary" size={18} />
                <p>
                  Cinemadreef 52
                  <br />
                  1325 EM Almere
                </p>
              </div>

              <a
                href="tel:0367858241"
                className="flex gap-3 transition hover:text-primary"
              >
                <Phone className="mt-1 shrink-0 text-primary" size={18} />
                <span>036-7858241</span>
              </a>

              <a
                href="mailto:info@mamarosa.nl"
                className="flex gap-3 transition hover:text-primary"
              >
                <Mail className="mt-1 shrink-0 text-primary" size={18} />
                <span>info@mamarosa.nl</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-primary/20" />

        <div className="mt-7 flex flex-col gap-5 font-poppins text-xs text-foreground/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Mamarosa. {currentText.rights}
          </p>

          <p>
            {currentText.madeBy}{" "}
            <span className="font-bold text-primary">Clipzorama</span>
          </p>

          <a
            href="#home"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 px-4 py-2 font-bold text-primary transition hover:bg-primary hover:text-black"
          >
            {currentText.backTop}
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}