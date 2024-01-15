<script>
  import { onMount } from 'svelte';
  import Paginator from '../../components/Paginator/Paginator.svelte'
  import Table from '../../components/Table/Table.svelte';
  import Modal from '../../components/Modal/Modal.svelte';
  import Book from '../../components/Book/Book.svelte';
  import Order from '../../components/Order/Order.svelte';
  import SearchBar from '../../components/SearchBar/SearchBar.svelte';
  import {BASE_URL} from '../../store/global'
  const searchAPI = $BASE_URL + '/api/books'

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
    console.log(targetId)
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
    if(!(orderData.find((n) => n.book_id === modalBook.book_id))){
      showModal = false
      orderData.push({...data})}
      else{
        //Toast - Already added
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
    const response = await fetch(searchAPI + '/total' + `?search=${searchTerm}`)
    const result = await response.json();
    numberOfPages =  Math.ceil(result.data / page_size)
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

  async function fetchBooks(){
    const response = await fetch(searchAPI + `?search=${searchTerm}&page=${currentPage}&page_size=${page_size}`)
    const result = await response.json();
    bookData = result.data 
  }

  function handleSuggestionClick(item){
    bookData = item
  }

</script>

<SearchBar onButtonPress={handleSearchButtonPress} onSuggestionClick={handleSuggestionClick} searchAPI={searchAPI}/>
{#key bookData}
  <Table tableHeaders={bookHeaders} tableContents={bookData} listComponent={Book} onTableButtonPress={handleBookTablePress}>
    <button id=btn-add>Add to order</button>
    <button id=btn-modal>Details</button>
  </Table>
{/key}

  {#key bookData}
    <Paginator currentPage={currentPage} numberOfPages={numberOfPages} onPaginatorPressed={onPaginatorPressed}/>
  {/key}

{#key orderData}
  <Table tableHeaders={orderHeaders} tableContents={orderData} listComponent={Order} onTableButtonPress={handleOrderTablePress}>
    <button id=btn-remove>Details</button>
  </Table>
{/key}

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
      {#if modalBook.available}
        <button on:click={() => addToOrder}>Add to order</button>  
      {/if}
    </div>
  </Modal>

