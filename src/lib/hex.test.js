import test from "node:test";
import assert from "node:assert";
import { findNearestShorthandCode } from "./hex.js";

test("it finds the nearest shorthand hex", () => {
  assert.strictEqual("cdd", findNearestShorthandCode("d3d9dc"));
  assert.strictEqual("efc", findNearestShorthandCode("eeffcc"));
  assert.strictEqual("cdd", findNearestShorthandCode("cdd"));
  assert.strictEqual(null, findNearestShorthandCode("cddcddcdd"));
});
