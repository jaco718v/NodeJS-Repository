<script>
  import L from "leaflet";
  import { BASE_URL } from "../../store/global";
  import toast from "svelte-french-toast";
  import { onMount } from "svelte";

  const URL = $BASE_URL + "/api/locations";
  let map;

  let location;
  let postalCode;
  let address;
  let xCoordinate;
  let yCoordinate;

  onMount(async () => {
    fetchLocations();
  });

  const initialView = [55.676098, 12.568337];

  async function fetchLocations() {
    try {
      const response = await fetch(URL);
      const result = await response.json();
      let markers = result.data;

      for (let marker of markers) {
        L.marker([marker.x_coordinate, marker.y_coordinate])
          .addTo(map)
          .bindPopup(
            `<b>${marker.address}, ${marker.postal_code}, ${marker.location_name}<b/>`
          )
          .openPopup();
      }
      map.setView(initialView, 10);
    } catch {
      toast.error("Error getting books");
    }
  }

  function createMap(container) {
    let m = L.map(container, { preferCanvas: true }).setView(initialView, 5);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(m);

    return m;
  }

  function mapAction(container) {
    map = createMap(container);

    return {
      destroy: () => {
        map.remove();
        map = null;
      },
    };
  }

  function finishCreate() {
    let newMarker = [xCoordinate, yCoordinate];
    map.setView(newMarker, 11);
    L.marker(newMarker)
      .addTo(map)
      .bindPopup(`<b>${address}, ${postalCode}, ${location}<b/>`)
      .openPopup();
    location = "";
    postalCode = "";
    address = "";
    xCoordinate = "";
    yCoordinate = "";
  }

  async function createLocation(event) {
    const form = event.target;
    const data = new FormData(form);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      finishCreate();
      toast.success("Marker created");
    } catch (error) {
      toast.error("Error while creating marker");
    }
  }

  function placeTestMarker() {
    let newMarker = [xCoordinate, yCoordinate];
    map.setView(newMarker, 10);
    L.marker(newMarker)
      .addTo(map)
      .bindPopup("<b>Your marker will be placed here!<b/>")
      .openPopup();
  }
</script>

<div>
  <form
    action={URL}
    method="POST"
    id="submitForm"
    on:submit|preventDefault={createLocation}
  >
    <div class="col-sm-8">
      <label for="location_name">Name</label>
      <input
        type="text"
        id="location_name"
        name="location_name"
        bind:value={location}
        required
      />
    </div>
    <div class="col-sm-8">
      <label for="postal_code">Postal Code</label>
      <input
        type="text"
        maxlength="4"
        id="postal_code"
        name="postal_code"
        bind:value={postalCode}
        required
      />
    </div>
    <div class="col-sm-8">
      <label for="address">Address</label>
      <input
        type="text"
        id="address"
        name="address"
        bind:value={address}
        required
      />
    </div>
    <div class="col-sm-8">
      <label for="x_coordinate">X</label>
      <input
        type="number"
        step=".001"
        id="x_coordinate"
        name="x_coordinate"
        bind:value={xCoordinate}
        required
      />
    </div>
    <div class="col-sm-8">
      <label for="y_coordinate">Y</label>
      <input
        type="number"
        step=".001"
        id="y_coordinate"
        name="y_coordinate"
        accept="application/pdf"
        bind:value={yCoordinate}
      />
    </div>
    <button style="width:193px;" on:click={placeTestMarker}
      >Place Test-marker</button
    >
    <button style="width:193px;" form="submitForm">Create</button>
  </form>
</div>

<div>
  <div id="map" use:mapAction />
</div>
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
  crossorigin=""
/>

<style>
  #map {
    height: 100vh;
    width: 175.5vh;
    left: 225px;
  }
  #submitForm {
    display: flex;
    background-color: gray;
    flex-direction: column;
    position: absolute;
    justify-content: left;
    padding: 10px;
    padding-bottom: 0px;
    height: 100vh;
  }
</style>
