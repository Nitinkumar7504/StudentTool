import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './MyQuestions.css'


function MyQuestions() {

  const [questions, setQuestions] =
    useState([])

  const [loading, setLoading] =
    useState(true)


  // =====================================
  // GET MY QUESTIONS
  // =====================================

  useEffect(() => {

    async function fetchMyQuestions() {

      try {

        const author =
          localStorage.getItem(
            'studentName'
          )


        if (!author) {

          throw new Error(
            'Student name not found'
          )

        }


        const response =
          await fetch(
            `https://studenttool.onrender.com/api/questions/my?author=${encodeURIComponent(author)}`
          )


        const data =
          await response.json()


        if (!response.ok) {

          throw new Error(
            data.message ||
            'Could not get your questions'
          )

        }


        setQuestions(
          data.questions
        )

      } catch (error) {

        console.error(
          'Get my questions error:',
          error
        )

        alert(
          error.message ||
          'Could not load your questions.'
        )

      } finally {

        setLoading(false)

      }

    }


    fetchMyQuestions()

  }, [])


  // =====================================
  // FORMAT DATE
  // =====================================

  function formatDate(
    dateString
  ) {

    const date =
      new Date(dateString)


    return date.toLocaleDateString(
      'en-IN',
      {

        day:
          '2-digit',

        month:
          'short',

        year:
          'numeric'

      }
    )

  }


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div className="my-questions-page">

        <div className="my-questions-header">

          <h1>
            My Questions
          </h1>

          <p>
            Loading your questions...
          </p>

        </div>

      </div>

    )

  }


  // =====================================
  // PAGE
  // =====================================

  return (

    <div className="my-questions-page">


      <div className="my-questions-header">

        <h1>
          My Questions
        </h1>

        <p>
          Questions you have asked
          in the community.
        </p>


        <Link
          to="/community/ask"
          className="ask-question-button"
        >
          Ask a Question
        </Link>

      </div>


      {/* NO QUESTIONS */}

      {questions.length === 0 ? (

        <div className="no-my-questions">

          <h2>
            You haven't asked any questions yet.
          </h2>

          <p>
            Ask your first question and
            get help from other students.
          </p>


          <Link
            to="/community/ask"
            className="ask-question-button"
          >
            Ask a Question
          </Link>

        </div>

      ) : (


        /* QUESTIONS */

        <div className="my-questions-list">

          {questions.map(
            question => (

              <div
                className="my-question-card"
                key={question._id}
              >


                {/* QUESTION HEADER */}

                <div className="my-question-top">

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

                <div className="my-question-content">

                  <h2>
                    {question.question}
                  </h2>


                  {/* IMAGE */}

                  {question.image && (

                    <img
                      src={
                        `https://studenttool.onrender.com/${question.image.replace(/\\/g, '/')}`
                      }
                      alt="Question"
                      className="my-question-image"
                    />

                  )}

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>

  )

}


export default MyQuestions