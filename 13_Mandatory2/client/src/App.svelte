<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Home from "./pages/home/home.svelte"
  import Login from "./pages/login/login.svelte"
  import Signup from "./pages/signup/signup.svelte"
  import PrivateRoute from "./components/PrivateRoute.svelte";
</script>

<Router>
  <nav>
    <Link to="/login">Login</Link>
    <Link to="/signup">Signup</Link>
  </nav>

  <div>
    <PrivateRoute path="/" let:location><Home/></PrivateRoute>
    <Route path="/login"><Login/></Route>
    <Route path="/signup"><Signup/></Route>
  </div>

</Router>