'use strict';

function errorHandle(next, message = 'An undefined data error has occured', status = 500) {
  var err = new Error(message);
  err.status = status;
  return next(err);
}

module.exports = errorHandle;
