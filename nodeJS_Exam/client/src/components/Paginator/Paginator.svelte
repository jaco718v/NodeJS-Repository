<script>
  export let currentPage;
  export let numberOfPages;
  export let onPaginatorPressed;
</script>

<div class="body">
  {#if currentPage !== 1}
    <button
      class="left-arrow"
      on:click={() => onPaginatorPressed(currentPage - 1)}
    ></button>
  {/if}

  {#if (numberOfPages > 2 && currentPage !== 1) || currentPage === 2}
    <button
      class={"square"}
      on:click={() => onPaginatorPressed(currentPage - 1)}
      >{currentPage - 1}</button
    >
  {/if}

  <button class={"squareHL"}>
    {currentPage}
  </button>

  {#if numberOfPages > 1 && currentPage !== numberOfPages}
    <button
      class={"square"}
      on:click={() => onPaginatorPressed(currentPage + 1)}
      >{currentPage + 1}</button
    >
  {/if}
  {#if currentPage !== numberOfPages}
    <button
      class="right-arrow"
      on:click={() => onPaginatorPressed(currentPage + 1)}
    ></button>
  {/if}
</div>

<style>
  .body {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .square {
    border-radius: 5px;
    height: 50px;
    width: 50px;
    background-color: #555;
  }
  .squareHL {
    border-radius: 5px;
    height: 50px;
    width: 50px;
    background-color: #353ef5;
  }
  .left-arrow {
    margin: 5px;
    width: 0;
    height: 0;
    background-color: transparent;
    border-top: 20px solid transparent;
    border-right: 35px solid #555;
    border-bottom: 20px solid transparent;
  }
  .right-arrow {
    margin: 5px;
    width: 0;
    height: 0;
    background-color: transparent;
    border-top: 20px solid transparent;
    border-left: 35px solid #555;
    border-bottom: 20px solid transparent;
  }
</style>
