validatePost = function (post) {
	var errors = {};
	if(!post.title){ errors.title = "Chưa có tựa đề";}
	if(!post.tags || post.tags.length==0){ errors.tags = "Chưa có chủ đề";}
	if(!post.content){ errors.content = "Chưa có nội dung";}

	post.tags.forEach(function (element, index, array) {
		if(element && !TagsFollowers.findOne({_id: element})){
			errors.tags = "Chủ đề chưa có";
			return errors;
		}
	});

	return errors;
}

validateProfile = function (profile) {
	var errors = {};
	if(!profile.username) {errors.username = "Chưa có tên đang nhap";}
	if(!profile.name) {errors.name = "Chưa có nickname";}
	if(!profile.emails) {errors.emails = "Chưa có E-mails";}

	return errors;
}

validatePassword = function (currentPassword, newPassword, confirmPassword){
	var errors = {};
	if(!currentPassword){ errors.currentPassword = "Chưa nhap mat khau cũ";}
	if(!newPassword){ errors.newPassword = "Chưa nhap mat khau mới";}
	if(!confirmPassword){ errors.confirmPassword = "Chưa nhap mat khau xac thực";}

	return errors;
}