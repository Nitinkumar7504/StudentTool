import { useEffect, useState } from 'react'
import './Notes.css'

function Notes() {

  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalNotes, setTotalNotes] = useState(0)

  const currentUser =
    localStorage.getItem('studentName')


  // GET NOTES
  useEffect(() => {

    async function fetchNotes() {

      setLoading(true)

      try {

        const response =
          await fetch(
            `https://studenttool.onrender.com/api/notes?page=${currentPage}&limit=10`
          )


        const data =
          await response.json()


        if (!response.ok) {

          throw new Error(
            data.message ||
            'Could not get notes'
          )

        }


        setNotes(
          data.notes
        )


        setTotalPages(
          data.totalPages
        )


        setTotalNotes(
          data.totalNotes
        )

      } catch (error) {

        console.error(
          'Fetch notes error:',
          error
        )


        alert(
          'Could not load notes.'
        )

      } finally {

        setLoading(false)

      }

    }


    fetchNotes()

  }, [currentPage])


  // DOWNLOAD NOTE
  function handleDownload(note) {

    const fileUrl =
      `https://studenttool.onrender.com/${note.filePath.replace(/\\/g, '/')}`


    window.open(
      fileUrl,
      '_blank'
    )

  }


  // DELETE NOTE
  async function handleDelete(noteId) {

    const confirmDelete =
      window.confirm(
        'Are you sure you want to delete this note?'
      )


    if (!confirmDelete) {
      return
    }


    // Get the owner token that was
    // saved when this note was uploaded
    const ownerToken =
      localStorage.getItem(
        `noteOwnerToken_${noteId}`
      )


    // Token does not exist
    if (!ownerToken) {

      alert(
        'You do not have permission to delete this note.'
      )

      return

    }


    try {

      const response =
        await fetch(
          `https://studenttool.onrender.com/api/notes/${noteId}`,
          {
            method: 'DELETE',

            headers: {
              'x-owner-token': ownerToken
            }
          }
        )


      const data =
        await response.json()


      if (!response.ok) {

        throw new Error(
          data.message ||
          'Could not delete note'
        )

      }


      // Remove the note from the
      // current page immediately
      setNotes(
        notes.filter(
          (note) =>
            note._id !== noteId
        )
      )


      // Reduce total note count
      setTotalNotes(
        totalNotes - 1
      )


      // Delete the saved token because
      // the note no longer exists
      localStorage.removeItem(
        `noteOwnerToken_${noteId}`
      )


    } catch (error) {

      console.error(
        'Delete error:',
        error
      )


      alert(
        error.message ||
        'Could not delete the note.'
      )

    }

  }


  // FORMAT DATE
  function formatDate(dateString) {

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


  // GET FILE EXTENSION
  function getFileType(fileName) {

    const extension =
      fileName
        .split('.')
        .pop()
        .toUpperCase()


    return extension

  }


  // PREVIOUS PAGE
  function goToPreviousPage() {

    if (currentPage > 1) {

      setCurrentPage(
        currentPage - 1
      )

    }

  }


  // NEXT PAGE
  function goToNextPage() {

    if (currentPage < totalPages) {

      setCurrentPage(
        currentPage + 1
      )

    }

  }


  // LOADING SCREEN
  if (loading) {

    return (

      <div className="notes-page">

        <div className="no-notes">

          <h2>
            Loading notes...
          </h2>

        </div>

      </div>

    )

  }


  return (

    <div className="notes-page">


      {/* HEADER */}

      <div className="notes-header">

        <h1>
          Browse Notes
        </h1>

        <p>
          Find useful study notes
          shared by students.
        </p>

      </div>


      {/* NO NOTES */}

      {notes.length === 0 ? (

        <div className="no-notes">

          <h2>
            No notes available
          </h2>

          <p>
            Be the first student
            to share notes.
          </p>

        </div>

      ) : (

        <>


          {/* TOTAL NOTES */}

          <p className="notes-result-count">

            {totalNotes} notes available

          </p>


          {/* NOTES GRID */}

          <div className="notes-grid">

            {notes.map((note) => (

              <div
                className="note-card"
                key={note._id}
              >


                {/* FILE TYPE + DATE */}

                <div className="note-card-top">

                  <span className="file-type">

                    {getFileType(
                      note.fileName
                    )}

                  </span>


                  <span className="upload-date">

                    {formatDate(
                      note.createdAt
                    )}

                  </span>

                </div>


                {/* TITLE */}

                <h2>
                  {note.title}
                </h2>


                {/* SUBJECT */}

                <p>

                  <strong>
                    Subject:
                  </strong>{' '}

                  {note.subject}

                </p>


                {/* COURSE */}

                <p>

                  <strong>
                    Course:
                  </strong>{' '}

                  {note.course}

                </p>


                {/* SEMESTER */}

                <p>

                  <strong>
                    Semester:
                  </strong>{' '}

                  {note.semester}

                </p>


                {/* FILE */}

                <p>

                  <strong>
                    File:
                  </strong>{' '}

                  {note.fileName}

                </p>


                {/* UPLOADER */}

                <p>

                  <strong>
                    Uploaded by:
                  </strong>{' '}

                  {note.uploader}

                </p>


                {/* ACTIONS */}

                <div className="note-actions">


                  {/* DOWNLOAD */}

                  <button
                    className="download-button"
                    onClick={() =>
                      handleDownload(note)
                    }
                  >
                    Download
                  </button>


                  {/* DELETE */}

                  {note.uploader === currentUser && (

                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(
                          note._id
                        )
                      }
                    >
                      Delete
                    </button>

                  )}

                </div>

              </div>

            ))}

          </div>


          {/* PAGINATION */}

          <div className="pagination">


            {/* PREVIOUS */}

            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>


            {/* PAGE NUMBER */}

            <span>

              Page {currentPage} of {totalPages}

            </span>


            {/* NEXT */}

            <button
              onClick={goToNextPage}
              disabled={
                currentPage === totalPages
              }
            >
              Next
            </button>


          </div>

        </>

      )}

    </div>

  )

}


export default Notes