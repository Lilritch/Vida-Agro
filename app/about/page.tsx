import { About } from "@/components/about"
import { CTASection } from "@/components/cta-section"
import { PageHero } from "@/components/page-hero"
import { Partners } from "@/components/partners"
import { SiteShell } from "@/components/site-shell"

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About Us"
        title="Rooted In Ghana, Growing With You"
        description="Learn more about the mission, leadership, and community commitment behind Vida Asamoah Agrochemicals & Vector Control Limited."
      />
      <About />
      <Partners />
      <CTASection />
    </SiteShell>
  )
}
