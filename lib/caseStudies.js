import { PROJECTS } from './projects'

/**
 * The two builds featured as case studies on the home page.
 *
 * Facts live in projects.js and are looked up by id, so a name, sector or stack
 * is never stated twice and cannot drift between the two files. Only the
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
 * ⚠ `metrics` are PLACEHOLDERS. Every value is null and renders as an em dash.
 * They are the shape of the claim, not the claim — a case-study number is
 * exactly what a prospect will check, and none of these have been measured.
 * Fill in `value` from analytics, or delete a metric entirely if you would
 * rather not publish it. The section renders correctly with none of them.
 */

const byId = (id) => PROJECTS.find((project) => project.id === id)

export const CASE_STUDIES = [
  {
    slug: 'opencredit',
    project: byId('03'), // OpenCredit
    // One line for the card overlay. Short enough to sit over an image at any
    // width without wrapping past two lines.
    tagline: 'A lending front-end where the calculator does the selling.',
    // What the site had to do, framed from the build rather than from any
    // claim about the client's history.
    challenge:
      'Lending is bought on one question — what does this cost me per month? A brochure site makes the visitor go and find out somewhere else, and most of them do not come back.',
    delivered: [
      'An EMI calculator placed as the primary interaction, not a utility page',
      'Side-by-side product comparison so options resolve on one screen',
      'Application capture with validation, routed straight through',
      'An admin dashboard behind it for the team handling applications',
    ],
    metrics: [
      { label: 'Applications per month', value: null },
      { label: 'Calculator to apply', value: null, suffix: '%' },
      { label: 'Largest contentful paint', value: null, suffix: 's' },
    ],
  },
  {
    slug: 'right-assets-management',
    project: byId('02'), // Right Assets Management
    tagline: 'A public site and a private franchise portal, in one codebase.',
    challenge:
      'Two audiences with nothing in common: the public needs a site that explains and converts, while the franchise network needs a working tool. Serving both from one CMS usually compromises each.',
    delivered: [
      'A public marketing site and a private franchise portal in one codebase',
      'Role-based dashboards, so each franchise sees only its own network',
      'Drag-and-drop ordering with generated PDFs and Excel exports',
      'Reporting charts built on live data rather than uploaded sheets',
    ],
    metrics: [
      { label: 'Franchise users onboarded', value: null },
      { label: 'Hours saved per month', value: null },
      { label: 'Reports generated', value: null },
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
