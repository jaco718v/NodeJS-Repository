<script>

    export let showModal
    let dialog
    $: if (showModal) dialog.showModal();


</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={()=> dialog.close()}
>
    <slot name=header/>
    <div>
        <slot name=content/>
    </div>
    <div>
        <slot name=buttons/>
        <button on:click={() => dialog.close()}>Close</button>
    </div>

</dialog>


<style>
    dialog {
		max-width: '50%';
		border-radius: 5px;
		padding: 0;
	}
    dialog::backdrop {
	    background: rgba(0, 0, 0, 0.3);
	}
</style>