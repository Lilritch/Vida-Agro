const focusAreas = [
  {
    title: "Crop Protection",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
    alt: "Farmer spraying crops in a green field",
  },
  {
    title: "Vector Control",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
    alt: "Pest control treatment in an open field",
  },
  {
    title: "Soil & Fertilizers",
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80",
    alt: "Hands holding rich dark soil",
  },
  {
    title: "Agronomic Advisory",
    image: "/site-media/hero/hero-pexels-4975354.jpeg",
    alt: "Agronomic advisory field scene on a working farm",
  },
];

export function FocusAreas() {
  return (
    <section className="focus-areas-section bg-white py-20 lg:py-28">
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
        </div>
      </div>

      <div className="focus-areas-bleed mt-12">
        <div className="focus-areas-strip">
          {focusAreas.map((area, index) => (
            <article
              key={area.title}
              data-aos="fade-up"
              data-aos-delay={index * 90}
              className="focus-area-card group"
            >
              <div className="focus-area-card-shell">
                <img
                  src={area.image}
                  alt={area.alt}
                  loading="lazy"
                  decoding="async"
                  className="focus-area-card-image"
                />

                <div className="focus-area-card-overlay" />

                <div className="focus-area-card-content">
                  <h3
                    className="focus-area-card-title"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  >
                    {area.title}
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
