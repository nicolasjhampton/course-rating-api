'use strict';

var express = require('express');
var router = express.Router();

var get = require('./get.js');
var post = require('./post.js');


router.get('/', get);
router.post('/', post);


module.exports = router;
