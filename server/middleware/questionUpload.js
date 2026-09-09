const multer = require('multer')
const path = require('path')


const storage =
  multer.diskStorage({

    destination:
      function (req, file, cb) {

        cb(
          null,
          'uploads/'
        )

      },


    filename:
      function (req, file, cb) {

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


const fileFilter =
  function (req, file, cb) {

    const allowedTypes = [
      '.jpg',
      '.jpeg',
      '.png',
      '.webp'
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

      cb(
        new Error(
          'Only JPG, JPEG, PNG and WEBP images are allowed'
        )
      )

    }

  }


const upload =
  multer({

    storage,

    fileFilter,

    limits: {
      fileSize:
        5 * 1024 * 1024
    }

  })


module.exports =
  upload