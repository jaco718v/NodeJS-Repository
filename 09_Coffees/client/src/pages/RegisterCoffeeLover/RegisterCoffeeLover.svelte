<script>
import { BASE_URL } from '../../store/global.js'
import { navigate } from "svelte-navigator"

  let coffeeLoverName

  async function submitCoffeeLoverName() {
    const response = await fetch($BASE_URL +'/api/lovers', {
      credentials: "include",
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ lover: coffeeLoverName})
    })
    // const result = await response.json()
    // console.log(response)
    if(response.status === 200) {
      navigate("/whoDat")
    }
  }
</script>

<input bind:value={coffeeLoverName}>
<button on:click={submitCoffeeLoverName}>Submit your name</button>