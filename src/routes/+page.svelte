<script>
  import { findNearestShorthandCodes } from "../lib/hex";

  export let hex = "#abc";

  $: matches = findNearestShorthandCodes(hex);
</script>

<style>

  .color {
    height: 50px;
  }

  .alternatives {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .alternatives li {
    flex: 1;
  }
</style>

<div class="wrapper">
  <input bind:value={hex} />
  {#if matches.length}
    <div class="color" style:background-color="{hex}"></div>
    <ul class="alternatives">
      {#each matches as match}
        <li class="color" style:background-color="{match}"></li>
      {/each}
    </ul>
  {/if}
</div>
