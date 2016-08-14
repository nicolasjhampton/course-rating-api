'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
  user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
  title: String,
  description: String,
  estimatedTime: String,
  materialsNeeded: String,
  steps: [
            {
              stepNumber: Number,
              title: String,
              description: String
            }
          ],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

//var options = { ref: 'Review', localField: 'reviews', foreignField: '_id'}

CourseSchema.virtual('overallRating').get(function() {
  console.log('this');
  var total = this.reviews.reduce(function(previous, current) {
    return previous += current.rating;
  }, 0);
  return Math.ceil(total / this.reviews.length);
});

CourseSchema.set('toJSON', { getters: true });
CourseSchema.set('toObject', { getters: true });

var Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
