<script>
    export let tableHeaders;
    export let tableContents;
    export let componentType;
    
    import Book from "../Book/Book.svelte";
    import Paginator from "../Paginator/Paginator.svelte";
    

    // function handlePressPaginator(moveNumber){
    //     pagInfo.currentPage += moveNumber
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
            {#if componentType === 'Book'}
                <tr><Book data={contentRow}/></tr>
            {/if}
        {/each}
    </tbody>
  </table>

  