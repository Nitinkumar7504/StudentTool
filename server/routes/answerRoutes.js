const express =
  require('express')

const {
  createAnswer,
  getAnswers
} =
  require(
    '../controllers/answerController'
  )

const router =
  express.Router()


// CREATE ANSWER
router.post(
  '/',
  createAnswer
)


// GET ANSWERS
router.get(
  '/:questionId',
  getAnswers
)


module.exports =
  router