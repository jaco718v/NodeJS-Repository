<script>
  import { onMount } from 'svelte';
  import { user, BASE_URL } from "../../store/global";
  import Order from '../../components/Order/Order.svelte';
  import toast from 'svelte-french-toast';

  let orderData = []
  const URL = $BASE_URL + '/api/orders'
  const page_size = 4


  onMount( async () => {
    fetchOrders()
  })

  async function fetchOrders(){
    try{
      const response = await fetch(URL + `?page_size=${page_size}`)
      const result = await response.json();
      orderData = result.data 
    }catch(error){
      toast.error("Error while getting orders")
    }
  }


</script>

<h1>Your Page</h1>
<p>Welcome {$user.name}</p>

<h1>Your Most Recent Orders</h1>
<div class=container>
<div class=grid-container>
{#each orderData as order}
<div class=grid-item>
  <Order orderData={order}/>
</div>
{/each}
</div>
</div>

<style>
  .container{
    display: flex;
    width: 90%;
    justify-content: center;
  }
  .grid-container {
    position: relative;
    display: grid;
    width: 65%;
    grid-template-columns: auto auto;
    background-color: #ffffff;
    padding: 10px;
  }
  .grid-item{
    width: 80%;
    border-color: black;
    border-style: solid;
    padding: 5px;
    margin: 5px
  }
  </style>