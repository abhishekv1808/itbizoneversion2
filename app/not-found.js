// Client wrapper, not the scene itself — see the note in NotFoundLazy for why
// that keeps three.js out of every other route's bundle.
import NotFoundLazy from '@/components/NotFoundLazy'

// No canonical: a 404 is not a page that should be indexed under any URL.
export const metadata = {
  // The layout's template adds the brand; spelling it here doubled it.
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
}

export default function NotFound() {
  return <NotFoundLazy />
}
