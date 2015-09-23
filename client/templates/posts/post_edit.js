Template.postEdit.events({
  'submit .form': function (e) {
    e.preventDefault();

    var tags = [];
    $(".tags").tagsinput('items').forEach(function (element, index, array) {
          tags.push(element._id);
    });

    var currentPostId = this._id;
    var postProperties = {
      title: $(e.target).find('[name=title]').val(),
      tags: tags,
      content: $(e.target).find('[name=content]').val(),
    }

    var errors = validatePost(postProperties);
    if(errors.title || errors.tag || errors.content) { return Session.set('postEditErrors',errors);}

    Meteor.call('postEdit', postProperties, currentPostId, function(error, result){
      // display the error to user and abort
      if(error){ thorwError(error.reason);}

      //Show this result but rount anyway
      if(result.postExists){
        if(confirm('This title has already been posted\nDo you want go to that post?')){
          Router.go('postPage', {_id: result._id});
        }else return;
      }

      Router.go('postPage', {_id: result._id});
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if(confirm('Delete this post?')){
      var currentPostId = this._id;

      Meteor.call('deletePost', currentPostId, function(error){
      // Posts.remove(currentPostId, function(error){
        if(error){
          thorwError(error.reason);
        }else{
          Router.go('home');
        }
      });
    }
  }
});

var tagsPost;
Template.postEdit.helpers({
  ownPost: function(){
    tagsPost = this.tags;
    return this.userId === Meteor.userId();
  },
  errorMessage: function(field){
    return Session.get('postEditErrors')[field];
  },
  errorClass: function(field){
    return !!Session.get('postEditErrors')[field]?'has-error':'';
  }
});

Template.postEdit.created = function(){
  Session.set('postEditErrors', {});
};

Template.postEdit.rendered = function(){

  var tagsFollowers = TagsFollowers.find().fetch();

  var tags = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('tag'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: tagsFollowers
  });
  tags.initialize();

  var elt = $('.tags');
  elt.tagsinput({
      itemValue: '_id',
      itemText: 'tag',
      typeaheadjs: {
        name: 'tags',
        displayKey: 'tag',
        source: tags.ttAdapter()
      }
  });
  var tagsPostShow = TagsFollowers.find({_id: {$in : tagsPost }});
  tagsPostShow.forEach(function (element, index, array) {
          elt.tagsinput('add', element);
    });
  $('.result').html($('.content').val());
  $('.content').bind('input propertychange', function(e) {
    $('.result').html(e.target.value);
  });
}