/**
 * @param {string} hex
 * @return {string | null} hex
 */
export function toNearestShortHex(hex) {
  hex = hex.replace("#", "").toLowerCase();

  const shortHexMatch = hex.match(/^([0-9a-f])([0-9a-f])([0-9a-f])$/);

  if (shortHexMatch) {
    return `${shortHexMatch[0]}`;
  }

  const match = hex.match(
    /^([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/
  );

  if (!match) {
    return null;
  }

  match.shift();
  const [r, g, b] = match.map(toShortHex);

  return `${r}${g}${b}`;
}

/**
 * @param {string} hex
 * @param {string} shortHex
 */
export function toShortHex(hex) {
  return Math.round(parseInt(hex, 16) / 17).toString(16);
}

export function random() {
  const characters = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  let hex = "";

  for (let i = 0; i < 6; i++) {
    hex += characters[Math.round(Math.random() * (characters.length - 1))];
  }

  return hex;
}
