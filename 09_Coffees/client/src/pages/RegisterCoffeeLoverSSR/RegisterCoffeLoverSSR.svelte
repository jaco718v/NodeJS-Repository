<script>
  import { BASE_URL } from '../../store/global.js'
  import { navigate } from "svelte-navigator"
  
    let coffeeLoverName
  
    async function submitCoffeeLoverName() {
      const response = await fetch($BASE_URL +'/api/lovers', {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ lover: coffeeLoverName})
      })
      // const result = await response.json()
      if(response.status === 200) {
        navigate("/whoDatSSR")
      }
    }
  </script>
  
  <input bind:value={coffeeLoverName}>
  <button on:click={submitCoffeeLoverName}>Submit your name</button>