import { RichText } from '@payloadcms/richtext-lexical/react'

/**
 * Wrapper sottile sopra al renderer ufficiale Lexical → JSX.
 */
export function RichTextRender({
  data,
  className,
}: {
  data?: unknown
  className?: string
}) {
  if (!data) return null
  return <RichText data={data as never} className={className} />
}
