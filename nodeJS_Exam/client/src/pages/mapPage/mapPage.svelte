<script>
  import L from "leaflet";
  import { BASE_URL } from "../../store/global";
  import toast from "svelte-french-toast";
  import { onMount } from "svelte";

  const URL = $BASE_URL + "/api/locations";
  let map;

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

  function resizeMap() {
    if (map) {
      map.invalidateSize();
    }
  }
</script>

<svelte:window on:resize={resizeMap} />
<div id="map" use:mapAction />

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
  crossorigin=""
/>

<style>
  #map {
    min-height: 100vh;
    min-width: 100vh;
  }
</style>
