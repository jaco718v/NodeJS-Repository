<script>
  import Traktor from "./lib/traktor.svelte";
  import Ground from "./lib/ground.svelte"
  import Farmer from "./lib/farmer.svelte";


  const wheels = ["🛞","🛞","🛞","🛞"]
  const showTraktor = true
  const welcomeMessage = "Hello you"
  const farmerName = "Ole"
</script>

<h1 id="welcomeMessage">{welcomeMessage}</h1>
<h2>This is the main component</h2>


<Farmer name={farmerName}/>

{#if showTraktor}
  <Traktor wheels = {wheels}/>
{/if}

<style>
  #welcomeMessage {
    color: burlywood;
  }
</style>