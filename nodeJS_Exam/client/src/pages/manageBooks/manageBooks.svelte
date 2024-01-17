<script>
  import { onMount } from 'svelte'; 
  import toast, { Toaster } from "svelte-french-toast";
  import Paginator from '../../components/Paginator/Paginator.svelte'
  import Table from '../../components/Table/Table.svelte';
  import Modal from '../../components/Modal/Modal.svelte';
  import Book from '../../components/Book/Book.svelte';
  import SearchBar from '../../components/SearchBar/SearchBar.svelte';
  import {BASE_URL} from '../../store/global'
  const URL = $BASE_URL + '/api/books'
  

  let bookData = []
  const bookHeaders = ['Title', 'Author', 'Genres', 'Pages', 'Actions']

  let modalType;
  let showModal = false

  let searchTerm = ''
  let currentPage = 1
  let numberOfPages
  const page_size = 2

  let modalBookId
  let modalBookTitle
  let modalBookAuthor
  let modalBookResume
  let modalBookPages
  let modalBookGenres = []
  let modalBookGenresConcat
  $: if(modalBookGenres) modalBookGenresConcat = modalBookGenres.join('-')

  onMount( async () => {
    fetchPageTotal()
    fetchBooks()
  })

  async function fetchPageTotal(){
    const response = await fetch(URL + '/total' + `?search=${searchTerm}`)
    const result = await response.json();
    numberOfPages =  Math.ceil(result.data / page_size)
  }

  async function fetchBooks(){
    const response = await fetch(URL + `?search=${searchTerm}&page=${currentPage}&page_size=${page_size}`)
    const result = await response.json();
    bookData = result.data 
  }

  function buttonNewPress(){
    showModal = true
    modalType = true
    modalBookId = ""
    modalBookTitle = ""
    modalBookAuthor = ""
    modalBookResume = ""
    modalBookPages = ""
  }

  function handleBookTablePress(itemData, evt){
    const targetId = evt.target.id
    const idSplit = targetId.split("-")
    if(idSplit[0] === "btn"){
      const action = idSplit[1]
      if(action === 'edit'){
        openEditModal(itemData)
      }else if(action === 'delete'){
        deleteBook(itemData)
      }
    }
  }

  function openEditModal(data){
    showModal = true
    modalType = false
    modalBookId = data.book_id
    modalBookTitle = data.title
    modalBookAuthor = data.author
    modalBookResume = data.resume
    modalBookPages = data.pages
    modalBookGenres = [...data.genre_list.split(', ')]
  }

  async function deleteBook(data){
    try{
        const response = await fetch(URL+"/"+ data.book_id,{
            method:'DELETE'
      })
      toast.success('Book deleted')
    }catch(err){
      console.log("error in delete")  
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

  function addGenre(){
    modalBookGenres = [...modalBookGenres, '']
  }

  function removeGenre(genre){
    modalBookGenres = modalBookGenres.filter((n) => n !== genre)
  }

  async function handleSubmit(event){
    const form = (event.target) 
    const data = new FormData(form)
    console.log(JSON.stringify(Object.fromEntries(data)))
    if(form.method == 'post'){
      try{
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
                "Content-Type": "application/json",
            },
        body: JSON.stringify(Object.fromEntries(data))
      })
      toast.success('Book created')
    }catch(error){
      toast.error("Error while creating book")
    }
    } else {
      try{
      const response = await fetch(form.action + '/' + data.get('book_id'), {
        method: 'PUT',
        headers: {
                "Content-Type": "application/json",
            },
        body: JSON.stringify(Object.fromEntries(data))
      })
      toast.success('Book updated')
  }catch(error){
    toast.error("Error while updating book")
  }
  }
}

</script>

<Toaster/>

<button on:click={buttonNewPress}>New</button>
<SearchBar onButtonPress={handleSearchButtonPress} onSuggestionClick={handleSuggestionClick} searchAPI={URL}/>
{#key bookData}
    <Table tableHeaders={bookHeaders} tableContents={bookData} listComponent={Book} onTableButtonPress={handleBookTablePress}>
        <button id=btn-edit>Edit</button>
        <button id=btn-delete>Delete</button>
    </Table>
{/key}

{#key bookData}
    <Paginator currentPage={currentPage} numberOfPages={numberOfPages} onPaginatorPressed={onPaginatorPressed}/>
{/key}

<Modal bind:showModal>
    <div slot='header'>
        <h2>{modalType? 'Create Book':'Edit Book'}</h2>
    </div>
    <div slot=content class=grid-div-display-block>
    <form 
    action={URL} 
    method={modalType? 'POST' : 'PUT'} id='submitForm'
    on:submit|preventDefault={handleSubmit}
    >
        <div>
            <input type="hidden" name='book_id' bind:value={modalBookId}>
            <label for="title">Title</label>
            <input type="text" id=title name="title" bind:value={modalBookTitle} required>
        </div>
        <div>
          <label for="author">Author</label>
          <input type="text" id=author name=author bind:value={modalBookAuthor} required>
        </div>
        <div>
          <label for="resume">Resume</label>
          <input type="text" id=resume name="resume" bind:value={modalBookResume} required>
      </div>
      <div>
        <label for="pages">pages</label>
        <input type="number" id=pages name="pages" bind:value={modalBookPages} required>
      </div>
      <div>
        <label for="genre">Genres</label>
      </div>
      <div>
        <button on:click={addGenre}>Add genre</button>
      </div>
      {#each  modalBookGenres as genre, index}
        <input type="text" bind:value={modalBookGenres[index]} required><button on:click={() => removeGenre(genre)}>X</button>
      {/each}
      {#key modalBookGenres}
        <input type="hidden" name=genres bind:value={modalBookGenresConcat}>
      {/key}
      
    </form>
    </div>
    <div slot=buttons>
      <button form='submitForm'>{modalType? 'Create': 'Finish edit'}</button>
    </div>
</Modal>