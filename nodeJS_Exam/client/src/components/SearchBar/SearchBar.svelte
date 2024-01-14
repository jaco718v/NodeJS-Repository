<script>
  //import { enhance } from '$app/forms'
  import { BASE_URL } from "../../store/global"
  export let onButtonPress
  export let onSuggestionClick
  export let SearchAPI
  let searchTerm = ''
  let searchResults
  async function fetchSuggestions(){
    const response = await fetch($BASE_URL + SearchAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchKey: searchTerm
        }),
      });
      searchResults = await response.json();
  }

</script>


<input bind:value={searchTerm} placeholder="Search..." on:keyup={fetchSuggestions}>
{#each searchResults as result}
  <button on:click={() => onSuggestionClick(result)}><ul >{result}</ul></button>
{/each}

<button on:click={() => onButtonPress(searchTerm)}>Search</button>

<style></style>