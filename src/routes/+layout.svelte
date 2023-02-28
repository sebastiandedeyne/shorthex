<script>
  import "../reset.css";
</script>

<slot />

<style>
  /* @todo Without Google */
  @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&family=Space+Mono&display=swap");

  :global(html) {
    font-family: Rubik, system-ui, sans-serif;
    font-size: 14px;
  }

  :global(body) {
    line-height: 1.4;
  }
</style>
