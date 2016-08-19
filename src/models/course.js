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

CourseSchema.path('steps').validate(function(steps, callback) {
  return callback(!(!steps || steps.length == 0));
}, "At least one step is required");

CourseSchema.pre('save', function(next) {
  if(this.steps == []) return next();
  this.steps.forEach(function(current, index) {
    current.stepNumber = index + 1;
  });
  return next();
});


// This makes sure that a user can't review their own project
// in the instructions, this is extra credit, but it states this
// should be on the review schema
CourseSchema.path('reviews').validate(function(reviews, callback) {
  var valid = true;
  var course = this;
  var counter = 0;
  if(reviews.length !== 0) {
    for(var i = 0; i < reviews.length; i++) {
      Review.findById(reviews[i])
            .populate('user')
            .select('user')
            .exec(function(err, reviewObj) {
              counter++;

              if(!reviewObj || !course.user._id) return callback(true);

              var reviewId = reviewObj.user._id;

              if(reviewId.toString() !== course.user._id.toString() && valid == true) {
                valid = false;
              }

              if(counter == (reviews.length - 1)) {
                console.log('result:', valid);
                return callback(valid);
              }
            });
    }
  } else {
    return callback(valid);
  }
}, "A user cannot post a review to their own course.");


CourseSchema.virtual('overallRating').get(function() {
  var total = this.reviews.reduce(function(previous, current) {
    return previous += current.rating;
  }, 0);
  return Math.ceil(total / this.reviews.length);
});


var Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
