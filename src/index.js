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
      this.endpoint = 'http://localhost:8080';
    } else {
      this.endpoint = 'https://bgushurst.github.io/asa-map/dist';
    }

    this.apiService = new ApiService(this.endpoint);
    this.initializeComponents();
    this.loadMapData();
    this.loadCaveData();
  }

  initializeComponents() {
    this.mapComponent = new Map('map-placeholder', this.endpoint);
  }

  async loadMapData() {
    // Download note data
    const notesJson = await this.apiService.getNotes();
    this.mapComponent.addNotes(notesJson.notes);
  }

  async loadCaveData() {
    // Download cave data
    const cavesJson = await this.apiService.getCaves();
    this.mapComponent.addCaves(cavesJson.caves);
  }
}

window.ctrl = new ViewController();
