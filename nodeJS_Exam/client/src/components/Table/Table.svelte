<script>
    export let tableHeaders;
    export let tableContents;
    export let listComponent;
    export let onTableButtonPress;
</script>


<table class="table" style="max-width:1000px;">
    <thead>
      <tr class="bg-secondary" id="theader">
        {#each tableHeaders as headerName}
            <th>{headerName}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
        
        {#each tableContents as contentRow}
          <svelte:component this={listComponent} data={contentRow}/><div on:click={(evt) => onTableButtonPress(contentRow, evt)}><slot/></div>
        {/each}

    </tbody>
  </table>



  