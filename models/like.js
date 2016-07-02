var mongoose = require('mongoose'),
moment = require('moment'),
Schema = mongoose.Schema;

var LikeSchema = new Schema({
	createdBy: { ref: "User", type: Schema.Types.ObjectId },
	createdAt: { type: Date },
	updatedBy: { ref: "User", type: Schema.Types.ObjectId },
	updatedAt: { type: Date},
	type: {type: String, default: "Like" },
	actif: Boolean,
  projectId: { ref: "Project", type: Schema.Types.ObjectId },
	discussionId: { ref: "Discussion", type: Schema.Types.ObjectId },
	publicationId: { ref: "Publication", type: Schema.Types.ObjectId },
	commentId: { ref: "Comment", type: Schema.Types.ObjectId },
});

LikeSchema.pre('save', function (next) {
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
module.exports = mongoose.model('Like', LikeSchema);
