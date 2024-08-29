<script>
    import { onMount } from "svelte";
    import { navigate } from "svelte-navigator";
    import Paginator from "../../components/Paginator/Paginator.svelte";
    import Table from "../../components/Table/Table.svelte";
    import Modal from "../../components/Modal/Modal.svelte";
    import Book from "../../components/Book/Book.svelte";
    import SearchBar from "../../components/SearchBar/SearchBar.svelte";
    import { BASE_URL, user } from "../../store/global";
    import { ebookLink } from "../../store/linkStore";
    import toast from "svelte-french-toast";
    const URL = $BASE_URL + "/api/books/ebooks";
  
    let bookData = [];
    let favoriteData = [];
    const bookHeaders = [
      "Title",
      "Author",
      "Genres",
      "Pages",
      "Actions",
    ];
  
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
        }else if (action === "open") {
          ebookLink.set(itemData.ebook_link)
          navigate("/reader",{ replace:false})
        }else if (action === 'favorite'){
          if(!itemData.favorite){
            favorite(itemData.book_id)
          } else {
            unfavorite(itemData.book_id)
          }      
      }
      } 
    }
  
    function handleButtonModal(data) {
      showModal = true;
      modalBook = { ...data };
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
  
    function findFavorites(n){
      if(favoriteData.includes(n.book_id)){
        return {...n, favorite:true}
      } else
      return {...n, favorite:false}
    }

    async function fetchBooks() {
      fetchPageTotal();
      try {
        const response = await fetch(
          URL +
            `?search=${searchTerm}&page=${currentPage}&page_size=${page_size}&sort=${sortValue}&order=${orderValue}`
        );
        const result = await response.json();
        fetchFavData()
        console.log(favoriteData)
        bookData = result.data.map(findFavorites);
      } catch {
        toast.error("Error getting books");
      }
    }
  
    function onHeaderPress(header) {
      orderValue === "asc" && sortValue == header ? "desc" : "asc";
      sortValue = header;
      fetchBooks();
    }

    async function favorite(id) {
    try {
      await fetch($BASE_URL + "/api/favorites", {
        method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({book_id: id})
      });
      toast.success("eBook favorited");
      fetchBooks()
    } catch (err) {
      toast.error("Error while favoriting")
    }
    }

    async function unfavorite(id) {
    try {
      await fetch($BASE_URL + "/api/favorites/" + id, {
        method: "DELETE",
      });
      toast.success("eBook unfavorited");
      fetchBooks()
    } catch (err) {
      toast.error("Error while unfavoriting")
    }
    }

    async function fetchFavData() {
      try {
        const response = await fetch($BASE_URL + "/api/favorites/min");
        const result = await response.json();
        favoriteData = result.data
      } catch (error) {
        toast.error("Error getting faviriteData");
      }
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
          <button id="btn-open">Read</button>
          <button id="btn-modal">Details</button>
          <button id="btn-favorite">Star-Icon</button>
      </Table>
  
      <div class="pagDiv">
        {#key bookData}
          <Paginator {currentPage} {numberOfPages} {onPaginatorPressed} />
        {/key}
      </div>
    </div>
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
    .searchBar {
      margin: 10px;
    }
    .pagDiv {
      align-items: center;
    }
  </style>
  