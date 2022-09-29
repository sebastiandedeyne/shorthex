/**
 * @param {string} hex
 * @return {string | null} hex
 */
export function findNearestShorthandCode(hex) {
  hex = hex.replace("#", "").toLowerCase();

  const shortHexMatch = hex.match(/^([0-9a-f])([0-9a-f])([0-9a-f])$/);

  if (shortHexMatch) {
    return `#${shortHexMatch[0]}`;
  }

  const match = hex.match(
    /^([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/
  );

  if (!match) {
    return null;
  }

  match.shift();
  const [r, g, b] = match.map(toShortHex);

  return `#${r}${g}${b}`;
}

/**
 * @param {string} hex
 * @param {string} shortHex
 */
function toShortHex(hex) {
  return Math.round(parseInt(hex, 16) / 17).toString(16);
}
