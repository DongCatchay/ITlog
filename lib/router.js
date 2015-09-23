Router.configure({
  waitOn: function() { return [Meteor.subscribe('notifications'), Meteor.subscribe('tagsAll')] },
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/users/profile', {
  name: 'userProfile',
  template: 'userProfile',
  data: function () {
    return Meteor.user();
  }
});
Router.route('/users/:_id', {
  name: 'userPage',
  template: 'userPage',
  waitOn: function(){
    return [
      Meteor.subscribe('postsOfUser', this.params._id),
      Meteor.subscribe('userDetailsShare', this.params._id),
      Meteor.subscribe('usersFollowers', this.params._id),
      Meteor.subscribe('usersFollows', this.params._id),
      Meteor.subscribe('userAllDetailsShare'),
    ];
  },
  data: function () {
    return {
      posts: Posts.find({userId: this.params._id}),
      user: Meteor.users.findOne({_id: this.params._id}),
      usersFollowers: UsersFollowers.findOne({userId: this.params._id}),
      usersFollows: UsersFollowers.find({followers: {$in: [this.params._id]}}),
    }
  }
});

Router.route('/posts/:_id', {
  name: 'postPage',
  waitOn: function(){
    return [
      Meteor.subscribe('comments', this.params._id),
      Meteor.subscribe('singlePost', this.params._id)
    ];
  },
  data: function(){ return Posts.findOne(this.params._id); }
});

Router.route('/post/:_id/edit', {
  name: 'postEdit',
  waitOn: function(){
    return [Meteor.subscribe('singlePost', this.params._id), Meteor.subscribe('tagsAll')];
  },
  data: function(){ return Posts.findOne(this.params._id);}
});

Router.route('/tags', {
  name: 'tags',
  waitOn: function(){
    return Meteor.subscribe('postsAll');
  },
  data: function(){
    return {
      tags : TagsFollowers.find()
    }
  }
});

Router.route('/tags/:_id', {
  name: 'tagPage',
  template: 'tagPage',
  waitOn: function(){
    return [
      Meteor.subscribe('postsOfTag', this.params._id),
      Meteor.subscribe('userAllDetailsShare'),
    ];
  },
  data: function () {
    return {
      posts: Posts.find({tags: this.params._id}),
      usersFollowers: TagsFollowers.findOne({_id: this.params._id}),
    }
  }
});

Router.route('/submit', {
  name: 'postSubmit',
  waitOn: function(){
    return Meteor.subscribe('tagsAll');
  },
});

PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  postsLimit: function(){
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function(){
    return {sort: this.sort, limit: this.postsLimit()};
  },
  subscriptions: function(){
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
    return Meteor.subscribe('posts', this.findOptions());
  },
  posts: function(){
    return Posts.find({}, this.findOptions());
  },
  data: function () {
    var hasMore = this.posts().count() === this.postsLimit();
    var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
    return {
      posts: this.posts(),
      ready: this.postsSub.ready,
      nextPath: hasMore?nextPath:null
    };
  }
});

NewPostsListController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function(){
    return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

BestPostsListController = PostsListController.extend({
  sort: {likes: -1, submitted: -1, _id: -1},
  nextPath: function(){
    return Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

Router.route('/new/:postsLimit?',{ name: 'newPosts',controller: NewPostsListController});
Router.route('/best/:postsLimit?',{ name: 'bestPosts',controller: BestPostsListController});
Router.route('/:postsLimit?',{name: 'home', controller: BestPostsListController});

var requireLogin = function () {
  if(!Meteor.user()){
    // if (Meteor.LoggingIn()) {
    //  this.render(this.loadingTemplate);
    // }else{
      this.render('accessDenied');
    // }
  }else{
    this.next();
  }
}

Router.onBeforeAction('dataNotFound');

Router.onBeforeAction(requireLogin, {only: ['postSubmit', 'postEdit']});