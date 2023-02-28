<script>
  import { onMount } from "svelte";
  import { lightness, random, toNearestShortHex } from "../lib/hex";
  import LeftBlob from "../components/LeftBlob.svelte";
  import RightBlob from "../components/RightBlob.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let hex = data.hex;
  let input = null;

  $: match = toNearestShortHex(hex);
  $: isDark = match ? lightness(hex) < 0.25 : false;

  let loaded = false;
  let copied = false;

  onMount(() => {
    loaded = true;
  });

  function randomize() {
    hex = random();
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleInput(event) {
    if (event.target.value[0] === "#") {
      hex = event.target.value.substr(1);
    } else {
      hex = event.target.value;
    }
  }

  function focusInput(event) {
    input.focus();
    input.setSelectionRange(0, input.value.length);
  }

  async function copyToClipboard() {
    await navigator.clipboard.writeText(`#${match}`);

    copied = true;

    window.setTimeout(() => {
      copied = false;
    }, 2000);
  }
</script>

<main class={isDark ? "color--dark" : ""}>
  <div class="left-blob" style:--fill={match ? `#${hex}` : "#ddd"}>
    <LeftBlob />
    <form class="left-color" on:submit={handleSubmit} on:click={focusInput}>
      <span class="hash">#</span>
      <input
        bind:this={input}
        bind:value={hex}
        on:input={handleInput}
        on:focus={focusInput}
        name="c"
        autocomplete="off"
      />
      {#if !loaded}
        <p class="alert no-js">Hit <kbd>enter</kbd> to submit</p>
      {/if}
    </form>
  </div>
  <div class="right-blob" style:--fill={match ? `#${match}` : "#ddd"}>
    <RightBlob />
    <div class="right-color" on:click={copyToClipboard}>
      {#if match}
        <span class="hash">#</span>{match || ""}
      {/if}
      {#if copied}
        <p class="alert">Copied to clipboard ✓</p>
      {/if}
    </div>
  </div>
  <article>
    <h1>Short Hex Codes</h1>
    <p>
      Enter or paste a 6-digit hex color code to find the nearest rounded
      3-digit equivalent. <br /> Need inspiration?
      <button
        type="submit"
        form="randomize"
        name="c"
        value={random()}
        on:click={randomize}>Generate a random value</button
      > instead.
    </p>
    <p>
      This web app was built with <a href="https://svelte.dev/">Svelte</a> &
      <a href="https://kit.svelte.dev/">SvelteKit</a>. It's progressively
      enhanced and works with or without JavaScript.
    </p>
    <p>by <a href="https://sebastiandedeyne.com">Seb De Deyne</a></p>
    <form hidden id="randomize" on:submit={handleSubmit} />
  </article>
</main>

<style>
  :root {
    --blob-width: 80vw;

    --left-blob-top: 14vw;
    --left-blob-left: -2vw;
    --left-color-top: 32vw;
    --left-color-left: 9vw;

    --right-blob-top: 7vw;
    --right-blob-left: 27vw;
    --right-color-top: 39vw;
    --right-color-left: 50vw;
  }

  @media (min-width: 1000px) {
    :root {
      --blob-width: 60vw;

      --left-blob-top: -6vw;
      --left-blob-left: 13vw;
      --left-color-top: 25vw;
      --left-color-left: 9vw;

      --right-blob-top: -13vw;
      --right-blob-left: 22vw;
      --right-color-top: 32vw;
      --right-color-left: 40vw;
    }
  }

  .left-blob,
  .right-blob {
    position: absolute;
    width: var(--blob-width);
    pointer-events: none;
  }

  svg {
    z-index: -1;
  }

  .left-blob {
    top: var(--left-blob-top);
    left: var(--left-blob-left);
  }

  .right-blob {
    top: var(--right-blob-top);
    left: var(--right-blob-left);
  }

  input {
    display: block;
    width: 6ch;
    font: inherit;
    color: inherit;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0.25);
  }

  .color--dark input {
    border-bottom-color: rgba(255, 255, 255, 0.25);
  }

  input:focus {
    outline: none;
  }

  form {
    cursor: text;
  }

  .left-color,
  .right-color {
    position: absolute;
    display: flex;
    align-items: center;
    font-size: 2rem;
    /** @todo Embed font */
    font-family: "Berkeley Mono", monospace;
    pointer-events: auto;
  }

  .color--dark .left-color,
  .color--dark .right-color {
    color: white;
  }

  .left-color {
    top: var(--left-color-top);
    left: var(--left-color-left);
  }

  .right-color {
    top: var(--right-color-top);
    left: var(--right-color-left);
  }

  @media (min-width: 600px) {
    .left-color,
    .right-color {
      font-size: 2.5rem;
    }
  }

  .hash {
    opacity: 0.25;
    margin-right: 0.25ch;
  }

  .color--dark .hash {
  }

  article {
    position: absolute;
    top: 85vw;
    left: calc(var(--left-blob-left) + var(--left-color-left));
    right: calc(var(--left-blob-left) + var(--left-color-left));
    padding-bottom: 5vw;
    max-width: 86vw;
  }

  @media (min-width: 1000px) {
    article {
      top: 35vw;
      right: auto;
      max-width: 29vw;
    }
  }

  h1 {
    font-weight: bold;
    text-transform: uppercase;
  }

  button {
    -webkit-appearance: none;
    border: 0;
    padding: 0;
    background: transparent;
    font: inherit;
    text-decoration: underline;
  }

  button:active {
    transform: translateY(1px);
  }

  article > * + * {
    margin-top: 1rem;
  }

  a,
  button {
    color: #444;
  }

  .alert {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(100%);
    white-space: nowrap;
    font-size: 13px;
    border: 1px solid black;
    border-bottom-width: 2px;
    opacity: 0.5;
    padding: 0.125em 0.375em;
    background-color: #fff2;
    border-radius: 0.25em;
    font-family: Rubik, system-ui, sans-serif;
  }

  .color--dark .alert {
    border-color: white;
  }

  .no-js {
    animation: no-js 0.15s;
    animation-delay: 1s;
    animation-fill-mode: forwards;
  }

  @keyframes no-js {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }
</style>
