Template.tagPage.helpers({
	postsCount: function () {
		return this.posts.count();
	},
	followedClass: function(){
		if(!this.usersFollowers || (this.usersFollowers && !_.include(this.usersFollowers.followers, Meteor.userId()))){
			return 'followedable';
		}else {
			return 'followeddisable';
		}
	},
	followedText: function(){
		if(!this.usersFollowers || (this.usersFollowers && !_.include(this.usersFollowers.followers, Meteor.userId()))){
			return 'Theo dõi';
		}else {
			return 'Bỏ theo dõi';
		}
	},
	followersCount: function(){
		return this.usersFollowers?this.usersFollowers.followers.length:0;
	},
	users: function(){
		return Meteor.users.find({_id: {$in: this.usersFollowers.followers}});
	},
});

Template.tagPage.events({
	'click .followedable': function(e){
		e.preventDefault();

		Meteor.call('followTag', this.usersFollowers._id);

	},
	'click .followeddisable': function(e){
		e.preventDefault();

		Meteor.call('unfollowTag',this.usersFollowers._id);
	},
});
