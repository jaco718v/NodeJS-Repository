<script>
  import { Router, Link, Route } from "svelte-navigator";
  import {user} from './store/global'
  import Home from "./pages/home/home.svelte"
  import Login from "./pages/login/login.svelte"
  import Signup from "./pages/signup/signup.svelte"
  import PrivateRoute from "./components/PrivateRoute/PrivateRoute.svelte";
  import BookPage from "./pages/bookPage/bookPage.svelte"
  import  ManageBooks from "./pages/manageBooks/manageBooks.svelte"
  
</script>

<Router>
  <nav>
    {#if $user && $user.role === 'user'}
    <Link to="/">Account</Link>
    {/if}
    {#if !$user }
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    {/if}
    <Link to="/books">Books</Link>
    {#if $user && $user.role === 'admin'}
      <Link to="/editBooks">Edit Books</Link>
    {/if}
  </nav>

  <div>
    <PrivateRoute path="/" let:location><Home/></PrivateRoute>
    <Route path="/login"><Login/></Route>
    <Route path="/signup"><Signup/></Route>
    <Route path="/books"><BookPage/></Route>
    <PrivateRoute path="/editBooks" let:location><ManageBooks/></PrivateRoute>
  </div>

</Router>