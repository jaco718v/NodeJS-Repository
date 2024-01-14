<script>
  import { fridgeMessages } from "../../store/fridgeMessages";

  export let child;
  export let onShowLove
  export let onStealCookie


  let customFridgeMessage = ""

  function submitFridgeMessage(){
    fridgeMessages.set([...$fridgeMessages, customFridgeMessage])
    /*fridgeMessages.update((storeValue) => {
      storeValue.push(customFridgeMessage)
      return storeValue
    })*/
    customFridgeMessage = ""
  }
</script>


<div
  class:is-girl={child.isGirl}
  class:is-boy={!child.isGirl}
  class={child.blackSheep || "nope"}
  >
  <h3>{child.name}</h3>

  
</div>

<button on:click={onShowLove(child.name)}>❤️</button>
<button on:click={onStealCookie(child.name)}>"🍪"</button>

<input bind:value={customFridgeMessage}>
<button on:click={submitFridgeMessage}>Submit message</button>

<style>
  .is-boy{
    border: 1px solid blue;
  }
  .is-girl{
    border: 1px solid red;
  }
  .ultra{
    background-color: blueviolet;
  }
  .medium{
    background-color: brown;
  }
  .nope{
    background-color: aquamarine;
  }

</style>