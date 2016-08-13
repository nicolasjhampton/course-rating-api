'use strict';

var router = require('express').router;

var getAll = require('./getall.js');
var get = require('./get.js');
var post = require('./post.js');
var put = require('./put.js');


router.get('/', getAll);
router.post('/', post);
router.get('/:courseId', get);
router.put('/:courseId', put);


module.exports = router;
