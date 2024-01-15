<script>
  import { onMount } from 'svelte';
  import Paginator from '../../components/Paginator/Paginator.svelte'
  import Table from '../../components/Table/Table.svelte';
  import Modal from '../../components/Modal/Modal.svelte';
  import Book from '../../components/Book/Book.svelte'
  import SearchBar from '../../components/SearchBar/SearchBar.svelte';
  import {BASE_URL} from '../../store/global'
  const searchAPI = $BASE_URL + '/api/books'
  let tableContents = []
  const tableHeaders = ['Title', 'Author', 'Genres', 'Pages']

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

  function handleModalOpen(modalData){
    showModal = true
    modalBook = modalData
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
    tableContents = result.data 
  }

  function handleSuggestionClick(item){
    tableContents = item
  }

</script>

<SearchBar onButtonPress={handleSearchButtonPress} onSuggestionClick={handleSuggestionClick} searchAPI={searchAPI}/>

<Table tableHeaders={tableHeaders} bind:tableContents listComponent={Book} onOpenModal={handleModalOpen}/>


  {#key tableContents}
    <Paginator currentPage={currentPage} numberOfPages={numberOfPages} onPaginatorPressed={onPaginatorPressed}/>
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
  </Modal>

