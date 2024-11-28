<script>
  let data = null;

  onMount(async () => {
    const res = await fetch('');
    data = await res.json();
  });
</script>

<h1>Données chargées côté client</h1>
{#if data}
  <pre>{JSON.stringify(data, null, 2)}</pre>
{:else}
  <p>Chargement...</p>
{/if}
