<script>
    export let tableHeaders;
    export let tableContents;
    export let listComponent;
    export let onTableButtonPress;
</script>


<table class="table table-striped table-bordered">
    <thead>
      <tr class="bg-light" id="theader">
        {#each tableHeaders as headerName}
            <th>{headerName}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
        
        {#each tableContents as contentRow}
        <tr>
          <svelte:component this={listComponent} data={contentRow}/><th on:click={(evt) => onTableButtonPress(contentRow, evt)}><slot/></th>
        </tr>
        {/each}

    </tbody>
  </table>

<style>
  .rowDiv{
    flex-direction: row;
  }

</style>


  