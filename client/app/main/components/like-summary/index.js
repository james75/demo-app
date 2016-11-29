'use strict';

import Controller from './controller';

export default {
  template: require('./template.html'),
  controller: Controller,
  transclude: true,
  bindings: {
    postLikes: '=',
    user: '='
  }
};
