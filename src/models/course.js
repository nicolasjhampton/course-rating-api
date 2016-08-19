'use strict';

var mongoose = require('mongoose');
var Review = require('./review.js');
var Schema = mongoose.Schema;

var StepSchema = new Schema({
  stepNumber: Number,
  title: { type: String, required: [true, "Step requires a title"] },
  description: { type: String, required: [true, "Step requires a description"] }
});

var CourseSchema = new Schema({
  user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
  title: { type: String, required: [true, "title is required"] },
  description: { type: String, required: [true, "description is required"] },
  estimatedTime: String,
  materialsNeeded: String,
  steps: [StepSchema],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

CourseSchema.pre('save', function(next) {
  this.steps.forEach(function(current, index) {
    current.stepNumber = index + 1;
  });
  return next();
});

CourseSchema.path('steps').validate(function(steps) {
  return !(!steps || steps.length === 0);
}, "At least one step is required");


CourseSchema.virtual('overallRating').get(function() {
  var total = this.reviews.reduce(function(previous, current) {
    return previous += current.rating;
  }, 0);
  return Math.ceil(total / this.reviews.length);
});


var Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
