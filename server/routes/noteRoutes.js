const express = require('express')


const {
  createNote,
  getNotes,
  deleteNote
} = require('../controllers/noteController')


const upload =
  require('../middleware/upload')


const router =
  express.Router()


// CREATE NOTE
router.post(
  '/',
  upload.single('file'),
  (error, req, res, next) => {

    if (error) {

      if (
        error.code ===
        'LIMIT_FILE_SIZE'
      ) {

        return res.status(400).json({
          message:
            'File size must be 10 MB or less'
        })

      }


      if (
        error.code ===
        'INVALID_FILE_TYPE'
      ) {

        return res.status(400).json({
          message:
            'Only PDF, DOC and DOCX files are allowed'
        })

      }


      return res.status(400).json({
        message:
          error.message ||
          'File upload failed'
      })

    }


    next()

  },
  createNote
)


// GET NOTES
router.get(
  '/',
  getNotes
)


// DELETE NOTE
router.delete(
  '/:id',
  deleteNote
)


module.exports =
  router