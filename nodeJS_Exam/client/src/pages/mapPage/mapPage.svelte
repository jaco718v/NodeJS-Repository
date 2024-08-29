<script>
import L from 'leaflet'
let map

const testMarkers = [
		[29.8283, -96.5795],
		[37.8283, -90.5795],
		[43.8283, -102.5795],
		[48.40, -122.5795],
		[43.60, -79.5795],
		[36.8283, -100.5795],
		[38.40, -122.5795],
	];

const initialView = [39.8283, -98.5795];


function createMap(container) {
	  let m = L.map(container, {preferCanvas: true }).setView(initialView, 5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',
	    {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	    }
	  ).addTo(m);

    return m;
  }

  function mapAction(container) {
    map = createMap(container);
    for (let markers of testMarkers){
        console.log("oi")
        L.marker(markers).addTo(map).bindPopup("<b>Message<b/>").openPopup();;
    }
    return {
       destroy: () => {
				 map.remove();
				 map = null;
			 }
    };
  }

  function resizeMap() {
	  if(map) { map.invalidateSize(); }
  }

</script>

<svelte:window on:resize={resizeMap} />
<div id="map" use:mapAction/>


<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
crossorigin=""/>

<style>
    #map {
        min-height: 100vh;
        min-width: 100vh;
    }

</style>