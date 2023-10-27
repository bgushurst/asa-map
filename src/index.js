import './main.scss';
import template from './main.html';
import { Map } from './components/map/map';
import { ApiService } from './services/api';

/** Main View Controller Class */
class ViewController {
  constructor() {
    document.getElementById('app').outerHTML = template;

    // Initialize API Service
    if (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    ) {
      this.apiService = new ApiService('http://localhost:8080');
    } else {
      this.apiService = new ApiService(
        'https://bgushurst.github.io/asa-map/dist'
      );
    }

    this.initializeComponents();
    this.loadMapData();
  }

  initializeComponents() {
    this.mapComponent = new Map('map-placeholder');
  }

  async loadMapData() {
    // Download note data
    const notesJson = await this.apiService.getNotes();
    console.log(notesJson);
    this.mapComponent.addNotes(notesJson.notes);
  }
}

window.ctrl = new ViewController();
