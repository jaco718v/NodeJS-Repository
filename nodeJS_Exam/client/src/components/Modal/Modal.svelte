<script>
  export let showModal;
  let dialog;

 	$: if (dialog && showModal) dialog.showModal();
	$: if (dialog && !showModal) dialog.close();
  
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
>
  <div>
    <slot name="content" />
  </div>
  <div>
    <br />
    <div class="row">
      <div class="col-sm-1"></div>
      <div class="col-sm-8" style="display:flex; flex-direction:row">
        <slot name="buttons" />
        <button on:click={() => dialog.close()}>Close</button>
      </div>
    </div>
  </div>
</dialog>

<style>
  dialog {
    min-width: 35%;
    max-width: 35%;
    border-radius: 5px;
    padding: 12px;
    text-align: left;
    background-color: rgb(99, 94, 94);
    border-color: black;
    border-width: 2px;
  }
  dialog::backdrop {
    background: rgba(22, 21, 21, 0.3);
  }
</style>
