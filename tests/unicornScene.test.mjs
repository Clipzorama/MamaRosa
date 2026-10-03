import test from "node:test";
import assert from "node:assert/strict";
import { isSceneReady, isSceneSized, mountUnicornScene } from "../src/lib/unicornScene.js";

function readyScene() {
  const canvas = new EventTarget();
  Object.assign(canvas, { width: 100, height: 100 });
  return {
    initialized: true, destroyed: false, canvasWidth: 100, canvasHeight: 100,
    local: { preloadedImages: {} }, layers: [],
    curtain: { canvas, gl: { isContextLost: () => false }, planes: [{ userData: { isReady: true } }] },
    renderFrame() {}, refresh() {},
    destroy() { this.destroyed = true; },
  };
}

test("readiness waits for textures and drawable planes, including failed image downloads", () => {
  const scene = readyScene();
  scene.local.preloadedImages.photo = { loading: true, texture: null };
  assert.equal(isSceneReady(scene), false);
  scene.local.preloadedImages.photo.loading = false;
  assert.equal(isSceneReady(scene), false, "failed texture is not ready");
  scene.local.preloadedImages.photo.texture = {};
  scene.curtain.planes[0].userData.isReady = false;
  assert.equal(isSceneReady(scene), false);
  scene.curtain.planes[0].userData.isReady = true;
  assert.equal(isSceneReady(scene), true);
  scene.curtain.gl.isContextLost = () => true;
  assert.equal(isSceneReady(scene), false);
});

function environment(t) {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const hosts = [];
  const observers = [];
  const globals = {
    document: { createElement: () => ({
      clientWidth: 100, clientHeight: 100,
      remove() { this.removed = true; },
      getBoundingClientRect() { return { width: this.clientWidth, height: this.clientHeight, bottom: 100 }; },
    }) },
    requestAnimationFrame: (fn) => setTimeout(fn, 16), cancelAnimationFrame: clearTimeout,
    ResizeObserver: class { constructor(callback) { observers.push(callback); } observe() {} disconnect() {} },
    IntersectionObserver: class { observe() {} disconnect() {} },
  };
  for (const [key, value] of Object.entries(globals)) {
    const original = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, { configurable: true, value });
    t.after(() => original ? Object.defineProperty(globalThis, key, original) : delete globalThis[key]);
  }
  return { hosts, observers, container: { appendChild: (host) => hosts.push(host) } };
}
const flush = async () => { for (let n = 0; n < 8; n++) await Promise.resolve(); };

test("unmount destroys a late asynchronous scene without touching the replacement", async (t) => {
  const { container, hosts } = environment(t);
  let resolve;
  const first = readyScene();
  const second = readyScene();
  const loadSDK = async () => ({ addScene: () => new Promise((done) => { resolve = done; }) });
  const notifications = [];
  const stopFirst = mountUnicornScene(container, {}, (ready) => notifications.push(ready), { loadSDK });
  await flush();
  stopFirst();
  const stopSecond = mountUnicornScene(container, {}, () => {}, { loadSDK: async () => ({ addScene: async () => second }) });
  await flush();
  resolve(first);
  await flush();
  assert.equal(first.destroyed, true);
  assert.equal(second.destroyed, false);
  assert.equal(hosts[0].removed, true);
  assert.equal(hosts[1].removed, undefined);
  assert.deepEqual(notifications, []);
  stopSecond();
  assert.equal(second.destroyed, true);
});

test("hung scene creation retries once; late results are destroyed and fallback stays visible", async (t) => {
  const { container, hosts } = environment(t);
  const resolves = [];
  const notifications = [];
  const stop = mountUnicornScene(container, {}, (ready) => notifications.push(ready), {
    loadSDK: async () => ({ addScene: () => new Promise((resolve) => resolves.push(resolve)) }),
    attemptTimeout: 100, retryDelay: 10,
  });
  await flush();
  t.mock.timers.tick(100);
  t.mock.timers.tick(10);
  await flush();
  t.mock.timers.tick(100);
  t.mock.timers.tick(1000);
  await flush();
  assert.equal(resolves.length, 2);
  assert.deepEqual(notifications, [false, false]);
  assert.ok(hosts.every((host) => host.removed));
  for (const resolve of resolves) {
    const scene = readyScene();
    resolve(scene);
    await flush();
    assert.equal(scene.destroyed, true);
  }
  stop();
});

test("ready scene waits for paint; context loss restores fallback and cleanup cancels recovery", async (t) => {
  const { container } = environment(t);
  const scene = readyScene();
  const notifications = [];
  let loads = 0;
  const stop = mountUnicornScene(container, {}, (ready) => notifications.push(ready), {
    loadSDK: async () => { loads++; return { addScene: async () => scene }; },
  });
  await flush();
  assert.deepEqual(notifications, []);
  t.mock.timers.tick(0);
  t.mock.timers.tick(16);
  t.mock.timers.tick(16);
  assert.deepEqual(notifications, [true]);
  scene.curtain.canvas.dispatchEvent(new Event("webglcontextlost"));
  assert.deepEqual(notifications, [true, false]);
  assert.equal(scene.destroyed, true);
  stop();
  t.mock.timers.tick(20000);
  await flush();
  assert.equal(loads, 1);
});

test("scene dimensions must match the host before the first reveal", async (t) => {
  const { container, hosts } = environment(t);
  const scene = readyScene();
  scene.canvasWidth = 50;
  const notifications = [];
  const stop = mountUnicornScene(container, {}, (ready) => notifications.push(ready), {
    loadSDK: async () => ({ addScene: async () => scene }),
  });
  await flush();
  t.mock.timers.tick(0);
  t.mock.timers.tick(100);
  assert.equal(isSceneSized(scene, hosts[0]), false);
  assert.deepEqual(notifications, []);
  scene.canvasWidth = 100;
  t.mock.timers.tick(60);
  t.mock.timers.tick(16);
  t.mock.timers.tick(16);
  assert.deepEqual(notifications, [true]);
  stop();
});

test("initial observer notification is ignored; real resize does not flash the poster", async (t) => {
  const { container, hosts, observers } = environment(t);
  const scene = readyScene();
  let refreshes = 0;
  scene.refresh = () => { refreshes++; scene.canvasWidth = hosts[0].clientWidth; };
  const notifications = [];
  const stop = mountUnicornScene(container, {}, (ready) => notifications.push(ready), {
    loadSDK: async () => ({ addScene: async () => scene }),
  });
  await flush();
  t.mock.timers.tick(0);
  t.mock.timers.tick(16);
  t.mock.timers.tick(16);
  observers[0]();
  t.mock.timers.tick(200);
  assert.equal(refreshes, 1);
  hosts[0].clientWidth = 200;
  observers[0]();
  t.mock.timers.tick(16);
  t.mock.timers.tick(120);
  t.mock.timers.tick(16);
  t.mock.timers.tick(16);
  assert.equal(refreshes, 2);
  assert.ok(notifications.every(Boolean), "routine resize must never restore the phone poster");
  stop();
});
