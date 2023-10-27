import './map.scss';
import L from 'leaflet';
import { Component } from '../component';

const template = '<div ref="mapContainer" class="map-container"></div>';

export class Map extends Component {
  constructor(mapPlaceholderId, props) {
    super(mapPlaceholderId, props, template);

    this.map = L.map(this.refs.mapContainer, {
      crs: L.CRS.Simple,
      center: [0, 0],
      zoom: 1,
      minZoom: 0,
      maxZoom: 4,
    });

    this.layers = {};

    L.tileLayer('/images/{z}_{x}_{y}.png', {
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

    var mapImage =
        'https://ark.wiki.gg/images/0/04/The_Island_Topographic_Map.jpg',
      imageBounds = [
        [0, 0],
        [1024, 1024],
      ];

    // this.map.on('click', function (e) {
    //   alert('Lat, Lon : ' + e.latlng.lat + ', ' + e.latlng.lng);
    // });

    //L.imageOverlay(mapImage, imageBounds).addTo(this.map);
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
}
