<script>
  import { BASE_URL } from '../../store/global.js'
  import { onMount } from 'svelte';
  
  let coffeeLoverName

  onMount(async () => {
    const response = await fetch($BASE_URL + '/api/lovers')
    const result = await response.json()
    console.log(result)
    coffeeLoverName = result.data
  }
  )

  
</script>

{#if !coffeeLoverName}
  <h1>Owl: Who?</h1>
{:else}
  <h1>{coffeeLoverName} loves coffee</h1>
{/if}
