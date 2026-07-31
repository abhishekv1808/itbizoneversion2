/**
 * Extracts the brand marks used by the "Built on" section from simple-icons
 * into lib/techLogos.js.
 *
 * Run with: node scripts/generate-tech-logos.mjs
 *
 * Why generate instead of importing at runtime: simple-icons ships ~3,450
 * icons behind a barrel export. Pulling from it in a client component risks
 * dragging far more than a couple of dozen paths into the bundle. Generating
 * pins the exact data we use, keeps it reviewable in the diff, and lets
 * simple-icons stay a devDependency.
 *
 * Every mark is the vendor's own artwork, used nominatively to state which
 * technologies we build with. Re-run after bumping simple-icons.
 */
import { writeFileSync } from 'node:fs'
import * as simpleIcons from 'simple-icons'

/**
 * Grouped to match how the work is actually sold. `slug` is the simple-icons
 * identifier; `name` is the label rendered on the site.
 */
const GROUPS = [
  {
    id: 'build',
    label: 'Build',
    note: 'Sites, apps and storefronts',
    icons: [
      { slug: 'nextdotjs', name: 'Next.js' },
      { slug: 'react', name: 'React' },
      { slug: 'typescript', name: 'TypeScript' },
      { slug: 'nodedotjs', name: 'Node.js' },
      { slug: 'tailwindcss', name: 'Tailwind CSS' },
      { slug: 'mongodb', name: 'MongoDB' },
      { slug: 'supabase', name: 'Supabase' },
      { slug: 'postgresql', name: 'PostgreSQL' },
      { slug: 'wordpress', name: 'WordPress' },
      { slug: 'shopify', name: 'Shopify' },
      { slug: 'woocommerce', name: 'WooCommerce' },
      { slug: 'razorpay', name: 'Razorpay' },
      { slug: 'vercel', name: 'Vercel' },
      { slug: 'git', name: 'Git' },
    ],
    // No licensed glyph exists for these — see the note in lib/techLogos.js.
    wordmarks: [{ name: 'AWS', hex: '#FF9900' }],
  },
  {
    id: 'design',
    label: 'Design',
    note: 'Identity, interface and motion',
    // All of these appear in a `stack` array in lib/services.js — the row is
    // padded with tools actually in use, not with filler that looks good.
    icons: [
      { slug: 'figma', name: 'Figma' },
      { slug: 'framer', name: 'Framer' },
      { slug: 'blender', name: 'Blender' },
      { slug: 'storybook', name: 'Storybook' },
      { slug: 'maze', name: 'Maze' },
      { slug: 'hotjar', name: 'Hotjar' },
      { slug: 'notion', name: 'Notion' },
    ],
    wordmarks: [
      { name: 'Illustrator' },
      { name: 'Photoshop' },
      { name: 'InDesign' },
      { name: 'After Effects' },
    ],
  },
  {
    id: 'market',
    label: 'Market & measure',
    note: 'Campaigns, tracking and reporting',
    icons: [
      { slug: 'googleads', name: 'Google Ads' },
      { slug: 'meta', name: 'Meta Ads' },
      { slug: 'googleanalytics', name: 'Google Analytics' },
      { slug: 'googlesearchconsole', name: 'Search Console' },
      { slug: 'googletagmanager', name: 'Tag Manager' },
      { slug: 'semrush', name: 'Semrush' },
      { slug: 'mailchimp', name: 'Mailchimp' },
      { slug: 'instagram', name: 'Instagram' },
      { slug: 'whatsapp', name: 'WhatsApp' },
    ],
    wordmarks: [],
  },
]

const bySlug = new Map(
  Object.values(simpleIcons)
    .filter((icon) => icon && icon.slug)
    .map((icon) => [icon.slug, icon])
)

const groups = GROUPS.map((group) => ({
  id: group.id,
  label: group.label,
  note: group.note,
  tools: [
    ...group.icons.map(({ slug, name }) => {
      const icon = bySlug.get(slug)
      if (!icon) throw new Error(`simple-icons has no icon for slug "${slug}"`)
      return { name, hex: `#${icon.hex}`, path: icon.path }
    }),
    ...group.wordmarks.map((w) => ({ name: w.name, hex: w.hex ?? null })),
  ],
}))

/*
  Tools named in the per-service `stack` arrays in lib/services.js, keyed by the
  exact label rendered on the page so ServiceProcess can look one up directly.

  Deliberately separate from GROUPS above: that set is the home page's "Built
  on" pitch, this one is whatever each service actually lists, and the two
  drift apart. Overlap is fine — the paths are identical either way.

  `slug: null` means simple-icons carries no licensed mark and the tool renders
  as a wordmark. That is most of the Adobe suite plus Canva and Affinity, whose
  marks were withdrawn at the vendors' request. FigJam is null on purpose
  rather than for lack of a mark: Figma's glyph exists, but FigJam is a
  different product and borrowing its sibling's logo would misstate it.
*/
const SERVICE_TOOLS = [
  { name: 'Figma', slug: 'figma' },
  { name: 'Framer', slug: 'framer' },
  { name: 'Maze', slug: 'maze' },
  { name: 'Hotjar', slug: 'hotjar' },
  { name: 'Storybook', slug: 'storybook' },
  { name: 'Notion', slug: 'notion' },
  { name: 'Blender', slug: 'blender' },
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'React', slug: 'react' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'Tailwind CSS', slug: 'tailwindcss' },
  { name: 'MongoDB', slug: 'mongodb' },
  { name: 'Supabase', slug: 'supabase' },
  { name: 'WordPress', slug: 'wordpress' },
  { name: 'WooCommerce', slug: 'woocommerce' },
  { name: 'Shopify', slug: 'shopify' },
  { name: 'Razorpay', slug: 'razorpay' },
  { name: 'Google Analytics', slug: 'googleanalytics' },
  { name: 'Google Ads', slug: 'googleads' },
  { name: 'Google Tag Manager', slug: 'googletagmanager' },
  { name: 'Search Console', slug: 'googlesearchconsole' },
  { name: 'Mailchimp', slug: 'mailchimp' },
  { name: 'Instagram', slug: 'instagram' },
  { name: 'Facebook', slug: 'facebook' },
  { name: 'YouTube', slug: 'youtube' },
  { name: 'X', slug: 'x' },
  { name: 'WhatsApp Business', slug: 'whatsapp' },
  { name: 'Meta Ads', slug: 'meta' },
  { name: 'Meta Ads Manager', slug: 'meta' },

  // No licensed mark — rendered as wordmarks.
  { name: 'Illustrator', slug: null },
  { name: 'Photoshop', slug: null },
  { name: 'InDesign', slug: null },
  { name: 'After Effects', slug: null },
  { name: 'Affinity', slug: null },
  { name: 'Canva templates', slug: null },
  { name: 'FigJam', slug: null },
  { name: 'AWS', slug: null },
  { name: 'LinkedIn', slug: null },
  { name: 'Ahrefs', slug: null },
]

const toolLogos = Object.fromEntries(
  SERVICE_TOOLS.map(({ name, slug }) => {
    if (!slug) return [name, { hex: null, path: null }]
    const icon = bySlug.get(slug)
    if (!icon) throw new Error(`simple-icons has no icon for slug "${slug}"`)
    return [name, { hex: `#${icon.hex}`, path: icon.path }]
  })
)

const counts = groups.map((g) => `${g.label}: ${g.tools.length}`).join(', ')

const file = `// GENERATED by scripts/generate-tech-logos.mjs — do not edit by hand.
// Source: simple-icons. Each path is the vendor's own mark, paired with its
// official brand colour. All are 24x24 single-path glyphs.
//
// Entries with \`path: null\` have no licensed glyph. Amazon and Adobe both had
// their marks removed from simple-icons at their own request, so AWS and the
// Creative Cloud apps render as wordmarks rather than hand-traced imitations.
// Only AWS carries a brand colour, because it is the one we can state with
// confidence; the rest render in the site's ink colour rather than inventing
// a hex for someone else's brand.

export const TECH_GROUPS = ${JSON.stringify(groups, null, 2)}

/** Flat list, for anywhere that wants every tool without the grouping. */
export const TECH_LOGOS = TECH_GROUPS.flatMap((group) => group.tools)

/**
 * Keyed by the exact label used in each service's \`stack\` in lib/services.js.
 * \`path: null\` means no licensed mark exists — render the name instead.
 */
export const TOOL_LOGOS = ${JSON.stringify(toolLogos, null, 2)}
`

const out = new URL('../lib/techLogos.js', import.meta.url)
writeFileSync(out, file)
console.log(`wrote ${groups.reduce((n, g) => n + g.tools.length, 0)} tools (${counts}) to lib/techLogos.js`)
