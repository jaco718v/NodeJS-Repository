<script>
  import { Router, Link, Route } from "svelte-navigator";
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from "@sveltestrap/sveltestrap";
  import { user, BASE_URL } from "./store/global";
  import UserOrders from "./pages/UserOrders/UserOrders.svelte";
  import Home from "./pages/home/Home.svelte"
  import Login from "./pages/login/login.svelte";
  import Signup from "./pages/signup/signup.svelte";
  import PrivateRoute from "./components/PrivateRoute/PrivateRoute.svelte";
  import BookPage from "./pages/bookPage/bookPage.svelte";
  import ManageBooks from "./pages/manageBooks/manageBooks.svelte";
  import { Toaster } from "svelte-french-toast";

  let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }

  async function signOut() {
    const response = await fetch($BASE_URL + "/api/signout");
    if (response.status === 200) {
      user.set(null);
    }
  }
</script>

<Toaster />

<Router>
  <Navbar color="light" light expand="lg">
    <NavbarBrand>Mailorder-Library</NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
      <Nav class="ms-auto" navbar>
        {#if !$user}
          <NavItem>
            <Link class="nav-link" to="/login">Login</Link>
          </NavItem>
          <NavItem>
            <Link class="nav-link" to="/signup">Signup</Link>
          </NavItem>
        {/if}
        {#if $user}
          <NavItem>
            <button class="nav-link" on:click={signOut}>Logout</button>
          </NavItem>
        {/if}
        <NavItem>
          <Link class="nav-link" to="/books">Books</Link>
        </NavItem>
        {#if $user && $user.role === 'user'}
        <Dropdown>
          <DropdownToggle nav caret>User</DropdownToggle>
          <DropdownMenu end>
            <DropdownItem><Link to="/userOrders">Recent Orders</Link></DropdownItem>
            <DropdownItem divider />
            <DropdownItem><Link to="/">Account</Link></DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/if}
        {#if $user && $user.role === 'admin'}
        <Dropdown>
          <DropdownToggle nav caret>Admin</DropdownToggle>
          <DropdownMenu end>
            <DropdownItem><Link to="/editBooks">Edit Books</Link></DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Orders</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/if}
      </Nav>
    </Collapse>
  </Navbar>

  <div>
    <PrivateRoute path="/" let:location><Home/></PrivateRoute>
    <Route path="/login"><Login /></Route>
    <Route path="/signup"><Signup /></Route>
    <Route path="/books"><BookPage /></Route>
    <PrivateRoute path="/editBooks"><ManageBooks /></PrivateRoute>
    <PrivateRoute path="/userOrders" let:location><UserOrders /></PrivateRoute>
    <PrivateRoute path="/editBooks" let:location><ManageBooks /></PrivateRoute>
  </div>
</Router>
