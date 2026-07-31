import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import { Accent, Eyebrow, Lede, SectionTitle } from '@/components/ui/Type'
import {
  CASE_STUDY_SLUGS,
  getCaseStudy,
  nextCaseStudy,
} from '@/lib/caseStudies'
import { SITE, SITE_URL } from '@/lib/site'
import { breadcrumbSchema, orgRef } from '@/lib/schema'

const hostOf = (url) => url?.replace(/^https?:\/\//, '').replace(/\/$/, '')

// Both studies are known at build time, so each prerenders as static HTML.
export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}

  const { project, tagline } = study
  const title = `${project.name} — ${project.sector} case study`

  return {
    title,
    description: `${tagline} ${project.summary}`.slice(0, 155),
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: {
      title: `${title} — ${SITE.name}`,
      description: tagline,
      url: `/case-studies/${slug}`,
      type: 'article',
    },
  }
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  const { project, tagline, challenge, delivered, metrics, gallery } = study
  const next = nextCaseStudy(slug)
  const hasMetrics = metrics?.some((m) => m.value != null)

  /*
    CreativeWork rather than Article: this describes a delivered project, not a
    piece of writing. `about` names the client so the page is associated with
    them, and `creator` points at the single organisation node in lib/schema.js
    rather than restating the company.
  */
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      '@id': `${SITE_URL}/case-studies/${slug}/#work`,
      name: `${project.name} — ${project.sector} website`,
      headline: tagline,
      description: project.summary,
      url: `${SITE_URL}/case-studies/${slug}`,
      creator: orgRef,
      about: {
        '@type': 'Organization',
        name: project.name,
        ...(project.url && { url: project.url }),
      },
      keywords: project.stack.join(', '),
    },
    breadcrumbSchema([
      { name: 'Case studies', path: '/#case-studies' },
      { name: project.name, path: `/case-studies/${slug}` },
    ]),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── Header ────────────────────────────────────────────────────── */}
      <section className="px-6 pt-32 pb-10 md:px-9 md:pt-40 md:pb-14">
        <div className="mx-auto w-full max-w-[1200px]">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-[13px] text-quiet"
          >
            <a href="/" className="transition-colors hover:text-ink">
              Home
            </a>
            <ChevronRight size={13} />
            <a href="/#case-studies" className="transition-colors hover:text-ink">
              Case studies
            </a>
            <ChevronRight size={13} />
            <span className="text-muted">{project.name}</span>
          </nav>

          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[760px]">
              <Eyebrow>{project.sector}</Eyebrow>
              <h1 className="mt-6 text-[clamp(40px,11vw,50px)] leading-[1.03] font-semibold tracking-[-0.065em] md:text-[clamp(56px,7vw,72px)] lg:text-[80px]">
                {project.name}
              </h1>
              <p className="mt-6 max-w-[520px] text-[17px] leading-[1.45] text-muted">
                {tagline}
              </p>
            </div>

            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-soft bg-bg px-5 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-chip"
              >
                Visit {hostOf(project.url)}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {/* ── Full-bleed screenshot ─────────────────────────────────────── */}
      <section className="px-6 md:px-9">
        <div className="mx-auto w-full max-w-[1200px]">
          <Reveal y={24}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-soft bg-panel sm:aspect-[16/10] lg:aspect-[16/9]">
              {project.screenshot ? (
                <Image
                  src={project.screenshot}
                  alt={`${project.name} — ${project.sector} website`}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover object-top"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-[13px] text-quiet">
                  Screenshot pending
                </span>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The brief, and what shipped ───────────────────────────────── */}
      <Section>
        <div className="grid gap-12 md:grid-cols-12 md:gap-14">
          <Reveal className="md:col-span-5">
            <Eyebrow>The brief</Eyebrow>
            <SectionTitle className="mt-7">
              What it had to <Accent>solve</Accent>.
            </SectionTitle>
            <Lede className="mt-6">{challenge}</Lede>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7 md:pt-3">
            <h2 className="text-[13px] font-medium text-muted">What shipped</h2>
            <ol className="mt-4">
              {delivered.map((item, i) => (
                <li
                  key={item}
                  className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-soft py-4 last:border-b"
                >
                  <span className="pt-1 text-[12px] font-medium text-quiet tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[16px] leading-snug">{item}</span>
                </li>
              ))}
            </ol>

            <h2 className="mt-10 text-[13px] font-medium text-muted">Built with</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-soft bg-bg px-3 py-1.5 text-[13px] font-medium text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {/* Metrics stay out entirely until at least one is real — a row of
                em dashes reads as a broken component, not pending content. */}
            {hasMetrics ? (
              <dl className="mt-10 grid grid-cols-3 gap-5 border-t border-soft pt-7">
                {metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="text-[30px] leading-none font-semibold tracking-[-0.05em] tabular-nums md:text-[36px]">
                      {metric.value == null
                        ? '—'
                        : `${metric.value}${metric.suffix ?? ''}`}
                    </dt>
                    <dd className="mt-2 text-[13px] leading-snug text-muted">
                      {metric.label}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </Reveal>
        </div>
      </Section>

      {/*
        ── Screens ──────────────────────────────────────────────────────
        Only rendered for studies that carry captures. Each figure keeps its
        own intrinsic ratio rather than sitting in a fixed aspect box: these
        run from 1.75 to 2.84, and a shared box would crop the widest of them
        to a sliver.
      */}
      {gallery?.length ? (
        <Section className="bg-panel">
          <Reveal className="max-w-[560px]">
            <Eyebrow>Screens</Eyebrow>
            <SectionTitle className="mt-7">
              The site, in <Accent>use</Accent>.
            </SectionTitle>
          </Reveal>

          <div className="mt-14 flex flex-col gap-12 md:mt-16 md:gap-16">
            {gallery.map((shot, i) => (
              <Reveal key={shot.src} y={24} delay={i === 0 ? 0 : 0.05}>
                <figure>
                  <div className="overflow-hidden rounded-2xl border border-soft bg-bg">
                    <Image
                      src={shot.src}
                      alt={shot.caption}
                      width={shot.width}
                      height={shot.height}
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-4 max-w-[620px] text-[15px] leading-[1.5] text-muted">
                    <span className="mr-2 text-[13px] font-medium text-quiet tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {shot.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      {/* ── Next study ────────────────────────────────────────────────── */}
      {next && next.slug !== slug ? (
        <Section className="bg-panel">
          <Reveal>
            <a
              href={`/case-studies/${next.slug}`}
              className="group flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
            >
              <div>
                <span className="text-[13px] font-medium text-quiet">
                  Next case study
                </span>
                <h2 className="mt-4 text-[clamp(30px,8vw,36px)] leading-[1.05] font-semibold tracking-[-0.055em] transition-transform duration-300 group-hover:translate-x-1 md:text-[48px]">
                  {next.project.name}
                </h2>
                <p className="mt-3 max-w-[420px] text-[15px] text-muted">
                  {next.tagline}
                </p>
              </div>
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-soft bg-bg transition-colors duration-300 group-hover:bg-ink group-hover:text-white">
                <ArrowUpRight size={18} />
              </span>
            </a>
          </Reveal>
        </Section>
      ) : null}
    </>
  )
}
