import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ShareNotes.css'

function ShareNotes() {

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [course, setCourse] = useState('')
  const [semester, setSemester] = useState('')
  const [file, setFile] = useState(null)


  async function handleSubmit(event) {

    event.preventDefault()


    if (
      title.trim() === '' ||
      subject.trim() === '' ||
      course.trim() === '' ||
      semester.trim() === '' ||
      file === null
    ) {

      alert(
        'Please fill all fields and select a file.'
      )

      return

    }


    try {

      const uploader =
        localStorage.getItem('studentName')


      const formData =
        new FormData()


      formData.append(
        'title',
        title.trim()
      )


      formData.append(
        'subject',
        subject.trim()
      )


      formData.append(
        'course',
        course.trim()
      )


      formData.append(
        'semester',
        semester.trim()
      )


      formData.append(
        'uploader',
        uploader
      )


      formData.append(
        'file',
        file
      )


      const response =
        await fetch(
          'https://studenttool.onrender.com/api/notes',
          {
            method: 'POST',
            body: formData
          }
        )


      const data =
        await response.json()


      if (!response.ok) {

        throw new Error(
          data.message || 'Upload failed'
        )

      }


      // Save the owner token locally
      const noteId =
        data.note._id

      const ownerToken =
        data.ownerToken


      localStorage.setItem(
        `noteOwnerToken_${noteId}`,
        ownerToken
      )


      alert(
        'Notes uploaded successfully!'
      )


      navigate(
        '/study-resources/notes'
      )


    } catch (error) {

      console.error(
        'Upload error:',
        error
      )


      alert(
        error.message ||
        'Could not upload the file.'
      )

    }

  }


  return (

    <div className="share-notes-page">

      <div className="share-notes-card">

        <h1>
          Share Notes
        </h1>


        <p>
          Upload your study notes and share
          them with other students.
        </p>


        <form
          onSubmit={handleSubmit}
        >

          <label>
            Note Title
          </label>


          <input
            type="text"
            placeholder="Example: Data Structures Notes"
            value={title}
            onChange={(event) =>
              setTitle(
                event.target.value
              )
            }
          />


          <label>
            Subject
          </label>


          <input
            type="text"
            placeholder="Example: Data Structures"
            value={subject}
            onChange={(event) =>
              setSubject(
                event.target.value
              )
            }
          />


          <label>
            Course
          </label>


          <input
            type="text"
            placeholder="Example: B.E. CSE"
            value={course}
            onChange={(event) =>
              setCourse(
                event.target.value
              )
            }
          />


          <label>
            Semester
          </label>


          <input
            type="text"
            placeholder="Example: Semester 4"
            value={semester}
            onChange={(event) =>
              setSemester(
                event.target.value
              )
            }
          />


          <label>
            Select Notes File
          </label>


          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(event) =>
              setFile(
                event.target.files[0]
              )
            }
          />


          <button type="submit">
            Upload Notes
          </button>

        </form>

      </div>

    </div>

  )

}

export default ShareNotes