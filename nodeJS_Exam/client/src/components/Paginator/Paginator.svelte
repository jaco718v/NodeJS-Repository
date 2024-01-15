<script>
  export let currentPage;
  export let numberOfPages
  export let onPaginatorPressed;
</script>

<div class="body">
  {#if currentPage !== 1}
    <button class="left-arrow" on:click={() => onPaginatorPressed(currentPage - 1)}></button>
  {/if}

  {#if (numberOfPages > 2 && currentPage !== 1) || currentPage === 2}
    <button class={"square"} on:click={() => onPaginatorPressed(currentPage - 1)}
      >{currentPage - 1}</button
    >
  {/if}

  <button class={"squareHL"}>
    {currentPage}
  </button>

  {#if numberOfPages > 1 && currentPage !== numberOfPages}
    <button class={"square"} on:click={() => onPaginatorPressed(currentPage + 1)}
      >{currentPage + 1}</button
    >
  {/if}
  {#if currentPage !== numberOfPages}
    <button class="right-arrow" on:click={() => onPaginatorPressed(currentPage + 1)}></button>
  {/if}
</div>

<style>
  .body {
    display: flex;
    flex-direction: row;
  }
  .square {
    height: 50px;
    width: 50px;
    background-color: #555;
  }
  .squareHL {
    height: 50px;
    width: 50px;
    background-color: #353ef5;
  }
  .left-arrow {
    width: 0;
    height: 0;
    background-color: transparent;
    border-top: 15px solid transparent;
    border-right: 50px solid #555;
    border-bottom: 15px solid transparent;
  }
  .right-arrow {
    width: 10;
    height: 10;
    background-color: transparent;
    border-top: 15px solid transparent;
    border-left: 50px solid #555;
    border-bottom: 15px solid transparent;
  }
</style>
