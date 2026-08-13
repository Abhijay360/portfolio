import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const out = path.join(__dirname, '../public/projects')

const sites = [
  { slug: 'pitchcast', url: 'https://pitchcast.onrender.com', ready: /Premier|PitchCast|League|predict/i },
  { slug: 'aetherguard', url: 'https://aetherguard-8hc9.onrender.com', ready: /Aether|orbital|conjunction|globe/i },
  { slug: 'flight-delay', url: 'https://flight-delay-predictor-v6eb.onrender.com', ready: /delay|flight|NOAA|globe/i },
  { slug: 'umatch', url: 'https://umatch.onrender.com', ready: /UMatch|dorm|roommate|housing/i },
]

async function capture(page, site) {
  console.log(`\n=== ${site.slug} ===`)
  for (let attempt = 1; attempt <= 2; attempt++) {
    console.log(`attempt ${attempt}`)
    await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 120000 })
    try {
      await page.waitForFunction(
        () => !document.body?.innerText?.includes('WELCOME TO RENDER'),
        { timeout: 90000 },
      )
    } catch {
      console.log('Render splash timeout')
    }
    try {
      await page.waitForFunction(
        (re) => new RegExp(re, 'i').test(document.body?.innerText || ''),
        site.ready.source,
        { timeout: 30000 },
      )
    } catch {
      console.log('Ready text not found')
    }
    await page.waitForTimeout(5000)
  }
  const file = path.join(out, `${site.slug}.jpg`)
  await page.screenshot({ path: file, type: 'jpeg', quality: 88 })
  console.log('saved', file, fs.statSync(file).size)
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
for (const site of sites) await capture(page, site)
await browser.close()
