import { CancelToken } from 'axios';
const axios = require('axios');

export class ApiService {
  constructor(url = 'http://localhost:8080') {
    this.url = url;
    this.cancelToken = CancelToken.source();
  }

  async httpGet(endpoint = '') {
    this.cancelToken.cancel('Cancelled Ongoing Request');
    this.cancelToken = CancelToken.source();
    const response = await axios.get(`${this.url}/${endpoint}`, {
      cancelToken: this.cancelToken.token,
    });
    return response.data;
  }

  getNotes() {
    return this.httpGet('notes.json');
  }
}
