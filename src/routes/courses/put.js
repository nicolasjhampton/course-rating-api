'use strict';

module.exports = function(req, res, next) {
  var course = Object.assign(req.course.toObject(), req.body);
  course.save(function(err) {
    if(err) return next(err);
    return res.status(204)
              .end();
  });
};
