import './map.scss';
import L from 'leaflet';
import { Component } from '../component';

const template = '<div ref="mapContainer" class="map-container"></div>';

export class Map extends Component {
  constructor(mapPlaceholderId, endpoint, props) {
    super(mapPlaceholderId, props, template);

    this.endpoint = endpoint;

    this.map = L.map(this.refs.mapContainer, {
      crs: L.CRS.Simple,
      center: [0, 0],
      zoom: 1,
      minZoom: 0,
      maxZoom: 4,
    });

    this.layers = {};

    L.tileLayer(`images/{z}_{x}_{y}.png`, {
      minZoom: 0,
      maxZoom: 4,
      tileSize: 256,
      crs: L.CRS.Simple,
      bounds: [
        [0, 0],
        [-256, 256],
      ],
    }).addTo(this.map);

    this.map.fitBounds([
      [0, 0],
      [-256, 256],
    ]);

    this.map.on('click', function (e) {
      alert('Lat, Lon : ' + e.latlng.lat + ', ' + e.latlng.lng);
    });
  }

  addNotes(notes) {
    // Loop over notes array and add markers to map
    notes.forEach((note) => {
      const marker = L.marker([note.marker.lat, note.marker.lng]).addTo(
        this.map
      );
      marker.bindPopup(
        `<b>Latitude:</b> ${note.latitude}<br /><b>Longitude:</b> ${note.longitude}<br />${note.id}`
      );
    });
  }

  addCaves(caves) {
    var caveIcon = L.icon({
      iconUrl: `${this.endpoint}/cave.png`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -6],
    });

    caves.forEach((cave) => {
      const marker = L.marker([cave.marker.lat, cave.marker.lng], {
        icon: caveIcon,
      }).addTo(this.map);
      marker.bindPopup(
        `${cave.name}<br /><b>Latitude:</b> ${cave.latitude}<br /><b>Longitude:</b> ${cave.longitude}`
      );
    });
  }
}
