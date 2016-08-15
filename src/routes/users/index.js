'use strict';

var express = require('express');
var router = express.Router();

var authorize = require('../middleware/authorize.js');

var validatePost = require('./valid_post.js');

var get = require('./get.js');
var post = require('./post.js');
var allCourses = require('../courses/getall.js');


router.get('/', authorize, get);
router.post('/', validatePost, post, authorize, get);


module.exports = router;
