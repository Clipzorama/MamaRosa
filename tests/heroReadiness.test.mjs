import test from "node:test";
import assert from "node:assert/strict";
import { waitForHero } from "../src/lib/heroReadiness.js";

test("loader follows replacement artwork when the viewport crosses a breakpoint", async (t) => {
  let notify;
  let disconnected = false;
  const original = globalThis.MutationObserver;
  globalThis.MutationObserver = class {
    constructor(callback) { notify = callback; }
    observe() {}
    disconnect() { disconnected = true; }
  };
  t.after(() => { if (original) globalThis.MutationObserver = original; else delete globalThis.MutationObserver; });
  let artwork = { dataset: { artworkState: "loading" } };
  const site = { querySelector: () => artwork };
  const controller = new AbortController();
  let completed = false;
  const ready = waitForHero(site, controller.signal).then(() => { completed = true; });
  notify();
  await Promise.resolve();
  assert.equal(completed, false);
  // The mobile/static node replaces a pending desktop canvas.
  artwork = { dataset: { artworkState: "fallback" } };
  notify();
  await ready;
  assert.equal(completed, true);
  assert.equal(disconnected, true);
});

test("aborting an intro releases a pending artwork observer", async (t) => {
  let disconnected = false;
  const original = globalThis.MutationObserver;
  globalThis.MutationObserver = class {
    observe() {}
    disconnect() { disconnected = true; }
  };
  t.after(() => { if (original) globalThis.MutationObserver = original; else delete globalThis.MutationObserver; });
  const controller = new AbortController();
  const ready = waitForHero({ querySelector: () => null }, controller.signal);
  controller.abort();
  await ready;
  assert.equal(disconnected, true);
});
