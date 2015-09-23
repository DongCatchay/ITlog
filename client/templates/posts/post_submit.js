Template.postSubmit.created = function () {
  Session.set('postSubmitErrors', {});
}

Template.postSubmit.events({
  'submit form': function (e) {
    e.preventDefault();

    var tags = [];
    $(".tags").tagsinput('items').forEach(function (element, index, array) {
          tags.push(element._id);
    });

    var post = {
      title: $(e.target).find('[name=title]').val(),
      tags: tags,
      content: $(e.target).find('[name=content]').val()
    };
    var errors = validatePost(post);
    if(errors.title || errors.tags || errors.content){ return Session.set('postSubmitErrors',errors);}

    Meteor.call('postInsert', post, function(error, result){
      // Display the error to the user and abort
      if (error) { return throwError(error.reason);}

      //Show this result but rount anyway
      if(result.postExists){
        if(confirm('Bài viết cùng tựa đề đã được đăng!\nBạn có muốn xem bài viết đó?')){
          Router.go('postPage', {_id: result._id});
        }else return;
      }

      Router.go('postPage', {_id: result._id});
    });
  },
});

Template.postSubmit.helpers({
  errorMessage: function(field){
    return Session.get('postSubmitErrors')[field];
  },

  errorClass: function(field){
    return !!Session.get('postSubmitErrors')[field]?'has-error':'';
  }
});

Template.postSubmit.rendered = function(){

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
      source: tags
    }
  });
  $('.content').bind('input propertychange', function(e) {
    $('.result').html(e.target.value);
  });
}