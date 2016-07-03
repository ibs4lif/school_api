// JavaScript source code
var Project = require('../models/project.js');
var Course = require('../models/course.js');
var User = require('../models/user.js');
var Comment = require('../models/comment.js');
var Discussion = require('../models/discussion.js');
var Publication = require('../models/publication.js');


exports.create = function (req, res, next) {
    var course = new Course(req.body);
    course.save(function (err) {
        if (err) {
            return next(err);
        }
        else {
              res.json(course);

        }
    });
};

exports.addView = function (req, res, next) {

    Course.findByIdAndUpdate(
                { _id: req.params.courseId },
                { $addToSet: { "views":  req.body[0]  } },
                { safe: true, upsert: true, new: true }
            )
            .exec(function(err, course) {
                if (err) {
                    // ...
                } else {
                    res.json(course);
                }
        });
};



exports.followCourse = function (req, res, next) {

    Course.findByIdAndUpdate(
                { _id: req.params.courseId },
                { $addToSet: { "follows":  req.body[0]  } },
                { safe: true, upsert: true, new: true }
            )
            .exec(function(err, course) {
                if (err) {
                    // ...
                } else {
                    res.json(course);
                }
        });
};

exports.unFollowCourse = function (req, res, next) {
        Course.findByIdAndUpdate(
                { _id: req.params.courseId },
                { $pull: { "follows":  req.body[0]  } },
                { safe: true, upsert: true, new: true }
              )
              .exec(function(err, course) {
                  if (err) {
                      // ...
                  } else {
                      res.json(course);
                  }
          });
};



exports.courseById = function (req, res, next) {
    Course.findOne({
        _id: req.params.courseId
    }).populate('createdBy')
    .populate('participates')
    .populate('follows')
    .populate('requests')
    .exec(function (err, course) {
        if (err) {
            return next(err);
        }
        else {
            res.json(course);
        }

    });
};

exports.list = function (req, res, next) {
  Course.find({})
//   .populate('createdBy')
  .exec(function(err, courses) {
    res.json(courses);
  });
};

exports.listUser = function (req, res, next) {
    Course.find({
     $or: [
            {"participates": req.params.userId},
            {"follows": req.params.userId},
        ]
    })
    .populate('createdBy')
    .exec(function(err, courses) {
      res.json(courses);
    });
};


exports.update = function (req, res, next) {
    Course.findByIdAndUpdate(req.params.id, req.body, function (err, course) {
        if (err) {
            return next(err);
        }
        else {
            res.json(course);
        }
    });
};

exports.delete = function (req, res, next) {
    Course.update({ _id: req.params.id }, {
        actif: "0"
    }, function (err, course) {
        if (err) {
            return next(err);
        }
        else {
            res.json(course);
        }
    });
};
