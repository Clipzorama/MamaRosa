import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { menuCategories } from "../data/menu";
import MenuFork from "./MenuFork";
import "./Menu.css";

const text = {
  nl: {
    eyebrow: "Aan tafel bij Mama Rosa", title: "Ons", menu: "menu.",
    invitation: "Met liefde bereid.", welcome: "Voor jou geserveerd.",
    categories: "Menucategorieën", extras: "Extra opties", choices: "keuzes",
    chooseCategory: "Kies een categorie",
    details: "Tik op een gerecht voor meer informatie",
    question: "Een vraag over het menu?", contact: "Neem contact op",
  },
  en: {
    eyebrow: "A seat at Mama Rosa", title: "Our", menu: "menu.",
    invitation: "Prepared with love.", welcome: "Served for you.",
    categories: "Menu categories", extras: "Extra options", choices: "choices",
    chooseCategory: "Choose a category",
    details: "Tap a dish to discover more",
    question: "A question about the menu?", contact: "Get in touch",
  },
};

const priceFormat = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" });
const entryCount = (category) => category.items.length + (category.extras?.length ?? 0);
const categoryFromHash = () => menuCategories.find((category) => window.location.hash === `#menu-${category.id}`);

function alignMenu(menu, showHeading = false) {
  if (showHeading) {
    menu.scrollIntoView({ behavior: "instant", block: "start" });
    return;
  }
  const headerHeight = document.querySelector(".editorial-nav")?.getBoundingClientRect().height ?? 81;
  const tabsHeight = menu.querySelector(".menu-tabs").getBoundingClientRect().height;
  const contentTop = menu.querySelector(".menu-content").getBoundingClientRect().top;
  window.scrollTo({ top: window.scrollY + contentTop - headerHeight - tabsHeight, behavior: "instant" });
}

function DishHeading({ item, language, expandable }) {
  return (
    <>
      <span className="menu-dish__name">
        {item.name}
        {item.portion && <span className="menu-dish__portion"> – {item.portion[language]}</span>}
      </span>
      <span className="menu-dish__price">{priceFormat.format(item.price / 100)}</span>
      {expandable && <Plus className="menu-dish__toggle" size={14} strokeWidth={1.4} aria-hidden="true" />}
    </>
  );
}

function DishList({ items, language, compact = false }) {
  return (
    <ul className={`menu-dishes${compact ? " menu-dishes--extras" : ""}`}
      style={{ "--menu-rows": Math.ceil(items.length / 2) }}>
      {items.map((item) => (
        <li className="menu-dish" key={`${item.name}-${item.portion?.nl ?? ""}`}>
          {item.description ? (
            <details className="menu-dish__details">
              <summary className="menu-dish__heading">
                <DishHeading item={item} language={language} expandable />
              </summary>
              <p className="menu-dish__description">{item.description[language]}</p>
            </details>
          ) : (
            <div className="menu-dish__heading menu-dish__heading--plain">
              <DishHeading item={item} language={language} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Menu({ language }) {
  const locale = language === "en" ? "en" : "nl";
  const copy = text[locale];
  const menuRef = useRef(null);
  const tabRefs = useRef([]);
  const pendingAlignment = useRef(null);
  const [activeCategory, setActiveCategory] = useState(() => categoryFromHash()?.id ?? menuCategories[0].id);

  const selectCategory = (id) => {
    if (id === activeCategory) return;
    const menu = menuRef.current;
    const tabs = menu.querySelector(".menu-tabs").getBoundingClientRect();
    const contentTop = menu.querySelector(".menu-content").getBoundingClientRect().top;
    // When tabs are pinned, bring the new list's first row back into view.
    // Align before the height changes so a shorter category cannot strand the
    // visitor below the menu. At the top of the menu, leave the viewport alone.
    if (contentTop < tabs.bottom - 1) {
      alignMenu(menu);
      pendingAlignment.current = "panel";
    }
    history.pushState(null, "", `#menu-${id}`);
    setActiveCategory(id);
  };

  const onTabKeyDown = (event, index) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % menuCategories.length;
    if (event.key === "ArrowLeft") next = (index - 1 + menuCategories.length) % menuCategories.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = menuCategories.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    tabRefs.current[next]?.focus({ preventScroll: true });
    selectCategory(menuCategories[next].id);
  };

  useLayoutEffect(() => {
    if (pendingAlignment.current) {
      alignMenu(menuRef.current, pendingAlignment.current === "heading");
      pendingAlignment.current = null;
    }
    window.dispatchEvent(new Event("mamarosa:layout-change"));
  }, [activeCategory]);

  useEffect(() => {
    const menu = menuRef.current;
    let layoutFrame;
    let hashFrame;
    let disposed = false;
    let initialHash = window.location.hash;
    const isMenuHash = (hash) => hash === "#menu" || menuCategories.some((category) => hash === `#menu-${category.id}`);
    const onHashChange = () => {
      const category = categoryFromHash();
      if (!isMenuHash(window.location.hash)) return;
      pendingAlignment.current = window.location.hash === "#menu" ? "heading" : "panel";
      if (category) setActiveCategory(category.id);
      cancelAnimationFrame(hashFrame);
      hashFrame = requestAnimationFrame(() => {
        // Also handle a hash pointing to the already selected category.
        if (pendingAlignment.current) {
          alignMenu(menu, pendingAlignment.current === "heading");
          pendingAlignment.current = null;
        }
      });
    };
    const releaseInitialHash = () => { initialHash = ""; };
    const onLayout = () => {
      if (disposed) return;
      cancelAnimationFrame(layoutFrame);
      layoutFrame = requestAnimationFrame(() => {
        // Refresh the storytelling pin after tab switches, details expansion,
        // font loading, translations, and responsive column changes.
        window.dispatchEvent(new Event("mamarosa:layout-change"));
        if (isMenuHash(initialHash)) alignMenu(menu, initialHash === "#menu");
      });
    };
    const observer = new ResizeObserver(onLayout);
    observer.observe(menu);
    document.fonts.ready.then(onLayout);
    window.addEventListener("resize", onLayout);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("pointerdown", releaseInitialHash, { passive: true });
    window.addEventListener("wheel", releaseInitialHash, { passive: true });
    window.addEventListener("touchstart", releaseInitialHash, { passive: true });
    window.addEventListener("keydown", releaseInitialHash);
    onLayout();

    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(layoutFrame);
      cancelAnimationFrame(hashFrame);
      window.removeEventListener("resize", onLayout);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("pointerdown", releaseInitialHash);
      window.removeEventListener("wheel", releaseInitialHash);
      window.removeEventListener("touchstart", releaseInitialHash);
      window.removeEventListener("keydown", releaseInitialHash);
    };
  }, []);

  return (
    <section ref={menuRef} id="menu" className="editorial-menu" aria-labelledby="menu-title">
      <div className="editorial-menu__inner">
        <header className="menu-heading">
          <MenuFork menuRef={menuRef} />
          <div>
            <p className="menu-eyebrow">{copy.eyebrow}</p>
            <h2 id="menu-title">{copy.title} <em>{copy.menu}</em></h2>
          </div>
          <p className="menu-heading__invitation">{copy.invitation}<br /><span>{copy.welcome}</span></p>
        </header>

        <p id="menu-category-hint" className="menu-category-hint">{copy.chooseCategory}</p>
        <div className="menu-tabs" role="tablist" aria-label={copy.categories} aria-describedby="menu-category-hint">
          {menuCategories.map((category, index) => (
            <button type="button" role="tab" key={category.id} id={`menu-tab-${category.id}`}
              ref={(element) => { tabRefs.current[index] = element; }}
              aria-controls={`menu-${category.id}`} aria-selected={activeCategory === category.id}
              aria-label={`${category.label[locale]}, ${entryCount(category)} ${copy.choices}`}
              tabIndex={activeCategory === category.id ? 0 : -1}
              onClick={() => selectCategory(category.id)} onKeyDown={(event) => onTabKeyDown(event, index)}>
              <span>{category.label[locale]}</span>
              <span className="menu-tab__count" aria-hidden="true">{entryCount(category)}</span>
            </button>
          ))}
        </div>

        <div className="menu-content">
          {menuCategories.map((category, index) => (
            <section className="menu-category" id={`menu-${category.id}`} key={category.id}
              role="tabpanel" aria-labelledby={`menu-tab-${category.id}`} tabIndex={0}
              hidden={category.id !== activeCategory}>
              <header className="menu-category__heading">
                <div><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{category.label[locale]}</h3></div>
                {category.items.some((item) => item.description) && <p><Plus size={12} aria-hidden="true" />{copy.details}</p>}
              </header>
              <DishList items={category.items} language={locale} />
              {category.extras && (
                <div className="menu-extras">
                  <h4>{copy.extras}</h4>
                  <DishList items={category.extras} language={locale} compact />
                </div>
              )}
            </section>
          ))}
        </div>
        <footer className="menu-contact">
          <p>{copy.question}</p>
          <a href="#contact">{copy.contact}<ArrowUpRight size={18} strokeWidth={1.3} aria-hidden="true" /></a>
        </footer>
      </div>
    </section>
  );
}
