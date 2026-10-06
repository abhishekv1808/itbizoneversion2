import { Inter, Source_Serif_4, Cedarville_Cursive } from 'next/font/google'
import SmoothScroll from '@/components/SmoothScroll'
import Navbar from '@/components/Navbar'
import Analytics from '@/components/Analytics'
import MobileCtaBar from '@/components/ui/MobileCtaBar'
import WhatsAppFab from '@/components/ui/WhatsAppFab'
import Footer from '@/components/sections/Footer'
import { SITE, SITE_URL } from '@/lib/site'
import { HERO_IMAGE, HERO_SIZES, HERO_SRCSET } from '@/lib/assets'
import { organisationSchema } from '@/lib/schema'
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
    default: `Website & App Development Company in Bengaluru | ${SITE.name}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  /*
    No `alternates.canonical` here. A canonical set on the layout is inherited
    by every route that does not set its own, which declared any such page a
    duplicate of the home page. Each page sets a self-referencing one instead,
    via pageMetadata() in lib/metadata.js.
  */
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image' },
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
        {/*
          imageSrcSet/imageSizes, not a bare href. The hero is now a responsive
          <img>; preloading only the 1280px file would have made a phone fetch
          that AND the 640px one it actually renders — paying twice for the
          LCP element instead of once.
        */}
        <link
          rel="preload"
          as="image"
          href={HERO_IMAGE}
          imageSrcSet={HERO_SRCSET}
          imageSizes={HERO_SIZES}
          fetchPriority="high"
        />
      </head>
      {/*
        pb below md reserves the height of MobileCtaBar. A fixed element cannot
        push content, so without this the bar sits on top of the last row of
        the footer.

        suppressHydrationWarning is for browser extensions, not for anything
        this app renders. Several of them write an attribute onto <body> before
        React hydrates — ColorZilla adds cz-shortcut-listen, Grammarly adds
        data-new-gr-c-s-check-loaded — and React reports the difference against
        the server HTML as a mismatch the developer cannot act on.

        It has to be repeated here even though <html> already carries it: the
        flag applies to the element it is written on and does not cascade to
        descendants.

        Scope worth knowing: this silences attribute mismatches on <body>
        specifically. The className is a static string, so there is no real
        mismatch it could hide. Children are unaffected and still report.
      */}
      <body
        suppressHydrationWarning
        className="bg-bg text-ink font-sans tracking-[-0.02em] antialiased overflow-x-hidden pb-[76px] md:pb-0"
      >
        {/* The business itself — name, address, phone, hours, services.
            Emitted on every route so any page Google lands on resolves to the
            same local entity; page-level markup refers to it by @id. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organisationSchema()),
          }}
        />

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
