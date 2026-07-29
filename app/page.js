import Hero from '@/components/Hero'
import Introduction from '@/components/sections/Introduction'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import DesignGallery from '@/components/sections/DesignGallery'
import TechStack from '@/components/sections/TechStack'
import Clients from '@/components/sections/Clients'
import Industries from '@/components/sections/Industries'
import Process from '@/components/sections/Process'
import WhyUs from '@/components/sections/WhyUs'
import Testimonials from '@/components/sections/Testimonials'
import Careers from '@/components/sections/Careers'
import ContactCTA from '@/components/sections/ContactCTA'

export default function Page() {
  return (
    <>
      <Hero />
      <Introduction />
      <Services />
      <Portfolio />
      <DesignGallery />
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
