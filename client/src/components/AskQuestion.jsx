import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AskQuestion.css'


function AskQuestion() {

  const navigate = useNavigate()


  const [question, setQuestion] =
    useState('')


  const [image, setImage] =
    useState(null)


  async function handleSubmit(event) {

    event.preventDefault()


    // Get the student's name
    const author =
      localStorage.getItem(
        'studentName'
      )


    // Check question
    if (
      question.trim() === ''
    ) {

      alert(
        'Please enter your question.'
      )

      return

    }


    try {

      // Create FormData
      const formData =
        new FormData()


      // Add question text
      formData.append(
        'question',
        question.trim()
      )


      // Add student name
      formData.append(
        'author',
        author
      )


      // Add image only if
      // the student selected one
      if (image) {

        formData.append(
          'image',
          image
        )

      }


      // Send question to backend
      const response =
        await fetch(
          'http://localhost:5000/api/questions',
          {
            method: 'POST',

            body: formData
          }
        )


      // Convert response to JSON
      const data =
        await response.json()


      // Check for server error
      if (!response.ok) {

        throw new Error(
          data.message ||
          'Could not post question'
        )

      }


      // Show success message
      alert(
        'Question posted successfully!'
      )


      // Clear form
      setQuestion('')

      setImage(null)


      // Go back to Community
      navigate(
        '/community'
      )


    } catch (error) {

      console.error(
        'Create question error:',
        error
      )


      alert(
        error.message ||
        'Could not post question.'
      )

    }

  }


  return (

    <div className="ask-question-page">

      <div className="ask-question-card">


        <h1>
          Ask a Question
        </h1>


        <p>
          Ask questions and get help
          from other students.
        </p>


        <form
          onSubmit={handleSubmit}
        >


          {/* QUESTION */}

          <label>
            Question
          </label>


          <textarea
            placeholder="Write your question..."
            value={question}
            onChange={(event) =>
              setQuestion(
                event.target.value
              )
            }
          />


          {/* IMAGE */}

          <label>
            Add Image (Optional)
          </label>


          <input
            type="file"
            accept="image/*"
            onChange={(event) =>
              setImage(
                event.target.files[0]
              )
            }
          />


          {/* SUBMIT */}

          <button
            type="submit"
          >
            Post Question
          </button>


        </form>

      </div>

    </div>

  )

}


export default AskQuestion