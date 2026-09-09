const express =
  require('express')


const {
  createQuestion,
  getQuestions
} =
  require(
    '../controllers/questionController'
  )


const upload =
  require(
    '../middleware/questionUpload'
  )


const router =
  express.Router()


// CREATE QUESTION
router.post(
  '/',
  upload.single('image'),
  createQuestion
)


// GET QUESTIONS
router.get(
  '/',
  getQuestions
)


module.exports =
  router