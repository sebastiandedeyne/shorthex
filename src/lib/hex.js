/**
 * @param {string} hex
 * @return {string[]} shortHexCodes
 */
export function findNearestShorthandCodes(hex) {
  hex = hex.replace("#", "").toLowerCase();

  const shortHexMatch = hex.match(
    /^([0-9a-f])([0-9a-f])([0-9a-f])$/
  );

  if (shortHexMatch) {
    shortHexMatch.shift();
    const [r, g, b] = shortHexMatch;

    return cartesian(findNearestHexValues(r), findNearestHexValues(g), findNearestHexValues(b))
      .map((hex) => '#' + hex.join(''));
  }

  const match = hex.match(
    /^([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/
  );

  if (!match) {
    return [];
  }

  match.shift();
  const [r, g, b] = match.map(toShortHex);

  return cartesian(findNearestHexValues(r), findNearestHexValues(g), findNearestHexValues(b))
    .map((hex) => '#' + hex.join(''));
}

/**
 * @param {string} hex
 * @param {string} shortHex
 */
function toShortHex(hex) {
  return Math.round(parseInt(hex, 16) / 17).toString(16);
}

function findNearestHexValues(hex) {
  if (hex === 'f') {
    return ['e', 'f'];
  }

  if (hex === '0') {
    return ['0', '1'];
  }

  return [
    (parseInt(hex, 16) - 1).toString(16),
    hex,
    (parseInt(hex, 16) + 1).toString(16),
  ];
}

function cartesian(...args) {
  var r = [], max = args.length-1;
  function helper(arr, i) {
      for (var j=0, l=args[i].length; j<l; j++) {
          var a = arr.slice(0); // clone arr
          a.push(args[i][j]);
          if (i==max)
              r.push(a);
          else
              helper(a, i+1);
      }
  }
  helper([], 0);
  return r;
}
