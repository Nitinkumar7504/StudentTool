const express =
  require('express')

const mergeUpload =
  require('../middleware/mergeUpload')

const {
  mergePDFs
} =
  require('../controllers/mergeController')

const router =
  express.Router()


router.post(
  '/',
  mergeUpload.array(
    'pdfFiles',
    10
  ),
  mergePDFs
)


module.exports =
  router