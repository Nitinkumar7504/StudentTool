const express = require('express')

const wordUpload =
  require('../middleware/wordUpload')

const pdfUpload =
  require('../middleware/pdfUpload')

const {
  convertWordToPDF,
  convertPDFToWord
} =
  require('../controllers/pdfController')

const router =
  express.Router()

// Word → PDF
router.post(
  '/word-to-pdf',
  wordUpload.single('wordFile'),
  convertWordToPDF
)

// PDF → Word
router.post(
  '/pdf-to-word',
  pdfUpload.single('pdfFile'),
  convertPDFToWord
)

module.exports =
  router