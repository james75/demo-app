'use strict';

class Service {

  constructor(http) {
    this.http = http;
  }

  find(id) {
    return this.http
      .get(`/api/users/${id}`)
      .then(response => response.data.user);
  }

}

Service.$inject = ['$http'];

export default Service;
