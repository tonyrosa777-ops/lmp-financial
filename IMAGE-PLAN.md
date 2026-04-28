# IMAGE-PLAN.md — Phase 1H fal.ai Generation Plan (REVISED)

**Generated:** 2026-04-27 (revised)
**Spec source:** CLAUDE.md Image Generation Rule + design-system.md §6 (Photography & Media Direction)
**Status:** FAL_KEY in `.env.local`. All 38 prompts revised for fal.ai reliability — simpler single-subject compositions that flux generates cleanly.

---

## What changed in this revision

**Removed risky composition patterns** that flux struggles with:
- ❌ Multi-subject grids ("9 objects in 3x3 flat-lay", "wall of polaroids", "row of 4 mugs")
- ❌ Hands and partial human bodies ("forearm only, no face" — face risk too high)
- ❌ Specific landmarks ("Boott Mills brickwork", "Portland Head Light" — flux doesn't know these)
- ❌ Mid-motion captures ("metronome mid-swing", "weather vane mid-rotation", "sand mid-flow")
- ❌ Specific object counts ("8 folders", "3 magazines", "9 thumbtacks")
- ❌ Two-subject comparisons ("two doors stereo")
- ❌ Stereo / split-frame compositions

**Replaced with reliable composition patterns:**
- ✅ Single iconic subject per image (one door, one chair, one map, one barn)
- ✅ Architectural exteriors (no people)
- ✅ Wide atmospheric landscapes
- ✅ Texture + material close-ups
- ✅ Empty environments at golden hour (porch, desk, window — no humans)
- ✅ Generic regional types ("New England covered bridge" not "specific Vermont bridge")

Result: 38 prompts that hold the editorial-financial-services aesthetic per design-system.md §6 while staying within flux's generation comfort zone. Each still tells a distinct visual story.

---

## Constraints (unchanged from CLAUDE.md Image Generation Rule)

- **No people anywhere.** No portraits, no faces, no hands, no partial bodies. Spaces and objects only.
- **No readable text.** AI image models produce garbled characters. Any "document" or "sign" must be visually suggested without legible text — for safety, prompts now mostly omit documents entirely.
- **Each prompt distinct.** No two share a primary subject, setting, or atmosphere combination.
- **Visual review before commit.** Inspect every generated image. Regenerate if: garbled text artifacts, deformed objects, accidental face/figure rendering, mood mismatch.
- **Mood per design-system.md §6:** golden hour, late afternoon, soft window light. Warm tonal grade with pulled highlights and lifted shadows. 35mm full-frame look. Editorial documentary style. Kodak Portra 400 reference. Color palette of warm cream, deep navy, aged brass — no neon, no saturated colors.

## Forbidden subjects (CLAUDE.md anti-patterns, reinforced)

- Stock-photo couples / families holding keys
- Stock-photo handshakes in suits
- Glassy CGI 3D house renders
- Aerial drone shots of generic suburbia
- Smiling-businesswoman-with-headset call-center imagery

---

## fal.ai model + parameters

- **Model:** `fal-ai/flux-pro/v1.1` (highest reliability + quality). Fall back to `fal-ai/flux/dev` if pro is unavailable.
- **Aspect ratio:** 16:9 (1792×1024 native — flux supports this directly via `image_size: "landscape_16_9"`).
- **Negative prompt (consistent across all):** `text, words, letters, numbers, signage, logos, watermarks, faces, people, hands, fingers, smiling, person, human figure, cgi, 3d render, harsh sunlight, neon colors, oversaturated, stock photo, illustration, cartoon, drawing, painting, deformed, blurry, low quality`
- **Inference steps:** 28 (flux-pro default).
- **Guidance scale:** 3.5 (flux-pro default — higher values force prompt adherence at cost of naturalism; 3.5 keeps photographs photographic).
- **Seed:** logged per image for reproducibility.

Total estimated cost: **~$8–12 for 38 images at flux-pro v1.1**.

---

## File output convention (unchanged)

```
/public/images/
  /blog/         (3 files)
  /programs/     (9 files)
  /states/       (9 files)
  /pages/        (12 files)
  /calculators/  (5 files)
```

All images compressed JPG @ 85% quality, ~150–300KB target file size.

---

## Prompt set (38 prompts — all simplified for flux reliability)

### A. Blog article headers (3)

**A1. fha-vs-conventional-nh.jpg** — entry-level homeownership in NH
> Editorial documentary photograph of a single classic New Hampshire farmhouse front door, painted deep navy with a polished brass doorknob and brass kick plate, the door framed by white clapboard siding, autumn maple leaves scattered on the entry stoop, soft golden hour sunlight raking across the door from camera left, 35mm full-frame, shallow depth of field on the brass doorknob, color graded warm cream clapboard and aged brass with deep navy door, Kodak Portra 400 film look, photographed on medium format. No people, no text, no signage.

**A2. masshousing-30k-down-payment-assistance.jpg** — keys to a Massachusetts home
> Editorial documentary still life photograph of a single antique brass house key resting on a worn cream linen surface, golden afternoon window light raking from camera right casting a long warm shadow, soft fabric texture visible, 35mm full-frame, very shallow depth of field on the key's brass teeth, color graded warm cream linen and aged brass with deep navy in the shadow, Kodak Portra 400 film look. No people, no text, no other objects.

**A3. wholesale-vs-retail-mortgage.jpg** — closed deal portfolio
> Editorial documentary still life photograph of a single closed brown leather portfolio resting on a worn dark walnut desk, a soft beam of golden afternoon light raking across the leather grain texture, brass corner protectors catching the warm light, 35mm full-frame, very shallow depth of field on the leather grain, color graded warm cream highlight and aged brass with deep walnut shadow, Kodak Portra 400 film look. No people, no text, no other objects on the desk.

---

### B. Loan program headers (9)

**B1. fixed-rate.jpg** — steady architectural permanence
> Editorial documentary photograph of a single tall white classical column on the front porch of a New England colonial home, low golden afternoon sunlight raking up the column casting long warm shadows, weathered porch floorboards visible at the base, deep navy shadow against the porch wall, 35mm full-frame, shallow depth of field on the column base, color graded warm cream column and aged amber wood with deep navy shadow, Kodak Portra 400 film look. No people, no text.

**B2. fha.jpg** — first front door
> Editorial documentary photograph of a freshly painted cream-colored front door of a small starter home, a polished brass doorknob centered, a clean fiber doormat below the door, late afternoon golden hour sunlight streaming from camera right casting a warm gradient on the door, soft pastel siding visible at edges, 35mm full-frame, shallow depth of field on the doorknob, color graded warm cream and aged brass, Kodak Portra 400 film look. No people, no text, no house numbers.

**B3. va.jpg** — flag on a porch
> Editorial documentary photograph of a single American flag mounted on a wooden front porch, the flag gently rippling in evening breeze, late afternoon golden hour sunlight lighting the lower stripes, the porch railing in deep navy shadow, weathered cedar wood porch ceiling above, 35mm full-frame, shallow depth of field on the flag fabric, color graded warm cream stripes and aged amber wood with deep navy shadows, Kodak Portra 400 film look. No people, no text on flag.

**B4. jumbo.jpg** — coastal estate at dusk
> Editorial documentary photograph of the exterior of a large coastal New England shingle-style home at twilight, the home seen from a respectful distance across a manicured lawn, multiple windows glowing warm amber from inside, deep navy twilight sky above, a single ornamental tree in the foreground silhouette, 35mm full-frame, shallow depth of field on the foreground tree, color graded deep navy sky and warm cream window glow with aged amber facade, Kodak Portra 400 film look. No people, no cars, no text.

**B5. arm.jpg** — porch swing at rest
> Editorial documentary photograph of a single empty wooden porch swing hanging from a covered porch ceiling, the swing motionless, late afternoon golden hour sunlight slanting across the wooden floorboards from camera left, a soft cream wool blanket draped over one corner of the swing, deep navy porch wall behind, 35mm full-frame, shallow depth of field on the chain links of the swing, color graded warm cream blanket and aged amber wood with deep navy wall, Kodak Portra 400 film look. No people, no text.

**B6. usda.jpg** — rural barn at sunrise
> Editorial documentary photograph of a single classic red barn standing alone in a wide cleared field at sunrise, soft mist hovering low across the grass, the barn lit warmly on its eastern face, a winding gravel road leading toward the barn from foreground, distant tree line in deep navy silhouette, 35mm full-frame, shallow depth of field on the foreground gravel, color graded warm cream mist and aged barn-red with deep navy shadows, Kodak Portra 400 film look. No people, no farm equipment, no text.

**B7. first-time-buyer.jpg** — welcome mat
> Editorial documentary still life photograph of a single new fiber doormat resting on a freshly painted cream wooden porch step, a small terracotta potted plant placed beside it, golden hour sunlight raking across the porch from camera right casting long warm shadows, weathered porch floorboards visible, 35mm full-frame, shallow depth of field on the doormat texture, color graded warm cream porch and aged terracotta with deep navy shadows, Kodak Portra 400 film look. No people, no readable text on the mat.

**B8. reverse.jpg** — empty rocking chair at sunset
> Editorial documentary photograph of a single empty wooden rocking chair on a wide covered front porch at sunset, a folded wool blanket draped over one arm of the chair, the chair facing out toward a soft-focus garden, late golden hour sunlight raking across the porch floorboards, deep navy porch railing visible at the edge, 35mm full-frame, shallow depth of field on the chair arm, color graded warm cream blanket and aged amber wood with deep navy shadows, Kodak Portra 400 film look. No people, no text.

**B9. interest-only.jpg** — hourglass at rest
> Editorial documentary still life photograph of a single vintage brass hourglass resting upright on a worn dark walnut desk, all the sand settled in the bottom chamber, a soft beam of golden afternoon window light raking across the brass frame from camera right, deep navy wall in soft focus behind, 35mm full-frame, very shallow depth of field on the brass detailing of the hourglass cap, color graded warm cream sand and aged brass with deep walnut shadow, Kodak Portra 400 film look. No people, no text.

---

### C. State-coverage headers (9)

**C1. massachusetts.jpg** — New England triple-decker detail
> Editorial documentary photograph of the exterior of a classic New England triple-decker home, three stories of clapboard siding painted in cream and deep navy, weathered wooden porches stacked vertically, late afternoon golden hour sunlight raking across the facade, autumn maple leaves drifting in foreground, 35mm full-frame, shallow depth of field on the porch railing, color graded warm cream and deep navy with aged amber maple leaves, Kodak Portra 400 film look. No people, no text on the building.

**C2. new-hampshire.jpg** — autumn rural road
> Editorial documentary photograph of a winding rural New England road at peak autumn, sugar maples in deep red and warm amber lining both sides of the road, distant rolling hills visible in deep navy, low golden hour sunlight piercing through the foliage canopy from camera left, 35mm full-frame, shallow depth of field on the foreground maple branches, color graded warm amber and aged red with deep navy distant hills, Kodak Portra 400 film look. No people, no cars, no text.

**C3. maine.jpg** — coastal lighthouse silhouette
> Editorial documentary photograph of a single white New England-style lighthouse at dusk, the lighthouse standing on a granite point overlooking calm ocean water, warm amber light glowing from the lantern room, soft fog rolling in low across the water, deep navy twilight sky above, a single windswept evergreen in the foreground, 35mm full-frame, shallow depth of field on the foreground evergreen, color graded warm cream lantern and deep navy fog, Kodak Portra 400 film look. No people, no boats, no text.

**C4. rhode-island.jpg** — calm harbor at dusk
> Editorial documentary photograph of a single sailboat moored in a calm New England harbor at dusk, the boat silhouetted against soft amber afterglow on the water, distant coastline in deep navy silhouette, gentle ripples on the water surface catching warm light, 35mm full-frame, shallow depth of field on the sailboat mast, color graded warm cream water reflection and aged amber sky with deep navy silhouettes, Kodak Portra 400 film look. No people, no text.

**C5. connecticut.jpg** — colonial home exterior
> Editorial documentary photograph of a classic Connecticut colonial home at golden hour, white clapboard siding, a deep navy front door, two columns flanking the entry, a stone wall with autumn ivy in the foreground, a quiet residential street with elm trees overhead, 35mm full-frame, shallow depth of field on the stone wall ivy, color graded warm cream clapboard and aged amber ivy with deep navy door, Kodak Portra 400 film look. No people, no cars, no text.

**C6. vermont.jpg** — covered bridge in autumn
> Editorial documentary photograph of a single classic red covered bridge in Vermont autumn, the wooden bridge structure in deep barn-red weathered tones spanning a clear shallow stream, sugar maples turning amber on either side, golden hour sunlight piercing through the bridge entrance casting long warm shadows on the water, 35mm full-frame, shallow depth of field on the bridge entrance, color graded warm cream water and aged amber maples with deep barn-red bridge, Kodak Portra 400 film look. No people, no text.

**C7. florida.jpg** — palm-lined coastal street
> Editorial documentary photograph of a residential Florida street at golden hour, tall palm trees lining both sides of the road, the warm late-afternoon sun raking across the pavement casting long shadows, a low pastel stucco wall in the foreground with bougainvillea cascading over, 35mm full-frame, shallow depth of field on the bougainvillea, color graded warm cream stucco and aged amber palm fronds with deep navy shadows, Kodak Portra 400 film look. No people, no cars, no text.

**C8. colorado.jpg** — Front Range prairie
> Editorial documentary photograph of a Colorado Front Range prairie at golden hour, tall waving native grasses in the foreground catching warm amber light, the Rocky Mountains' deep-navy silhouette stretching across the horizon, a single weathered wooden fence line cutting diagonally through the frame, 35mm full-frame, shallow depth of field on the foreground grasses, color graded warm cream sky and aged brass grass with deep navy mountains, Kodak Portra 400 film look. No people, no buildings, no text.

**C9. texas.jpg** — hill country bungalow porch
> Editorial documentary photograph of the deep wraparound porch of a Texas hill country craftsman bungalow at sunset, a single empty wooden Adirondack chair angled toward the view, live oak branches dripping with Spanish moss framing the scene, warm Texas dusk light in deep amber, 35mm full-frame, shallow depth of field on the Adirondack chair arm, color graded warm cream and aged amber with deep navy moss shadow, Kodak Portra 400 film look. No people, no text.

---

### D. Main interior page headers (12)

**D1. services.jpg** — single brass mailbox
> Editorial documentary still life photograph of a single antique brass mailbox mounted on a weathered wooden post, late afternoon golden hour sunlight raking across the brass casting long warm shadows on the post, soft-focus deep navy clapboard wall in background, 35mm full-frame, very shallow depth of field on the mailbox flap, color graded warm cream highlight and aged brass with deep navy wall, Kodak Portra 400 film look. No people, no readable address numbers, no text.

**D2. team.jpg** — sunlit empty chair by window
> Editorial documentary photograph of a single empty wooden chair beside a tall factory window with warm morning light streaming in, exposed brick wall visible to one side, weathered wooden floorboards, soft motes of dust catching the light, 35mm full-frame, shallow depth of field on the chair seat, color graded warm cream window light and aged brick with deep navy shadows, Kodak Portra 400 film look. No people, no text.

**D3. partners.jpg** — two coffee cups at golden hour
> Editorial documentary still life photograph of two simple ceramic coffee cups resting on a worn wooden table, soft steam rising from one, late afternoon golden hour sunlight raking across the table from camera right casting long warm shadows, deep navy wall in soft focus behind, 35mm full-frame, shallow depth of field on the closer cup rim, color graded warm cream ceramic and aged amber wood with deep navy shadow, Kodak Portra 400 film look. No people, no hands, no text.

**D4. careers.jpg** — empty desk at dawn
> Editorial documentary photograph of a single empty wooden desk beside a tall factory window at dawn, an empty leather chair pushed in, soft early-morning amber light streaming through the window, exposed brick wall behind, 35mm full-frame, shallow depth of field on the desk edge, color graded warm cream window light and aged brick with deep navy shadows, Kodak Portra 400 film look. No people, no objects on desk, no text.

**D5. quiz.jpg** — antique compass
> Editorial documentary still life photograph of a single antique brass compass resting on a worn wooden surface, the compass needle clearly visible, late afternoon golden hour window light raking across the compass face from camera right casting a long warm shadow, 35mm full-frame, very shallow depth of field on the compass needle, color graded warm cream highlight and aged brass with deep navy shadow, Kodak Portra 400 film look. No people, no map underneath, no readable text on compass face.

**D6. booking.jpg** — open day planner
> Editorial documentary still life photograph of an open leather-bound day planner resting alone on a worn walnut desk, the pages blank cream paper, late afternoon golden hour window light raking across the open spread from camera right, deep walnut wood grain visible, 35mm full-frame, shallow depth of field on the spine of the planner, color graded warm cream paper and aged leather with deep walnut shadow, Kodak Portra 400 film look. No people, no pen, no readable text on pages.

**D7. testimonials.jpg** — single polaroid of a key
> Editorial documentary still life photograph of a single polaroid-style instant photograph leaning against a clear glass on a sunlit windowsill, the polaroid showing a soft-focus image of a brass key on a porch — the photo within the photo only suggested, abstract — golden hour window light backlighting the polaroid, 35mm full-frame, very shallow depth of field on the polaroid border, color graded warm cream polaroid border and aged amber photo with deep navy shadow, Kodak Portra 400 film look. No people, no readable handwriting on the polaroid border.

**D8. contact.jpg** — vintage rotary phone in window light
> Editorial documentary still life photograph of a single vintage black rotary telephone resting on a sunlit wooden windowsill, morning amber light streaming through old factory window panes, the phone receiver resting in the cradle, 35mm full-frame, very shallow depth of field on the phone dial, color graded warm cream window light and deep navy phone with aged brass dial, Kodak Portra 400 film look. No people, no readable numbers on phone dial (numerals abstracted).

**D9. faq.jpg** — open book on chair arm
> Editorial documentary still life photograph of a single open hardcover book resting on the arm of a leather wingback chair, a brass reading lamp casting a warm pool of light over the open pages, deep walnut wood floor visible below the chair, soft golden hour light from a window beyond, 35mm full-frame, very shallow depth of field on the open page edge, color graded warm cream paper and aged leather with deep navy shadows, Kodak Portra 400 film look. No people, no readable text on the pages.

**D10. blog.jpg** — folded newspaper on linen sofa
> Editorial documentary still life photograph of a single folded newspaper resting on a worn linen sofa cushion, a steaming ceramic mug of coffee on a small side table beside the sofa, late afternoon golden hour window light raking across the linen from camera left, 35mm full-frame, shallow depth of field on the newspaper fold, color graded warm cream linen and aged amber newspaper with deep navy shadows, Kodak Portra 400 film look. No people, no readable text on the newspaper.

**D11. calculators.jpg** — leather ledger book
> Editorial documentary still life photograph of a single closed leather-bound ledger book resting on a worn walnut desk, a brass paperweight resting on top of the ledger, late afternoon golden hour window light raking across the leather cover from camera right casting long warm shadows, 35mm full-frame, very shallow depth of field on the brass paperweight, color graded warm cream highlight and aged brass with deep walnut shadow, Kodak Portra 400 film look. No people, no readable text, no other objects.

**D12. service-areas.jpg** — rolled paper map
> Editorial documentary still life photograph of a single rolled paper map tied with a length of brown twine, resting on a worn wooden desk, late afternoon golden hour window light raking across the paper roll from camera left casting long warm shadows, 35mm full-frame, very shallow depth of field on the twine knot, color graded warm cream paper and aged amber wood with deep navy shadows, Kodak Portra 400 film look. No people, no visible map content, no readable text.

---

### E. Calculator detail page headers (5)

**E1. affordability.jpg** — coins on a windowsill
> Editorial documentary still life photograph of a single small stack of vintage copper and silver coins resting on a sunlit wooden windowsill, late afternoon golden hour light streaming through the window directly behind the coins, the coins catching the warm light on their edges, deep navy wall visible beyond, 35mm full-frame, very shallow depth of field on the top coin edge, color graded warm cream window light and aged copper with deep navy shadows, Kodak Portra 400 film look. No people, no readable text on coins, no other objects.

**E2. monthly-payment.jpg** — closed notebook with fountain pen
> Editorial documentary still life photograph of a single closed cream-colored hardcover notebook resting on a worn dark walnut desk, a single fountain pen lying diagonally across the notebook cover, late afternoon golden hour window light raking from camera right, 35mm full-frame, very shallow depth of field on the fountain pen nib, color graded warm cream notebook and aged brass pen with deep walnut shadow, Kodak Portra 400 film look. No people, no readable text on the notebook cover, no other objects.

**E3. refinance.jpg** — single open ledger
> Editorial documentary still life photograph of a single open leather-bound ledger book on a worn walnut desk, both visible pages blank cream paper, late afternoon golden hour window light raking across the open spread from camera left, deep walnut wood grain visible, 35mm full-frame, very shallow depth of field on the ledger spine, color graded warm cream paper and aged leather with deep walnut shadow, Kodak Portra 400 film look. No people, no pen, no readable text on the pages.

**E4. down-payment.jpg** — mason jar with coins
> Editorial documentary still life photograph of a single clear glass mason jar partially filled with copper and silver coins, the jar resting on a sunlit wooden windowsill, late afternoon golden hour light streaming through the jar from behind casting warm refracted shadows on the windowsill, 35mm full-frame, very shallow depth of field on the coins inside the jar, color graded warm cream window light and aged copper with deep navy shadows in the jar's interior, Kodak Portra 400 film look. No people, no readable labels, no other objects.

**E5. dti.jpg** — single brass scale weight
> Editorial documentary still life photograph of a single antique brass kitchen scale weight resting on a worn wooden surface, late afternoon golden hour window light raking across the brass from camera right casting a long warm shadow, the brass weight's polished surface catching highlights, deep navy wall in soft focus behind, 35mm full-frame, very shallow depth of field on the brass top of the weight, color graded warm cream highlight and aged brass with deep navy shadow, Kodak Portra 400 film look. No people, no readable engravings, no other objects.

---

## Uniqueness audit (revised set)

Each prompt is anchored on a **distinct primary subject**. Subjects across the 38 prompts:

| # | Slug | Primary subject |
|---|---|---|
| A1 | fha-vs-conventional-nh | NH farmhouse front door |
| A2 | masshousing-30k | Single brass key on linen |
| A3 | wholesale-vs-retail | Closed leather portfolio |
| B1 | fixed-rate | Classical column |
| B2 | fha | Cream front door + brass knob |
| B3 | va | Flag on wooden porch |
| B4 | jumbo | Coastal estate at twilight |
| B5 | arm | Empty wooden porch swing |
| B6 | usda | Red barn in cleared field at sunrise |
| B7 | first-time-buyer | Doormat + terracotta plant |
| B8 | reverse | Empty rocking chair |
| B9 | interest-only | Brass hourglass at rest |
| C1 | massachusetts | Triple-decker exterior |
| C2 | new-hampshire | Rural autumn road |
| C3 | maine | Lighthouse + fog at dusk |
| C4 | rhode-island | Sailboat in calm harbor |
| C5 | connecticut | Colonial home + stone wall |
| C6 | vermont | Red covered bridge |
| C7 | florida | Palm-lined street + bougainvillea |
| C8 | colorado | Prairie + Rockies silhouette |
| C9 | texas | Hill country bungalow porch + Adirondack |
| D1 | /services | Antique brass mailbox |
| D2 | /team | Empty chair by factory window |
| D3 | /partners | Two ceramic coffee cups |
| D4 | /careers | Empty desk at dawn |
| D5 | /quiz | Antique brass compass |
| D6 | /booking | Open blank day planner |
| D7 | /testimonials | Single polaroid + glass |
| D8 | /contact | Vintage rotary phone |
| D9 | /faq | Open book on chair arm |
| D10 | /blog | Folded newspaper on linen sofa |
| D11 | /calculators | Closed leather ledger + brass paperweight |
| D12 | /service-areas | Rolled map tied with twine |
| E1 | affordability | Coin stack on windowsill |
| E2 | monthly-payment | Closed notebook + fountain pen |
| E3 | refinance | Open blank ledger |
| E4 | down-payment | Mason jar with coins |
| E5 | dti | Single brass scale weight |

### Adjacency-pair audit (resolved)

| Pair | Risk | Mitigation |
|---|---|---|
| B2 fha door + A1 NH door + C5 CT colonial door | All feature front doors | B2 is cream-painted small starter, A1 is deep-navy NH farmhouse, C5 is white clapboard with stone wall. Different palettes, different framings, different settings. Distinct. |
| B5 porch swing + B8 rocking chair | Both empty porch furniture | B5 is hanging swing with blanket, B8 is rocker with blanket — explicitly different chair types, different angles. Distinct enough; flag for visual review. |
| D6 open day planner + D11 closed ledger + E2 closed notebook + E3 open ledger | Four "book on desk" prompts | D6 is open planner with blank pages, D11 is closed ledger + brass paperweight, E2 is closed notebook with fountain pen, E3 is open ledger blank pages. Each has a different arrangement (open vs closed, with paperweight vs pen vs nothing). Acceptable but adjacent — visual review required. If 2 land too similar, regenerate one with a different surface (linen vs walnut) or angle. |
| E1 coin stack + E4 mason jar of coins | Both feature coins | E1 is a small stack on windowsill, E4 is coins inside a glass jar. Different containers, different scales. Distinct. |
| C2 NH road + C7 FL palm street | Both are roads with trees | C2 is cold autumn New England, C7 is warm tropical Florida. Different palettes (amber maples vs amber palms). Distinct. |
| B6 USDA barn + C-prefix landscapes | All wide rural scenes | B6 is a barn (architectural subject), C-prefix prompts each anchor on a different regional element (mountains, lighthouse, bridge, prairie, etc.). Distinct. |
| D5 compass + D6 day planner + E2 notebook | All "single object on wood desk" | D5 is round metallic compass, D6 is open paper planner, E2 is closed notebook with pen. Different shapes, materials, openness. Distinct enough; visual review required. |
| D11 closed ledger + E3 open ledger | Both ledger books | D11 is closed with paperweight, E3 is open blank — opposite states. Distinct. |

**The four "book on desk" prompts** (D6, D11, E2, E3) are the riskiest adjacency cluster. Mitigation: when generating, do them in different batches with deliberate seed variation. If any two land too similar in visual review, regenerate one with: different desk surface (linen, brick, terracotta tile), different lighting angle, or different secondary object. Worst case: 1-2 regenerations.

**Shared aesthetic across all 38** (intentional per design-system.md §6):
- Golden hour / late afternoon
- 35mm full-frame Kodak Portra 400 documentary look
- Color palette: warm cream, deep navy, aged brass
- No people / no faces / no readable text
- Single subject hero compositions

Same visual SONG. 38 different STORIES. None too complex for flux to render cleanly.

---

## Generation plan

1. Stage `scripts/generate-images.ts` — reads this plan, calls fal.ai's `fal-ai/flux-pro/v1.1` once per prompt, saves output JPGs to the conventional `/public/images/` paths, logs the seed for each.
2. Run in **5 batches** (one category per batch) to allow visual review between groups: blog (3) → programs (9) → states (9) → pages (12) → calculators (5).
3. After each batch: visual review every image. Regenerate any with: garbled text artifacts, deformed objects, accidental face/figure rendering, mood mismatch.
4. Once all 38 pass review, wire image references into the relevant pages:
   - Blog: update `seed-posts.json` `headerImage` field per article.
   - Loan-program pages, state pages, calculator pages, main interior pages: add `headerImage` constant per page or to `siteConfig`/`STATE_PROGRAMS` data.
5. Single atomic commit: `feat(images): generate and wire 38 unique fal.ai page + article headers`.
6. Push.

---

## What's NOT in this plan

- No people anywhere (per user instruction)
- No LO portraits, no Mike portrait, no team group photos
- No client/testimonial photos with people
- No staged "lifestyle" couple-with-keys imagery (CLAUDE.md anti-pattern)
- No legal page headers (text-heavy exception per design-system.md §14)
- No `/pricing` page header (Optimus internal sales tool)
- No homepage hero replacement (the 3-layer KeyringCanvas hero stays)
