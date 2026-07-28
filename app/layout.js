import { Inter, Source_Serif_4, Cedarville_Cursive } from 'next/font/google'
import SmoothScroll from '@/components/SmoothScroll'
import { SITE } from '@/lib/site'
import './globals.css'

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
  title: `${SITE.name} — Everything digital, under one roof.`,
  description: SITE.description,
}

export default function RootLayout({ children }) {
  return (
    // No `scroll-smooth`: native smooth scrolling and Lenis both animate the
    // same scroll position and fight each other on anchor jumps.
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} ${cedarville.variable}`}
    >
      <head>
        <link
          rel="preconnect"
          href="https://images.higgs.ai"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-bg text-ink font-sans tracking-[-0.02em] antialiased overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
