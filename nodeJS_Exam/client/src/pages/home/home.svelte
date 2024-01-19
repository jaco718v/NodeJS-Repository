<script>
  import { user, BASE_URL } from "../../store/global";
  import toast from "svelte-french-toast";
  import { onMount } from "svelte";

  import io from "socket.io-client";
  const socket = io("localhost:8080");

  let inputGenre = "";
  let sessionHistory = [];

  onMount(async () => {
    socket.on("server-sent-recommendation", (data) => {
      toast.success(
        `You asked for an ${inputGenre} book, you shoud read ${data.title}`
      );
    });

    socket.on("server-no-recommendation", () => {
      toast.error("We have no idea what's right for you!");
    });

    socket.on("server-sent-history", (data) => {
      sessionHistory = data;
    });

    socket.on("server-no-history", () => {
      toast.error("You have made no searches this session");
    });
  });

  function getRecommendation() {
    socket.emit("client-request-recommendation", { data: inputGenre });
  }

  function getHistory() {
    socket.emit("client-request-history");
  }
</script>

<div class="textBox">Welcome {$user.name}</div>
<br />
<br />
<div>
  <input placeholder="preferred genre" type="text" bind:value={inputGenre} />
  <button on:click={getRecommendation}>Attempt to get a recommendation</button>
</div>

<br />
<br />

<div class="flexBox">
  <div>
    <button on:click={getHistory}>Show what i've searched</button>
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
