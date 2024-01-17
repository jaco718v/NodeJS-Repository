<script>
  import { onMount } from 'svelte';
  import { navigate } from "svelte-navigator"
  import Paginator from '../../components/Paginator/Paginator.svelte'
  import Table from '../../components/Table/Table.svelte';
  import Modal from '../../components/Modal/Modal.svelte';
  import Book from '../../components/Book/Book.svelte';
  import OrderBook from '../../components/OrderBook/OrderBook.svelte'
  import SearchBar from '../../components/SearchBar/SearchBar.svelte';
  import {BASE_URL, user} from '../../store/global'
  import toast, { Toaster } from "svelte-french-toast";
  const URL = $BASE_URL + '/api/books'

  let bookData = []
  const bookHeaders = ['Title', 'Author', 'Genres', 'Pages', 'Actions']

  let orderData = []
  const orderHeaders = ['Id','Title', 'Actions']

  let showModal = false
  let modalBook = {}

  let searchTerm = ''
  let currentPage = 1
  let numberOfPages
  const page_size = 2

  onMount( async () => {
    fetchPageTotal()
    fetchBooks()
  })

  function handleBookTablePress(itemData,evt){
    const targetId = evt.target.id
    const idSplit = targetId.split("-")
    if(idSplit[0] === "btn"){
      const action = idSplit[1]
      if(action === 'modal'){
        handleButtonModal(itemData)
      }else if(action === 'add'){
        addToOrder(itemData)
      }
    }
  }

  function addToOrder(data){
    if(data.available){
      if(!(orderData.find((n) => n.book_id === modalBook.book_id))){
        showModal = false
        orderData.push({...data})
        console.log(orderData)}
        else{
          toast.error("You cannot add the same book twice")
        }
      } else {
        toast.error("Book is not available")
      }
  }

  function handleButtonModal(data){
    showModal = true
    modalBook = {...data}
  }

  

  function handleOrderTablePress(itemData, evt){
    const targetId = evt.target.id
    console.log(targetId)
    const idSplit = targetId.split("-")
    if(idSplit[0] === "btn"){
      const action = idSplit[1]
      if(action === 'modal'){
        removeFromOrder(itemData)
      }
    }
  }

  function removeFromOrder(itemData){
    orderData = orderData.filter((n) => n.order_id !== itemData.book_id)
  }

  async function fetchPageTotal(){
    try{
    const response = await fetch(URL + '/total' + `?search=${searchTerm}`)
    const result = await response.json();
    numberOfPages =  Math.ceil(result.data / page_size)
    }catch(error){
      toast.error("Error getting list")
    }
  }

  function onPaginatorPressed(newPage){
    currentPage = newPage
    fetchBooks()
  }

  function handleSearchButtonPress(_searchTerm){
    searchTerm = _searchTerm
    fetchPageTotal()
    fetchBooks()
  }

  function handleSuggestionClick(item){
    bookData = item
  }

  async function fetchBooks(){
    const response = await fetch(URL + `?search=${searchTerm}&page=${currentPage}&page_size=${page_size}`)
    const result = await response.json();
    bookData = result.data 
  }

  async function finishOrder(){
    if(orderData.length > 0){
      try{
      const response = await fetch($BASE_URL + '/order', {
        method: 'POST',
        headers: {
                "Content-Type": "application/json",
            },
        body: JSON.stringify({books: orderData})
      })
      navigate("/login")
    }catch(error){
      toast.error("Error completing order")
    }
    } else {
      toast.error("Cannot complete an empty order")
    }
  }

</script>

<Toaster/>

<SearchBar onButtonPress={handleSearchButtonPress} onSuggestionClick={handleSuggestionClick} searchAPI={URL}/>
{#key bookData}
  <Table tableHeaders={bookHeaders} tableContents={bookData} listComponent={Book} onTableButtonPress={handleBookTablePress}>
    {#if $user.role === 'user'}
      <button id=btn-add>Add to order</button>
    {/if}
    
    <button id=btn-modal>Details</button>
  </Table>
{/key}

  {#key bookData}
    <Paginator currentPage={currentPage} numberOfPages={numberOfPages} onPaginatorPressed={onPaginatorPressed}/>
  {/key}

{#if $user.role === 'user'} 
  {#key orderData}
    <Table tableHeaders={orderHeaders} tableContents={orderData} listComponent={OrderBook} onTableButtonPress={handleOrderTablePress}>
      <button id=btn-remove>Remove</button>
    </Table>
    <button on:click={finishOrder}>Finish Order</button>
  {/key}
{/if}
  

  <Modal bind:showModal>
    <div slot='header'>
      <h3 >{modalBook.title}</h3>
      <h2>{modalBook.author}</h2>
    </div>
    <div slot=content>
      <div>{modalBook.resume}</div>
      <span>{modalBook.pages}</span><span>{modalBook.available}</span>
    </div>
    <div slot=buttons>
    </div>
  </Modal>

