Template.userPage.helpers({
	postsCount: function () {
		return this.posts.count();
	},
	followedClass: function(){
		if(!Meteor.user() || this.user._id === Meteor.userId()) return 'disable';
		if(!this.usersFollowers || (this.usersFollowers && !_.include(this.usersFollowers.followers, Meteor.userId()))){
			return 'followedable btn-primary';
		}else {
			return 'followeddisable active';
		}
	},
	followedText: function(){
		if(!Meteor.user() || this.user._id === Meteor.userId()) return '';
		if(!this.usersFollowers || (this.usersFollowers && !_.include(this.usersFollowers.followers, Meteor.userId()))){
			return 'Theo dõi';
		}else {
			return 'Bỏ theo dõi';
		}
	},
	followsCount: function(){
		return this.usersFollows.count();
	},
	followersCount: function(){
		return this.usersFollowers?this.usersFollowers.followers.length:0;
	},
	followsTagsCount: function(){
		return TagsFollowers.find({followers: this.user._id}).count();
	},
	followsTags: function(){
		return TagsFollowers.find({followers: this.user._id});
	},
	usersFollowsHP: function(){
		return Meteor.users.find({_id: {$in: this.usersFollowers.followers}});
	},
	usersFollowersHP: function(){
		var users = [];
		this.usersFollows.forEach(function (element, index, array) {
          users.push(Meteor.users.findOne({_id: element.userId}));
   		 });
		return users;
	}
});

Template.userPage.events({
	'click .followedable': function(e){
		e.preventDefault();

		Meteor.call('followUser', this.user._id);

	},
	'click .followeddisable': function(e){
		e.preventDefault();

		Meteor.call('unfollowUser', this.user._id);
	},
});
