import { SITE } from '@/lib/site'
// Client wrapper, not the scene itself — see the note in NotFoundLazy for why
// that keeps three.js out of every other route's bundle.
import NotFoundLazy from '@/components/NotFoundLazy'

export const metadata = {
  title: `Page Not Found — ${SITE.name}`,
  description: 'The page you are looking for does not exist or has been moved.',
}

export default function NotFound() {
  return <NotFoundLazy />
}
