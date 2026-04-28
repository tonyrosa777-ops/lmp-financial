// scripts/wire-photo-backgrounds.mjs
//
// Wires <PhotoBackground src="..." /> into the dark-gradient page header section
// of every Phase 1H-relevant page. Reads each file, inserts the import + the
// component in the right place. Idempotent — skips files already wired.
//
// Run: node scripts/wire-photo-backgrounds.mjs

import { readFile, writeFile } from 'node:fs/promises';

const PAGES = [
  // Static-path pages (use /images/pages/<slug>.jpg)
  { file: 'src/app/services/page.tsx',         image: '/images/pages/services.jpg' },
  { file: 'src/app/team/page.tsx',             image: '/images/pages/team.jpg' },
  { file: 'src/app/partners/page.tsx',         image: '/images/pages/partners.jpg' },
  { file: 'src/app/careers/page.tsx',          image: '/images/pages/careers.jpg' },
  { file: 'src/app/quiz/page.tsx',             image: '/images/pages/quiz.jpg' },
  { file: 'src/app/booking/page.tsx',          image: '/images/pages/booking.jpg' },
  { file: 'src/app/contact/page.tsx',          image: '/images/pages/contact.jpg' },
  { file: 'src/app/faq/page.tsx',              image: '/images/pages/faq.jpg' },
  { file: 'src/app/blog/page.tsx',             image: '/images/pages/blog.jpg' },
  { file: 'src/app/calculators/page.tsx',      image: '/images/pages/calculators.jpg' },
  { file: 'src/app/service-areas/page.tsx',    image: '/images/pages/service-areas.jpg' },
  { file: 'src/app/testimonials/TestimonialsClient.tsx', image: '/images/pages/testimonials.jpg' },

  // Calculator detail pages
  { file: 'src/app/calculators/affordability/page.tsx',  image: '/images/calculators/affordability.jpg' },
  { file: 'src/app/calculators/monthly-payment/page.tsx', image: '/images/calculators/monthly-payment.jpg' },
  { file: 'src/app/calculators/refinance/page.tsx',      image: '/images/calculators/refinance.jpg' },
  { file: 'src/app/calculators/down-payment/page.tsx',   image: '/images/calculators/down-payment.jpg' },
  { file: 'src/app/calculators/dti/page.tsx',            image: '/images/calculators/dti.jpg' },

  // Dynamic pages (use template literal expressions)
  { file: 'src/app/services/[slug]/page.tsx',  imageExpr: '`/images/programs/${program.slug}.jpg`' },
  { file: 'src/app/mortgage-broker/[state]/page.tsx', imageExpr: '`/images/states/${info.slug}.jpg`' },
];

const IMPORT_LINE = "import PhotoBackground from '@/components/PhotoBackground';";

let updated = 0;
let skipped = 0;
let failed = 0;

for (const p of PAGES) {
  try {
    let src = await readFile(p.file, 'utf8');

    // Idempotency: skip if already wired
    if (src.includes('PhotoBackground')) {
      console.log(`  SKIP  ${p.file}  (already wired)`);
      skipped++;
      continue;
    }

    // 1. Insert import. Anchor: any existing FadeUp import line, fall back to
    //    the line after the last existing component/animations import.
    const fadeUpRegex = /^(import FadeUp from '@\/components\/animations\/FadeUp';)$/m;
    const componentImportRegex = /^(import .* from '@\/components\/[^']+';)\n/gm;
    if (fadeUpRegex.test(src)) {
      src = src.replace(fadeUpRegex, `$1\n${IMPORT_LINE}`);
    } else {
      // Fall back: after last @/components import
      const matches = [...src.matchAll(componentImportRegex)];
      if (matches.length > 0) {
        const last = matches[matches.length - 1];
        const idx = last.index + last[0].length;
        src = src.slice(0, idx) + IMPORT_LINE + '\n' + src.slice(idx);
      } else {
        // Insert near top after first 'import' line
        src = src.replace(/^(import .+;\n)/m, `$1${IMPORT_LINE}\n`);
      }
    }

    // 2. Insert PhotoBackground component AFTER the dark-gradient section opener.
    //    Match any padding suffix (pt-32 pb-12 / pb-16 / pb-20) and any extra classes.
    const sectionRegex = /(<section className="relative overflow-hidden section-dark-gradient pt-32[^"]*">\n)/;
    if (!sectionRegex.test(src)) {
      throw new Error('No matching dark-gradient page header section found');
    }
    const photoLine = p.imageExpr
      ? `        <PhotoBackground src={${p.imageExpr}} priority />\n`
      : `        <PhotoBackground src="${p.image}" priority />\n`;
    src = src.replace(sectionRegex, `$1${photoLine}`);

    await writeFile(p.file, src);
    console.log(`  OK    ${p.file}  →  ${p.image || p.imageExpr}`);
    updated++;
  } catch (err) {
    console.error(`  FAIL  ${p.file}  →  ${err.message}`);
    failed++;
  }
}

console.log(`\nDone.  updated=${updated}  skipped=${skipped}  failed=${failed}`);
process.exit(failed > 0 ? 1 : 0);
