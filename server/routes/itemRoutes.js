const express =
  require('express')


const {
  createItem,
  getItems,
  getMyItems,
  deleteItem,
  sendBuyRequest
} =
  require(
    '../controllers/itemController'
  )


const upload =
  require(
    '../middleware/itemUpload'
  )


const router =
  express.Router()


// =====================================
// CREATE ITEM
// =====================================

router.post(
  '/',
  upload.single('image'),

  (error, req, res, next) => {

    if (error) {

      if (
        error.code ===
        'LIMIT_FILE_SIZE'
      ) {

        return res.status(400).json({

          message:
            'Image size must be 5 MB or less'

        })

      }


      if (
        error.code ===
        'INVALID_FILE_TYPE'
      ) {

        return res.status(400).json({

          message:
            'Only JPG, JPEG, PNG and WEBP images are allowed'

        })

      }


      return res.status(400).json({

        message:
          error.message ||
          'Image upload failed'

      })

    }


    next()

  },

  createItem
)


// =====================================
// SEND BUY REQUEST
// =====================================

// IMPORTANT:
// This must come BEFORE /:id

router.post(
  '/:id/buy',
  sendBuyRequest
)


// =====================================
// GET MY ITEMS
// =====================================

router.get(
  '/my',
  getMyItems
)


// =====================================
// GET ALL ITEMS
// =====================================

router.get(
  '/',
  getItems
)


// =====================================
// DELETE ITEM
// =====================================

router.delete(
  '/:id',
  deleteItem
)


module.exports =
  router