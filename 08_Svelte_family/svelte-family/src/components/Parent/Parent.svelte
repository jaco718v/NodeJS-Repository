<script>
  import Child from "../Child/Child.svelte";
  import { fridgeMessages } from "../../store/fridgeMessages";

    export let name
    export let children

    let cookieJar = ["🍪","🍪","🍪","🍪","🍪"]

    function handleShowLove(childName){
      console.log(`My name ${name} is ${childName} loves me`)
    }

    function handleStealCookie(childName){
      if(cookieJar.length === 0){
        console.log(`${childName}'s dissapointment is immessurable and their day is ruined'`)
      } else {
        cookieJar.pop()
        cookieJar = cookieJar
        console.log(`${childName} stole a cookie`)
      }
    }

    function refillJar(){
      if(cookieJar.length === 6){
        console.log(`${name} refilled the cookiejar, but it was already full. Cookies are everywhere. The rug is ruined`)
      } else {
        cookieJar = ["🍪","🍪","🍪","🍪","🍪"]
        console.log(`${name} refilled the cookiejar`)
      }
    }

    function eraseFridgeMessages(){
      fridgeMessages.set(["Fridge messages below"])
    }

</script>

<h1>{name}</h1>
<p>{cookieJar}</p>
<button on:click={refillJar}>Refill</button>
<button on:click={eraseFridgeMessages}>Erase</button>

  {#each children as child}
    <Child child = {child} onShowLove = {handleShowLove} onStealCookie = {handleStealCookie}/>
  {/each}