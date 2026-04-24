function HomeSection() {
  return (
    <main>
      <section id="gerechten" className="min-h-screen bg-background px-6 py-24">
        <div className="container">
          <h2 className="font-playfair text-5xl text-foreground">Gerechten</h2>
        </div>
      </section>

      <section id="broodjes" className="min-h-screen bg-background2 px-6 py-24">
        <div className="container">
          <h2 className="font-playfair text-5xl text-foreground">Broodjes</h2>
        </div>
      </section>

      <section id="dranken" className="min-h-screen bg-background px-6 py-24">
        <div className="container">
          <h2 className="font-playfair text-5xl text-foreground">
            Dranken & Sappen
          </h2>
        </div>
      </section>

      <section id="over-ons" className="min-h-screen bg-background2 px-6 py-24">
        <div className="container">
          <h2 className="font-playfair text-5xl text-foreground">Over ons</h2>
        </div>
      </section>
    </main>
  );
}

export default HomeSection;