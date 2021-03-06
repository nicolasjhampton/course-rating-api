'use strict';

module.exports = function(req, res, next) {
  req.course
     .populate(
       {
         path: 'reviews',
         populate: { path: 'user' }
       },
       function(err, course) {
         return res.status(200)
                   .json(
                     { data:
                       [
                         course.toObject({ virtuals: true })
                       ] 
                     });
      });
};
