'use strict';

class Controller {

  constructor(scope, userSvc) {
    scope.$watchCollection('$ctrl.postLikes', postLikes => {
      this.iLike = false;
      this.likes = [];

      if(postLikes && postLikes.length) {
        postLikes.forEach(postLike => {
          if(postLike.UserId === this.user._id) {
            this.iLike = true;
          } else {
            this.likes.push(postLike);
            if(!postLike.User) {
              userSvc
                .find(postLike.UserId)
                .then(user => {
                  postLike.User = user;
                });
            }
          }
        });
      }
    });
  }

  linkToUser(id) {
    alert(`user id: ${id}`);
  }

}

Controller.$inject = [
  '$scope',
  'UserService'
];

export default Controller;
