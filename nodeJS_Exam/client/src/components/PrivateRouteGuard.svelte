<script>
	import { navigate } from "svelte-navigator";
	import { user } from "../store/global.js"

	//const navigate = useNavigate();
	//const location = useLocation();

	$: if (!$user) {
		navigate("/login")
	}
</script>

{#if $user}
	<slot />
{/if}