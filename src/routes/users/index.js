'use strict';

var express = require('express');
var router = express.Router();

var authorize = require('../middleware/authorize.js');

var get = require('./get.js');
var post = require('./post.js');
var allCourses = require('../courses/getall.js');

// Update all routes that require authentication to check for
// the current user and return a 401 HTTP status code if
// not available.
// POST /api/users requires authentication?
// How would you ever create a user if you need authentication
// before you create authentication?

router.post('/', post);
router.get('/', authorize, get);


module.exports = router;
