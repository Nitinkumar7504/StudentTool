const express = require('express')

const upload =
  require('../middleware/wordUpload')

const {
  convertWordToPDF
} =
  require('../controllers/pdfController')


const router =
  express.Router()


router.post(
  '/word-to-pdf',
  upload.single('wordFile'),
  convertWordToPDF
)


module.exports =
  router