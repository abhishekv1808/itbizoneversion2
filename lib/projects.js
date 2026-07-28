/**
 * Real ITBIZONE builds. Every stack listed here was read off that project's
 * own package.json — nothing is aspirational. Years are deliberately absent
 * rather than guessed; add them when you have the delivery dates.
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
  },
  {
    id: '02',
    name: 'Right Assets Management',
    wordmark: 'font-sans font-bold tracking-[-0.05em]',
    sector: 'Asset Management',
    summary:
      'A public site plus a private franchise portal — role-based dashboards, drag-and-drop ordering, generated PDFs and Excel exports for the network.',
    stack: ['Next.js', 'Supabase', 'Recharts', 'React PDF'],
    disciplines: ['Website', 'Web App'],
  },
  {
    id: '03',
    name: 'OpenCredit',
    wordmark: 'font-sans font-semibold tracking-[-0.04em]',
    sector: 'Fintech',
    summary:
      'A lending front-end where the EMI calculator does the selling — product comparison, application capture and an admin dashboard behind it.',
    stack: ['Next.js', 'Admin dashboard', 'EMI engine'],
    disciplines: ['UI/UX', 'Website'],
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
  },
]
