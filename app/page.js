import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Introduction from '@/components/sections/Introduction'
import Services from '@/components/sections/Services'
import ClientLogos from '@/components/sections/ClientLogos'
import Industries from '@/components/sections/Industries'
import Awards from '@/components/sections/Awards'
import Testimonials from '@/components/sections/Testimonials'
import Team from '@/components/sections/Team'
import StudentPartnership from '@/components/sections/StudentPartnership'
import Careers from '@/components/sections/Careers'
import ContactCTA from '@/components/sections/ContactCTA'
import Footer from '@/components/sections/Footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Introduction />
        <Services />
        <ClientLogos />
        <Industries />
        <Awards />
        <Testimonials />
        <Team />
        <StudentPartnership />
        <Careers />
        <ContactCTA />
      </main>
      <Footer />
    </>
  )
}
