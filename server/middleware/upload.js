const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(
      null,
      'uploads/'
    )

  },


  filename: function (req, file, cb) {

    const uniqueName =
      Date.now() +
      '-' +
      Math.round(
        Math.random() * 1E9
      ) +
      path.extname(
        file.originalname
      )


    cb(
      null,
      uniqueName
    )

  }

})


const fileFilter = function (
  req,
  file,
  cb
) {

  const allowedTypes = [
    '.pdf',
    '.doc',
    '.docx'
  ]


  const extension =
    path.extname(
      file.originalname
    ).toLowerCase()


  if (
    allowedTypes.includes(
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
        'Only PDF, DOC and DOCX files are allowed'
      )

    error.code =
      'INVALID_FILE_TYPE'

    cb(
      error,
      false
    )

  }

}


const upload = multer({

  storage: storage,

  fileFilter:
    fileFilter,

  limits: {

    fileSize:
      10 * 1024 * 1024

  }

})


module.exports = upload