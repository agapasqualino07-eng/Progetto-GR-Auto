/**
 * Layout del sito pubblico.
 * Header e footer arriveranno in fase 3 (frontend).
 */
export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex min-h-dvh flex-col">{children}</div>
}
