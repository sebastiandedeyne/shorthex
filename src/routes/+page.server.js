import { random } from "../lib/hex";

export function load({ url }) {
  return { hex: url.searchParams.get("c") || random() };
}
