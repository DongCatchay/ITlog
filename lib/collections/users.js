Meteor.methods({
	profileEdit: function(profileProperties){
		check(Meteor.userId(), String);
		check(profileProperties, {
			username: String,
			first_name: String,
			last_name: String,
			name: String,
			emails: String
		});

		var errors = validateProfile(profileProperties);
		if(errors.username || errors.name || errors.emails) {
			throw new Meteor.Error('invalid-post', 'You must set a username, nickname and E-mails for your profile');
		}

		if(!Meteor.user()){
			if(Meteor.isClient) throwError('Accsess denied');
			throw new Meteor.Error('Accsess denied', 'You must use own-account');
		}

		var username = Meteor.users.findOne({_id: {$ne: this.userId}, username: profileProperties});
		if(username){
			if(Meteor.isClient) throwError('Tên đang nhap đa được sử dụng');
			throw new Meteor.Error('Accsess denied', 'Tên đang nhap đa được sử dụng');
		}
		// var emails = Meteor.users.findOne({$or: [{emails: [{address: profileProperties.emails, verified: false}]},{emails: [{address: profileProperties.emails, verified: true}]}]});
		var emails = Meteor.users.findOne({'emails.address': profileProperties.emails});
		// var emails = Meteor.user().emails[0].address;
		if(emails && this.userId!=emails._id){
			if(Meteor.isClient) throwError('E-mail đa được sử dụng');
			throw new Meteor.Error('Accsess denied', 'E-mail đa được sử dụng');
		}

		Meteor.users.update({
				_id: this.userId,
			}, {
			$set: {
				// profile: postProperties,
				'profile.first_name': profileProperties.first_name,
				'profile.last_name': profileProperties.last_name,
				'profile.name': profileProperties.name,
				'username': profileProperties.username,
				'emails': [{address: profileProperties.emails, verified: emails?emails.emails[0].verified:false}], 
				
			}
		});
	},
});