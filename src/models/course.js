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

var Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
