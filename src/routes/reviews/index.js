'use strict';

var express = require('express');
var router = express.Router();

var del = require('./delete.js');
var post = require('./post.js');


router.delete('/:reviewId', del);
router.post('/', post);


module.exports = router;
