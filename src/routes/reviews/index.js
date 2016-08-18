'use strict';

var express = require('express');
var router = express.Router();

var authorize = require('../middleware/authorize.js');
var reviewId = require('../middleware/review_id.js');

var del = require('./delete.js');
var post = require('./post.js');

router.use(authorize);
router.param('reviewId', reviewId);

router.delete('/:reviewId', del);
router.post('/', post);


module.exports = router;
