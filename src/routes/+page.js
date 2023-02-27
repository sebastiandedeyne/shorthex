import { random } from "../lib/hex";

/** @type {import('./$types').PageLoad} */
export function load({ url }) {
  return { hex: url.searchParams.get("c") || random() };
}
