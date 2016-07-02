// JavaScript source code
var Publication = require('../models/publication.js');


exports.create = function (req, res, next) {
    var publication = new Publication(req.body);
    publication.save(function (err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(publication);
        }
    });
};


exports.list = function (req, res, next) {
    Publication.find({})
    .populate('updatedBy')
    .populate('createdBy')
    .exec(function (err, publications) {
      if (err) {
          return next(err);
      }
      else {
          res.json(publications);
      }
    })
};


exports.update = function (req, res, next) {
    Publication.findByIdAndUpdate(req.params.id, req.body, function (err, publication) {
        if (err) {
            return next(err);
        }
        else {
            res.json(publication);
        }
    });
};

exports.delete = function (req, res, next) {
    Publication.update({ _id: req.params.id }, {
        actif: "0"
    }, function (err, publication) {
        if (err) {
            return next(err);
        }
        else {
            res.json(publication);
        }
    });
};
