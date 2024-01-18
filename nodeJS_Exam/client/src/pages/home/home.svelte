<script>
    import {user, BASE_URL} from '../../store/global'
    import toast from 'svelte-french-toast';

    import io from "socket.io-client";
    const socket = io("localhost:8080");

    let inputGenre = '' 
    let sessionHistory = []

    function getRecommendation(){
        socket.emit("client-request-recommendation", {data:inputGenre});
    }

    function getHistory(){
        socket.emit("client-request-history")
    }

    socket.on("server-sent-recommendation", (data) => {
        console.log("bub")
        // toast.success(`You asked for a ${inputGenre}, you shoud read ${data.data.title}`)
    })

    // socket.on("server-no-recommendation", () => {
    //     toast.error("We have no idea what's right for you!")
    // })

    // socket.on("server-sent-history", (data) => {
    //     sessionHistory = data.data.list
    // })

    // socket.on("server-no-history", () => {
    //     toast.error("You have made no searches this session")
    // })

</script>

<input placeholder="preferred genre" type="text" bind:value={inputGenre}>
<button on:click={getRecommendation}>Attempt to get a recommendation</button>


<button on:click={getHistory}>Show what i've searched</button>

{#if sessionHistory.length > 0}
{#key sessionHistory}
<div>
{#each sessionHistory as searchTerm}
    <div>{searchTerm}</div>
{/each}
</div>
{/key}
{/if}

