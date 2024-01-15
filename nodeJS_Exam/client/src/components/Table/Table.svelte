<script>
    export let tableHeaders;
    export let tableContents;
    export let listComponent;
    export let onOpenModal;
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
      {#key tableContents}
        
        {#each tableContents as contentRow}
          <svelte:component this={listComponent} data={contentRow}/><button on:click={() => onOpenModal(contentRow) }>open</button>
        {/each}

      {/key}

    </tbody>
  </table>



  