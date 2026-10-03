# Loader and hero verification — 2026-10-03

Validated in Chrome on macOS against the Vite development server and the local
production build (`npm run build`, then `npm run preview`). No production deploy
was performed.

## Findings and fixes

- The old entrance had a 350 ms font cutoff and never waited for WebGL. Cold
  fonts could reduce it to a 200 ms fade. Initial HTML now includes a branded
  loader, and the entrance waits for decoded static artwork or a rendered,
  correctly sized scene. Cached visits retain a 650 ms minimum loader period.
- The desktop/tablet fallback uses a different crop from the scene. It no longer
  appears while a scene is pending, nor replaces it during routine refreshes.
  A 6-second initialization budget commits to the fallback and disposes late
  scene attempts. Independent intro/HTML deadlines release the page on failure.
- Browser measurements caught a 1920 → 1910 pixel width change when lazy content
  introduced a scrollbar. Reserving the gutter stabilizes the initial canvas.
- The initial ResizeObserver notification caused an unnecessary second refresh.
  Unchanged dimensions are now ignored; real resize refreshes follow the SDK's
  own debounce. Dimensions and texture/plane readiness are checked before reveal.
- Repeated Back navigation exposed clipped text after animation cleanup.
  Keeping the individual animated text layers composited resolved it. This was
  retested in the production build after a parent-only layer fix proved insufficient.

## Browser checks

| Scenario | Observed result |
| --- | --- |
| Repeated desktop cold and warm refreshes | Loader observed; no early artwork reveal or canvas dimension mismatch after the gutter fix |
| Production cold refresh | Scene ready around 0.93 s; loader starts dismissal around 1.01 s; entrance complete around 3.60 s |
| Cold production, 150 ms latency / 200 KB/s download | Scene ready around 5.67 s; loader waits; short entrance completes around 5.92 s |
| Unicorn SDK request blocked | Stable fallback around 6.30 s; entrance completes around 8.95 s; loader does not stick |
| 390 × 844 mobile, cold and warm | Decoded static artwork; loader appears on each refresh; no WebGL requested for mobile |
| Reduced-motion mobile | Loader still appears; no cinematic entrance; page released around 0.96 s |
| 820 × 1180 tablet | Live scene ready before reveal; final composition inspected visually |
| Tablet → 1440 × 900 desktop → 1280 × 800 desktop | Scene dimensions match the available 1430 × 900 and 1270 × 800 areas; poster remains hidden once live |
| Menu → browser Back, repeated | Hero and text intact after final compositing fix; correct canvas size and restored navigation |
| Direct `#menu` refresh | Loader appears; menu retains its landing position (81 px below viewport top); navigation restored |
| Leave document for a local image, then Back | Fresh loader on browser reload; returns to `#menu` with settled artwork and usable navigation |

`hero-browser-probe.js` samples the initial reveal on animation frames. Run it
immediately after reloading the development site from DevTools:

```js
await (await import('/tests/hero-browser-probe.js')).observeHero()
```

The automated Node tests cover incomplete textures, failed textures, lost WebGL
contexts, dimensions, resize notifications, bounded retries, late resolutions,
cleanup, and readiness when a breakpoint replaces the artwork node.

## Limits

Responsive viewports were emulated in desktop Chrome. Safari, Firefox, physical
mobile GPUs, and an actual back/forward-cache restoration were not verified
(the cross-document return tested here reloaded). Timings are observations from
this machine, not performance guarantees. The live domain still needs deployment
before it receives these changes.
