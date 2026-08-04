/**
 * Real ITBIZONE builds. Every stack listed here was read off that project's
 * own package.json.
 *
 * ── On screenshots ────────────────────────────────────────────────────────
 * Every entry now carries `screenshotVerified: true` — a genuine capture of
 * that client's live site. Portfolio renders the image for anything flagged
 * and falls back to the wordmark lockup otherwise, so a future entry without
 * a real capture degrades rather than borrowing someone else's product shot.
 *
 * The generic stock set this file used to point at (public/website-screenshots
 * /website-1.png … website-15.png) is no longer referenced by any code path.
 * Those files can be deleted whenever convenient; they are ~2.9MB of images
 * that were never captures of the clients they were filed under.
 *
 * ── On `mobile` ───────────────────────────────────────────────────────────
 * A phone capture of the same site, where one exists. The artwork already
 * carries a device frame and a transparent background, so the section that
 * renders it must not add a border, a radius or a mockup of its own.
 *
 * Intrinsic sizes are stored because the bounding boxes are not consistent:
 * the straight-on captures are 800x1648, while the OpenCredit one is
 * 936x1170 because its phone is tilted and needs a wider box for the same
 * device. Anything laying these out has to normalise, not assume.
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
    mobile: {
      src: '/website-screenshots/rightassetsmanagement-mobile-image.png',
      width: 800,
      height: 1648,
    },
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
    mobile: {
      src: '/website-screenshots/opencredit-mobile-image.png',
      width: 936,
      height: 1170,
    },
  },
  {
    id: '03',
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
    mobile: {
      src: '/website-screenshots/bhoomika-mobile-image.png',
      width: 800,
      height: 1648,
    },
  },
  {
    id: '04',
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
    id: '05',
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
