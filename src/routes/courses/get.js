'use strict';

module.exports = function(req, res, next) {
  return res.json({data:[req.course]});
};
