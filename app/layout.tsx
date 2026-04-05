import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import 'aos/dist/aos.css'
import './globals.css'
import { AOSInit } from '@/components/aos-init'

export const metadata: Metadata = {
  title: 'Vida Asamoah Agrochemicals & Vector Control Limited | Kumasi, Ghana',
  description: "Ghana's trusted agrochemical supply and vector control company based in Suame-Kumasi. Quality crop protection, fertilizers, and pest control solutions for farmers across the Ashanti Region and beyond.",
  keywords: ['agrochemicals', 'vector control', 'pest control', 'fertilizers', 'Ghana', 'Kumasi', 'farming', 'agriculture', 'crop protection', 'Ashanti Region'],
  authors: [{ name: 'Vida Asamoah Agrochemicals & Vector Control Limited' }],
  creator: 'Vida Asamoah Agrochemicals & Vector Control Limited',
  publisher: 'Vida Asamoah Agrochemicals & Vector Control Limited',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Vida Asamoah Agrochemicals & Vector Control Limited',
    description: "Ghana's trusted agrochemical supply and vector control company based in Suame-Kumasi. Quality crop protection, fertilizers, and pest control solutions.",
    url: 'https://vidaagrochemicals.com',
    siteName: 'Vida Asamoah Agrochemicals & Vector Control Limited',
    locale: 'en_GH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vida Asamoah Agrochemicals & Vector Control Limited',
    description: "Ghana's trusted agrochemical supply and vector control company based in Suame-Kumasi.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#1a3d2e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AOSInit />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
