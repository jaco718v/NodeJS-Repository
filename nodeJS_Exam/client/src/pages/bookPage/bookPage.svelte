<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";
  import Paginator from "../../components/Paginator/Paginator.svelte";
  import Table from "../../components/Table/Table.svelte";
  import Modal from "../../components/Modal/Modal.svelte";
  import Book from "../../components/Book/Book.svelte";
  import OrderBook from "../../components/OrderBook/OrderBook.svelte";
  import SearchBar from "../../components/SearchBar/SearchBar.svelte";
  import { BASE_URL, user } from "../../store/global";
  import toast from "svelte-french-toast";
  const URL = $BASE_URL + "/api/books";

  let bookData = [];
  const bookHeaders = [
    "Title",
    "Author",
    "Genres",
    "Pages",
    "Status",
    "Actions",
  ];

  let orderData = [];
  const orderHeaders = ["Id", "Title", "Actions"];

  let showModal = false;
  let modalBook = {};

  let orderValue = "asc";
  let sortValue = "";
  let searchTerm = "";
  let currentPage = 1;
  let numberOfPages;
  const page_size = 2;

  onMount(async () => {
    fetchBooks();
  });

  function handleBookTablePress(itemData, evt) {
    const targetId = evt.target.id;
    const idSplit = targetId.split("-");
    if (idSplit[0] === "btn") {
      const action = idSplit[1];
      if (action === "modal") {
        handleButtonModal(itemData);
      } else if (action === "add") {
        addToOrder(itemData);
      }
    }
  }

  function addToOrder(data) {
    if (data.available) {
      if (!orderData.find((n) => n.book_id === data.book_id)) {
        showModal = false;
        orderData = [...orderData, { ...data }];
      } else {
        toast.error("You cannot add the same book twice");
      }
    } else {
      toast.error("Book is not available");
    }
  }

  function handleButtonModal(data) {
    showModal = true;
    modalBook = { ...data };
  }

  function handleOrderTablePress(itemData, evt) {
    const targetId = evt.target.id;
    const idSplit = targetId.split("-");
    if (idSplit[0] === "btn") {
      const action = idSplit[1];
      if (action === "remove") {
        removeFromOrder(itemData);
      }
    }
  }

  function removeFromOrder(itemData) {
    orderData = [...orderData.filter((n) => n.book_id !== itemData.book_id)];
  }

  async function fetchPageTotal() {
    try {
      const response = await fetch(URL + "/total" + `?search=${searchTerm}`);
      const result = await response.json();
      numberOfPages = Math.ceil(result.data / page_size);
    } catch (error) {
      toast.error("Error getting list");
    }
  }

  function onPaginatorPressed(newPage) {
    currentPage = newPage;
    fetchBooks();
  }

  function handleSearchButtonPress(_searchTerm) {
    searchTerm = _searchTerm;
    fetchBooks();
  }

  function handleSuggestionClick(item) {
    bookData = [item];
    numberOfPages = 1;
  }

  async function fetchBooks() {
    fetchPageTotal();
    try {
      const response = await fetch(
        URL +
          `?search=${searchTerm}&page=${currentPage}&page_size=${page_size}&sort=${sortValue}&order=${orderValue}`
      );
      const result = await response.json();
      bookData = result.data;
    } catch {
      toast.error("Error getting books");
    }
  }

  async function finishOrder() {
    if (orderData.length > 0) {
      try {
        const response = await fetch($BASE_URL + "/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ books: orderData }),
        });
        navigate("/userOrders");
      } catch (error) {
        toast.error("Error completing order");
      }
    } else {
      toast.error("Cannot complete an empty order");
    }
  }

  function onHeaderPress(header) {
    orderValue === "asc" && sortValue == header ? "desc" : "asc";
    sortValue = header;
    fetchBooks();
  }
</script>

<div class="searchBar">
  <SearchBar
    onButtonPress={handleSearchButtonPress}
    onSuggestionClick={handleSuggestionClick}
    searchAPI={URL}
  />
</div>
<div class="tableBox">
  <div class="bookTable">
    <Table
      tableHeaders={bookHeaders}
      tableContents={bookData}
      listComponent={Book}
      onTableButtonPress={handleBookTablePress}
      onTableHeadPress={onHeaderPress}
    >
      {#if $user && $user.role === "user"}
        <button id="btn-add">Add to order</button>
      {/if}
      <button id="btn-modal">Details</button>
    </Table>

    <div class="pagDiv">
      {#key bookData}
        <Paginator {currentPage} {numberOfPages} {onPaginatorPressed} />
      {/key}
    </div>
  </div>

  {#if $user && $user.role === "user"}
    <div class="orderTable">
      <div>Your Current order:</div>
      {#key orderData}
        <Table
          tableHeaders={orderHeaders}
          tableContents={orderData}
          listComponent={OrderBook}
          onTableButtonPress={handleOrderTablePress}
          onTableHeadPress={{}}
        >
          <button id="btn-remove">Remove</button>
        </Table>
        <button on:click={finishOrder}>Finish Order</button>
      {/key}
    </div>
  {/if}
</div>

<Modal bind:showModal>
  <div slot="content">
    <div class="row">
      <div class="col-sm-1"></div>
      <div class="col-sm-8">
        <h2>{modalBook.title}</h2>
      </div>
      <div>
        <div class="row">
          <div class="col-sm-1"></div>
          <div class="col-sm-8">
            <h4>{modalBook.author}</h4>
          </div>
          <div>
            <div class="row">
              <div class="col-sm-1"></div>
              <div class="col-sm-8">
                <div>{modalBook.resume}</div>
              </div>
              <div>
                <div class="row">
                  <div class="col-sm-1">
                    <span>Pages:</span>
                  </div>
                  <div class="col-sm-1">
                    <span>{modalBook.pages}</span>
                  </div>
                  <div class="col-sm-4"></div>
                  <div class="col-sm-1">Status:</div>
                  <div class="col-sm-1">
                    {modalBook.available ? "Available" : "Rented"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div slot=buttons></div>
</Modal>

<style>
  .tableBox {
    display: flex;
    flex-direction: row;
  }
  .bookTable {
    width: 65%;
  }
  .orderTable {
    width: 30%;
    padding: 20px;
  }
  .searchBar {
    margin: 10px;
  }
  .pagDiv {
    align-items: center;
  }
</style>
