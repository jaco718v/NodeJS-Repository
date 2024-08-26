<script>
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import Paginator from "../../components/Paginator/Paginator.svelte";
  import Table from "../../components/Table/Table.svelte";
  import Modal from "../../components/Modal/Modal.svelte";
  import Book from "../../components/Book/Book.svelte";
  import SearchBar from "../../components/SearchBar/SearchBar.svelte";
  import { BASE_URL } from "../../store/global";
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

  let modalType;
  let showModal = false;

  let orderValue = "asc";
  let sortValue = "";
  let searchTerm = "";
  let currentPage = 1;
  let numberOfPages;
  const page_size = 2;

  let modalBookId;
  let modalBookTitle;
  let modalBookAuthor;
  let modalBookResume;
  let modalBookPages;
  let modalBookGenres = [""];
  let modalBookGenresConcat;
  $: if (modalBookGenres) modalBookGenresConcat = modalBookGenres.join("-");

  onMount(async () => {
    fetchBooks();
  });

  async function fetchPageTotal() {
    try {
      const response = await fetch(URL + "/total" + `?search=${searchTerm}`);
      const result = await response.json();
      numberOfPages = Math.ceil(result.data / page_size);
    } catch (error) {
      toast.error("Error getting list");
    }
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

  function openCreateModal() {
    showModal = true;
    modalType = true;
    modalBookId = "";
    modalBookTitle = "";
    modalBookAuthor = "";
    modalBookResume = "";
    modalBookPages = "";
    modalBookGenres = [""];
  }

  function handleBookTablePress(itemData, evt) {
    const targetId = evt.target.id;
    const idSplit = targetId.split("-");
    if (idSplit[0] === "btn") {
      const action = idSplit[1];
      if (action === "edit") {
        openEditModal(itemData);
      } else if (action === "delete") {
        deleteBook(itemData);
      }
    }
  }

  function openEditModal(data) {
    showModal = true;
    modalType = false;
    modalBookId = data.book_id;
    modalBookTitle = data.title;
    modalBookAuthor = data.author;
    modalBookResume = data.resume;
    modalBookPages = data.pages;
    modalBookGenres = [...data.genre_list.split(", ")];
  }

  async function deleteBook(data) {
    try {
      await fetch(URL + "/" + data.book_id, {
        method: "DELETE",
      });
      toast.success("Book deleted");
      fetchBooks()
    } catch (err) {
      toast.error("Error while deleting book")
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

  function addGenre() {
    modalBookGenres = [...modalBookGenres, ""];
  }

  function removeGenre(genre) {
    modalBookGenres = modalBookGenres.filter((n) => n !==  genre);
  }

  async function handleSubmitPost(event) {
    const form = event.target;
    const data = new FormData(form);
    console.log(form.method)
      try {
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Object.fromEntries(data)),
        });
        toast.success("Book created");
        fetchBooks()
        showModal = false
      } catch (error) {
        toast.error("Error while creating book");
    }
  }

  async function handleSubmitPut(event) {
    const form = event.target;
    const data = new FormData(form);
    console.log(Object.fromEntries(data))
    try{
    const response = await fetch(URL + "/" + data.get("book_id"), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Object.fromEntries(data)),
        });
        toast.success("Book updated");
        fetchBooks()
        showModal = false
        console.log("ey")
      } catch (error) {
        console.log("eh")
        toast.error("Error while updating book");
      }
  }


  function onHeaderPress(header) {
    orderValue === "asc" && sortValue == header ? "desc" : "asc";
    sortValue = header;
    fetchBooks();
  }
</script>

<div class="barDiv">
  <SearchBar
    onButtonPress={handleSearchButtonPress}
    onSuggestionClick={handleSuggestionClick}
    searchAPI={URL}
  /> <button class="create-btn" on:click={openCreateModal}>New</button>
</div>
<div class="bookTable">
  <Table
    tableHeaders={bookHeaders}
    tableContents={bookData}
    listComponent={Book}
    onTableButtonPress={handleBookTablePress}
    onTableHeadPress={onHeaderPress}
  >
    <button id="btn-edit">Edit</button>
    <button id="btn-delete">Delete</button>
  </Table>
  <div class="pagDiv">
    {#key bookData}
      <Paginator {currentPage} {numberOfPages} {onPaginatorPressed} />
    {/key}
  </div>
</div>
<Modal bind:showModal>
  <div slot="content" class="grid-div-display-block">
    <form
      action={URL}
      method={modalType ? "POST" : "PUT"}
      id="submitForm"
      on:submit|preventDefault={modalType === "POST" ? handleSubmitPost : handleSubmitPut}
    >
      <h2>{modalType ? "Create Book" : "Edit Book"}</h2>
      <input type="hidden" name="book_id" bind:value={modalBookId} />
      <div class="row">
        <div class="col-sm-1">
          <label for="title">Title:</label>
        </div>
        <div class="col-sm-8">
          <input
            type="text"
            id="title"
            name="title"
            bind:value={modalBookTitle}
            required
          />
        </div>
        <div>
          <div class="row">
            <div class="col-sm-1">
              <label for="author">Author:</label>
            </div>
            <div class="col-sm-8">
              <input
                type="text"
                id="author"
                name="author"
                bind:value={modalBookAuthor}
                required
              />
            </div>
            <div>
              <div class="row">
                <div class="col-sm-1">
                  <label for="resume">Resume:</label>
                </div>
                <div class="col-sm-8">
                  <textarea
                    rows="7"
                    cols="55"
                    id="resume"
                    name="resume"
                    bind:value={modalBookResume}
                    required
                  ></textarea>
                </div>
                <div>
                  <div class="row">
                    <div class="col-sm-1">
                      <label for="pages">pages:</label>
                    </div>
                    <div class="col-sm-8">
                      <input
                        type="number"
                        id="pages"
                        name="pages"
                        bind:value={modalBookPages}
                        required
                      />
                    </div>
                    <div>
                      <br />
                      <div class="row">
                        <div class="col-sm-1">
                          <label for="genre">Genres</label>
                        </div>
                        <div class="col-sm-8">
                          <button on:click={addGenre}>Add genre</button>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-1"></div>
                        <div class="col-sm-8">
                          {#each modalBookGenres as genre, index}
                            <input
                              type="text"
                              class="genre-input"
                              bind:value={modalBookGenres[index]}
                              required
                            /><button on:click={() => removeGenre(genre)}
                              >X</button
                            >
                          {/each}
                        </div>
                        {#key modalBookGenres}
                          <input
                            type="hidden"
                            name="genres"
                            bind:value={modalBookGenresConcat}
                          />
                        {/key}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
  <div slot="buttons">
    <button form="submitForm"
      >{modalType ? "Create" : "Finish edit"}</button
    >
  </div>
</Modal>

<style>
  .bookTable {
    width: 80%;
  }
  .barDiv {
    display: flex;
    flex-direction: row;
    margin: 10px;
  }
  .pagDiv {
    align-items: center;
  }
  .create-btn {
    position: relative;
    left: 62%;
    height: 40px;
    width: 60px;
    background-color: blue;
  }
  input {
    width: 400px;
  }
  .genre-input {
    width: 150px;
  }
</style>
