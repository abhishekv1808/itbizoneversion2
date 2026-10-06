import Careers from '@/components/sections/Careers'
import { SITE } from '@/lib/site'
import { pageMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata = pageMetadata({
  title: 'Careers',
  // Under 160 characters so it does not truncate mid-sentence in results.
  description: `Work at ${SITE.name} in Bengaluru. Open applications across web development, UI/UX design, digital marketing and graphic design — send us your work.`,
  path: '/careers',
})

/*
  Moved off the home page so hiring content stops competing with the buyer
  queries the home page targets. Same section, same styling; the extra top
  padding clears the fixed header, matching the other standalone pages.
*/
export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([{ name: 'Careers', path: '/careers' }])
          ),
        }}
      />
      <Careers className="pt-32 md:pt-40 lg:pt-40" />
    </>
  )
}
