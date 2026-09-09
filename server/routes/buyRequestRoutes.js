const express =
  require('express')

const {
  getMyBuyRequests
} =
  require('../controllers/buyRequestController')


const router =
  express.Router()


// GET MY BUY REQUESTS

router.get(
  '/my',
  getMyBuyRequests
)


module.exports =
  router