const Answer =
  require('../models/Answer')


// ==============================
// CREATE ANSWER
// ==============================

const createAnswer =
  async (req, res) => {

    try {

      const {
        questionId,
        answer,
        author
      } = req.body


      // Check required fields
      if (
        !questionId ||
        !answer ||
        !author
      ) {

        return res.status(400).json({
          message:
            'Please provide an answer'
        })

      }


      // Create answer
      const newAnswer =
        await Answer.create({

          questionId,

          answer:
            answer.trim(),

          author:
            author.trim()

        })


      // Send created answer
      // back to frontend
      res.status(201).json({

        message:
          'Answer posted successfully',

        answer:
          newAnswer

      })


    } catch (error) {

      console.error(
        'Create answer error:',
        error.message
      )

      res.status(500).json({

        message:
          'Could not create answer'

      })

    }

  }


// ==============================
// GET ANSWERS
// ==============================

const getAnswers =
  async (req, res) => {

    try {

      const answers =
        await Answer.find({

          questionId:
            req.params.questionId

        })
        .sort({

          createdAt: 1

        })


      res.status(200).json({

        answers

      })


    } catch (error) {

      console.error(
        'Get answers error:',
        error.message
      )

      res.status(500).json({

        message:
          'Could not get answers'

      })

    }

  }


// ==============================
// EXPORT
// ==============================

module.exports = {

  createAnswer,

  getAnswers

}