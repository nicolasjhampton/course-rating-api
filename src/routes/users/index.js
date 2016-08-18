'use strict';

var express = require('express');
var router = express.Router();

var authorize = require('../middleware/authorize.js');

var get = require('./get.js');
var post = require('./post.js');
var allCourses = require('../courses/getall.js');

router.post('/', post);
router.get('/', authorize, get);


module.exports = router;
