var mongoose = require('mongoose'),
moment = require('moment'),
Schema = mongoose.Schema;

var DiscussionSchema = new Schema({
	createdBy: { ref: "User", type: Schema.Types.ObjectId },
	createdAt: { type: Date },
	updatedBy: { ref: "User", type: Schema.Types.ObjectId },
	updatedAt: { type: Date},
	type: {type: String, default: "Discussion" },
	job:String,
	content: String,
	projectId: { ref: "Project", type: Schema.Types.ObjectId },

});
DiscussionSchema.pre('save', function (next) {
    now = moment().format("YYYY-MM-DDTHH:mm:ss");
    this.updatedAt = now;
		if (!this.createdAt) {
        this.createdAt = now;
    }
		if (!this.updatedAt) {
        this.updatedAt = now;
    }
    next();
});
module.exports = mongoose.model('Discussion', DiscussionSchema);
