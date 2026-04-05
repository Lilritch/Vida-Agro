import { Contact } from "@/components/contact"
import { MapStrip } from "@/components/map-strip"
import { PageHero } from "@/components/page-hero"
import { SiteShell } from "@/components/site-shell"

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Contact Us"
        title="Talk To Our Team"
        description="Reach out for product enquiries, agronomic advice, vector control support, or bulk supply discussions."
      />
      <Contact />
      <MapStrip />
    </SiteShell>
  )
}
