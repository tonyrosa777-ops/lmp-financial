// scripts/generate-images.mjs
//
// fal.ai image generation pipeline for Phase 1H.
// Reads prompts from this file, generates images via fal-ai/flux-pro/v1.1,
// saves outputs to /public/images/<category>/<slug>.jpg.
//
// Usage (Node 20.6+ for --env-file support):
//   node --env-file=.env.local scripts/generate-images.mjs blog
//   node --env-file=.env.local scripts/generate-images.mjs programs
//   node --env-file=.env.local scripts/generate-images.mjs states
//   node --env-file=.env.local scripts/generate-images.mjs pages
//   node --env-file=.env.local scripts/generate-images.mjs calculators
//   node --env-file=.env.local scripts/generate-images.mjs all
//   node --env-file=.env.local scripts/generate-images.mjs <single-slug>
//
// Skips images that already exist (so reruns are safe). Logs seeds to
// scripts/image-seeds.json for reproducibility.

import { fal } from '@fal-ai/client';
import { writeFile, readFile, mkdir, access } from 'node:fs/promises';
import { dirname } from 'node:path';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) {
  console.error('Missing FAL_KEY in environment.');
  console.error('Run with: node --env-file=.env.local scripts/generate-images.mjs <batch>');
  process.exit(1);
}

fal.config({ credentials: FAL_KEY });

const MODEL = 'fal-ai/flux-pro/v1.1';
const IMAGE_SIZE = 'landscape_16_9';
const STEPS = 28;
const GUIDANCE = 3.5;

const NEGATIVE_PROMPT = [
  'text', 'words', 'letters', 'numbers', 'signage', 'logos', 'watermarks',
  'faces', 'people', 'hands', 'fingers', 'smiling', 'person', 'human figure',
  'cgi', '3d render', 'harsh sunlight', 'neon colors', 'oversaturated',
  'stock photo', 'illustration', 'cartoon', 'drawing', 'painting',
  'deformed', 'blurry', 'low quality',
].join(', ');

// ---------------------------------------------------------------------------
// Prompts (38 total — see IMAGE-PLAN.md for uniqueness audit)
// ---------------------------------------------------------------------------

const PROMPTS = [
  // ─── A. Blog article headers (3) ───────────────────────────────────────
  {
    slug: 'fha-vs-conventional-nh',
    category: 'blog',
    prompt: 'Editorial documentary photograph of a single classic New Hampshire farmhouse front door, painted deep navy with a polished brass doorknob and brass kick plate, the door framed by white clapboard siding, autumn maple leaves scattered on the entry stoop, soft golden hour sunlight raking across the door from camera left, 35mm full-frame, shallow depth of field on the brass doorknob, color graded warm cream clapboard and aged brass with deep navy door, Kodak Portra 400 film look, photographed on medium format. No people, no text, no signage.',
  },
  {
    slug: 'masshousing-30k-down-payment-assistance',
    category: 'blog',
    prompt: 'Editorial documentary still life photograph of a single antique brass house key resting on a worn cream linen surface, golden afternoon window light raking from camera right casting a long warm shadow, soft fabric texture visible, 35mm full-frame, very shallow depth of field on the key teeth, color graded warm cream linen and aged brass with deep navy in the shadow, Kodak Portra 400 film look. No people, no text, no other objects.',
  },
  {
    slug: 'wholesale-vs-retail-mortgage',
    category: 'blog',
    prompt: 'Editorial documentary still life photograph of a single closed brown leather portfolio resting on a worn dark walnut desk, a soft beam of golden afternoon light raking across the leather grain texture, brass corner protectors catching the warm light, 35mm full-frame, very shallow depth of field on the leather grain, color graded warm cream highlight and aged brass with deep walnut shadow, Kodak Portra 400 film look. No people, no text, no other objects on the desk.',
  },

  // ─── Phase 1I — 6 new article headers (added 2026-04-28) ──────────────
  {
    slug: 'uwm-wholesale-explained',
    category: 'blog',
    prompt: 'Editorial documentary still life photograph of a single antique brass letter opener resting diagonally across an unmarked cream paper envelope on a worn dark walnut desk, late afternoon golden hour window light raking across the brass blade from camera right casting a long warm shadow, deep navy wall in soft focus behind, 35mm full-frame, very shallow depth of field on the brass blade tip, color graded warm cream paper and aged brass with deep walnut shadow, Kodak Portra 400 film look. No people, no readable text on envelope, no other objects.',
  },
  {
    slug: 'rate-shopping-guide-first-time-buyers',
    category: 'blog',
    prompt: 'Editorial documentary still life photograph of a single vintage brass-cased pocket stopwatch resting on a worn cream linen surface, the stopwatch face turned slightly toward camera (numerals abstracted not legible), late afternoon golden hour window light raking from camera left casting a long warm shadow, soft fabric weave texture visible, 35mm full-frame, very shallow depth of field on the stopwatch crown, color graded warm cream linen and aged brass with deep navy shadow, Kodak Portra 400 film look. No people, no readable numerals on the dial, no other objects.',
  },
  {
    slug: 'nhhfa-home-flex-plus-explained',
    category: 'blog',
    prompt: 'Editorial documentary photograph of a small classic New England maple sugar shack at dawn, weathered wood-shingled cabin with a tin chimney, soft white steam rising vertically from the chimney, surrounded by a stand of bare sugar maples in early spring, soft mist hovering low across the snowy ground, low golden hour sunrise light from camera left raking across the cabin face, 35mm full-frame, shallow depth of field on the cabin door, color graded warm cream steam and aged amber wood with deep navy shadows, Kodak Portra 400 film look. No people, no text on the cabin, no other buildings.',
  },
  {
    slug: 'chfa-time-to-own-connecticut',
    category: 'blog',
    prompt: 'Editorial documentary still life photograph of a single antique brass colonial-style pineapple door knocker mounted on a deep navy painted wooden door, polished brass surface catching late afternoon golden hour sunlight from camera right, soft autumn maple leaf shadow drifting across the door, weathered cream-painted door trim visible at edges, 35mm full-frame, very shallow depth of field on the pineapple knocker detail, color graded deep navy door and aged brass with warm cream trim shadows, Kodak Portra 400 film look. No people, no text, no house numbers.',
  },
  {
    slug: 'fl-hometown-heroes-explained',
    category: 'blog',
    prompt: 'Editorial documentary photograph of a single classic painted wooden lifeguard chair (a tall four-legged structure, no figures) silhouetted on a quiet Florida beach at golden hour, gentle low waves visible at the shoreline behind, a single tall palm tree leaning into the frame from the left side, low warm late afternoon sun raking from camera right casting long warm shadows on the white sand, 35mm full-frame, shallow depth of field on the chair seat, color graded warm cream sand and aged amber chair with deep navy ocean shadows, Kodak Portra 400 film look. No people, no text on the chair, no signage.',
  },
  {
    slug: 'chfa-co-metrodpa-stacking',
    category: 'blog',
    prompt: 'Editorial documentary photograph of a single weathered wooden birdhouse mounted on a tall cedar post, silhouetted against the deep navy silhouette of the Rocky Mountain Front Range at dusk, golden afterglow on the western sky behind the mountains, tall waving prairie grasses in the foreground catching warm amber light, a soft gradient sky from deep navy to warm cream at the horizon, 35mm full-frame, shallow depth of field on the birdhouse roof, color graded warm cream sky and aged amber grass with deep navy mountains, Kodak Portra 400 film look. No people, no readable text on the birdhouse, no other birdhouses.',
  },

  // ─── B. Loan program headers (9) ───────────────────────────────────────
  {
    slug: 'fixed-rate',
    category: 'programs',
    prompt: 'Editorial documentary photograph of a single tall white classical column on the front porch of a New England colonial home, low golden afternoon sunlight raking up the column casting long warm shadows, weathered porch floorboards visible at the base, deep navy shadow against the porch wall, 35mm full-frame, shallow depth of field on the column base, color graded warm cream column and aged amber wood with deep navy shadow, Kodak Portra 400 film look. No people, no text.',
  },
  {
    slug: 'fha',
    category: 'programs',
    prompt: 'Editorial documentary photograph of a freshly painted cream colored front door of a small starter home, a polished brass doorknob centered, a clean fiber doormat below the door, late afternoon golden hour sunlight streaming from camera right casting a warm gradient on the door, soft pastel siding visible at edges, 35mm full-frame, shallow depth of field on the doorknob, color graded warm cream and aged brass, Kodak Portra 400 film look. No people, no text, no house numbers.',
  },
  {
    slug: 'va',
    category: 'programs',
    prompt: 'Editorial documentary photograph of a single American flag mounted on a wooden front porch, the flag gently rippling in evening breeze, late afternoon golden hour sunlight lighting the lower stripes, the porch railing in deep navy shadow, weathered cedar wood porch ceiling above, 35mm full-frame, shallow depth of field on the flag fabric, color graded warm cream stripes and aged amber wood with deep navy shadows, Kodak Portra 400 film look. No people, no readable text on flag.',
  },
  {
    slug: 'jumbo',
    category: 'programs',
    prompt: 'Editorial documentary photograph of the exterior of a large coastal New England shingle style home at twilight, the home seen from a respectful distance across a manicured lawn, multiple windows glowing warm amber from inside, deep navy twilight sky above, a single ornamental tree in the foreground silhouette, 35mm full-frame, shallow depth of field on the foreground tree, color graded deep navy sky and warm cream window glow with aged amber facade, Kodak Portra 400 film look. No people, no cars, no text.',
  },
  {
    slug: 'arm',
    category: 'programs',
    prompt: 'Editorial documentary photograph of a single empty wooden porch swing hanging from a covered porch ceiling, the swing motionless, late afternoon golden hour sunlight slanting across the wooden floorboards from camera left, a soft cream wool blanket draped over one corner of the swing, deep navy porch wall behind, 35mm full-frame, shallow depth of field on the chain links of the swing, color graded warm cream blanket and aged amber wood with deep navy wall, Kodak Portra 400 film look. No people, no text.',
  },
  {
    slug: 'usda',
    category: 'programs',
    prompt: 'Editorial documentary photograph of a single classic red barn standing alone in a wide cleared field at sunrise, soft mist hovering low across the grass, the barn lit warmly on its eastern face, a winding gravel road leading toward the barn from foreground, distant tree line in deep navy silhouette, 35mm full-frame, shallow depth of field on the foreground gravel, color graded warm cream mist and aged barn red with deep navy shadows, Kodak Portra 400 film look. No people, no farm equipment, no text.',
  },
  {
    slug: 'first-time-buyer',
    category: 'programs',
    prompt: 'Editorial documentary still life photograph of a single new fiber doormat resting on a freshly painted cream wooden porch step, a small terracotta potted plant placed beside it, golden hour sunlight raking across the porch from camera right casting long warm shadows, weathered porch floorboards visible, 35mm full-frame, shallow depth of field on the doormat texture, color graded warm cream porch and aged terracotta with deep navy shadows, Kodak Portra 400 film look. No people, no readable text on the mat.',
  },
  {
    slug: 'reverse',
    category: 'programs',
    prompt: 'Editorial documentary photograph of a single empty wooden rocking chair on a wide covered front porch at sunset, a folded wool blanket draped over one arm of the chair, the chair facing out toward a soft focus garden, late golden hour sunlight raking across the porch floorboards, deep navy porch railing visible at the edge, 35mm full-frame, shallow depth of field on the chair arm, color graded warm cream blanket and aged amber wood with deep navy shadows, Kodak Portra 400 film look. No people, no text.',
  },
  {
    slug: 'interest-only',
    category: 'programs',
    prompt: 'Editorial documentary still life photograph of a single vintage brass hourglass resting upright on a worn dark walnut desk, all the sand settled in the bottom chamber, a soft beam of golden afternoon window light raking across the brass frame from camera right, deep navy wall in soft focus behind, 35mm full-frame, very shallow depth of field on the brass detailing of the hourglass cap, color graded warm cream sand and aged brass with deep walnut shadow, Kodak Portra 400 film look. No people, no text.',
  },

  // ─── C. State-coverage headers (9) ─────────────────────────────────────
  {
    slug: 'massachusetts',
    category: 'states',
    prompt: 'Editorial documentary photograph of the exterior of a classic New England triple decker home, three stories of clapboard siding painted in cream and deep navy, weathered wooden porches stacked vertically, late afternoon golden hour sunlight raking across the facade, autumn maple leaves drifting in foreground, 35mm full-frame, shallow depth of field on the porch railing, color graded warm cream and deep navy with aged amber maple leaves, Kodak Portra 400 film look. No people, no text on the building.',
  },
  {
    slug: 'new-hampshire',
    category: 'states',
    prompt: 'Editorial documentary photograph of a winding rural New England road at peak autumn, sugar maples in deep red and warm amber lining both sides of the road, distant rolling hills visible in deep navy, low golden hour sunlight piercing through the foliage canopy from camera left, 35mm full-frame, shallow depth of field on the foreground maple branches, color graded warm amber and aged red with deep navy distant hills, Kodak Portra 400 film look. No people, no cars, no text.',
  },
  {
    slug: 'maine',
    category: 'states',
    prompt: 'Editorial documentary photograph of a single white New England style lighthouse at dusk, the lighthouse standing on a granite point overlooking calm ocean water, warm amber light glowing from the lantern room, soft fog rolling in low across the water, deep navy twilight sky above, a single windswept evergreen in the foreground, 35mm full-frame, shallow depth of field on the foreground evergreen, color graded warm cream lantern and deep navy fog, Kodak Portra 400 film look. No people, no boats, no text.',
  },
  {
    slug: 'rhode-island',
    category: 'states',
    prompt: 'Editorial documentary photograph of a single sailboat moored in a calm New England harbor at dusk, the boat silhouetted against soft amber afterglow on the water, distant coastline in deep navy silhouette, gentle ripples on the water surface catching warm light, 35mm full-frame, shallow depth of field on the sailboat mast, color graded warm cream water reflection and aged amber sky with deep navy silhouettes, Kodak Portra 400 film look. No people, no text.',
  },
  {
    slug: 'connecticut',
    category: 'states',
    prompt: 'Editorial documentary photograph of a classic Connecticut colonial home at golden hour, white clapboard siding, a deep navy front door, two columns flanking the entry, a stone wall with autumn ivy in the foreground, a quiet residential street with elm trees overhead, 35mm full-frame, shallow depth of field on the stone wall ivy, color graded warm cream clapboard and aged amber ivy with deep navy door, Kodak Portra 400 film look. No people, no cars, no text.',
  },
  {
    slug: 'vermont',
    category: 'states',
    prompt: 'Editorial documentary photograph of a single classic red covered bridge in Vermont autumn, the wooden bridge structure in deep barn red weathered tones spanning a clear shallow stream, sugar maples turning amber on either side, golden hour sunlight piercing through the bridge entrance casting long warm shadows on the water, 35mm full-frame, shallow depth of field on the bridge entrance, color graded warm cream water and aged amber maples with deep barn red bridge, Kodak Portra 400 film look. No people, no text.',
  },
  {
    slug: 'florida',
    category: 'states',
    prompt: 'Editorial documentary photograph of a residential Florida street at golden hour, tall palm trees lining both sides of the road, the warm late afternoon sun raking across the pavement casting long shadows, a low pastel stucco wall in the foreground with bougainvillea cascading over, 35mm full-frame, shallow depth of field on the bougainvillea, color graded warm cream stucco and aged amber palm fronds with deep navy shadows, Kodak Portra 400 film look. No people, no cars, no text.',
  },
  {
    slug: 'colorado',
    category: 'states',
    prompt: 'Editorial documentary photograph of a Colorado Front Range prairie at golden hour, tall waving native grasses in the foreground catching warm amber light, the Rocky Mountains deep navy silhouette stretching across the horizon, a single weathered wooden fence line cutting diagonally through the frame, 35mm full-frame, shallow depth of field on the foreground grasses, color graded warm cream sky and aged brass grass with deep navy mountains, Kodak Portra 400 film look. No people, no buildings, no text.',
  },
  {
    slug: 'texas',
    category: 'states',
    prompt: 'Editorial documentary photograph of the deep wraparound porch of a Texas hill country craftsman bungalow at sunset, a single empty wooden Adirondack chair angled toward the view, live oak branches dripping with Spanish moss framing the scene, warm Texas dusk light in deep amber, 35mm full-frame, shallow depth of field on the Adirondack chair arm, color graded warm cream and aged amber with deep navy moss shadow, Kodak Portra 400 film look. No people, no text.',
  },

  // ─── D. Main interior page headers (12) ────────────────────────────────
  {
    slug: 'services',
    category: 'pages',
    prompt: 'Editorial documentary still life photograph of a single antique brass mailbox mounted on a weathered wooden post, late afternoon golden hour sunlight raking across the brass casting long warm shadows on the post, soft focus deep navy clapboard wall in background, 35mm full-frame, very shallow depth of field on the mailbox flap, color graded warm cream highlight and aged brass with deep navy wall, Kodak Portra 400 film look. No people, no readable address numbers, no text.',
  },
  {
    slug: 'team',
    category: 'pages',
    prompt: 'Editorial documentary photograph of a single empty wooden chair beside a tall factory window with warm morning light streaming in, exposed brick wall visible to one side, weathered wooden floorboards, soft motes of dust catching the light, 35mm full-frame, shallow depth of field on the chair seat, color graded warm cream window light and aged brick with deep navy shadows, Kodak Portra 400 film look. No people, no text.',
  },
  {
    slug: 'partners',
    category: 'pages',
    prompt: 'Editorial documentary photograph of two empty wooden chairs facing each other across a small round wooden cafe table on a covered porch at golden hour, late afternoon sunlight raking across the porch floorboards casting long warm shadows, the chairs angled slightly toward each other in conversation, weathered cedar porch ceiling above, deep navy clapboard wall visible in soft focus background, autumn maple leaves drifting on the porch floor, 35mm full-frame, shallow depth of field on the table edge, color graded warm cream and aged amber wood with deep navy wall and aged brass details, Kodak Portra 400 film look. No people, no text, no signage.',
  },
  {
    slug: 'careers',
    category: 'pages',
    prompt: 'Editorial documentary photograph of a single empty wooden desk beside a tall factory window at dawn, an empty leather chair pushed in, soft early morning amber light streaming through the window, exposed brick wall behind, 35mm full-frame, shallow depth of field on the desk edge, color graded warm cream window light and aged brick with deep navy shadows, Kodak Portra 400 film look. No people, no objects on desk, no text.',
  },
  {
    slug: 'quiz',
    category: 'pages',
    prompt: 'Editorial documentary still life photograph of a single antique brass compass resting on a worn wooden surface, the compass needle clearly visible, late afternoon golden hour window light raking across the compass face from camera right casting a long warm shadow, 35mm full-frame, very shallow depth of field on the compass needle, color graded warm cream highlight and aged brass with deep navy shadow, Kodak Portra 400 film look. No people, no map underneath, no readable text on compass face.',
  },
  {
    slug: 'booking',
    category: 'pages',
    prompt: 'Editorial documentary still life photograph of an open leather bound day planner resting alone on a worn walnut desk, the pages blank cream paper, late afternoon golden hour window light raking across the open spread from camera right, deep walnut wood grain visible, 35mm full-frame, shallow depth of field on the spine of the planner, color graded warm cream paper and aged leather with deep walnut shadow, Kodak Portra 400 film look. No people, no pen, no readable text on pages.',
  },
  {
    slug: 'testimonials',
    category: 'pages',
    prompt: 'Editorial documentary still life photograph of a single polaroid style instant photograph leaning against a clear glass on a sunlit windowsill, the polaroid showing a soft focus image of a brass key on a porch, the photo within the photo only suggested, abstract, golden hour window light backlighting the polaroid, 35mm full-frame, very shallow depth of field on the polaroid border, color graded warm cream polaroid border and aged amber photo with deep navy shadow, Kodak Portra 400 film look. No people, no readable handwriting on the polaroid border.',
  },
  {
    slug: 'contact',
    category: 'pages',
    prompt: 'Editorial documentary still life photograph of a single vintage black rotary telephone resting on a sunlit wooden windowsill, morning amber light streaming through old factory window panes, the phone receiver resting in the cradle, 35mm full-frame, very shallow depth of field on the phone dial, color graded warm cream window light and deep navy phone with aged brass dial, Kodak Portra 400 film look. No people, no readable numbers on phone dial.',
  },
  {
    slug: 'faq',
    category: 'pages',
    prompt: 'Editorial documentary still life photograph of a single open hardcover book resting on the arm of a leather wingback chair, a brass reading lamp casting a warm pool of light over the open pages, deep walnut wood floor visible below the chair, soft golden hour light from a window beyond, 35mm full-frame, very shallow depth of field on the open page edge, color graded warm cream paper and aged leather with deep navy shadows, Kodak Portra 400 film look. No people, no readable text on the pages.',
  },
  {
    slug: 'blog',
    category: 'pages',
    prompt: 'Editorial documentary still life photograph of a single folded newspaper resting on a worn linen sofa cushion, a steaming ceramic mug of coffee on a small side table beside the sofa, late afternoon golden hour window light raking across the linen from camera left, 35mm full-frame, shallow depth of field on the newspaper fold, color graded warm cream linen and aged amber newspaper with deep navy shadows, Kodak Portra 400 film look. No people, no readable text on the newspaper.',
  },
  {
    slug: 'calculators',
    category: 'pages',
    prompt: 'Editorial documentary still life photograph of a single closed leather bound ledger book resting on a worn walnut desk, a brass paperweight resting on top of the ledger, late afternoon golden hour window light raking across the leather cover from camera right casting long warm shadows, 35mm full-frame, very shallow depth of field on the brass paperweight, color graded warm cream highlight and aged brass with deep walnut shadow, Kodak Portra 400 film look. No people, no readable text, no other objects.',
  },
  {
    slug: 'service-areas',
    category: 'pages',
    prompt: 'Editorial documentary still life photograph of a single rolled paper map tied with a length of brown twine, resting on a worn wooden desk, late afternoon golden hour window light raking across the paper roll from camera left casting long warm shadows, 35mm full-frame, very shallow depth of field on the twine knot, color graded warm cream paper and aged amber wood with deep navy shadows, Kodak Portra 400 film look. No people, no visible map content, no readable text.',
  },

  // ─── E. Calculator detail page headers (5) ─────────────────────────────
  {
    slug: 'affordability',
    category: 'calculators',
    prompt: 'Editorial documentary still life photograph of a single small stack of vintage copper and silver coins resting on a sunlit wooden windowsill, late afternoon golden hour light streaming through the window directly behind the coins, the coins catching the warm light on their edges, deep navy wall visible beyond, 35mm full-frame, very shallow depth of field on the top coin edge, color graded warm cream window light and aged copper with deep navy shadows, Kodak Portra 400 film look. No people, no readable text on coins, no other objects.',
  },
  {
    slug: 'monthly-payment',
    category: 'calculators',
    prompt: 'Editorial documentary still life photograph of a single closed cream colored hardcover notebook resting on a worn dark walnut desk, a single fountain pen lying diagonally across the notebook cover, late afternoon golden hour window light raking from camera right, 35mm full-frame, very shallow depth of field on the fountain pen nib, color graded warm cream notebook and aged brass pen with deep walnut shadow, Kodak Portra 400 film look. No people, no readable text on the notebook cover, no other objects.',
  },
  {
    slug: 'refinance',
    category: 'calculators',
    prompt: 'Editorial documentary still life photograph of a single open leather bound ledger book on a worn walnut desk, both visible pages blank cream paper, late afternoon golden hour window light raking across the open spread from camera left, deep walnut wood grain visible, 35mm full-frame, very shallow depth of field on the ledger spine, color graded warm cream paper and aged leather with deep walnut shadow, Kodak Portra 400 film look. No people, no pen, no readable text on the pages.',
  },
  {
    slug: 'down-payment',
    category: 'calculators',
    prompt: 'Editorial documentary still life photograph of a single clear glass mason jar partially filled with copper and silver coins, the jar resting on a sunlit wooden windowsill, late afternoon golden hour light streaming through the jar from behind casting warm refracted shadows on the windowsill, 35mm full-frame, very shallow depth of field on the coins inside the jar, color graded warm cream window light and aged copper with deep navy shadows in the jar interior, Kodak Portra 400 film look. No people, no readable labels, no other objects.',
  },
  {
    slug: 'dti',
    category: 'calculators',
    prompt: 'Editorial documentary still life photograph of a single antique brass kitchen scale weight resting on a worn wooden surface, late afternoon golden hour window light raking across the brass from camera right casting a long warm shadow, the brass weight polished surface catching highlights, deep navy wall in soft focus behind, 35mm full-frame, very shallow depth of field on the brass top of the weight, color graded warm cream highlight and aged brass with deep navy shadow, Kodak Portra 400 film look. No people, no readable engravings, no other objects.',
  },
];

// ---------------------------------------------------------------------------
// Generation
// ---------------------------------------------------------------------------

const SEEDS_FILE = 'scripts/image-seeds.json';

async function loadSeeds() {
  try {
    const raw = await readFile(SEEDS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function saveSeeds(seeds) {
  await writeFile(SEEDS_FILE, JSON.stringify(seeds, null, 2));
}

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function generateOne(p, seeds) {
  const outPath = `public/images/${p.category}/${p.slug}.jpg`;

  if (await fileExists(outPath)) {
    console.log(`  SKIP  ${outPath}  (exists)`);
    return { status: 'skipped' };
  }

  const t0 = Date.now();
  process.stdout.write(`  GEN   ${outPath}  ...`);

  try {
    const result = await fal.subscribe(MODEL, {
      input: {
        prompt: p.prompt,
        image_size: IMAGE_SIZE,
        num_inference_steps: STEPS,
        guidance_scale: GUIDANCE,
        negative_prompt: NEGATIVE_PROMPT,
        enable_safety_checker: false,
      },
      logs: false,
    });

    const imageUrl = result?.data?.images?.[0]?.url;
    const seed = result?.data?.seed;
    if (!imageUrl) {
      throw new Error(`no image URL in response: ${JSON.stringify(result?.data || {}).slice(0, 200)}`);
    }

    await mkdir(dirname(outPath), { recursive: true });
    const res = await fetch(imageUrl);
    if (!res.ok) throw new Error(`download failed: HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(outPath, buf);

    seeds[p.slug] = { seed, model: MODEL, timestamp: new Date().toISOString() };
    await saveSeeds(seeds);

    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
    const sizeKB = (buf.length / 1024).toFixed(0);
    process.stdout.write(`  ✓  seed=${seed}  ${elapsed}s  ${sizeKB}KB\n`);
    return { status: 'ok', seed };
  } catch (err) {
    process.stdout.write(`  ✗  ${err.message}\n`);
    return { status: 'failed', error: err.message };
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const arg = process.argv[2] || 'blog';
let targets;

if (arg === 'all') {
  targets = PROMPTS;
} else if (['blog', 'programs', 'states', 'pages', 'calculators'].includes(arg)) {
  targets = PROMPTS.filter(p => p.category === arg);
} else {
  // single slug
  targets = PROMPTS.filter(p => p.slug === arg);
  if (targets.length === 0) {
    console.error(`Unknown batch or slug: "${arg}"`);
    console.error('Valid batches: blog | programs | states | pages | calculators | all');
    console.error('Or pass a single slug, e.g. "fha"');
    process.exit(1);
  }
}

console.log(`\n  Phase 1H image generation`);
console.log(`  Batch: ${arg}  (${targets.length} image${targets.length === 1 ? '' : 's'})`);
console.log(`  Model: ${MODEL}  size=${IMAGE_SIZE}  steps=${STEPS}  guidance=${GUIDANCE}\n`);

const seeds = await loadSeeds();
const counts = { ok: 0, skipped: 0, failed: 0 };
const failures = [];

for (const p of targets) {
  const r = await generateOne(p, seeds);
  counts[r.status]++;
  if (r.status === 'failed') failures.push({ slug: p.slug, error: r.error });
}

console.log(`\n  Done.  ok=${counts.ok}  skipped=${counts.skipped}  failed=${counts.failed}`);
if (failures.length > 0) {
  console.log('\n  Failures:');
  for (const f of failures) console.log(`    ${f.slug}: ${f.error}`);
  process.exit(1);
}
