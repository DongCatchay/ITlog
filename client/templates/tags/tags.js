Template.tag.helpers({
	postsCount: function () {
		return Posts.find({tags: this._id}).count();
	}
});