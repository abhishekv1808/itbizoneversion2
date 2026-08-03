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
import Careers from '@/components/sections/Careers'
import ContactCTA from '@/components/sections/ContactCTA'
import { organisationSchema, websiteSchema } from '@/lib/schema'

export default function Page() {
  return (
    <>
      {/* Local business + organisation markup. This is what feeds the
          Bengaluru map pack and "near me" results; without it Google has to
          infer the address from body copy. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organisationSchema(), websiteSchema()]),
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
      <Careers />
      <ContactCTA />
    </>
  )
}
