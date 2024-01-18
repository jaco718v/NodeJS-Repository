<script>
  //import { enhance } from '$app/forms'
  export let onButtonPress
  export let onSuggestionClick
  export let searchAPI
  let searchTerm = ''
  let searchResults = []
  const page_size = 5
  async function fetchSuggestions(){
    if(searchTerm != ""){
      const response = await fetch(searchAPI+`?search=${searchTerm}&page_size=${page_size}`)
      const result = await response.json();
      searchResults = result.data
    } else {
      searchResults = []
    }
  }
</script>


<div class=sbar>
  <input bind:value={searchTerm} placeholder="Search..." on:keyup={(fetchSuggestions)}>
  <button on:click={() => onButtonPress(searchTerm)}>Search</button>
</div>
<div class=suggestions>
{#key searchResults}
    {#each searchResults as result}
      <button class=btn-sgst on:click={() => onSuggestionClick(result)}><ul >{result.title || result.name}</ul></button>
    {/each}
{/key}
</div>



<style>
  .suggestions{
  position: absolute;
  width: 200px;
  top:127px;
  background-color: aliceblue;
  margin: 0;
  }
  .sbar{
    text-align: left;
  }
  .btn-sgst{
    background-color: aliceblue;
    border-color: transparent;
    color: black;
    width: 200px;
    text-align: left;
    left: 20px
  }
  .btn-sgst:hover{
    border-color: transparent;
    
  }
</style>