// JavaScript source code
var Like = require('../models/Like.js');


exports.create = function (req, res, next) {
  var like = new Like(req.body);
  like.save(function (err) {
      if (err) {
          return next(err);
      }
      else {
          res.json(like);
      }
  });
};


exports.list = function (req, res, next) {
    Like.find({})
    .populate('updatedBy')
    .populate('createdBy')
    .exec(function (err, likes) {
      if (err) {
          return next(err);
      }
      else {
          res.json(likes);
          console.log(Likes);
      }
    })
};


exports.update = function (req, res, next) {
    Like.findByIdAndUpdate(req.params.id, req.body, function (err, like) {
        if (err) {
            return next(err);
        }
        else {
            res.json(like);
        }
    });
};

exports.delete = function (req, res, next) {
    Like.update({ _id: req.params.id }, {
        actif: "0"
    }, function (err, like) {
        if (err) {
            return next(err);
        }
        else {
            res.json(like);
        }
    });
};
