interface PageHeroProps {
  eyebrow: string
  title: string
  description: string
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-forest-green pt-32 pb-16 sm:pt-36 lg:pt-40 lg:pb-24">
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

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-[42rem]">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.28em] text-gold sm:text-sm">
            {eyebrow}
          </span>
          <h1 className="mb-5 max-w-[36rem] font-serif text-[2.15rem] font-bold leading-tight text-cream sm:text-[2.75rem] lg:text-[3.45rem]">
            {title}
          </h1>
          <p
            className="max-w-2xl text-base leading-7 text-cream sm:text-lg sm:leading-8"
            style={{ opacity: 0.78 }}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}
