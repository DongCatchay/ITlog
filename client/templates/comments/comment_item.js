Template.commentItem.helpers({
	submittedText: function () {
		// return moment(this.submitted).fromNow();
		return Chronos.liveMoment(this.submitted).fromNow();
	},
	userPagePath: function(){
    return Router.routes.userPage.path({_id: this.userId});
  },
});