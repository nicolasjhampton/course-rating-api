'use strict';

var express = require('express');
var router = express.Router();

var authorize = require('../middleware/authorize.js');
var courseId = require('../middleware/course_id.js');
var reviewId = require('../middleware/review_id.js');

var del = require('./delete.js');
var post = require('./post.js');

router.param('courseId', courseId);
router.param('reviewId', reviewId);
router.use(authorize);

// DELETE /api/courses/:courseId/reviews/:id 204 - Deletes the
// specified review and returns no content
router.delete('/:reviewId', del);

// POST /api/courses/:courseId/reviews 201 - Creates a review
// for the specified course ID, sets the Location header to
// the related course, and returns no content
router.post('/', post);


module.exports = router;
