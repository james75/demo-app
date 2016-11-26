'use strict';

import Controller from './controller';

export default {
  templateUrl: 'app/main/components/like-summary/template.html',
  controller: Controller,
  transclude: true,
  bindings: {
    postLikes: '=',
    user: '='
  }
};
