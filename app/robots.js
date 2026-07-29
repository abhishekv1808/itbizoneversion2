import { SITE_URL } from '@/lib/site'

/**
 * Served at /robots.txt.
 *
 * ── The AI crawler decision ───────────────────────────────────────────────
 * Every AI bot below is currently ALLOWED. That is a business choice, not a
 * default, and it splits into two groups worth understanding separately:
 *
 * RETRIEVAL bots fetch a page because a user just asked something, and cite
 * it with a link. These send referral traffic. Blocking them removes you from
 * AI answers entirely — for a services business competing on "what does a
 * website cost in Bengaluru", that is the same as opting out of the results.
 *
 * TRAINING bots absorb content into a model. No direct traffic, and no link
 * back. The upside is slower and softer: brand recall, and assistants that
 * know the company exists. The downside is that the published price
 * catalogue becomes part of a model you do not control.
 *
 * To opt out of training while staying citable, move the training list from
 * `allow` to `disallow` below. The retrieval list should stay allowed.
 *
 * Note on Google-Extended: it governs Gemini and AI Overviews grounding only.
 * Blocking it does NOT affect normal Google Search rankings — Googlebot is a
 * separate agent and is unaffected.
 * ──────────────────────────────────────────────────────────────────────────
 */

// Fetch on demand to answer a user's question, and cite with a link.
const RETRIEVAL_BOTS = [
  'OAI-SearchBot', // ChatGPT search index
  'ChatGPT-User', // ChatGPT browsing on a user's behalf
  'PerplexityBot', // Perplexity index
  'Perplexity-User', // Perplexity browsing on a user's behalf
  'Claude-User', // Claude browsing on a user's behalf
  'Claude-SearchBot', // Claude search index
  'Google-Extended', // Gemini + AI Overviews grounding
  'Applebot-Extended', // Apple Intelligence
  'meta-externalagent', // Meta AI
]

// Collect content for model training.
const TRAINING_BOTS = [
  'GPTBot', // OpenAI
  'ClaudeBot', // Anthropic
  'anthropic-ai', // Anthropic (legacy agent string)
  'CCBot', // Common Crawl, feeds many training sets
  'Bytespider', // ByteDance
  'Amazonbot', // Amazon
  'Applebot', // Apple
  'cohere-ai', // Cohere
]

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Nothing user-facing lives under /api, and the contact endpoint is
        // POST-only — no reason to spend crawl budget there.
        disallow: ['/api/'],
      },
      {
        // Listed explicitly rather than relying on the wildcard, so the
        // intent is recorded rather than inferred.
        userAgent: RETRIEVAL_BOTS,
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: TRAINING_BOTS,
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
