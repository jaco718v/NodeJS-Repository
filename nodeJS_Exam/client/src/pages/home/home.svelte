<script>
  import { user, BASE_URL } from "../../store/global";
  import { onMount } from "svelte";

  import io from "socket.io-client";
  const socket = io("localhost:8080");

  let sessionHistory = [];
  let recommendation = null

  onMount(async () => {

    socket.emit("client-request-recommendation");

    socket.emit("client-request-history");

    socket.on("server-recommendation-yes", (data) => {
      recommendation = data.title
    });

    socket.on("server-history-yes", (data) => {
      sessionHistory = data;
    });
  
})
</script>

<div class="textBox">Welcome {$user.name}</div>
<br />
<br />
{#if recommendation}
  <div>
    Based on your search history, we recommend reading:
    {recommendation}, since you appear interested in GENRE
  </div>
{/if}


<br />
<br />

<div class="flexBox">
  <div>
    Your session search history:
  </div>
  {#if sessionHistory.length > 0}
    {#key sessionHistory}
      <div class="listBox">
        {#each sessionHistory as searchTerm}
          <div>{searchTerm}</div>
        {/each}
      </div>
    {/key}
  {/if}
</div>

<style>
  .flexBox {
    display: grid;
    justify-content: center;
  }
  .listBox {
    background-color: grey;
    border-style: solid;
    width: 200px;
  }
  .textBox {
    font-size: 32px;
  }
  button {
    background-color: rgb(80, 80, 215);
    border-radius: 5px;
  }
  input {
    background-color: grey;
  }
</style>
