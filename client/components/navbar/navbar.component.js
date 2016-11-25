'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
    title: 'Home',
    state: 'main'
  }];

  isCollapsed = true;

  constructor(http, Auth) {
    this.http = http;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  $onInit() {
    this.http
      .get('/api/notifications')
      .then(response => {
        const { meta, notifications } = response.data;
        this.notifications = notifications;
        this.meta = meta;
      });
  }

  openNotifications() {
    this.meta.new = 0;
    this.http.post('/api/notifications/open');
  }

}

NavbarComponent.$inject = [
  '$http',
  'Auth'
];

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
