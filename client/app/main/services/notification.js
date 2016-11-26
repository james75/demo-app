'use strict';

class Service {

  constructor(http) {
    this.http = http;
  }

  getList() {
    return this.http
      .get(this.getApiUrl())
      .then(response => response.data);
  }

  open() {
    return this.http
      .post(`${this.getApiUrl()}/open`)
      .then(response => response.data);
  }

  getApiUrl() {
    return '/api/notifications';
  }

}

Service.$inject = ['$http'];

export default Service;
