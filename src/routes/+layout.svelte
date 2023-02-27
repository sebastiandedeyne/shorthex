<script>
  import "../reset.css";
</script>

<slot />

<style>
  @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap");

  :global(:root) {
    --padding: 4rem;
  }

  :global(html) {
    font-family: Rubik, system-ui, sans-serif;
    font-size: 14px;
  }

  :global(body) {
    line-height: 1.4;
  }
</style>
