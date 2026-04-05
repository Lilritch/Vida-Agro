import type { ReactNode } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CookieBanner } from "@/components/cookie-banner"
import { LoadingScreen } from "@/components/loading-screen"

interface SiteShellProps {
  children: ReactNode
  showLoadingScreen?: boolean
}

export function SiteShell({
  children,
  showLoadingScreen = false,
}: SiteShellProps) {
  return (
    <>
      {showLoadingScreen ? <LoadingScreen /> : null}
      <Navigation />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <CookieBanner />
    </>
  )
}
