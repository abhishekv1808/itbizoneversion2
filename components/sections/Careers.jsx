"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Reveal, { RevealGroup, revealItem } from "@/components/ui/Reveal";
import { Accent, Eyebrow, Lede, SectionTitle } from "@/components/ui/Type";
import { SITE } from "@/lib/site";

// Disciplines we hire into, rather than specific vacancies — swap this for a
// live openings list once there are roles to name.
const DISCIPLINES = [
  { title: "Web Development", detail: "React, Next.js, Node.js, WordPress" },
  { title: "UI/UX Design", detail: "Research, wireframes, design systems" },
  { title: "Digital Marketing", detail: "SEO, Google Ads, paid social" },
  { title: "Graphic Design", detail: "Identity, print, packaging, motion" },
];

/*
  Rendered as the whole of /careers, not on the home page — see app/page.js.
  `className` lets the page add clearance for the fixed header, and the title
  is the page's h1 there.
*/
export default function Careers({ className = "" }) {
  return (
    <Section id="careers" className={className}>
      <div className="flex flex-col gap-4 md:flex-row md:gap-8 md:items-end md:justify-between">
        <Reveal className="max-w-[560px]">
          <Eyebrow>Careers</Eyebrow>
          <SectionTitle as="h1" className="mt-7">
            Come build <Accent>with us</Accent>.
          </SectionTitle>
          <Lede className="mt-6 max-w-[430px]">
            We hire across four disciplines in Bengaluru. Send your work even
            when nothing is posted — we read everything that arrives and reply
            either way.
          </Lede>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="inline-flex items-center gap-2 rounded-full border border-soft bg-bg px-4 py-2 text-[13px] font-medium text-muted">
            <span className="size-2 rounded-full bg-dot" />
            Open applications
          </span>
        </Reveal>
      </div>

      <RevealGroup className="mt-12 border-t border-soft">
        {DISCIPLINES.map((discipline) => (
          <motion.a
            key={discipline.title}
            href={`mailto:${SITE.email}?subject=Application%20%E2%80%94%20${encodeURIComponent(discipline.title)}`}
            variants={revealItem}
            className="group flex flex-col gap-3 border-b border-soft py-6 md:flex-row md:items-center md:justify-between md:gap-8"
          >
            <span className="text-[21px] leading-tight font-semibold tracking-[-0.04em] transition-transform duration-300 group-hover:translate-x-1 md:text-[26px]">
              {discipline.title}
            </span>

            <span className="flex items-center gap-3">
              <span className="text-[13px] text-muted">
                {discipline.detail}
              </span>
              <ArrowUpRight
                size={18}
                className="text-quiet transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
              />
            </span>
          </motion.a>
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-8">
        <Lede className="text-[15px]">
          Not sure which one fits?{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-medium text-ink underline underline-offset-4"
          >
            Write to {SITE.email}
          </a>{" "}
          &mdash; we keep a short list.
        </Lede>
      </Reveal>
    </Section>
  );
}
