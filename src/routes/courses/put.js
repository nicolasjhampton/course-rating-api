'use strict';

module.exports = function(req, res, next) {
  var course = Object.assign(req.course, req.body);
  console.log(req.course);
  course.save(function(err) {
    if(err) return next(err);
    return res.status(204)
              .end();
  });
};
