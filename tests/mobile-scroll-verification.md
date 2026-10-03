# Mobile scrolling verification — 2026-10-03

## Cause and fix

`Menu` forwarded every window resize to `mamarosa:layout-change`, which forced
`FoodJourney` to refresh its pin. Mobile browser toolbar movement can emit those
resizes during a swipe, bypassing the existing `ignoreMobileResize` setting.
The menu now relies on its ResizeObserver for actual content/width changes.
See [GSAP's mobile resize guidance](https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.config()/).

The homepage intro now ends on a passive touchmove instead of cancelling the
gesture. The initial About anchor also releases on touchstart, including when
a browser does not emit a pointerdown for that interaction.

No CSS, markup, artwork, animation timings, or dependencies changed.

## Checks

Chrome desktop with mobile metrics and touch emulation, local Vite server:

- At 390 × 844, dispatch six resize events 100 ms apart while within the pinned
  story. Before: six layout-change events and six ScrollTrigger refreshes.
  After: zero of each; scroll position remained at 2743 px.
- Native synthesized touch gestures advanced through the story chapters and
  unpinned into About. Screenshots retained the existing compositions.
- Dispatch a cancelable touchmove while the intro is playing: intro completed
  immediately and the event was not cancelled.
- Switching Broodjes to Soepen and back, then expanding a dish, still updated
  the pin start to within one pixel of its measured document position.
- At 320 × 568, direct #about navigation landed correctly; touchstart followed
  by a 300 px scroll remained 300 px below the landing instead of snapping back.
- At 844 × 390 landscape, the existing unpinned layout remained readable.
- At 390 × 844 with reduced motion, the existing unpinned layout remained active.
- At 1440 × 900 desktop, #menu landed at 81 px and the pin matched its measured
  document position. No application console errors were reported.
- No horizontal document overflow at the checked phone, landscape, or desktop sizes.
- `npm run lint`, all eight existing Node tests, `npm run build`, and
  `git diff --check` passed.

These checks reproduce resize notifications and touch input in desktop Chrome;
they do not emulate Safari's actual browser toolbar or physical-device momentum.
A physical iPhone/Safari check remains useful. No production deployment was made.
