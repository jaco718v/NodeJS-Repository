<script>
  import { navigate } from "svelte-navigator";
  import { user, BASE_URL } from "../../store/global";
  import toast, { Toaster } from "svelte-french-toast";

  let username;
  let password;

  async function signUp() {
    try {
      const response = await fetch($BASE_URL + "/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const result = await response.json();
      if (result.data) {
        user.set(result.data);
        navigate("/");
      }
    } catch (error) {
      toast.error("Username already taken");
    }
  }
</script>

<Toaster />

<h2>Sign up</h2>
<label for="username">Username:</label><br />
<input type="text" id="username" name="username" bind:value={username} /><br />
<label for="password">Password</label><br />
<input type="password" id="password" name="password" bind:value={password} /><br
/><br />
<button on:click={signUp}>Sign up</button>
