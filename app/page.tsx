import { Hero } from "@/components/hero"
import { HomeImpactSection } from "@/components/home-impact-section"
import { FocusAreas } from "@/components/focus-areas"
import { Products } from "@/components/products"
import { CTASection } from "@/components/cta-section"
import { GhanaServiceMap } from "@/components/ghana-service-map"
import { SiteShell } from "@/components/site-shell"

export default function Home() {
  return (
    <SiteShell showLoadingScreen>
      <Hero />
      <HomeImpactSection />
      <FocusAreas />
      <Products collapsible />
      <CTASection blendToDark />
      <GhanaServiceMap />
    </SiteShell>
  )
}
 
