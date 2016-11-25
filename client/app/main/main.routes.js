'use strict';

function Route(stateProvider) {
  stateProvider
    .state('main', {
      url: '/',
      template: '<main></main>'
    });
}

Route.$inject = ['$stateProvider'];

export default Route;
