import { SITE } from './site'

/**
 * Per-page metadata with a self-referencing canonical, and Open Graph and
 * Twitter tags that describe *this* page.
 *
 * Next replaces a nested object like `openGraph` wholesale rather than merging
 * it, so a page that set only `title` used to inherit the root layout's
 * og:url of "/" and the home page's Twitter title — every shared link to
 * /contact previewed as the home page. Building all three here means a page
 * cannot set one without the others.
 *
 * `title` is the short form; the root layout's template appends the brand.
 * The social titles do not go through that template, so the brand is added
 * here explicitly.
 */
export function pageMetadata({
  title,
  description,
  path,
  socialTitle = `${title} | ${SITE.name}`,
  socialDescription = description,
  type = 'website',
  ...rest
}) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE.name,
      locale: 'en_IN',
      url: path,
      title: socialTitle,
      description: socialDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: socialDescription,
    },
    ...rest,
  }
}
