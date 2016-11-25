'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class Controller {
  posts = [];

  constructor(http, auth) {
    this.http = http;

    auth
      .getCurrentUser()
      .then(user => this.currentUser = user);
  }

  $onInit() {
    this.http
      .get('/api/posts')
      .then(response => {
        this.posts = response.data.posts;
        this.posts.forEach(post => {
          const { PostLikes } = post;
          if (PostLikes) {
            const userLike = PostLikes.find(like => like.UserId === this.currentUser._id);
            if (userLike) {
              post.liked = true;
            }
          }
        });
      });
  }

  addPost(message) {
    if(message) {
      this.http
        .post('/api/posts', { post: { message }})
        .then(response => {
          const { data: { post }} = response;
          post.User = this.currentUser;
          this.posts.unshift(post);
          this.newPostMessage = '';
        })
        .catch(error => alert(error.data.errors[0].message));
    }
  }

  deletePost(post) {
    this.http
      .delete(`/api/posts/${post._id}`)
      .then(() => {
        const position = this.posts.indexOf(post);
        this.posts.splice(position, 1);
      });
  }

  replyPost(post, message) {
    if (message) {
      this.http
        .post('/api/posts', { post: { ParentId: post._id, message }})
        .then(response => {
          const { data: { post: newPost }} = response;
          newPost.User = this.currentUser;
          post.PostReplies = post.PostReplies || [];
          post.PostReplies.push(newPost);
          post.replyMessage = '';
          post.canReply = false;
        });
    }
  }

  like(post) {
    this.http
      .post(`/api/posts/${ post._id }/like`)
      .then(response => {
        const { data: { postLike }} = response;
        post.PostLikes = post.PostLikes || [];
        post.PostLikes.push(postLike);
        post.liked = !postLike.deletedAt;
      });
  }

}

Controller.$inject = [
  '$http',
  'Auth'
];

export default angular.module('demoAppApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: Controller
  })
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  })
  .name;
