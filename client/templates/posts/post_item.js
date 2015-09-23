Template.postItem.helpers({
  ownPost: function(){
    return this.userId === Meteor.userId();
  },
  likedClass: function(){
    if(this.userId === Meteor.userId()) return 'disable';
    if(!_.include(this.likers, Meteor.userId())){
      return 'likedable';
    }else {
      return 'likeddisable';
    }
  },
  likedText: function(){
    if(!Meteor.user() || this.userId === Meteor.userId()) return '';
    if(!_.include(this.likers, Meteor.userId())){
      return 'thích';
    }else {
      return 'bỏ thích';
    }
  },
  sortContent: function(){
    var text = this.content.toString().substring(0,180);
    return Router.current().route.getName() === 'postPage'?'':text.length<180?text:text+'. . .';
  },
  userPagePath: function(){
    return Router.routes.userPage.path({_id: this.userId});
  },
  tagPagePath: function(){
    return Router.routes.tagPage.path({_id: this.userId});
  },
  submittedText: function () {
    // return moment(this.submitted).fromNow();
    return Chronos.liveMoment(this.submitted).fromNow();
  },
  tagsPost: function(){
    return TagsFollowers.find({_id: {$in: this.tags}}); 
  }
});

Template.postItem.events({
  'click .likedable': function(e){
    e.preventDefault();

    Meteor.call('like', this._id);
  },
  'click .likeddisable': function(e){
    e.preventDefault();

    Meteor.call('unlike', this._id);
  }
});