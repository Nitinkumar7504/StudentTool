const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadDirectory =
  path.join(
    __dirname,
    '../uploads'
  )

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(
    uploadDirectory,
    {
      recursive: true
    }
  )
}

const storage =
  multer.diskStorage({
    destination: (
      req,
      file,
      cb
    ) => {
      cb(
        null,
        uploadDirectory
      )
    },

    filename: (
      req,
      file,
      cb
    ) => {
      const extension =
        path.extname(
          file.originalname
        )

      const filename =
        `word-${Date.now()}${extension}`

      cb(
        null,
        filename
      )
    }
  })

const fileFilter =
  (
    req,
    file,
    cb
  ) => {

    const allowedExtensions = [
      '.doc',
      '.docx'
    ]

    const extension =
      path
        .extname(
          file.originalname
        )
        .toLowerCase()

    if (
      allowedExtensions.includes(
        extension
      )
    ) {
      cb(
        null,
        true
      )
    } else {
      const error =
        new Error(
          'Only .doc and .docx files are allowed.'
        )

      error.code =
        'INVALID_WORD_FILE'

      cb(
        error
      )
    }
  }

const upload =
  multer({
    storage,
    fileFilter,

    limits: {
      fileSize:
        10 * 1024 * 1024
    }
  })

module.exports =
  upload