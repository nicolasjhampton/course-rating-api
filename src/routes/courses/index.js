'use strict';

var express = require('express');
var router = express.Router();

var authorize = require('../middleware/authorize.js');
var id = require('../middleware/course_id.js');

var getAll = require('./getall.js');
var get = require('./get.js');
var post = require('./post.js');
var put = require('./put.js');

router.param('courseId', id);

router.get('/', getAll);
router.post('/', authorize, post);
router.get('/:courseId', get);
router.put('/:courseId', authorize, put);


module.exports = router;
