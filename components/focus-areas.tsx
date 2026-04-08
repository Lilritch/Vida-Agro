interface FocusAreasProps {
  showIntro?: boolean;
}

const focusAreas = [
  {
    title: "Crop Protection",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
    alt: "Farmer spraying crops in a green field",
    position: "64% center",
  },
  {
    title: "Vector Control",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
    alt: "Pest control treatment in an open field",
    position: "46% center",
  },
  {
    title: "Soil & Fertilizers",
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80",
    alt: "Hands holding rich dark soil",
    position: "56% center",
  },
  {
    title: "Agronomic Advisory",
    image: "/site-media/hero/hero-pexels-4975354.jpeg",
    alt: "Agronomic advisory field scene on a working farm",
    position: "64% center",
  },
];

export function FocusAreas({ showIntro = false }: FocusAreasProps) {
  return (
    <section className="focus-areas-section bg-white py-20 lg:py-28">
      {showIntro ? (
        <div className="container mx-auto px-4 lg:px-8">
          <div data-aos="fade-up" className="max-w-2xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.36em] text-[#e8b84b]">
              Our Focus Areas
            </span>

            <h2
              className="mt-4 text-4xl font-bold tracking-tight text-forest-green sm:text-5xl"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              What We Do Best
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-forest-green/72 sm:text-lg">
              A sharper look at the solution areas we support every day, from on-farm crop care
              to dependable supply for healthier yields.
            </p>
          </div>
        </div>
      ) : null}

      <div className={`focus-areas-bleed ${showIntro ? "mt-12 lg:mt-16" : ""}`}>
        <div className="focus-areas-strip">
          {focusAreas.map((area, index) => (
            <article
              key={area.title}
              data-aos="fade-up"
              data-aos-delay={index * 90}
              className="focus-area-card group"
            >
              <div className="focus-area-card-shell">
                <div className="focus-area-card-media">
                  <img
                    src={area.image}
                    alt={area.alt}
                    loading="lazy"
                    decoding="async"
                    className="focus-area-card-image"
                    style={{ objectPosition: area.position }}
                  />

                  <div aria-hidden="true" className="focus-area-card-glow" />
                  <div className="focus-area-card-overlay" />
                </div>

                <div className="focus-area-card-content">
                  <h3 className="focus-area-card-title">{area.title}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
