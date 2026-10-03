// Source: playform/Mama_Rosa_MENU3.pdf, pages 1–2.
// Dish names and Dutch descriptions follow the PDF. Prices are integer cents.
// Extras belong to Hoofdgerechten; they are not standalone main dishes.
const dish = (name, price, nl, en, portion) => ({
  name, price,
  ...(nl && { description: { nl, en } }),
  ...(portion && { portion }),
});

export const menuCategories = [
  {
    id: "broodjes", label: { nl: "Broodjes", en: "Sandwiches" }, sourcePage: 1,
    items: [
      dish("Tempeh", 650, "Tempeh op een vers broodje.", "Tempeh on a fresh roll."),
      dish("Kerrie Ei", 650, "Ei in Surinaamse kerrie op een vers broodje.", "Egg in Surinamese curry on a fresh roll."),
      dish("Avocado", 650, "Romige avocado op een vers broodje.", "Creamy avocado on a fresh roll."),
      dish("Ketjap Kip", 650, "Kip in ketjapsaus op een vers broodje.", "Chicken in ketjap sauce on a fresh roll."),
      dish("Tjaseuw Kip", 650, "Tjaseuw kip op een vers broodje.", "Tjaseuw chicken on a fresh roll."),
      dish("Fa-Chong", 650, "Fa-Chong op een vers broodje.", "Fa-Chong on a fresh roll."),
      dish("Kerrie Kip", 650, "Kip in Surinaamse kerrie op een vers broodje.", "Chicken in Surinamese curry on a fresh roll."),
      dish("Lever", 650, "Lever op een vers broodje.", "Liver on a fresh roll."),
      dish("Pom", 650, "Surinaamse pom op een vers broodje.", "Surinamese pom on a fresh roll."),
      dish("Bakkeljauw", 650, "Bakkeljauw op een vers broodje.", "Bakkeljauw on a fresh roll."),
      dish("Garnalen (kerrie)", 750, "Garnalen met kousenband in kerriesaus op een vers broodje.", "Shrimp and long beans in curry sauce on a fresh roll."),
      dish("Zoutvlees", 750, "Zoutvlees op een vers broodje.", "Salted beef on a fresh roll."),
      dish("Trie", 650, "Trie op een vers broodje.", "Trie on a fresh roll."),
      dish("Gamba’s", 700, "Gamba’s op een vers broodje.", "Prawns on a fresh roll."),
      dish("Sardien olie", 500, "Sardien olie op een vers broodje.", "Sardines in oil on a fresh roll."),
      dish("Jerk Chicken", 750, "Jerk chicken op een vers broodje.", "Jerk chicken on a fresh roll."),
    ],
  },
  {
    id: "hoofdgerechten", label: { nl: "Hoofdgerechten", en: "Main dishes" }, sourcePage: 1,
    items: [
      dish("Bami Kip", 1700, "Surinaamse bami met ovenkip, kousenband en zuurgoed.", "Surinamese bami with oven-roasted chicken, long beans and pickled vegetables."),
      dish("Tjauwmin Kip", 1700, "Gebakken tjauwmin met paksoi en ovenkip.", "Stir-fried tjauwmin with pak choi and oven-roasted chicken."),
      dish("Tjauwmin Speciaal", 1900, "Tjauwmin met een mix van kip.", "Tjauwmin with a mix of chicken."),
      dish("Nasi Kip", 1700, "Surinaamse nasi met ovenkip, kousenband, bakbanaan en zuurgoed.", "Surinamese nasi with oven-roasted chicken, long beans, plantain and pickled vegetables."),
      dish("Nasi Speciaal", 1900, "Nasi met een mix van kip, kousenband en zuurgoed.", "Nasi with a mix of chicken, long beans and pickled vegetables."),
      dish("Bruine Bonen", 1700, "Bruine bonen met zoutvlees en gerookte kip.", "Brown beans with salted beef and smoked chicken."),
      dish("Rijst Lams / Doks", 1950, "Rijst met lams of doks.", "Rice with lamb or doks."),
      dish("Jerk Chicken / BBQ Kip", 2150, "Jerk chicken / BBQ kip met rijst en kousenband.", "Jerk chicken / BBQ chicken with rice and long beans."),
    ],
    extras: [
      dish("Zuurgoed", 75), dish("Fa-Chong", 350), dish("Rijst", 500), dish("Bami in bakje", 500),
      dish("Kipfilet", 500), dish("Kip bot", 500), dish("Kousenband", 150), dish("Nasi in bakje", 500),
    ],
  },
  {
    id: "soepen", label: { nl: "Soepen", en: "Soups" }, sourcePage: 1,
    items: [
      dish("Pindasoep", 1300, "Pindasoep met banaanballen, zoutvlees en kip.", "Peanut soup with banana dumplings, salted beef and chicken."),
      dish("Sauto Soep", 1300, "Surinaamse saoto op basis van een kruidige kippenbouillon.", "Surinamese saoto made with a spiced chicken broth."),
      dish("Cassave Soep", 1300, "Soep met cassave als hoofdingrediënt.", "Soup with cassava as its main ingredient."),
      dish("Peper Water", 1500, "Inheemse vissoep met peper en specerijen.", "Indigenous fish soup with pepper and spices."),
    ],
  },
  {
    id: "roti", label: { nl: "Roti", en: "Roti" }, sourcePage: 2,
    items: [
      dish("Rotírol Vega", 1200, "Rotírol met een vegetarische vulling.", "Roti roll with a vegetarian filling."),
      dish("Rotírol Kip", 1400, "Rotírol met malse kip en Surinaamse kruiden.", "Roti roll with tender chicken and Surinamese spices."),
      dish("Roti Kip met Ei", 1650, "Roti met kip, ei en Surinaamse kerrie.", "Roti with chicken, egg and Surinamese curry."),
      dish("Lams", 2100, "Lamsvlees, geserveerd met roti.", "Lamb, served with roti."),
      dish("Doks", 2100, "Doks, geserveerd met roti.", "Doks, served with roti."),
      dish("Kip Filet", 1600, "Kipfilet, geserveerd met roti.", "Chicken fillet, served with roti."),
      dish("Kip met Bot", 1500, "Kip met bot, geserveerd met roti.", "Chicken on the bone, served with roti."),
      dish("Vega", 1450, "Vegetarische roti.", "Vegetarian roti."),
      dish("Roti Plaat", 350, "Losse, vers bereide roti plaat.", "An individual, freshly prepared roti flatbread."),
    ],
  },
  {
    id: "snacks", label: { nl: "Snacks", en: "Snacks" }, sourcePage: 2,
    items: [
      dish("Teloh Bakkeljauw", 1000, "Gebakken teloh met bakkeljauw.", "Fried teloh with bakkeljauw."),
      dish("Baka Bana", 750, "Gebakken bakbanaan.", "Fried plantain."),
      dish("Saté Kip", 750, "Malse kipsaté aan de spies.", "Tender chicken satay on a skewer."),
      dish("Loempia’s Kip", 350, "Krokant gebakken loempia gevuld met kip.", "A crispy fried spring roll filled with chicken.", { nl: "1 stuk", en: "1 piece" }),
      dish("Loempia’s Kip", 1000, "Krokant gebakken loempia’s gevuld met kip.", "Crispy fried spring rolls filled with chicken.", { nl: "10 stuks", en: "10 pieces" }),
      dish("Speciaal / Trie / Lever / Bakkeljauw", 1500, "Een combinatie van trie, lever en bakkeljauw.", "A combination of trie, liver and bakkeljauw."),
    ],
  },
  {
    id: "dranken", label: { nl: "Dranken", en: "Drinks" }, sourcePage: 2,
    items: [
      dish("Fernandes Green Punch", 350), dish("Fernandes Cherry", 350),
      dish("Fernandes Pineapple", 350), dish("Fernandes Red Grape", 350),
      dish("Fernandes Cream Ginger", 350), dish("Fanta", 300), dish("Red Bull", 375),
      dish("Water", 300), dish("Cola", 300), dish("Cola stroop", 350),
      dish("Markoesa", 350), dish("Gember bier", 350),
    ],
  },
];
