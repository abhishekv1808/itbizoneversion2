/**
 * Real ITBIZONE builds. Every stack listed here was read off that project's
 * own package.json.
 *
 * ⚠ `screenshot` points into /website-screenshots/, restored at the client's
 * explicit request after the mismatch was raised.
 *
 * These files are a generic stock set, not captures of these clients' sites:
 * website-5.png (OpenCredit) is Talkbase, a community-analytics SaaS, and
 * website-3.png (Right Assets Management) is HeadshotPro — including
 * HeadshotPro's own Trustpilot rating and the logos of HubSpot, Shopify, Dell
 * and Okta. Several files are byte-identical duplicates of each other.
 *
 * They are therefore presented under headings that describe delivered work
 * while showing other companies' products. Replace each path with a real
 * capture of that client's site when you have them.
 */
export const PROJECTS = [
  {
    id: '01',
    name: 'Lexakind',
    wordmark: 'font-serif font-semibold italic tracking-[-0.05em]',
    sector: 'Real Estate',
    summary:
      'One brand spanning properties, interiors and a foundation — built as a single site with validated enquiry forms routing straight to the sales desk.',
    stack: ['Next.js', 'React Hook Form', 'Zod', 'Resend'],
    disciplines: ['Brand', 'Website'],
    screenshot: '/website-screenshots/website-1.png',
    extraScreenshots: ['/website-screenshots/website-2.png'],
  },
  {
    id: '02',
    name: 'Right Assets Management',
    url: 'https://rightassetsmanagement.com',
    wordmark: 'font-sans font-bold tracking-[-0.05em]',
    sector: 'Asset Management',
    summary:
      'A public site plus a private franchise portal — role-based dashboards, drag-and-drop ordering, generated PDFs and Excel exports for the network.',
    stack: ['Next.js', 'Supabase', 'Recharts', 'React PDF'],
    disciplines: ['Website', 'Web App'],
    screenshot: '/website-screenshots/website-3.png',
    extraScreenshots: ['/website-screenshots/website-4.png'],
  },
  {
    id: '03',
    name: 'OpenCredit',
    url: 'https://opencredit.in',
    wordmark: 'font-sans font-semibold tracking-[-0.04em]',
    sector: 'Fintech',
    summary:
      'A lending front-end where the EMI calculator does the selling — product comparison, application capture and an admin dashboard behind it.',
    stack: ['Next.js', 'Admin dashboard', 'EMI engine'],
    disciplines: ['UI/UX', 'Website'],
    screenshot: '/website-screenshots/website-5.png',
    extraScreenshots: ['/website-screenshots/website-6.png'],
  },
  {
    id: '04',
    name: 'Obapstech',
    wordmark: 'font-[system-ui] font-extrabold tracking-[-0.05em]',
    sector: 'Technology',
    summary:
      'The most graphics-heavy build on this list — a 3D product scene and Rive-driven interface animation, shipped twice as the stack moved to Next.js.',
    stack: ['Next.js', 'Three.js', 'React Three Fiber', 'Rive'],
    disciplines: ['3D', 'Website'],
    screenshot: '/website-screenshots/website-7.png',
    extraScreenshots: ['/website-screenshots/website-8.png'],
  },
  {
    id: '05',
    name: 'Pixcert',
    wordmark: 'font-sans font-semibold tracking-[-0.06em]',
    sector: 'Technology',
    summary:
      'Scroll-driven storytelling end to end — WebGL surfaces tied to a Lenis scroll, with GSAP sequencing every transition between sections.',
    stack: ['Next.js', 'Three.js', 'GSAP', 'Lenis'],
    disciplines: ['3D', 'Website'],
    screenshot: '/website-screenshots/website-9.png',
    extraScreenshots: ['/website-screenshots/website-10.png'],
  },
  {
    id: '06',
    name: 'Newkumar',
    wordmark: 'font-[Georgia,serif] font-bold tracking-[-0.03em]',
    sector: 'Retail',
    summary:
      'A WebGL storefront with an AI assistant wired in through the Anthropic SDK, answering product questions in the flow of the page.',
    stack: ['Next.js', 'Three.js', 'GSAP', 'Claude API'],
    disciplines: ['AI', 'Website'],
    screenshot: '/website-screenshots/website-11.png',
    extraScreenshots: ['/website-screenshots/website-12.png'],
  },
  {
    id: '07',
    name: 'Bhoomika Seva Foundation',
    wordmark: 'font-serif font-semibold tracking-[-0.03em]',
    sector: 'Non-profit',
    summary:
      'A donation and outreach site for an NGO — media galleries, volunteer capture and transactional email, on a stack their team can afford to run.',
    stack: ['Express', 'MongoDB', 'Nodemailer', 'Tailwind'],
    disciplines: ['Website', 'Backend'],
    screenshot: '/website-screenshots/website-13.png',
    extraScreenshots: ['/website-screenshots/website-14.png'],
  },
  {
    id: '08',
    name: 'Simtech Computers',
    wordmark: 'font-[system-ui] font-bold tracking-[-0.04em]',
    sector: 'IT Retail',
    summary:
      'A legacy computer-retail site rebuilt on Next.js, keeping the catalogue intact while the page weight and load time came down.',
    stack: ['Next.js', 'Migration', 'SEO'],
    disciplines: ['Rebuild', 'Website'],
    screenshot: '/website-screenshots/website-15.png',
  },
]
