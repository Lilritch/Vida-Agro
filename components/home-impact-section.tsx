const impactStats = [
  {
    value: "500+",
    label: "farmers and field customers supported with dependable inputs",
  },
  {
    value: "50+",
    label:
      "crop protection, fertilizer, and vector-control solutions available",
  },
  {
    value: "Kumasi",
    label: "base for responsive delivery and practical support in the field",
  },
];

export function HomeImpactSection() {
  return (
    <section className="bg-white pb-20 pt-12 lg:pb-28 lg:pt-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="overflow-hidden rounded-[2rem]">
          <div className="grid lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.85fr)]">
            <div
              data-aos="fade-up"
              className="px-6 py-12 sm:px-10 lg:px-14 lg:py-16"
            >
              <span className="inline-flex rounded-full bg-forest-green/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-forest-green/70">
                Built for the field
              </span>

              <h2 className="mt-6 max-w-xl font-sans text-4xl font-black leading-[0.95] tracking-tight text-forest-green sm:text-5xl lg:text-[4.15rem]">
                Leading the next season of confident agriculture.
              </h2>

              <p className="mt-8 max-w-2xl text-base leading-8 text-forest-green/72 lg:text-lg">
                Agrochemist helps growers, agro-dealers, and public-health teams
                access modern inputs with practical support behind every
                decision. From crop protection to dependable supply, the focus
                stays on healthier fields, clearer choices, and better harvest
                outcomes.
              </p>
            </div>

            <div
              data-aos="fade-left"
              data-aos-delay="120"
              className="bg-[#4ca30d] px-8 py-12 text-cream lg:rounded-bl-[4.75rem] lg:px-10 lg:py-16"
            >
              <div className="space-y-8">
                {impactStats.map((stat) => (
                  <div
                    key={stat.value}
                    className="border-b border-cream/30 pb-8 last:border-b-0 last:pb-0"
                  >
                    <div className="text-4xl font-black tracking-tight sm:text-5xl">
                      {stat.value}
                    </div>
                    <p className="mt-3 max-w-[15rem] text-sm leading-6 text-cream/88">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
