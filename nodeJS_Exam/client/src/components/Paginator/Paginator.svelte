<script>
  export let currentPage;
  export let numberOfPages;
  export let onPaginatorPressed;
  const maxPages = 5 //Should be uneven number
  const displayedNumbers = numberOfPages < maxPages ?  numberOfPages : maxPages
</script>

<div class="body">
    <button
      class={currentPage != 1 ? "left-arrow" : "left-arrow-grey"}
      on:click={() => currentPage != 1 ? onPaginatorPressed(currentPage - 1) : null}
    ></button>


  {#each Array(numberOfPages) as square, index}
  {#if index + 1 > currentPage - Math.floor(maxPages/2) && index + 1 < currentPage + Math.floor(maxPages/2)}
    
  
    <button
      class={index + 1 == currentPage ? "squareHL" : "square"}
      on:click={() => index + 1 != currentPage ? onPaginatorPressed(index + 1): null}
    >
      {index + 1}
    </button>
  {/if}
  {/each}

  <button
    class={currentPage != numberOfPages ? "right-arrow" : "right-arrow-grey"}
    on:click={() => currentPage != numberOfPages ? onPaginatorPressed(currentPage - 1) : null}
  >
  </button>
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
    background-color: #151515;
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
    border-right: 35px solid #151515;
    border-bottom: 20px solid transparent;
  }
  .left-arrow-grey {
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
    border-left: 35px solid #151515;
    border-bottom: 20px solid transparent;
  }
  .right-arrow-grey {
    margin: 5px;
    width: 0;
    height: 0;
    background-color: transparent;
    border-top: 20px solid transparent;
    border-left: 35px solid #555;
    border-bottom: 20px solid transparent;
  }
</style>
