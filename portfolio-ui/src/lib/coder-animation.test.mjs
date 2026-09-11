import test from "node:test";
import assert from "node:assert/strict";
import { shouldAnimateCoder } from "./coder-animation.mjs";

const running = { ready: true, paused: false, inView: true, reducedMotion: false, tabVisible: true };

test("The desk scene animates only when visible and ready", () => {
  assert.equal(shouldAnimateCoder(running), true);
  for (const gate of ["ready", "inView", "tabVisible"]) {
    assert.equal(shouldAnimateCoder({ ...running, [gate]: false }), false, gate);
  }
});

test("Pause and reduced-motion preferences always stop the scene", () => {
  assert.equal(shouldAnimateCoder({ ...running, paused: true }), false);
  assert.equal(shouldAnimateCoder({ ...running, reducedMotion: true }), false);
  assert.equal(shouldAnimateCoder({ ...running, paused: true, reducedMotion: true }), false);
});

test("Returning to view does not clear an explicit pause", () => {
  const paused = { ...running, paused: true, inView: false };
  assert.equal(shouldAnimateCoder(paused), false);
  assert.equal(shouldAnimateCoder({ ...paused, inView: true }), false);
  assert.equal(shouldAnimateCoder({ ...paused, inView: true, paused: false }), true);
});
