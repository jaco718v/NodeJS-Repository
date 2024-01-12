<script>
  export let pagInfo;
  export let onPressed;
  const currentPage = pagInfo.currentPage;
  const numberOfPages = Math.ceil(pagInfo.totalItems / pagInfo.pageLength);
</script>

<div class="body">
  {#if currentPage !== 1}
    <button class="left-arrow" on:click={() => onPressed(-1)}></button>
  {/if}

  {#if (numberOfPages > 2 && currentPage !== 1) || currentPage === 2}
    <button class={"square"} on:click={() => onPressed(-1)}
      >{currentPage - 1}</button
    >
  {/if}

  <button class={"squareHL"}>
    {currentPage}
  </button>

  {#if numberOfPages > 1 && currentPage !== numberOfPages}
    <button class={"square"} on:click={() => onPressed(1)}
      >{currentPage + 1}</button
    >
  {/if}
  {#if currentPage !== numberOfPages}
    <button class="right-arrow" on:click={() => onPressed(1)}></button>
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
    border-top: 25px solid transparent;
    border-right: 50px solid #555;
    border-bottom: 25px solid transparent;
  }
  .right-arrow {
    width: 0;
    height: 0;
    border-top: 25px solid transparent;
    border-left: 50px solid #555;
    border-bottom: 25px solid transparent;
  }
</style>
