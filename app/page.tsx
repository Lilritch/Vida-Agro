import { Hero } from "@/components/hero"
import { HomeImpactSection } from "@/components/home-impact-section"
import { HomePartnerships } from "@/components/home-partnerships"
import { Products } from "@/components/products"
import { GhanaServiceMap } from "@/components/ghana-service-map"
import { SiteShell } from "@/components/site-shell"

export default function Home() {
  return (
    <SiteShell showLoadingScreen>
      <Hero />
      <HomeImpactSection />
      <Products collapsible />
      <HomePartnerships />
      <GhanaServiceMap />
    </SiteShell>
  )
}
 
