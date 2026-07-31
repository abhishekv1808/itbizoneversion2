/**
 * Real ITBIZONE builds. Every stack listed here was read off that project's
 * own package.json.
 *
 * ── On screenshots ────────────────────────────────────────────────────────
 * `screenshotVerified: true` marks a genuine capture of that client's live
 * site — five of the eight now carry one. Portfolio shows the image for those
 * and falls back to the wordmark lockup for the rest, so no card ever presents
 * another company's product as a client's.
 *
 * ⚠ Every other `screenshot` path is a generic stock file, restored at the
 * client's explicit request after the mismatch was raised — none of them are
 * captures of the named client, and several are byte-identical duplicates of
 * each other. They still surface on DevShowcase, which renders `screenshot`
 * directly. Replace each path with a real capture and add the flag.
 *
 * ── On ids ────────────────────────────────────────────────────────────────
 * `id` is the ordinal Portfolio prints on each card, so it has to stay
 * contiguous from 01. It is NOT a stable key — caseStudies.js used to look up
 * by it and would have silently repointed at a different client when Lexakind
 * was removed and everything below it shifted up. That lookup is by name now.
 */
export const PROJECTS = [
  {
    id: '01',
    name: 'Right Assets Management',
    url: 'https://rightassetsmanagement.com',
    wordmark: 'font-sans font-bold tracking-[-0.05em]',
    sector: 'Asset Management',
    // Rewritten against the eight captures of the live site — see the warning
    // at the top of lib/caseStudies.js for what this used to claim and why.
    summary:
      'Forty-eight financial, property and legal services under one roof — live market data, five calculators, consultation booking and a client account.',
    stack: ['Next.js', 'Supabase', 'Recharts', 'React PDF'],
    disciplines: ['Website', 'Web App'],
    screenshot:
      '/rightassetsmanagement-web-screenshots/img_20260731%284%29.png',
    screenshotVerified: true,
  },
  {
    id: '02',
    name: 'OpenCredit',
    url: 'https://opencredit.in',
    wordmark: 'font-sans font-semibold tracking-[-0.04em]',
    sector: 'Fintech',
    summary:
      'A lending front-end where the EMI calculator does the selling — product comparison, application capture and an admin dashboard behind it.',
    stack: ['Next.js', 'Admin dashboard', 'EMI engine'],
    disciplines: ['UI/UX', 'Website'],
    screenshot: '/website-screenshots/opencredit-website.png',
    screenshotVerified: true,
  },
  {
    id: '03',
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
    id: '04',
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
    id: '05',
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
    id: '06',
    name: 'Bhoomika Seva Foundation',
    wordmark: 'font-serif font-semibold tracking-[-0.03em]',
    sector: 'Non-profit',
    summary:
      'A donation and outreach site for an NGO — media galleries, volunteer capture and transactional email, on a stack their team can afford to run.',
    stack: ['Express', 'MongoDB', 'Nodemailer', 'Tailwind'],
    disciplines: ['Website', 'Backend'],
    // Filename is as uploaded — 'bhhomika', not 'bhoomika'. Left alone rather
    // than renamed a client's file; correct the file and this path together.
    screenshot: '/website-screenshots/bhhomika-seva-foundation-website.png',
    screenshotVerified: true,
  },
  {
    id: '07',
    name: 'Krushiyuga',
    wordmark: 'font-sans font-bold tracking-[-0.04em]',
    sector: 'Agriculture',
    summary:
      'A livestock and integrated-farming site for a business running since 2008 — breed and product catalogues, a project gallery and government subsidy guidance, with enquiries routed to the farm.',
    /*
      Left empty deliberately. Every other stack here was read off that
      project's package.json and this one has not been, and the heading above
      the grid on the service pages reads "Every stack listed is what that
      project actually runs on". An invented list would make that line false.
      Fill it in and the chips appear on their own.
    */
    stack: [],
    // Brand covers the identity, brochure and campaign artwork carried in
    // lib/posters.js under the Krushiyuga Farm client.
    disciplines: ['Brand', 'Website'],
    screenshot: '/website-screenshots/krushiyuga-website.png',
    screenshotVerified: true,
  },
  {
    id: '08',
    name: 'Namma Krushiyuga Foundation',
    wordmark: 'font-serif font-semibold tracking-[-0.03em]',
    sector: 'Non-profit',
    summary:
      'A grassroots environmental non-profit — programmes across conservation, women’s self-help groups and livelihoods, with a carbon credit stream and donation capture.',
    // Not read off a package.json, so nothing is claimed. Same reasoning as
    // the Krushiyuga entry above.
    stack: [],
    disciplines: ['Website'],
    screenshot: '/website-screenshots/krushiyuga-foundation-website.png',
    screenshotVerified: true,
  },
]
