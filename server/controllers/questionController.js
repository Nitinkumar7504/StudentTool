const Question =
  require('../models/Question')

const fs =
  require('fs')

const path =
  require('path')


// =====================================
// CREATE QUESTION
// =====================================

const createQuestion =
  async (req, res) => {

    try {

      const {
        question,
        author
      } = req.body


      // Check required fields
      if (
        !question ||
        !author
      ) {

        return res.status(400).json({
          message:
            'Please enter your question'
        })

      }


      const questionData = {

        question:
          question.trim(),

        author:
          author.trim()

      }


      // Add image if uploaded
      if (req.file) {

        questionData.image =
          req.file.path

      }


      const newQuestion =
        await Question.create(
          questionData
        )


      res.status(201).json({

        message:
          'Question posted successfully',

        question:
          newQuestion

      })

    } catch (error) {

      console.error(
        'Create question error:',
        error.message
      )


      // Delete uploaded image
      // if database operation failed
      if (req.file) {

        const imagePath =
          path.resolve(
            req.file.path
          )

        if (
          fs.existsSync(
            imagePath
          )
        ) {

          fs.unlinkSync(
            imagePath
          )

        }

      }


      res.status(500).json({

        message:
          'Could not create question'

      })

    }

  }


// =====================================
// GET ALL QUESTIONS
// =====================================

const getQuestions =
  async (req, res) => {

    try {

      const questions =
        await Question.find()
          .sort({
            createdAt: -1
          })


      res.status(200).json({

        questions

      })

    } catch (error) {

      console.error(
        'Get questions error:',
        error.message
      )


      res.status(500).json({

        message:
          'Could not get questions'

      })

    }

  }


// =====================================
// GET MY QUESTIONS
// =====================================

const getMyQuestions =
  async (req, res) => {

    try {

      const author =
        req.query.author


      // Check author
      if (!author) {

        return res.status(400).json({

          message:
            'Author is required'

        })

      }


      const questions =
        await Question.find({

          author:
            author.trim()

        })
        .sort({

          createdAt: -1

        })


      res.status(200).json({

        questions

      })

    } catch (error) {

      console.error(
        'Get my questions error:',
        error.message
      )


      res.status(500).json({

        message:
          'Could not get your questions'

      })

    }

  }


// =====================================
// EXPORT
// =====================================

module.exports = {

  createQuestion,

  getQuestions,

  getMyQuestions

}