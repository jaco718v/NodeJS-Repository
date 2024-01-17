<script>
	import { navigate } from "svelte-navigator";
	import { user } from "../../store/global"

	$: if (!$user) {
		navigate("/login")
	}
</script>

{#if $user}
	<slot />
{/if}