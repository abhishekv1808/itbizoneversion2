import { PROJECTS } from './projects'

/**
 * The two builds featured as case studies on the home page.
 *
 * Facts live in projects.js and are looked up from there, so a name, sector or
 * stack is never stated twice and cannot drift between the two files. Only the
 * narrative is added here.
 *
 * ── What is real and what is not ──────────────────────────────────────────
 * `sector`, `stack`, `summary` and `url` are real — carried from projects.js
 * and confirmed by the client.
 *
 * `delivered` describes work that is evidenced by the stack and the summary:
 * a React PDF dependency means generated PDFs, an EMI engine means a
 * calculator. Nothing there is inferred beyond what was actually built.
 *
 * ⚠ The Right Assets entry was REWRITTEN against its screenshots. It used to
 * describe "a public site and a private franchise portal", with role-based
 * franchise dashboards, drag-and-drop ordering and Excel exports. Nothing of
 * the sort appears in any of the eight captures of the live site, which show a
 * three-vertical advisory firm with a service catalogue, live market data,
 * calculators, consultation booking and a client account. Since the captures
 * now sit on the same page as the copy, the two had to agree. If a franchise
 * portal does exist behind a login, restore the old wording from git history
 * — but it should not be the headline for a page showing this site.
 *
 * ⚠ `metrics` are PLACEHOLDERS. Every value is null and renders as an em dash.
 * They are the shape of the claim, not the claim — a case-study number is
 * exactly what a prospect will check, and none of these have been measured.
 * Fill in `value` from analytics, or delete a metric entirely if you would
 * rather not publish it. The section renders correctly with none of them.
 */

/*
  By name, not by id. `id` is the ordinal Portfolio prints on each card, so it
  renumbers whenever a project is added or removed — dropping Lexakind shifted
  every entry below it up one, which would have quietly repointed the
  OpenCredit study at Obapstech. Throwing beats rendering the wrong client.
*/
const byName = (name) => {
  const project = PROJECTS.find((p) => p.name === name)
  if (!project) throw new Error(`No project named "${name}" in lib/projects.js`)
  return project
}

export const CASE_STUDIES = [
  {
    slug: 'opencredit',
    project: byName('OpenCredit'),
    // One line for the card overlay. Short enough to sit over an image at any
    // width without wrapping past two lines.
    tagline: 'A lending front-end where the calculator does the selling.',
    // What the site had to do, framed from the build rather than from any
    // claim about the client's history.
    challenge:
      'Lending is bought on one question — what does this cost me per month? A brochure site makes the visitor go and find out somewhere else, and most of them do not come back.',
    delivered: [
      'An EMI calculator placed as the primary interaction, not a utility page',
      'Eight credit products compared across 60+ banks and NBFCs on one screen',
      'Application capture with validation, routed straight through',
      'A CIBIL correction service sold alongside the loans, with its own flow',
      'Payment breakdown and a downloadable amortisation schedule',
      'An admin dashboard behind it for the team handling applications',
    ],
    /*
      Captures of the live site. The hero lives on the project record in
      projects.js; these are the rest of the journey, in the order a visitor
      meets them.

      public/opencredit-website-screenshots/opencredit-website.png is left out
      deliberately — it is byte-identical to the hero already referenced from
      website-screenshots, and including it would put the same image on the
      page twice.
    */
    gallery: [
      {
        src: '/opencredit-website-screenshots/img_20260730%282%29.png',
        width: 1913,
        height: 923,
        caption:
          'Eight credit products in one grid, each carrying its own starting rate rather than a generic "apply".',
      },
      {
        src: '/opencredit-website-screenshots/img_20260731%287%29.png',
        width: 1757,
        height: 954,
        caption:
          'The personal loan page asks for a mobile number and nothing else — the rate comes back before the form does.',
      },
      {
        src: '/opencredit-website-screenshots/img_20260731.png',
        width: 1753,
        height: 953,
        caption:
          'The calculator: three sliders, a live EMI, a principal-versus-interest breakdown and a downloadable schedule.',
      },
      {
        src: '/opencredit-website-screenshots/img_20260730%281%29.png',
        width: 1914,
        height: 955,
        caption:
          'Verified Google reviews carried onto the page, named and rated rather than paraphrased.',
      },
      {
        src: '/opencredit-website-screenshots/img_20260730.png',
        width: 1913,
        height: 856,
        caption:
          'Closing call to action, with the RBI and SSL badges and the representative-example disclosure beneath it.',
      },
    ],
    metrics: [
      { label: 'Applications per month', value: null },
      { label: 'Calculator to apply', value: null, suffix: '%' },
      { label: 'Largest contentful paint', value: null, suffix: 's' },
    ],
  },
  {
    slug: 'right-assets-management',
    project: byName('Right Assets Management'),
    tagline: 'Financial, property and legal services, under one roof.',
    challenge:
      'A firm selling across three unrelated verticals has a navigation problem before it has a marketing one. Someone arriving for a home loan, a khata certificate and a property dispute needs three different journeys, and a single flat service list makes all three worse.',
    delivered: [
      'Forty-eight services split across Financial, Realty and Legal, each grouped and expandable rather than listed flat',
      'Live NIFTY, SENSEX, BANK NIFTY and MIDCAP data with top NSE stocks, refreshed in place',
      'Five calculators — SIP returns, loan EMI, FD maturity, insurance premium and rental yield',
      'Consultation booking by phone, video or in person, with the slot picked before any details are asked for',
      'A client account for tracking enquiries and downloading the free guides',
    ],
    /*
      Captures of the live site. Ratios run 1.75 to 2.84, so each carries its
      own intrinsic size and is rendered at its natural proportions — a fixed
      aspect box would crop the service-area carousel to nothing.
    */
    gallery: [
      {
        src: '/rightassetsmanagement-web-screenshots/img_20260731%283%29.png',
        width: 1901,
        height: 955,
        caption:
          'Forty-eight services across three verticals, grouped and expandable rather than listed flat.',
      },
      {
        src: '/rightassetsmanagement-web-screenshots/img_20260731%281%29.png',
        width: 1487,
        height: 848,
        caption:
          'Live index and NSE stock data, refreshed in place rather than on a page reload.',
      },
      {
        src: '/rightassetsmanagement-web-screenshots/ad.png',
        width: 1902,
        height: 953,
        caption:
          'Five calculators, each with a worked example so the input format is never in doubt.',
      },
      {
        src: '/rightassetsmanagement-web-screenshots/img_20260731%286%29.png',
        width: 1905,
        height: 823,
        caption:
          'Consultation booking: meeting type, then date, then time, then details — contact fields come last.',
      },
      {
        src: '/rightassetsmanagement-web-screenshots/img_20260731%285%29.png',
        width: 1900,
        height: 952,
        caption:
          'Client sign-in for tracking service requests and downloading guides.',
      },
      {
        src: '/rightassetsmanagement-web-screenshots/img_20260731%282%29.png',
        width: 1696,
        height: 597,
        caption: 'The service-area carousel, spanning finance, property and legal.',
      },
      {
        src: '/rightassetsmanagement-web-screenshots/img_20260731.png',
        width: 1895,
        height: 955,
        caption:
          'The second hero treatment, with the newsletter capture and footer beneath it.',
      },
    ],
    metrics: [
      { label: 'Services live', value: null },
      { label: 'Consultations booked', value: null },
      { label: 'Largest contentful paint', value: null, suffix: 's' },
    ],
  },
]

export const CASE_STUDY_SLUGS = CASE_STUDIES.map((study) => study.slug)

export function getCaseStudy(slug) {
  return CASE_STUDIES.find((study) => study.slug === slug) ?? null
}

/** The study after this one, wrapping — used for the footer nav on each page. */
export function nextCaseStudy(slug) {
  const i = CASE_STUDIES.findIndex((study) => study.slug === slug)
  if (i < 0) return null
  return CASE_STUDIES[(i + 1) % CASE_STUDIES.length]
}
