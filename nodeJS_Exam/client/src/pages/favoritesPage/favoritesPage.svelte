<script>
    import { onMount } from "svelte";
    import { navigate } from "svelte-navigator";
    import Table from "../../components/Table/Table.svelte";
    import Modal from "../../components/Modal/Modal.svelte";
    import Book from "../../components/Book/Book.svelte";
    import { BASE_URL, user } from "../../store/global";
    import { ebookLink } from "../../store/linkStore";
    import toast from "svelte-french-toast";
    const URL = $BASE_URL + "/api/favorites";
  
    let bookData = [];
    const bookHeaders = [
      "Title",
      "Author",
      "Genres",
      "Pages",
      "Actions",
    ];
  
    let showModal = false;
    let modalBook = {};
  
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
            unfavorite(itemData.book_id)
        }
      }
    }
  
    function handleButtonModal(data) {
      showModal = true;
      modalBook = { ...data };
    }

    async function fetchBooks() {
      try {
        const response = await fetch(URL);
        const result = await response.json();
        bookData = result.data;
      } catch {
        toast.error("Error getting books");
      }
    }


    function onHeaderPress(header){}

    async function unfavorite(data) {
    try {
      await fetch(URL + "/" + data.book_id, {
        method: "DELETE",
      });
      toast.success("eBook unfavorited");
      fetchBooks()
    } catch (err) {
      toast.error("Error while unfavoriting")
    }
    }
</script>

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