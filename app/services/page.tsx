import { CTASection } from "@/components/cta-section"
import { PageHero } from "@/components/page-hero"
import { Services } from "@/components/services"
import { SiteShell } from "@/components/site-shell"

export default function ServicesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Our Services"
        title="Comprehensive Solutions For Farms And Communities"
        description="Explore the crop protection, soil fertility, public health, advisory, and delivery services we provide across Ghana."
      />
      <Services />
      <CTASection />
    </SiteShell>
  )
}
