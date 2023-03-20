<script>
  import "../reset.css";
</script>

<slot />

<style>
  @font-face {
    font-display: swap;
    font-family: "Rubik";
    font-style: normal;
    font-weight: 400;
    src: url("../fonts/rubik-v26-latin-regular.woff2") format("woff2"),
      url("../fonts/rubik-v26-latin-regular.woff") format("woff");
  }

  @font-face {
    font-display: swap;
    font-family: "Rubik";
    font-style: normal;
    font-weight: 700;
    src: url("../fonts/rubik-v26-latin-700.woff2") format("woff2"),
      url("../fonts/rubik-v26-latin-700.woff") format("woff");
  }

  @font-face {
    font-display: swap;
    font-family: "Space Mono";
    font-style: normal;
    font-weight: 400;
    src: url("../fonts/space-mono-v12-latin-regular.woff2") format("woff2"),
      url("../fonts/space-mono-v12-latin-regular.woff") format("woff");
  }

  :global(html) {
    font-family: Rubik, system-ui, sans-serif;
    font-size: 14px;
  }

  :global(body) {
    line-height: 1.4;
  }
</style>
