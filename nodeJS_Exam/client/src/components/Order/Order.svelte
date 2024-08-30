<script>
  import Table from "../../components/Table/Table.svelte";
  import OrderBook from "../../components/OrderBook/OrderBook.svelte";
  export let orderData;
  const orderBookHeaders = ["ID", "Title", "Author"];
</script>

<div>
  <h3>Order number: {orderData.order_id}</h3>
  <h5>Created at: {orderData.created}</h5>
  <Table
    tableHeaders={orderBookHeaders}
    tableContents={orderData.books}
    listComponent={OrderBook}
    onTableButtonPress={{}}
    onTableHeadPress={{}}
  ></Table>
</div>
