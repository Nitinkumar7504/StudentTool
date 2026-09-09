const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    subject: {
      type: String,
      required: true,
      trim: true
    },

    course: {
      type: String,
      required: true,
      trim: true
    },

    semester: {
      type: String,
      required: true,
      trim: true
    },

    fileName: {
      type: String,
      required: true
    },

    fileType: {
      type: String,
      required: true
    },

    filePath: {
      type: String,
      required: true
    },

    uploader: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
)

const Note = mongoose.model(
  'Note',
  noteSchema
)

module.exports = Note