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

  create(post) {
    return this.http
      .post(this.getApiUrl(), { post })
      .then(response => response.data.post);
  }

  delete(id) {
    return this.http
      .delete(`${this.getApiUrl()}/${id}`)
      .then(response => response.data.post);
  }

  like(id) {
    return this.http
      .post(`${this.getApiUrl()}/${id}/like`)
      .then(response => response.data.postLike);
  }

  getApiUrl() {
    return '/api/posts';
  }

}

Service.$inject = ['$http'];

export default Service;
