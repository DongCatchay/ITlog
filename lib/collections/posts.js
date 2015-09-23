Posts = new Mongo.Collection('posts');

Meteor.methods({
  postInsert: function (postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      tags: Array(String),
      content: String
    });

    var errors = validatePost(postAttributes);
    if(errors.title || errors.tags || errors.content){
      throw new Meteor.Error('invalid-post', 'You must set a title, tag and content for your post');
    }

    var postWithSameTitle = Posts.findOne({title: postAttributes.title});
    if(postWithSameTitle){
      return {
        postExists: true,
        _id: postWithSameTitle._id
      }
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.profile.name,
      submitted: new Date(),
      commentsCount: 0,
      likers: [],
      likes: 0,
    });
    var postId = Posts.insert(post);

    return {_id: postId};
  },

  postEdit: function(postProperties, postId){
    check(Meteor.userId(), String);
    check(postProperties, {
      title: String,
      tags: Array(String),
      content: String
    });
    check(postId, String);

    var errors = validatePost(postProperties);
    if(errors.title || errors.tags || errors.content) {
      throw new Meteor.Error('invalid-post', 'You must set a title, tag and content for your post');
    }

    var postWithSameTitle = Posts.findOne({title: postProperties.title, _id: {$ne: postId}});
    if(postWithSameTitle){
      return {
        postExists: true,
        _id: postWithSameTitle._id
      }
    }

    var currentPost = Posts.findOne({_id: postId});
    if(!Meteor.user() || currentPost.userId!=Meteor.userId()){
      if(Meteor.isClient) throwError('Accsess denied');
      throw new Meteor.Error('Accsess denied', 'You must use own-account');
    }

    Posts.update(postId, {$set: postProperties});

    return {_id: postId};
  },

  deletePost: function(postId){
    check(postId, String);
    
    var currentPost = Posts.findOne({_id: postId});
    if(!Meteor.user() || currentPost.userId!=Meteor.userId()){
      if(Meteor.isClient) throwError('Accsess denied');
      throw new Meteor.Error('Accsess denied', 'You must use own-account');
    }
    else{
      Posts.remove(postId);
    }
  },

  like: function(postId){
    check(postId, String);
    check(this.userId, String);

    var affected = Posts.update(
    {
      _id: postId,
      likers: {$ne: this.userId},
      userId: {$ne: this.userId}
    },
    {
      $addToSet: {likers: this.userId},
      $inc: {likes: 1}
    });

    if (!affected) {
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
    };
  },

  unlike: function(postId){
    check(postId, String);
    check(this.userId, String);

    var affected = Posts.update(
    {
      _id: postId,
      likers: this.userId,
      userId: {$ne: this.userId}
    },
    {
      $pull: {likers: this.userId},
      $inc: {likes: -1}
    });

    if (!affected) {
      throw new Meteor.Error('invalid', "You weren't able to downvote that post");
    };
  },

  commentsCount: function(postId){
    check(postId, String);

    if(!Meteor.user()){
      if(Meteor.isClient){throwError('Accsess denied');}
      throw new Meteor.Error('Accsess denied', 'You must login');
    }
    else{
      Posts.update(postId, {$set: {commentsCount: Comments.find({postId: postId}).count()}});
    }
  }
});