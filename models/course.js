var mongoose = require('mongoose'),
moment = require('moment'),
Schema = mongoose.Schema;

var CourseSchema = new Schema({
	admin: { ref: "User", type: Schema.Types.ObjectId },
	createdBy: { ref: "User", type: Schema.Types.ObjectId },
	createdAt: { type: Date,  default: moment().format("YYYY-MM-DDTHH:mm:ss") },
	updatedBy: { ref: "User", type: Schema.Types.ObjectId },
	updatedAt: { type: Date ,  default: moment().format("YYYY-MM-DDTHH:mm:ss") },
	name: String,
	category: String,
	content: String,
	views:[{ ref: "User", type: Schema.Types.ObjectId }],
	// supports:[{ ref: "User", type: Schema.Types.ObjectId }],
	description: String,
	urlImage : String,
	// requests: [{ ref: "User", type: Schema.Types.ObjectId }],
	// participates: [{ ref: "User", type: Schema.Types.ObjectId }],
	follows: [{ ref: "User", type: Schema.Types.ObjectId }],
  actif: Boolean
});

CourseSchema.pre('save', function (next) {
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
module.exports = mongoose.model('Course', CourseSchema);
