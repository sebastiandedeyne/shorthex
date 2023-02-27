<script>
  import { onMount } from "svelte";
  import { toNearestShortHex, random } from "../lib/hex";

  /** @type {import('./$types').PageData} */
  export let data;

  let hex = data.hex;
  let input = null;

  $: match = toNearestShortHex(hex);

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

<main>
  <div class="colors">
    <form
      class="color"
      style:background-color={match ? `#${hex}` : "#ddd"}
      on:submit={handleSubmit}
      on:click={focusInput}
    >
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
        <p class="color-message no-js">Hit <kbd>enter</kbd> to submit</p>
      {/if}
    </form>
    <div
      class="color"
      style:--background-color={match ? `#${match}` : "#ddd"}
      on:click={copyToClipboard}
    >
      {#if match}
        <span class="hash">#</span>{match || ""}
      {/if}
      {#if copied}
        <p class="color-message">Copied to clipboard ✓</p>
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
        form="random"
        name="c"
        value={random()}
        on:click={randomize}>Generate a random value</button
      > instead.
    </p>
    <p>
      This applet is built with <a href="https://svelte.dev/">Svelte</a> &
      <a href="https://kit.svelte.dev/">SvelteKit</a>. It's progressively
      enhanced and works with or without JavaScript.
    </p>
    <form hidden id="random" on:submit={handleSubmit} />
  </article>
</main>

<style>
  main {
    height: calc(100vh - var(--padding) * 2.5);
    display: grid;
    grid-template-rows: 1fr auto;
    padding: var(--padding) var(--padding) calc(var(--padding) * 1.5);
  }

  input {
    display: block;
    width: 100%;
    margin: 0 auto;
    font: inherit;
    background-color: transparent;
    border: none;
  }

  input:focus {
    outline: none;
  }

  form {
    cursor: text;
  }

  .colors {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .colors:before,
  .colors:after {
    content: "";
    position: absolute;
    left: calc(50% - 1px);
    height: calc(var(--padding) * 0.5);
    width: 2px;
    background-color: lightgray;
  }

  .colors:before {
    top: calc(var(--padding) * -0.5);
  }

  .colors:after {
    bottom: calc(var(--padding) * -0.5);
  }

  .hash {
    opacity: 0.15;
  }

  .color {
    --background-color: red;

    position: relative;
    display: flex;
    align-items: center;
    font-size: 3rem;
    padding-left: var(--padding);
    background-color: var(--background-color);
  }

  .colors .color:first-child {
    border-radius: var(--padding) 0 0 var(--padding);
  }

  .colors .color:last-child {
    border-radius: 0 var(--padding) var(--padding) 0;
  }

  article {
    margin-top: var(--padding);
    padding-left: var(--padding);
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

  .color-message {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: var(--padding);
    font-size: 13px;
    border: 1px solid currentColor;
    border-bottom-width: 2px;
    opacity: 0.5;
    padding: 0.125em 0.375em;
    background-color: #fff2;
    border-radius: 0.25em;
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
