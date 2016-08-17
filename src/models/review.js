'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
  postedOn: { type: Date, default: Date.now },
  rating: {
            type: Number,
            required: [true, "A rating is required"],
            min: [1, "Rating must be between 1 and 5"],
            max: [5, "Rating must be between 1 and 5"]
          },
  review: String
});

var Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
