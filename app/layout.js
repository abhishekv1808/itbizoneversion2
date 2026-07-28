import { Inter, Source_Serif_4, Cedarville_Cursive } from 'next/font/google'
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
  title: 'Alwayzz® — Premium creative on demand.',
  description:
    'A flexible design partnership for founders, brands, and agencies who want top craft delivered on their timeline.',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} ${cedarville.variable} scroll-smooth`}
    >
      <head>
        <link
          rel="preconnect"
          href="https://images.higgs.ai"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-bg text-ink font-sans tracking-[-0.02em] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
