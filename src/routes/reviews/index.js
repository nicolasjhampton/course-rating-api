'use strict';

var router = require('express').router;

var del = require('./delete.js');
var post = require('./post.js');


router.delete('/:reviewId', del);
router.post('/', post);


module.exports = router;
