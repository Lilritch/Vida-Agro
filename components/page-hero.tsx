interface PageHeroProps {
  eyebrow: string
  title: string
  description: string
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-forest-green pt-36 pb-20 lg:pt-44 lg:pb-28">
      <div className="absolute inset-0">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div
          className="absolute top-0 left-1/3 h-80 w-80 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(201, 162, 39, 0.08)" }}
        />
        <div
          className="absolute right-0 bottom-0 h-80 w-80 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(245, 240, 225, 0.08)" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block text-gold font-semibold tracking-widest uppercase text-sm mb-4">
            {eyebrow}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cream mb-6">
            {title}
          </h1>
          <p className="text-cream text-lg leading-relaxed" style={{ opacity: 0.78 }}>
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}
