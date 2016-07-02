// JavaScript source code
var Discussion = require('../models/discussion.js');


exports.create = function (req, res, next) {
  var discussion = new Discussion(req.body);
  discussion.save(function (err) {
      if (err) {
          return next(err);
      }
      else {
          res.json(discussion);
      }
  });
};


exports.list = function (req, res, next) {
    Discussion.find({})
    .populate('updatedBy')
    .populate('createdBy')
    .exec(function (err, discussions) {
      if (err) {
          return next(err);
      }
      else {
          res.json(discussions);
      }
    })

};


exports.update = function (req, res, next) {
    Discussion.findByIdAndUpdate(req.params.id, req.body, function (err, discussion) {
        if (err) {
            return next(err);
        }
        else {
            res.json(discussion);
        }
    });
};

exports.delete = function (req, res, next) {
    Discussion.update({ _id: req.params.id }, {
        actif: "0"
    }, function (err, discussion) {
        if (err) {
            return next(err);
        }
        else {
            res.json(discussion);
        }
    });
};
