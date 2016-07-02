var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var UserSchema = new Schema({
	userName: String,
	name: String,
	pict: String,
	email: String,
  actif: Boolean,
	title: String,
	twitterLink: String,
	facebooLink: String,
	googleplusLink: String,
	linkinLink: String,
	description: String,
	interests: String,
	domain: String,
	contacts: [{ ref: "User", type: Schema.Types.ObjectId }],
	userRequests: [{ ref: "User", type: Schema.Types.ObjectId }],
	// projects: [{ ref: "Project", type: Schema.Types.ObjectId }],
//	projectsFollows: [{ ref: "Project", type: Schema.Types.ObjectId }],
});

module.exports = mongoose.model('User', UserSchema);
