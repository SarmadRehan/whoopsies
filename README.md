# Whoopsie's: Landing Page Prototype

A demo site for Whoopsie's, a supper bar at 1 Moreland Ave SE in Reynoldstown, Atlanta. It is
built as a client prototype and is not the bar's official website; banners at the top and bottom
of the page say so. It is unlisted (`noindex`) and meant to be shared only with Whoopsie's.

Live demo: https://sarmadrehan.github.io/whoopsies/

## The main feature: Tonight's menu

Whoopsie's menu changes every night, so the page leads with a **Tonight's menu** section: cards for
the protein, sandwich, dessert and drink of the day.

- **Protein:** real. It follows their weekly schedule and shows tonight's protein for the current
  weekday in Atlanta time, with the whole week listed below the cards.
- **Sandwich, dessert and drink:** examples (marked "Example"), because they change nightly and
  aren't published anywhere.
- **Update tonight's menu** opens the phone-sized form the team would use to post the real ones.

In this demo the update is saved to the visitor's own browser only (`localStorage`, see
`src/lib/tonightStorage.ts`), so it can be tried without affecting anyone else, and "Back to the
default" clears it. A real launch would save it to a small backend behind a staff login so every
guest sees the same menu.

## Stack

- Next.js 15 (App Router) with static export (`output: "export"`)
- TypeScript (strict) and Tailwind CSS v4
- Fonts via `next/font`: DM Serif Display (display), Courier Prime (typewriter labels), Karla (body)
- Hosted on GitHub Pages from the `gh-pages` branch

## Project layout

```
src/
  app/            layout, page, global styles (palette, lamp glow, film grain), icons
  assets/images/  logo and photos, imported statically
  components/     one component per page section, plus the Tonight's menu editor dialog
  data/           bar.ts: contact details, hours, house notes, menu slots, example specials
  lib/            tonightStorage.ts: validates and stores the demo menu in the browser
```

All business content lives in `src/data/bar.ts`, with the source of each fact noted beside it.

## Content sources

Every fact comes from the verified table in the demo brief (checked 2026-10-23):

| Fact | Source |
| --- | --- |
| Name and tagline "Classic dinners, classy drinks" | Instagram bio @whooopsies_place |
| 1 Moreland Ave SE, Ste C, Atlanta, GA 30316 (Reynoldstown) | Google Maps, Michelin |
| Open 5pm to midnight every night | Instagram bio, Michelin, Google Maps |
| No reservations, "come as you are" | Instagram bio, Michelin |
| Dine-in and takeout, no delivery | Google Maps |
| Phone (404) 254-1279 | Eater Atlanta venue page, toast.app |
| Daily protein (prime rib Fridays and Saturdays), sandwich of the day, cold and hot dishes, snack tray, one dessert a day (often pecan pie) | Michelin Guide, Google Maps visitor update |
| Classic cocktails; a "drink of the day" posted on Instagram | The Infatuation, Instagram highlights |
| Vintage and thrift-store decor, dim lighting, about 40 seats | Atlanta Magazine |
| Instagram @whooopsies_place, Facebook page "Whoopsie's" | Google Maps, Facebook |

- **Weekly proteins**: the "PROTEIN" menu board pinned on their Instagram (posted Nov 2024; prices
  left off): Sunday fish, Monday crispy chicken thighs, Wednesday vegetarian, Thursday pork chop,
  Friday and Saturday prime rib. Tuesday is oxtail, from their "Oxtail Tuesdays are now a thing"
  post (Oct 6, 2026), which replaced the board's blue plate. Michelin also names prime rib.
- **Example specials**: po'boy, pecan pie and Improved Japanese Slipper. Each one is named in a Whoopsie's Instagram
  caption and matches its card photo. The Manhattan and Cosmopolitan in "The Regulars" are from the
  dishes named on Google Maps.
- **Hours**: OpenStreetMap still lists older hours (Monday 9am–midnight, closed Tuesday and
  Wednesday). The brief's three current sources agree on 5pm–midnight daily, so the page uses those.
- **Photos** (`src/assets/images/`): only from Whoopsie's own Instagram posts, captured for the demo
  (no customer photos). Most are credited in the captions to @post_neopet. The po'boy is cropped from
  the supper-spread photo. Swap in originals from the bar before any real launch.
- **Logo**: their Instagram profile picture, masked to its circle.

No prices, star ratings, review quotes, testimonials or Michelin logo are shown. The map embeds the
street address rather than the business, so Google's rating card stays off the page.

## Development

```bash
npm ci
npm run dev       # http://localhost:3000
npm run lint
npm run build     # static site in ./out
npm run preview   # serve ./out locally
```

## Deployment (GitHub Pages)

```bash
npm run deploy
```

This builds with `NEXT_PUBLIC_BASE_PATH=/whoopsies` (the Pages project path), adds `.nojekyll` so
the `_next/` folder is served, and pushes `./out` to the `gh-pages` branch. If the repository is
renamed, update the base path in the `deploy` script.

## Notes

- Colors are Whoopsie's brand colors only, sampled from their logo: navy `#000030`, cobalt
  `#0070D0` and white, plus tints of them (`src/app/globals.css`). The logo cobalt is used for fills
  with white text; small text on navy uses a lighter cobalt tint to meet WCAG AA contrast.
- The page is marked `noindex` so the demo never competes with the bar's own listings.
- The weekday above Tonight's menu and the "Updated" time use Atlanta time (`America/New_York`),
  not the visitor's clock.
