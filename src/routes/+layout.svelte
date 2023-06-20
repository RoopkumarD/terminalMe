<script>
  import "../app.css";
</script>

<slot />

<style lang="postcss">
  :global(html) {
    background-color: #f1f5f9;
  }

  :global(body) {
    height: 100vh;
  }
</style>
