'use strict';

module.exports = function(req, res, next) {
  var course = Object.assign(req.course, req.body);
  course.save(function(err) {
    return res.json({data: [course]});
  });
};
