<script>
    export let tableHeaders;
    export let tableContents;
    
    import Book from "../Book/Book.svelte";
    import Paginator from "../Paginator/Paginator.svelte";
    

    // function handlePressPaginator(newPage){
    //     pagInfo.currentPage = newPage
    // }

    //<Paginator pagInfo={pagInfo} onPressed={handlePressPaginator}/>

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
            <svelte:component this={contentRow.component} {...contentRow} />
        {/each}
    </tbody>
  </table>

  