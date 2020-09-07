<script>
  export let charities;
</script>

<style>
  h1 {
    color: blue;
  }
</style>

<h1>Charity List</h1>

<ul>
  {#if charities != undefined}
    {#each charities as charity}
      <li>{charity.title} - {charities.category}</li>
    {/each}
  {:else}
    <h1>Kosong</h1>
  {/if}
</ul>
