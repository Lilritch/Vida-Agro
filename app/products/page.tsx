import { CTASection } from "@/components/cta-section"
import { FocusAreas } from "@/components/focus-areas"
import { PageHero } from "@/components/page-hero"
import { Products } from "@/components/products"
import { SiteShell } from "@/components/site-shell"

export default function ProductsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Our Products"
        title="Quality Inputs For Every Stage Of Growth"
        description="Browse featured herbicides, pesticides, fertilizers, fungicides, and vector control products trusted across Ghana."
      />
      <Products />
      <FocusAreas />
      <CTASection />
    </SiteShell>
  )
}
