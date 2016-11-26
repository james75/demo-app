'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Route from './main.routes';
import NotificationsButtonComponent from './components/notifications-button';
import LikeSummaryComponent from './components/like-summary';

import UserService from './services/user';
import NotificationService from './services/notification';
import PostService from './services/post';

class Controller {

  constructor(auth, postSvc) {
    this.postSvc = postSvc;
    auth
      .getCurrentUser()
      .then(user => {
        this.currentUser = user;
      });
  }

  $onInit() {
    this.postSvc
      .getList()
      .then(data => {
        this.posts = data.posts;
        this.posts.forEach(post => {
          const { PostLikes } = post;
          if(PostLikes) {
            const userLike = PostLikes.find(like => like.UserId === this.currentUser._id);
            if(userLike) {
              post.liked = true;
            }
          }
        });
      });
  }

  add(message) {
    if(message) {
      this.postSvc
        .create({ message })
        .then(post => {
          post.User = this.currentUser;
          this.posts.unshift(post);
          this.newPostMessage = '';
        })
        .catch(error => {
          alert(error.data.errors[0].message);
        });
    }
  }

  delete(post) {
    this.postSvc
      .delete(post._id)
      .then(deleted => {
        if(deleted) {
          const position = this.posts.indexOf(post);
          this.posts.splice(position, 1);
        }
      });
  }

  reply(post, message) {
    if(message) {
      this.postSvc
        .create({ ParentId: post._id, message })
        .then(newPost => {
          newPost.User = this.currentUser;
          post.PostReplies = post.PostReplies || [];
          post.PostReplies.push(newPost);
          post.replyMessage = '';
          post.canReply = false;
        });
    }
  }

  like(post) {
    this.postSvc
      .like(post._id)
      .then(postLike => {
        post.liked = !postLike.deletedAt;
        post.PostLikes = post.PostLikes || [];

        const foundLike = post.PostLikes.find(like => like._id === postLike._id);
        if(!postLike.deletedAt && !foundLike) {
          post.PostLikes.push(postLike);
        } else if(postLike.deletedAt && foundLike) {
          const position = post.PostLikes.indexOf(foundLike);
          post.PostLikes.splice(position, 1);
        }
      });
  }

}

Controller.$inject = [
  'Auth',
  'PostService'
];

export default angular
  .module('demoAppApp.main', [uiRouter])
  .config(Route)
  .component('main', {
    template: require('./main.html'),
    controller: Controller
  })
  .component('notificationsButton', NotificationsButtonComponent)
  .component('likeSummary', LikeSummaryComponent)
  .service('UserService', UserService)
  .service('NotificationService', NotificationService)
  .service('PostService', PostService)
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  })
  .name;
