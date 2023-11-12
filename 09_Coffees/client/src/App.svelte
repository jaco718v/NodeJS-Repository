<script>
	import { Router, Link, Route } from "svelte-navigator";
  import Home from "./pages/Home/Home.svelte";
  import CoffeeFacts from "./pages/CoffeeFacts/CoffeeFacts.svelte";
  import CoffeeOverview from "./pages/CoffeeOverview/CoffeeOverview.svelte";
  import WhosThatCoffeeLoverSSR from "./pages/WhosThatCoffeeLoverSSR/WhosThatCoffeeLoverSSR.svelte";
  import RegisterCoffeeLoverSSR from "./pages/RegisterCoffeeLoverSSR/RegisterCoffeLoverSSR.svelte";
  import WhosThatCoffeeLover from "./pages/WhosThatCoffeeLover/WhosThatCoffeeLover.svelte";
  import RegisterCoffeeLover from "./pages/RegisterCoffeeLover/RegisterCoffeeLover.svelte";
</script>

<Router>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/overview">Coffee Overview</Link>
    <Link to="/facts">Coffee Facts</Link>
    <Link to="/whoDat">CoffeLover</Link>
    <Link to="/register">Register</Link>
    <Link to="/whoDatSSR">CoffeLoverSSR</Link>
    <Link to="/registerSSR">RegisterSSR</Link>
  </nav>

  <div>
    <Route path="/" component={Home}></Route>
    <Route path="/overview"><CoffeeOverview/></Route>
    <Route path="/facts"><CoffeeFacts/></Route>
    <Route path="/whoDat"><WhosThatCoffeeLover/></Route>
    <Route path="/register"><RegisterCoffeeLover/></Route>
    <Route path="/whoDatSSR"><WhosThatCoffeeLoverSSR/></Route>
    <Route path="/registerSSR"><RegisterCoffeeLoverSSR/></Route>
  </div>

</Router>