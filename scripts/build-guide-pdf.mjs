/**
 * Genera GUIDA-CLIENTE.pdf a partire da GUIDA-CLIENTE.md.
 * Usa playwright + marked. Eseguire con:
 *   node scripts/build-guide-pdf.mjs
 */

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

// Use globally installed playwright if local one is missing
let chromium
try {
  ;({ chromium } = await import('playwright'))
} catch {
  ;({ chromium } = require('/opt/node22/lib/node_modules/playwright'))
}

const { marked } = await import('marked')

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const md = await readFile(path.join(root, 'GUIDA-CLIENTE.md'), 'utf-8')
const htmlBody = marked.parse(md)

const html = /* html */ `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<title>Guida al sito del concessionario</title>
<style>
  @page { size: A4; margin: 22mm 18mm; }
  * { box-sizing: border-box; }
  html, body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    color: #0f172a;
    line-height: 1.55;
    font-size: 10.5pt;
  }
  body { margin: 0; }
  h1 { font-size: 22pt; margin: 0 0 4mm 0; line-height: 1.2; color: #1e293b; }
  h2 { font-size: 15pt; margin: 9mm 0 3mm 0; padding-bottom: 1.5mm; border-bottom: 1px solid #e2e8f0; color: #1e293b; }
  h3 { font-size: 12pt; margin: 6mm 0 2mm 0; color: #1e293b; }
  h4 { font-size: 11pt; margin: 4mm 0 2mm 0; color: #334155; }
  p, ul, ol { margin: 0 0 3mm 0; }
  ul, ol { padding-left: 6mm; }
  li { margin: 0.6mm 0; }
  hr { border: 0; border-top: 1px solid #e2e8f0; margin: 8mm 0; }
  code {
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    background: #f1f5f9;
    padding: 0.5mm 1mm;
    border-radius: 1mm;
    font-size: 9.5pt;
  }
  pre {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 2mm;
    padding: 3mm;
    overflow-x: auto;
    font-size: 9pt;
    line-height: 1.45;
    page-break-inside: avoid;
  }
  pre code { background: transparent; padding: 0; font-size: inherit; }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 3mm 0;
    font-size: 9.5pt;
    page-break-inside: avoid;
  }
  th, td { border: 1px solid #e2e8f0; padding: 2mm 2.5mm; text-align: left; vertical-align: top; }
  thead { background: #f1f5f9; }
  thead th { font-weight: 600; color: #1e293b; }
  blockquote {
    border-left: 3px solid #4f6ce6;
    background: #f5f7ff;
    padding: 2mm 3mm;
    margin: 3mm 0;
    color: #2d3f97;
    border-radius: 1mm;
  }
  a { color: #2d3f97; text-decoration: none; }
  strong { color: #0f172a; font-weight: 600; }
  em { font-style: italic; }
  h1, h2, h3, h4 { page-break-after: avoid; }
  table, pre, blockquote { page-break-inside: avoid; }
  .cover {
    page-break-after: always;
    text-align: center;
    padding-top: 60mm;
  }
  .cover .badge {
    display: inline-block;
    padding: 1.5mm 4mm;
    background: linear-gradient(135deg, #4f6ce6, #2d3f97);
    color: white;
    border-radius: 999mm;
    font-size: 9pt;
    text-transform: uppercase;
    letter-spacing: 0.5mm;
    font-weight: 600;
  }
  .cover h1 {
    font-size: 32pt;
    margin: 8mm 0 4mm 0;
    color: #1e293b;
  }
  .cover .subtitle {
    color: #475569;
    font-size: 12pt;
    margin: 0 auto;
    max-width: 110mm;
  }
  .cover .footer {
    position: absolute;
    bottom: 22mm;
    left: 0;
    right: 0;
    color: #94a3b8;
    font-size: 9pt;
  }
</style>
</head>
<body>
<div class="cover">
  <span class="badge">Documentazione cliente</span>
  <h1>Guida al sito del concessionario</h1>
  <p class="subtitle">Tutto quello che è stato realizzato e tutto quello che dovrai collegare per portare il sito online.</p>
  <div class="footer">Versione del ${new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
</div>
${htmlBody}
</body>
</html>`

const tmpHtml = path.join(root, 'GUIDA-CLIENTE.html')
await writeFile(tmpHtml, html, 'utf-8')

const browser = await chromium.launch({ args: ['--no-sandbox'] })
const ctx = await browser.newContext()
const page = await ctx.newPage()
await page.goto('file://' + tmpHtml, { waitUntil: 'load' })

const pdf = await page.pdf({
  format: 'A4',
  printBackground: true,
  margin: { top: '22mm', bottom: '22mm', left: '18mm', right: '18mm' },
  displayHeaderFooter: true,
  headerTemplate: '<div></div>',
  footerTemplate:
    '<div style="font-size:8pt;color:#94a3b8;width:100%;text-align:center;padding-bottom:6mm;">Pagina <span class="pageNumber"></span> di <span class="totalPages"></span></div>',
})

await writeFile(path.join(root, 'GUIDA-CLIENTE.pdf'), pdf)
await browser.close()

console.log(`✓ PDF generato: GUIDA-CLIENTE.pdf (${(pdf.length / 1024).toFixed(0)} KB)`)
