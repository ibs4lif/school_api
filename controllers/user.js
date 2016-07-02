// JavaScript source code
var User = require('../models/user.js');
var Comment = require('../models/comment.js');
var Discussion = require('../models/discussion.js');
var Publication = require('../models/publication.js');
var Project = require('../models/project.js');

exports.create = function (req, res, next) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(user);
        }
    });

};

exports.searchUsers = function (req, res, next) {
  var textSearch = ".*" + req.params.search + ".*";
  var query = User.find({
      $and: [
        { $or: [
            {"userName": { $regex: new RegExp(textSearch, "i")}},
            {"name": { $regex: new RegExp(textSearch, "i")}},
            {"email": { $regex: new RegExp(textSearch, "i")}},
            {"title": { $regex: new RegExp(textSearch, "i")}},
            {"description": { $regex: new RegExp(textSearch, "i")}},
            {"interests": { $regex: new RegExp(textSearch, "i")}},
            {"domain": { $regex: new RegExp(textSearch, "i")}},
        ]},
          ]
      }).limit(20);
  query
      .where('actif', '1')
      .exec(function (err, users) {
          if (err) {
              return next(err);
          }
          else {
              users = users.sort(function (a, b) {
                  return (a.updatedAt < b.updatedAt)
                  ? 1 : (a.updatedAt > b.updatedAt) ? -1 : 0;
              });
               res.json(users);
          }

  });
};

exports.userById = function (req, res, next) {
    User.findOne({
        _id: req.params.userId
    }).populate('contacts')
    .populate('userRequests')
    .populate('projects')
    .exec(function (err, user) {
        if (err) {
            return next(err);
        }
        else {
            res.json(user);
        }

    });
};
exports.createComment = function (req, res, next) {
    var comment = new Comment(req.body);
    comment.save(function (err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(user);
        }
    });
};

exports.list = function (req, res, next) {
    User.find({})
    .exec( function (err, users) {
        if (err) {
            return next(err);
        }
        else {
            res.json(users);
            console.log(users);
        }
    })
};

// exports.list = function (req, res, next) {
//     User.find({}, function (err, users) {
//         if (err) {
//             return next(err);
//         }
//         else {
//             res.json(users);
//             console.log(users);
//         }
//     });
// };


exports.update = function (req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
        if (err) {
            return next(err);
        }
        else {
            res.json(user);
        }
    });
};

exports.addRequest = function (req, res, next) {

    User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { "userRequests":  req.body[0]  } },
                { safe: true, upsert: true, new: true }
            ).populate('userRequests')
            .populate('projects')
            .exec(function(err, user) {
                if (err) {
                    // ...
                } else {
                    res.json(user);
                }
        });
};
exports.removeRequest = function (req, res, next) {
        User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $pull: { "userRequests":  req.body[0]  } },
                { safe: true, upsert: true, new: true }
              ).populate('userRequests')
              .populate('projects')
              .exec(function(err, user) {
                  if (err) {
                      // ...
                  } else {
                      res.json(user);
                  }
          });
};


exports.approveRequest = function (req, res, next) {
  console.log(req.body[0]);
    User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { "contacts":  req.body[0]  } },
                { safe: true, upsert: true, new: true }
              ).populate('contacts')
              .populate('projects')
              .exec(function(err, user) {
                  if (err) {
                      // ...
                  } else {
                    User.findByIdAndUpdate(
                                { _id: req.params.userId },
                                 { $pull: { "userRequests":  req.body[0]  } },
                                { safe: true, upsert: true, new: true }
                              ).populate('contacts')
                              .populate('projects')
                              .exec(function(err, user) {
                                  if (err) {
                                      // ...
                                  } else {
                                      res.json(user);
                                  }
                          });
                        }
          });
};


exports.activitiesComments = function (req, res, next) {
  User.findOne({
      _id: req.params.userId
  },
  function (err, user) {
      if (err) {
          callback(err);
      }
      else {
            Comment.find().populate({
              path: 'projectId',
              match: {
                updatedBy: { $in: user.contacts }
              }
            }).populate({
              path: 'updatedBy',
              match: {
                _id: { $in: user.contacts }
              }
            }).populate('createdBy')
            .populate('updatedBy').exec(function(err, comments) {
              //comments = comments.filter(function(comment) {
                res.json(comments);
            //  });
            });
        }
  });

};


exports.activitiesPublications = function (req, res, next) {
  User.findOne({
      _id: req.params.userId
  },
  function (err, user) {
      if (err) {
          callback(err);
      }
      else {
            Publication.find().populate({
              path: 'projectId',
              match: {
                updatedBy: { $in: user.contacts }
              }
            }).populate({
              path: 'updatedBy',
              match: {
                _id: { $in: user.contacts }
              }
            }).populate('createdBy')
            .populate('updatedBy').exec(function(err, publications) {
              //publications = publications.filter(function(publication) {
              res.json(publications);
            //  });
            });
        }
  });

};
exports.activitiesDiscussions = function (req, res, next) {
  User.findOne({
      _id: req.params.userId
  },
  function (err, user) {
      if (err) {
          callback(err);
      }
      else {
            Discussion.find().populate({
              path: 'projectId',
              match: {
                updatedBy: { $in: user.contacts }
              }
            }).populate({
              path: 'updatedBy',
              match: {
                _id: { $in: user.contacts }
              }
            }).populate('createdBy')
            .populate('updatedBy').exec(function(err, discussions) {
            //  discussions = discussions.filter(function(discussion) {
                res.json(discussions);
              //});
            });
        }
  });

};

exports.activities = function (req, res, next) {

  var commentsActivities;
  var discussionsActivities;
  var publicationsActivities;

  Comment.find(
    {
    $and: [
      { 'updatedAt': { $lt: new Date(req.params.date) } },
      {  'updatedBy': req.params.userId }
    //  { 'actif': "1" },
  ]
    }
  ).limit(30)
  .populate('updatedBy')
  .populate('createdBy')
  .populate('projects')
  .exec(function (err, comments) {
    if (err) {
        return next(err);
    }
    else {
        commentsActivities = comments;
      //  res.json(comments);
        Publication.find(
          {
          $and: [
            { 'updatedAt': { $lt: new Date(req.params.date) } },
            {  'updatedBy': req.params.userId },
            //  { 'actif': "1" },
          ]
          }
        ).limit(30)
        .populate('updatedBy')
        .populate('createdBy')
        .populate('projects')
        .exec(function (err, publications) {
          if (err) {
              return next(err);
          }
          else {
              publicationsActivities = publications;
              Discussion.find(
                {
                $and: [
                  { 'updatedAt': { $lt: new Date(req.params.date) } },
                  {  'updatedBy': req.params.userId },
                  //  { 'actif': "1" },
                ]
                }
              ).limit(30)
              .populate('updatedBy')
              .populate('createdBy')
              .populate('projects')
              .exec(function (err, discussions) {
                if (err) {
                    return next(err);
                }
                else {
                    discussionsActivities = discussions;
                    var results = commentsActivities.concat(publicationsActivities).concat(discussionsActivities);

                   results = results.sort(function (a, b) {
                       return (a.updatedAt < b.updatedAt)
                         ? 1 : (a.updatedAt > b.updatedAt) ? -1 : 0;
                    });
                    results = results.slice(0,20);
                    res.json(results);

                }
              })
            }
        })
    }
  })




};


exports.delete = function (req, res, next) {
    User.update({ _id: req.params.id }, {
        actif: "0"
    }, function (err, user) {
        if (err) {
            return next(err);
        }
        else {
            res.json(user);
        }
    });
};
