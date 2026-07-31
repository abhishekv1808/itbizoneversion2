import { Inter, Source_Serif_4, Cedarville_Cursive } from 'next/font/google'
import SmoothScroll from '@/components/SmoothScroll'
import Navbar from '@/components/Navbar'
import Analytics from '@/components/Analytics'
import MobileCtaBar from '@/components/ui/MobileCtaBar'
import WhatsAppFab from '@/components/ui/WhatsAppFab'
import Footer from '@/components/sections/Footer'
import { SITE, SITE_URL } from '@/lib/site'
import { HERO_IMAGE } from '@/lib/assets'
import './globals.css'
// Lenis' own rules: unpins html/body height, contains overscroll inside
// [data-lenis-prevent] subtrees, and kills iframe pointer capture mid-scroll.
// Imported here, not via @import in globals.css — Tailwind's CSS resolver
// doesn't follow the package's "./dist/*" exports subpath, but Turbopack does.
import 'lenis/dist/lenis.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-source-serif',
})

const cedarville = Cedarville_Cursive({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-cedarville',
})

export const metadata = {
  // Lets every page declare relative canonicals and OG URLs.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — Everything digital, under one roof.`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_IN',
    url: '/',
    title: `${SITE.name} — Everything digital, under one roof.`,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — Everything digital, under one roof.`,
    description: SITE.description,
  },
}

export default function RootLayout({ children }) {
  return (
    // No `scroll-smooth`: native smooth scrolling and Lenis both animate the
    // same scroll position and fight each other on anchor jumps.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sourceSerif.variable} ${cedarville.variable}`}
    >
      <head>
        <link
          rel="preconnect"
          href="https://images.higgs.ai"
          crossOrigin="anonymous"
        />
        {/*
          The home hero's background image is the Largest Contentful Paint
          element — it is full-bleed, so nothing on the page is larger. It is
          also a CSS background on a third-party host, which means the browser
          cannot discover it until stylesheets have resolved. Preloading it is
          the single biggest lever on home-page LCP.
        */}
        <link
          rel="preload"
          as="image"
          href={HERO_IMAGE}
          fetchPriority="high"
        />
      </head>
      {/* pb below md reserves the height of MobileCtaBar. A fixed element
          cannot push content, so without this the bar sits on top of the last
          row of the footer. */}
      <body className="bg-bg text-ink font-sans tracking-[-0.02em] antialiased overflow-x-hidden pb-[76px] md:pb-0">
        {/* Chrome lives here rather than in each page, so every route —
            home and the service pages — shares one nav and footer. */}
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        {/* Outside SmoothScroll: all are fixed-position and must not be
            affected by the scroll wrapper's transforms. */}
        <MobileCtaBar />
        <WhatsAppFab />
        <Analytics />
      </body>
    </html>
  )
}
