<script>
  import { navigate } from "svelte-navigator";
  import { user, BASE_URL } from "../../store/global";
  import toast, {Toaster} from 'svelte-french-toast'

  let username
  let password

  async function login(){
    if(username.value && password.value){
    const response = await fetch($BASE_URL +'/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ username: username.value, password:password.value})
      })
      const result = await response.json()
      if(result.data){
        console.log("is it?")
        user.set(result.data.username)
        navigate("/")
      } else {
        navigate("/login")
      }
    } else {
      toast.error("You are missing either username or password")
    }
  }
</script>

<Toaster />

  <h2>Login</h2>
  <label for="username">Username:</label><br>
  <input type="text" id="username" name="username" bind:this={username}><br>
  <label for="password">Last name:</label><br>
  <input type="password" id="password" name="password" bind:this={password}><br><br>
  <button on:click={login}>Login</button>
