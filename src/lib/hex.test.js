import { test } from "uvu";
import * as assert from "uvu/assert";
import { toNearestShortHex, random } from "./hex.js";

test("it finds the nearest shorthand hex", () => {
  assert.equal("cdd", toNearestShortHex("d3d9dc"));
  assert.equal("efc", toNearestShortHex("eeffcc"));
  assert.equal("cdd", toNearestShortHex("cdd"));
  assert.equal(null, toNearestShortHex("cddcddcdd"));
});

test("it generates a random hex", () => {
  for (let i = 0; i < 100; i++) {
    assert.match(
      random(),
      /^([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/
    );
  }
});

test.run();
