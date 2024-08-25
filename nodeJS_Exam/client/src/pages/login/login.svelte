<script>
  import { navigate } from "svelte-navigator";
  import { user, BASE_URL } from "../../store/global";
  import toast from "svelte-french-toast";

  let username = "test3";
  let password = "1234"

  async function login() {
    try {
      const response = await fetch($BASE_URL + "/api/login", {
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
        if ($user.role === "user") {
          navigate("/");
        } else {
          navigate("/editBooks");
        }
      }
    } catch (error) {
      toast.error("Incorrent username or password");
      password = "";
    }
  }
</script>

<h2>Login</h2>
<label for="username">Username:</label><br />
<input type="text" id="username" name="username" bind:value={username} /><br />
<label for="password">Password:</label><br />
<input type="password" id="password" name="password" bind:value={password} /><br
/><br />
<button on:click={login}>Login</button>
