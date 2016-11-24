import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  //awesomeThings = [];
  //newThing = '';
  postsFeed = [];
  newPost = '';
  reply = false;

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      //socket.unsyncUpdates('thing');
      socket.unsyncUpdates('post');
    });
  }

  $onInit() {
    //this.$http.get('/api/things')
    this.$http.get('/api/things')
      .then(response => {
        this.postsFeed = response.data;
        //this.socket.syncUpdates('thing', this.awesomeThings);
        this.socket.syncUpdates('post', this.postsFeed);
      });
  }

  //addThing() {
  addPost() {
    if(this.newPost) {
      //this.$http.post('/api/things', {
      this.$http.post('/api/posts', {
        name: this.newPost
      });
      this.newPost = '';
    }
  }

  //deleteThing(thing) {
  deletePost(post) {
    //this.$http.delete(`/api/things/${thing._id}`);
    this.$http.delete(`/api/posts/${post._id}`);
  }

  likePost(post) {

  }

  replyToPost() {
    console.log('replying');
    this.reply = true;
  }
}

export default angular.module('demoAppApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  })
  .name;
