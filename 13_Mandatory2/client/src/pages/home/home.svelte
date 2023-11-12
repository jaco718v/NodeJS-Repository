<script>
  import { user, BASE_URL } from "../../store/global";

  async function signOut() {
    const response = await fetch($BASE_URL + "/api/signout");
    if (response.status === 200) {
      user.set(null);
    }
  }
</script>

<h1>This is the homepage</h1>
<p>Welcome {$user}</p>
<button on:click={signOut}>Sign out</button>
