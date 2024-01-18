<script>
  import { onMount } from 'svelte';
  import { user, BASE_URL } from "../../store/global";
  import Table from '../../components/Table/Table.svelte';
  import OrderBook from "../../components/OrderBook/OrderBook.svelte";
  import toast from 'svelte-french-toast';

  let orderData = []
  const URL = $BASE_URL + '/api/orders'
  const orderBookHeaders = ['ID','Id','Title']
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

  async function signOut() {
    const response = await fetch($BASE_URL + "/api/signout");
    if (response.status === 200) {
      user.set(null);
    }
  }

</script>

<h1>Your Page</h1>
<p>Welcome {$user.name}</p>
<button on:click={signOut}>Sign out</button>

<h1>Your Recent Orders</h1>

{#each orderData as order}
  <div>
    <h2>Order number: {order.order_id}</h2>
    <h3>Created at: {order.created}</h3>
    <Table tableHeaders={orderBookHeaders} tableContents={order.books} listComponent={OrderBook} onTableButtonPress={{}}></Table>
  </div>
{/each}
