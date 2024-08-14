<script>
  export let showModal;
  let dialog;
  $: if (showModal) dialog.showModal();
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
        
        <button on:click={() => dialog.close()}>
          <slot name="buttons" />
          <button>Close</button>
        </button>
      </div>
    </div>
  </div>
</dialog>

<style>
  dialog {
    min-width: 52%;
    max-width: 52%;
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
