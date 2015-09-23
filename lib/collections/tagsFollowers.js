TagsFollowers = new Mongo.Collection('tagsFollowers');

Meteor.methods({
	followTag: function (tagId) {
		check(tagId, String);
		check(this.userId, String);

		var affected = TagsFollowers.update(
		{
			_id: tagId,
			followers: {$ne: this.userId},
		},
		{
			$addToSet: {followers: this.userId},
		});

		if (!affected) {
			throw new Meteor.Error('invalid', "You weren't able to follow that tag");
		};
	},
	unfollowTag: function(tagId){
		check(tagId, String);
		check(this.userId, String);

		var affected = TagsFollowers.update(
		{
			_id: tagId,
			followers: this.userId,
		},
		{
			$pull: {followers: this.userId},
		});

		if (!affected) {
			throw new Meteor.Error('invalid', "You weren't able to unfollowed that tag");
		};
	},
});
