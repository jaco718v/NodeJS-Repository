<script>

    export let showModal
    let dialog

</script>


<dialog
bind:this={dialog}
on:close={() => (showModal = false)}
on:click|self={( ( )=> dialog.close())}
>

    <slot name=header/>
    <div>
        <slot name=content/>
        <button autofocus on:click={() => dialog.close()}>Close</button>
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