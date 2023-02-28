import { test } from "uvu";
import * as assert from "uvu/assert";
import { lightness, random, toNearestShortHex } from "./hex.js";

test("it finds the nearest shorthand hex", () => {
  assert.equal(toNearestShortHex("d3d9dc"), "cdd");
  assert.equal(toNearestShortHex("eeffcc"), "efc");
  assert.equal(toNearestShortHex("cdd"), "cdd");
  assert.equal(toNearestShortHex("cddcddcdd"), null);
});

test("it generates a random hex", () => {
  for (let i = 0; i < 100; i++) {
    assert.match(
      random(),
      /^([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/
    );
  }
});

test("it calculates lightness", () => {
  assert.equal(lightness("000"), 0);
  assert.equal(lightness("000000"), 0);
  assert.equal(lightness("fff"), 1);
  assert.equal(lightness("ffffff"), 1);
  assert.equal(Math.round(lightness("a2cd5f") * 100) / 100, 0.6);
});

test.run();
