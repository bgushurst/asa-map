import { CancelToken } from 'axios';
const axios = require('axios');

export class ApiService {
  constructor(url = 'http://localhost:8080') {
    this.url = url;
    this.cancelToken = CancelToken.source();
  }

  async httpGet(endpoint = '') {
    const response = await axios.get(`${this.url}/${endpoint}`);
    return response.data;
  }

  getNotes() {
    return this.httpGet('notes.json');
  }

  getCaves() {
    return this.httpGet('caves.json');
  }
}
