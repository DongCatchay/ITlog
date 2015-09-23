Template.userOnline.helpers({
	userOnline: function () {
		// Meteor.subscribe('users');
		return Meteor.users.find();
	}
});