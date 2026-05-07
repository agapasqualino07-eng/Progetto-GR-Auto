export const dynamic = 'force-dynamic'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings } from '@/lib/payload/queries'

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  return (
    <div className="flex min-h-dvh flex-col">
      <Header siteName={settings.name} phone={settings.phone} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  )
}
