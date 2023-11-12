<script>
  import Home from "./components/Home/Home.svelte";
  import Parent from "./components/Parent/Parent.svelte";

const parents =["Anders", "Karoline"]
const children = [{
  name: "Alexander",
  blackSheep: "ultra"
},
{
  name: "Gustav",
  blackSheep: "medium"
},
{
  name: "Marie",
  isGirl: true
}
]

</script>

<Home>
  <h1>Welcome message above the door</h1>

  <Parent name = {parents[0]} children = {children}></Parent>
  <Parent name = {parents[1]} children = {children}></Parent>

  <!--{#each parents as parentName}
    <Parents name = {parentName} children = {children}></Parents>
  {/each} -->

  
</Home>