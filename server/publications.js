Meteor.publish('postsAll', function(options) {
  return Posts.find();
});

Meteor.publish('posts', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Posts.find({}, options);
});

Meteor.publish('postsOfUser', function(userId){
  check(userId, String);
  return Posts.find({userId: userId});
});

Meteor.publish('postsOfTag', function(tagId){
  check(tagId, String);
  return Posts.find({tags: tagId});
});

Meteor.publish('singlePost', function(postId){
  check(postId, String);
  return Posts.find(postId);
});

Meteor.publish('comments', function(postId){
  check(postId, String);
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function(){
  // check(this.userId, String);
  return Notifications.find({userId: this.userId, read: false});
});

Meteor.publish('tagsAll', function(){
  return TagsFollowers.find();
});

Meteor.publish('userDetailsShare', function(userId){
  check(userId, String);
  return Meteor.users.find({_id: userId},{fields: {services: false}});
});

Meteor.publish('userAllDetailsShare', function(){
  return Meteor.users.find({},{fields: {services: false}});
});

Meteor.publish('usersFollows', function(userId){
  check(userId, String);
  return UsersFollowers.find({followers: {$in: [userId]}});
});

Meteor.publish('usersFollowers', function(userId){
  check(userId, String);
  return UsersFollowers.find({userId: userId});
});

Meteor.publish('tagsFollowers', function(tagId){
  check(userId, String);
  return TagsFollowers.find({_id: tagId});
});

// Support for playing D&D: Roll 3d6 for dexterity
Accounts.onCreateUser(function(options, user) {
  // We still want the default hook's 'profile' behavior.
  if (options.profile){
    user.profile = options.profile;
  }
  UsersFollowers.insert({
    followers: [],
    userId: user._id,
  });
  return user;
});