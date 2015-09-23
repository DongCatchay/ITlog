var contents = '';

Template.postPage.helpers({
	comments: function () {
		contents = this.content;
		return Comments.find({postId: this._id});
	},
});

Template.postPage.rendered = function(){
	$('.display').html(contents);
}