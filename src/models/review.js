'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
  postedOn: Date,
  rating: Number,
  review: String,
  materialsNeeded: String
});

var Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
