import Hero from '@/components/Hero'
import Introduction from '@/components/sections/Introduction'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import CaseStudies from '@/components/sections/CaseStudies'
import Responsive from '@/components/sections/Responsive'
import Marketing from '@/components/sections/Marketing'
import DesignGallery from '@/components/sections/DesignGallery'
import TechStack from '@/components/sections/TechStack'
import Clients from '@/components/sections/Clients'
import Industries from '@/components/sections/Industries'
import Process from '@/components/sections/Process'
import WhyUs from '@/components/sections/WhyUs'
import Testimonials from '@/components/sections/Testimonials'
import ContactCTA from '@/components/sections/ContactCTA'
import { SITE } from '@/lib/site'
import { pageMetadata } from '@/lib/metadata'
import { websiteSchema, navigationSchema } from '@/lib/schema'

const TITLE = `Website & App Development Company in Bengaluru | ${SITE.name}`
const DESCRIPTION =
  'Custom website, mobile app and e-commerce development in Bengaluru. Design, build and digital marketing from one team, with a written quote up front.'

export const metadata = pageMetadata({
  // `absolute` skips the layout's "| ITBIZONE" template — the brand is
  // already at the end of this one.
  title: { absolute: TITLE },
  socialTitle: TITLE,
  description: DESCRIPTION,
  path: '/',
})

/*
  Careers used to sit between Testimonials and ContactCTA. It now lives at
  /careers: a hiring section on the home page told Google this was a page
  about jobs at an IT company, and pulled job seekers in on the same queries
  buyers use.
*/
export default function Page() {
  return (
    <>
      {/* The business node itself is emitted by the root layout; these two
          only make sense on the home page. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([websiteSchema(), navigationSchema()]),
        }}
      />

      <Hero />
      <Introduction />
      <Services />
      <Portfolio />
      <CaseStudies />
      <Responsive />
      <DesignGallery />
      <Marketing />
      <TechStack />
      <Clients />
      <Industries />
      <Process />
      <WhyUs />
      <Testimonials />
      <ContactCTA />
    </>
  )
}
