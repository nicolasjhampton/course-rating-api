'use strict';

var express = require('express');
var router = express.Router();

var getAll = require('./getall.js');
var get = require('./get.js');
var post = require('./post.js');
var put = require('./put.js');
var id = require('./id.js');


router.get('/', getAll);
router.post('/', post);
router.param('courseId', id);
router.get('/:courseId', get);
router.put('/:courseId', put);


module.exports = router;
