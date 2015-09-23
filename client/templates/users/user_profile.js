Template.userProfile.events({
	'submit .form-user': function (e) {
		e.preventDefault();

		var profileProperties = {
			username: $(e.target).find('[name=username]').val(),
			name: $(e.target).find('[name=nickname]').val(),
			first_name: $(e.target).find('[name=first-name]').val(),
			last_name: $(e.target).find('[name=last-name]').val(),
			emails: $(e.target).find('[name=email]').val(),
		}

		var errors = validateProfile(profileProperties);
		if(errors.username || errors.name || errors.emails) { return Session.set('profileEditErrors',errors);}

		Meteor.call('profileEdit', profileProperties, function(error, result){
			// display the error to user and abort
			if(error){ 
				throwError(error.reason);
				return;
			}

			//Show this result but rount anyway
			Router.go('userPage',{_id: Meteor.userId()});
		});
	},
	'submit .form-password': function(e){
		e.preventDefault();

		var currentPassword = $(e.target).find('[name=current-password]').val();
        var newPassword = $(e.target).find('[name=new-password]').val();
        var confirmPassword = $(e.target).find('[name=confỉrm-password]').val();

        var errors = validatePassword(currentPassword, newPassword, confirmPassword);
		if(errors.currentPassword || errors.newPassword || errors.confirmPassword) { return Session.set('passwordEditErrors',errors);}

        if (newPassword !== confirmPassword) {
        	throwError('Mat khau không khớp!');
        	return;
        };

        Accounts.changePassword(currentPassword, newPassword, function(errors){
        	if(errors){ throwError(errors.reason); return false;}
        	else { Router.go('userPage',{_id: Meteor.userId()});}
        });

        return;
	}
});

Template.userProfile.helpers({
	errorMessage: function(field){
		return Session.get('profileEditErrors')[field];
	},
	errorClass: function(field){
		return !!Session.get('profileEditErrors')[field]?'has-error':'';
	},
	errorMessagePassword: function(field){
		return Session.get('passwordEditErrors')[field];
	},
	errorClassPassword: function(field){
		return !!Session.get('passwordEditErrors')[field]?'has-error':'';
	},
});

Template.userProfile.created = function(){
	Session.set('profileEditErrors', {});
	Session.set('passwordEditErrors', {});
};