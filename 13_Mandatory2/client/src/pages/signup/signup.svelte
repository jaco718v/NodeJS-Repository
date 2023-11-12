<script>
  import { navigate } from "svelte-navigator";
  import { user, BASE_URL } from "../../store/global";

  let username;
  let password;

  async function signUp() {
    const response = await fetch($BASE_URL + "/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });
    const result = await response.json();
    if (result.data) {
      user.set(result.data.username);
      navigate("/");
    } else {
      navigate("/signup");
    }
  }
</script>

<h2>Sign up</h2>
<label for="username">Username:</label><br />
<input type="text" id="username" name="username" bind:this={username} /><br />
<label for="password">Last name:</label><br />
<input type="password" id="password" name="password" bind:this={password} /><br
/><br />
<button on:click={signUp}>Sign up</button>
