'use strict';

var express = require('express');
var router = express.Router();

var authorize = require('../middleware/authorize.js');
var reviewId = require('../middleware/review_id.js');

var del = require('./delete.js');
var post = require('./post.js');

router.use(authorize);
router.param('reviewId', reviewId);

router.post('/', post);

// exceeds
router.put('/', function(req, res, next) {
  return res.status(403).json({ message: "Cannot edit a collection of reviews"});
});

router.delete('/', function(req, res, next) {
  return res.status(403).json({ message: "Cannot delete a collection of reviews"});
});

// Also include an Allow header with the value GET,PUT
var allowHeaders = function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'DELETE');
    next();
}

router.all('/:reviewId', allowHeaders);
router.delete('/:reviewId', del);

// exceeds
router.get('/:reviewId', function(req, res, next) {
  var message = "Cannot get a single review. Use the '/api/courses/:id' route instead to get the reviews for a specific course";
  return res.status(403).json({ message: message });
});

router.post('/:reviewId', function(req, res, next) {
  var message = "Use the '/api/courses/:courseId/reviews' route to create a review";
  return res.status(405).json({ message: message });
});

router.put('/:reviewId', function(req, res, next) {
  return res.status(403).json({ message: "Cannot edit a review"});
});


module.exports = router;
