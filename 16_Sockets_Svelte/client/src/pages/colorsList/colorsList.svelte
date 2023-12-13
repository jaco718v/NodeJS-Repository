<script>
  import { colorsList } from "../../stores/colorsStore";
</script>

{#each $colorsList as colorsListItem}
  <h4 style="background-color: {colorsListItem};">{colorsListItem.name}</h4>
{/each}