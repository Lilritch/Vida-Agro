import { Hero } from "@/components/hero"
import { HomeImpactSection } from "@/components/home-impact-section"
import { Products } from "@/components/products"
import { CTASection } from "@/components/cta-section"
import { SiteShell } from "@/components/site-shell"

export default function Home() {
  return (
    <SiteShell showLoadingScreen>
      <Hero />
      <HomeImpactSection />
      <Products collapsible />
      <CTASection />
    </SiteShell>
  )
}
 
