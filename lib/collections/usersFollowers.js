UsersFollowers = new Mongo.Collection('usersFollowers');

Meteor.methods({
	followUser: function (userId) {
		check(userId, String);
		check(this.userId, String);

		var affected = UsersFollowers.update(
		{
			userId: userId,
			followers: {$ne: this.userId},
			userId: {$ne: this.userId}
		},
		{
			$addToSet: {followers: this.userId},
		});

		if (!affected) {
			throw new Meteor.Error('invalid', "You weren't able to follow that user");
		};
	},
	unfollowUser: function(userId){
		check(userId, String);
		check(this.userId, String);

		// if(Meteor.isServer) console.log(userId + " " + this.userId);
		var affected = UsersFollowers.update(
		{
			userId: userId,
			followers: this.userId,
			userId: {$ne: this.userId}
		},
		{
			$pull: {followers: this.userId},
		});

		if (!affected) {
			throw new Meteor.Error('invalid', "You weren't able to unfollowed that user");
		};
	},
});