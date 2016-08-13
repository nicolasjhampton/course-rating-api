'use strict';

var router = require('express').router;

var get = require('./get.js');
var post = require('./post.js');


router.get('/', get);
router.post('/', post);


module.exports = router;
