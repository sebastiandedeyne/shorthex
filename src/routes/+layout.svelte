<script>
  import "../reset.css";
</script>

<slot />

<style>
  :global(:root) {
    --padding: 2rem;
  }

  :global(html) {
    font-family: system-ui, sans-serif;
    font-size: 14px;
  }

  :global(body) {
    line-height: 1.4;
  }
</style>
