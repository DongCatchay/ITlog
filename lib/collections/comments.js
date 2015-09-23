Comments = new Mongo.Collection('comments');

Meteor.methods({
  commentInsert: function (commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      postId: String,
      body: String
    });

    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);
    if(!post){ throw new Meteor.Error('invalid-comment', 'You must comment a post');}

    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username?user.username:user.profile.name,
      submitted: new Date()
    });

    // create comment and save the _id
    comment._id = Comments.insert(comment);

    //update the post with the number of commnets
    Meteor.call('commentsCount', comment.postId);

    // create a notification, informing the user that there's been a comment
    createCommentNotification(comment);

    return comment._id;
  }
});