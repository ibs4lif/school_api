// JavaScript source code
var Comment = require('../models/comment.js');


exports.create = function (req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function (err) {
      if (err) {
          return next(err);
      }
      else {
          res.json(comment);
      }
  });
};


exports.list = function (req, res, next) {
    Comment.find({})
    .populate('updatedBy')
    .populate('createdBy')
    .exec(function (err, comments) {
      if (err) {
          return next(err);
      }
      else {
          res.json(comments);
          console.log(comments);
      }
    })
};

exports.favorites = function (req, res, next) {
    Comment.find({
      $and: [
             {"projectId": req.params.projectId},
             {"favorite": true}
         ]
     })
    .exec(function (err, comments) {
      if (err) {
          return next(err);
      }
      else {
          res.json(comments);
      }
    })
};


exports.update = function (req, res, next) {
    Comment.findByIdAndUpdate(req.params.id, req.body, function (err, comment) {
        if (err) {
            return next(err);
        }
        else {
            res.json(comment);
        }
    });
};

exports.addFavorite = function (req, res, next) {
    Comment.update({ _id: req.params.id }, {
        favorite: true
    }, function (err, comment) {
        if (err) {
            return next(err);
        }
        else {
            res.json(comment);
        }
    });
};

exports.removeFavorite = function (req, res, next) {
    Comment.update({ _id: req.params.id }, {
        favorite: false
    }, function (err, comment) {
        if (err) {
            return next(err);
        }
        else {
            res.json(comment);
        }
    });
};

exports.delete = function (req, res, next) {
    Comment.update({ _id: req.params.id }, {
        actif: false
    }, function (err, comment) {
        if (err) {
            return next(err);
        }
        else {
            res.json(comment);
        }
    });
};
