<script>
  //import { enhance } from '$app/forms'
  import { BASE_URL } from "../../store/global"
  let searchTerm = ''
  let searchResults
  async function fetchSuggestions(){
    const response = await fetch($BASE_URL + "/api/search", {
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
  <li>{result}</li>
{/each}

<style></style>