<script>
  import Colors from './pages/colors/colors.svelte'
  import Register from './pages/register/register.svelte';
  import { currentUser } from './stores/userStore';
  import { BASE_URL } from './stores/globalStore';

  import {onMount} from "svelte"

  onMount(async () => {
    const currentUserLocalStorage = localStorage.getItem("currentUser")
    if(currentUserLocalStorage){
      currentUser.set(currentUserLocalStorage)
    } else {
      const response = await fetch($BASE_URL + "/api/users")
      const result = await response.json()
      console.log(result)
    }
  })
</script>

{#if !currentUser}
  <Colors/>
{:else}
  <Register/>
{/if}