import { SITE } from '@/lib/site'
import NotFoundScene from '@/components/NotFoundScene'

export const metadata = {
  title: `Page Not Found — ${SITE.name}`,
  description: 'The page you are looking for does not exist or has been moved.',
}

export default function NotFound() {
  return <NotFoundScene />
}
