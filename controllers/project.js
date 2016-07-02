// JavaScript source code
var Project = require('../models/project.js');
var User = require('../models/user.js');
var Comment = require('../models/comment.js');
var Discussion = require('../models/discussion.js');
var Publication = require('../models/publication.js');


exports.create = function (req, res, next) {
    var project = new Project(req.body);
    project.save(function (err) {
        if (err) {
            return next(err);
        }
        else {
        /*  User.findByIdAndUpdate(
                      { _id: project.createdBy },
                      { $addToSet: { "projects":  project._id  } },
                      { safe: true, upsert: true, new: true }
                  )
                  .exec(function(err, user) {
                      if (err) {
                          // ...
                      } else {
                        res.json(project);
                      }
              });*/
              res.json(project);

        }
    });
};

exports.addView = function (req, res, next) {

    Project.findByIdAndUpdate(
                { _id: req.params.projectId },
                { $addToSet: { "views":  req.body[0]  } },
                { safe: true, upsert: true, new: true }
            )
            .exec(function(err, project) {
                if (err) {
                    // ...
                } else {
                    res.json(project);
                }
        });
};

exports.removeView = function (req, res, next) {

    Project.findByIdAndUpdate(
                { _id: req.params.projectId },
                { $pull: { "views":  req.body[0]  } },
                { safe: true, upsert: true, new: true }
            )
            .exec(function(err, project) {
                if (err) {
                    // ...
                } else {
                    res.json(project);
                }
        });
};

exports.addRequest = function (req, res, next) {

    Project.findByIdAndUpdate(
                { _id: req.params.projectId },
                { $addToSet: { "requests":  req.body[0]  } },
                { safe: true, upsert: true, new: true }
            )
            .populate('participates')
            .populate('follows')
            .populate('requests')
            .exec(function(err, project) {
                if (err) {
                    // ...
                } else {
                    res.json(project);
                }
        });
};

exports.removeRequest = function (req, res, next) {

    Project.findByIdAndUpdate(
                { _id: req.params.projectId },
                { $pull: { "requests":  req.body[0]  } },
                { safe: true, upsert: true, new: true }
            )
            .populate('participates')
            .populate('follows')
            .populate('requests')
            .exec(function(err, project) {
                if (err) {
                    // ...
                } else {
                    res.json(project);
                }
        });
};

exports.approveRequest = function (req, res, next) {
    Project.findByIdAndUpdate(
                { _id: req.params.projectId },
                { $addToSet: { "participates":  req.body[0]  } },
                { safe: true, upsert: true, new: true }
              )
              .populate('participates')
              .populate('follows')
              .populate('requests')
              .exec(function(err, project) {
                  if (err) {
                      // ...
                  } else {
                    Project.findByIdAndUpdate(
                                { _id: req.params.projectId },
                                 { $pull: { "requests":  req.body[0]  } },
                                { safe: true, upsert: true, new: true }
                              )
                              .populate('participates')
                              .populate('follows')
                              .populate('requests')
                              .exec(function(err, project) {
                                  if (err) {
                                      // ...
                                  } else {
                                      res.json(project);
                                  }
                          });
                        }
          });
};

exports.followProject = function (req, res, next) {

    Project.findByIdAndUpdate(
                { _id: req.params.projectId },
                { $addToSet: { "follows":  req.body[0]  } },
                { safe: true, upsert: true, new: true }
            )
            .exec(function(err, project) {
                if (err) {
                    // ...
                } else {
                    res.json(project);
                }
        });
};

exports.unFollowProject = function (req, res, next) {
        Project.findByIdAndUpdate(
                { _id: req.params.projectId },
                { $pull: { "follows":  req.body[0]  } },
                { safe: true, upsert: true, new: true }
              )
              .exec(function(err, project) {
                  if (err) {
                      // ...
                  } else {
                      res.json(project);
                  }
          });
};

exports.activitiesComments = function (req, res, next) {

            Comment.find({'projectId':{ $in:  req.params.projectId }}).populate('createdBy')
            .populate('updatedBy').exec(function(err, comments) {
              if (err) {
                res.json(err);
              } else {
                  res.json(comments);
              }
            });

};


exports.activitiesPublications = function (req, res, next) {

            Publication.find({'projectId':{ $in:  req.params.projectId }}).populate('createdBy')
            .populate('updatedBy').exec(function(err, publications) {
              if (err) {
                res.json(err);
              } else {
                  res.json(publications);
              }
            });

};
exports.activitiesDiscussions = function (req, res, next) {

            Discussion.find({'projectId':{ $in:  req.params.projectId }}).populate('createdBy')
            .populate('updatedBy').exec(function(err, discussions) {
              if (err) {
                res.json(err);
              } else {
                  res.json(discussions);
              }
            });

};


exports.addSupport = function (req, res, next) {

    Project.findByIdAndUpdate(
                { _id: req.params.projectId },
                { $addToSet: { "supports":  req.body[0]  } },
                { safe: true, upsert: true, new: true }
            )
            .exec(function(err, project) {
                if (err) {
                    // ...
                } else {
                    res.json(project);
                }
        });
};

exports.removeSupport = function (req, res, next) {

    Project.findByIdAndUpdate(
                { _id: req.params.projectId },
                { $pull: { "supports":  req.body[0]  } },
                { safe: true, upsert: true, new: true }
            )
            .exec(function(err, project) {
                if (err) {
                    // ...
                } else {
                    res.json(project);
                }
        });
};

exports.projectById = function (req, res, next) {
    Project.findOne({
        _id: req.params.projectId
    }).populate('createdBy')
    .populate('participates')
    .populate('follows')
    .populate('requests')
    .exec(function (err, project) {
        if (err) {
            return next(err);
        }
        else {
            res.json(project);
        }

    });
};

exports.list = function (req, res, next) {
  Project.find({})
  .populate('createdBy')
  .exec(function(err, projects) {
    res.json(projects);
  });
};

exports.listUser = function (req, res, next) {
    Project.find({
     $or: [
            {"participates": req.params.userId},
            {"follows": req.params.userId},
        ]
    })
    .populate('createdBy')
    .exec(function(err, projects) {
      res.json(projects);
    });
};


exports.update = function (req, res, next) {
    Project.findByIdAndUpdate(req.params.id, req.body, function (err, project) {
        if (err) {
            return next(err);
        }
        else {
            res.json(project);
        }
    });
};

exports.delete = function (req, res, next) {
    Project.update({ _id: req.params.id }, {
        actif: "0"
    }, function (err, project) {
        if (err) {
            return next(err);
        }
        else {
            res.json(project);
        }
    });
};
