const hexCharacters = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];

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
 * @return {string} shortHex
 */
export function toShortHex(hex) {
  return Math.round(parseInt(hex, 16) / 17).toString(16);
}

/**
 * @return {string} hex
 */
export function random() {
  let hex = "";

  for (let i = 0; i < 6; i++) {
    hex +=
      hexCharacters[Math.round(Math.random() * (hexCharacters.length - 1))];
  }

  return hex;
}

/**
 * @param {string} hex
 * @return {number} lightness
 */
export function lightness(hex) {
  const shortHexMatch = hex.match(/^([0-9a-f])([0-9a-f])([0-9a-f])$/);

  if (shortHexMatch) {
    shortHexMatch.shift();
    const [r, g, b] = shortHexMatch;

    return (
      (parseInt(r, 16) / 15 + parseInt(g, 16) / 15 + parseInt(b, 16) / 15) / 3
    );
  }

  const match = hex.match(
    /^([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/
  );

  if (!match) {
    return 0;
  }

  match.shift();
  const [r, g, b] = match;

  return (
    (parseInt(r, 16) / 255 + parseInt(g, 16) / 255 + parseInt(b, 16) / 255) / 3
  );
}
