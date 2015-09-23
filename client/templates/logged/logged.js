Template.loggedButton.helpers({
	user: function () {
		var user = Meteor.user();
		if(user){
			return user.profile.name?user.profile.name:user.username;
		}
		return "notlogin";
	},
	userId: function(){
		return Meteor.userId();
	},
});

Template.loggedButton.events({
	'click .logout': function(){
		Meteor.logout();
	}
});