<script>
  import { onMount } from "svelte";
  import { lightness, random, toNearestShortHex } from "../lib/hex";
  import LeftBlob from "../components/LeftBlob.svelte";
  import RightBlob from "../components/RightBlob.svelte";

  export let data;

  let hex = data.hex;
  let input = null;

  $: match = toNearestShortHex(hex);
  $: isDark = match ? lightness(hex) < 0.25 : false;

  let copied = false;

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
    window.setTimeout(() => {
      input.setSelectionRange(0, input.value.length);
    });
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
  <section class="input">
    <LeftBlob --fill={match ? `#${hex}` : "#ddd"} />
    <form class="input-color" on:submit={handleSubmit}>
      <span class="hash">#</span>
      <input
        bind:this={input}
        bind:value={hex}
        on:input={handleInput}
        on:focus={focusInput}
        name="c"
        autocomplete="off"
      />
    </form>
  </section>
  <section class="output">
    <RightBlob --fill={match ? `#${match}` : "#ddd"} />
    <button class="output-color" on:click={copyToClipboard}>
      {#if match}
        <span class="hash">#</span>{match || ""}
      {/if}
      {#if copied}
        <p class="alert">Copied!</p>
      {/if}
    </button>
  </section>
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

    --input-top: 14vw;
    --input-left: -2vw;
    --input-color-top: 32vw;
    --input-color-left: 9vw;

    --output-blob-top: 7vw;
    --output-blob-left: 27vw;
    --output-color-top: 39vw;
    --output-color-left: 50vw;
  }

  @media (min-width: 1000px) {
    :root {
      --blob-width: 60vw;

      --input-top: -6vw;
      --input-left: 13vw;
      --input-color-top: 25vw;
      --input-color-left: 9vw;

      --output-blob-top: -13vw;
      --output-blob-left: 22vw;
      --output-color-top: 32vw;
      --output-color-left: 40vw;
    }
  }

  .input,
  .output {
    position: absolute;
    width: var(--blob-width);
    pointer-events: none;
  }

  .input {
    top: var(--input-top);
    left: var(--input-left);
  }

  .output {
    top: var(--output-blob-top);
    left: var(--output-blob-left);
  }

  .input input {
    display: block;
    width: 6ch;
    font: inherit;
    color: inherit;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0.25);
  }

  .color--dark .input input {
    border-bottom-color: rgba(255, 255, 255, 0.25);
  }

  .input input:focus {
    outline: none;
  }

  .input form {
    cursor: text;
  }

  .input-color,
  .output-color {
    position: absolute;
    display: flex;
    align-items: center;
    font-size: 2rem;
    font-family: "Space Mono", monospace;
    pointer-events: auto;
  }

  .color--dark .input-color,
  .color--dark .output-color {
    color: white;
  }

  .input-color {
    top: var(--input-color-top);
    left: var(--input-color-left);
  }

  .output-color {
    cursor: copy;
    top: var(--output-color-top);
    left: var(--output-color-left);
  }

  @media (min-width: 600px) {
    .input-color,
    .output-color {
      font-size: 2.5rem;
    }
  }

  .hash {
    opacity: 0.25;
    margin-right: 0.25ch;
  }

  .alert {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateX(2rem) translateY(100%);
    white-space: nowrap;
    font-size: 13px;
    opacity: 0.75;
    line-height: 1;
  }

  .color--dark .alert {
    border-color: white;
  }

  article {
    position: absolute;
    top: 85vw;
    left: calc(var(--input-left) + var(--input-color-left));
    right: calc(var(--input-left) + var(--input-color-left));
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
  }

  button:active {
    transform: translateY(1px);
  }

  article > * + * {
    margin-top: 1rem;
  }

  article a,
  article button {
    color: #444;
  }

  article button {
    text-decoration: underline;
  }
</style>
