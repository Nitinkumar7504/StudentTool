const mongoose = require('mongoose')


const answerSchema =
  new mongoose.Schema(
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
      },

      answer: {
        type: String,
        required: true,
        trim: true
      },

      author: {
        type: String,
        required: true,
        trim: true
      }
    },
    {
      timestamps: true
    }
  )


const Answer =
  mongoose.model(
    'Answer',
    answerSchema
  )


module.exports =
  Answer