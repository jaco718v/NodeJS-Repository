<script>
  //import { enhance } from '$app/forms'
  export let onButtonPress
  export let onSuggestionClick
  export let searchAPI
  let searchTerm = ''
  let searchResults = []
  const page_size = 5
  async function fetchSuggestions(){
    const response = await fetch(searchAPI+`?search=${searchTerm}&page_size=${page_size}`)
      const result = await response.json();
      searchResults = result.data
      console.log(searchResults)
  }
</script>

<div>
  <input bind:value={searchTerm} placeholder="Search..." on:keyup={(fetchSuggestions)}>
  <button on:click={() => onButtonPress(searchTerm)}>Search</button>
</div>
{#key searchResults}
  <div>
    {#each searchResults as result}
      <button on:click={() => onSuggestionClick(result)}><ul >{result.title || result.name}</ul></button>
    {/each}
  </div>
{/key}




<style></style>