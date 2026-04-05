import { CTASection } from "@/components/cta-section"
import { PageHero } from "@/components/page-hero"
import { SiteShell } from "@/components/site-shell"
import { Testimonials } from "@/components/testimonials"
import { WhyUs } from "@/components/why-us"

export default function WhyUsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Why Choose Us"
        title="A Trusted Partner For Better Agricultural Outcomes"
        description="See what makes our team, products, and local support network a dependable choice for farmers and institutions."
      />
      <WhyUs />
      <Testimonials />
      <CTASection />
    </SiteShell>
  )
}
