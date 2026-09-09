import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Questions.css'

function Questions() {

  const [questions, setQuestions] =
    useState([])

  const [answers, setAnswers] =
    useState({})

  const [loading, setLoading] =
    useState(true)


  // GET QUESTIONS
  useEffect(() => {

    async function fetchQuestions() {

      try {

        const response =
          await fetch(
            'https://studenttool.onrender.com/api/questions'
          )

        const data =
          await response.json()

        if (!response.ok) {
          throw new Error(
            data.message ||
            'Could not get questions'
          )
        }

        setQuestions(
          data.questions
        )

      } catch (error) {

        console.error(
          'Fetch questions error:',
          error
        )

        alert(
          'Could not load questions.'
        )

      } finally {

        setLoading(false)

      }

    }

    fetchQuestions()

  }, [])


  // GET ANSWERS FOR ONE QUESTION
  async function fetchAnswers(questionId) {

    try {

      const response =
        await fetch(
          `https://studenttool.onrender.com/api/answers/${questionId}`
        )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
          'Could not get answers'
        )
      }

      setAnswers(
        previousAnswers => ({
          ...previousAnswers,

          [questionId]: {
            list:
              data.answers,
            text:
              previousAnswers[
                questionId
              ]?.text || ''
          }
        })
      )

    } catch (error) {

      console.error(
        'Fetch answers error:',
        error
      )

    }

  }


  // LOAD ANSWERS WHEN QUESTIONS ARE LOADED
  useEffect(() => {

    questions.forEach(
      question => {
        fetchAnswers(
          question._id
        )
      }
    )

  }, [questions])


  // HANDLE ANSWER TEXT
  function handleAnswerChange(
    questionId,
    value
  ) {

    setAnswers(
      previousAnswers => ({
        ...previousAnswers,

        [questionId]: {
          ...previousAnswers[
            questionId
          ],

          text: value
        }
      })
    )

  }


  // SUBMIT ANSWER
  async function handleSubmitAnswer(
    event,
    questionId
  ) {

    event.preventDefault()

    const author =
      localStorage.getItem(
        'studentName'
      )

    const answer =
      answers[
        questionId
      ]?.text || ''

    if (answer.trim() === '') {

      alert(
        'Please write an answer.'
      )

      return

    }

    try {

      const response =
        await fetch(
          'https://studenttool.onrender.com/api/answers',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body: JSON.stringify({
              questionId,
              answer:
                answer.trim(),
              author
            })
          }
        )

      const data =
        await response.json()

      if (!response.ok) {

        throw new Error(
          data.message ||
          'Could not post answer'
        )

      }

      // Clear answer box
      setAnswers(
        previousAnswers => ({
          ...previousAnswers,

          [questionId]: {
            ...previousAnswers[
              questionId
            ],

            text: ''
          }
        })
      )

      // Reload answers
      fetchAnswers(
        questionId
      )

      alert(
        'Answer posted successfully!'
      )

    } catch (error) {

      console.error(
        'Submit answer error:',
        error
      )

      alert(
        error.message ||
        'Could not post answer.'
      )

    }

  }


  // FORMAT DATE
  function formatDate(
    dateString
  ) {

    const date =
      new Date(dateString)

    return date.toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    )

  }


  // LOADING
  if (loading) {

    return (
      <div className="questions-page">

        <div className="questions-header">

          <h1>
            Community Questions
          </h1>

          <p>
            Loading questions...
          </p>

        </div>

      </div>
    )

  }


  // PAGE
  return (
    <div className="questions-page">

      <div className="questions-header">

        <h1>
          Community Questions
        </h1>

        <p>
          Browse questions and help
          other students.
        </p>

        <Link
          to="/community/ask"
          className="ask-question-button"
        >
          Ask a Question
        </Link>

      </div>


      {questions.length === 0 ? (

        <div className="no-questions">

          <h2>
            No questions yet
          </h2>

          <p>
            Be the first student to
            ask a question.
          </p>

          <Link
            to="/community/ask"
            className="ask-question-button"
          >
            Ask a Question
          </Link>

        </div>

      ) : (

        <div className="questions-list">

          {questions.map(
            question => (

              <div
                className="question-card"
                key={question._id}
              >

                {/* QUESTION HEADER */}

                <div className="question-top">

                  <span>
                    Asked by{' '}

                    <strong>
                      {question.author}
                    </strong>
                  </span>

                  <span>
                    {formatDate(
                      question.createdAt
                    )}
                  </span>

                </div>


                {/* QUESTION */}

                <div className="question-content">

                  <h2>
                    {question.question}
                  </h2>


                  {question.image && (

                    <img
                      src={
                        `https://studenttool.onrender.com/${question.image.replace(/\\/g, '/')}`
                      }
                      alt="Question"
                      className="question-image"
                    />

                  )}

                </div>


                {/* EXISTING ANSWERS */}

                <div className="answers-list">

                  <h3>
                    Answers
                  </h3>


                  {answers[
                    question._id
                  ]?.list?.length > 0 ? (

                    answers[
                      question._id
                    ].list.map(
                      answer => (

                        <div
                          className="answer-card"
                          key={answer._id}
                        >

                          <p>
                            {answer.answer}
                          </p>

                          <div>
                            Answered by{' '}

                            <strong>
                              {answer.author}
                            </strong>

                            {' • '}

                            {formatDate(
                              answer.createdAt
                            )}
                          </div>

                        </div>

                      )
                    )

                  ) : (

                    <p className="no-answers">
                      No answers yet. Be the
                      first to answer!
                    </p>

                  )}

                </div>


                {/* ANSWER FORM */}

                <div className="answer-area">

                  <form
                    onSubmit={
                      event =>
                        handleSubmitAnswer(
                          event,
                          question._id
                        )
                    }
                  >

                    <textarea
                      placeholder="Write your answer..."
                      value={
                        answers[
                          question._id
                        ]?.text || ''
                      }
                      onChange={
                        event =>
                          handleAnswerChange(
                            question._id,
                            event.target.value
                          )
                      }
                    />

                    <button
                      type="submit"
                    >
                      Submit Answer
                    </button>

                  </form>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>
  )
}

export default Questions