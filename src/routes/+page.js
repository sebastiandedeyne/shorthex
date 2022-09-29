/** @type {import('./$types').PageLoad} */
export function load({ url }) {
  return { hex: "#" + (url.searchParams.get("c") || "d3d9dd").replace('#', '') };
}
