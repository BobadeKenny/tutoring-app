const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.userCategories = (function(){
	ac.grant("student")
	.extend("tutor")
	.readOwn("profile")
	.updateOwn("profile")

	ac.grant("tutor")
	.extend("student")
	.updateOwn("profile")
	.readOwn("profile")

	ac.grant("admin")
	.extend("tutor")
	.updateAny("profile")
	.deleteAny("profile")
	.readAny("profile")
})