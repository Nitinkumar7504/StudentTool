import { useState } from 'react'
import './MergePDF.css'


function MergePDF() {

  const [files, setFiles] =
    useState([])

  const [loading, setLoading] =
    useState(false)


  // =====================================================
  // SELECT FILES
  // =====================================================

  function handleFileChange(
    event
  ) {

    const selectedFiles =
      Array.from(
        event.target.files
      )


    if (
      selectedFiles.length < 2
    ) {
      alert(
        'Please select at least 2 PDF files.'
      )

      event.target.value = ''

      return
    }


    if (
      selectedFiles.length > 10
    ) {
      alert(
        'You can select a maximum of 10 PDF files.'
      )

      event.target.value = ''

      return
    }


    for (
      const file
      of selectedFiles
    ) {

      if (
        !file.name
          .toLowerCase()
          .endsWith('.pdf')
      ) {

        alert(
          'Only PDF files are allowed.'
        )

        event.target.value = ''

        return
      }


      if (
        file.size >
        10 * 1024 * 1024
      ) {

        alert(
          `${file.name} is larger than 10 MB.`
        )

        event.target.value = ''

        return
      }

    }


    setFiles(
      selectedFiles
    )

  }


  // =====================================================
  // REMOVE FILE
  // =====================================================

  function removeFile(
    index
  ) {

    const updatedFiles =
      files.filter(
        (
          _,
          fileIndex
        ) =>
          fileIndex !== index
      )


    setFiles(
      updatedFiles
    )

  }


  // =====================================================
  // MOVE FILE UP
  // =====================================================

  function moveFileUp(
    index
  ) {

    if (
      index === 0
    ) {
      return
    }


    const updatedFiles =
      [...files]


    const temp =
      updatedFiles[index - 1]


    updatedFiles[index - 1] =
      updatedFiles[index]

    updatedFiles[index] =
      temp


    setFiles(
      updatedFiles
    )

  }


  // =====================================================
  // MOVE FILE DOWN
  // =====================================================

  function moveFileDown(
    index
  ) {

    if (
      index ===
      files.length - 1
    ) {
      return
    }


    const updatedFiles =
      [...files]


    const temp =
      updatedFiles[index + 1]


    updatedFiles[index + 1] =
      updatedFiles[index]

    updatedFiles[index] =
      temp


    setFiles(
      updatedFiles
    )

  }


  // =====================================================
  // MERGE PDF
  // =====================================================

  async function handleMerge() {

    if (
      files.length < 2
    ) {

      alert(
        'Please select at least 2 PDF files.'
      )

      return

    }


    setLoading(true)


    try {

      const formData =
        new FormData()


      files.forEach(
        file => {

          formData.append(
            'pdfFiles',
            file
          )

        }
      )


      const response =
        await fetch(
          'http://localhost:5000/api/merge-pdf',
          {
            method: 'POST',
            body: formData
          }
        )


      if (!response.ok) {

        let message =
          'Could not merge PDF files.'


        try {

          const data =
            await response.json()

          message =
            data.message ||
            message

        } catch {
          // Response was not JSON
        }


        throw new Error(
          message
        )

      }


      const blob =
        await response.blob()


      const downloadUrl =
        window.URL.createObjectURL(
          blob
        )


      const link =
        document.createElement(
          'a'
        )


      link.href =
        downloadUrl

      link.download =
        'merged.pdf'


      document.body.appendChild(
        link
      )


      link.click()

      link.remove()


      window.URL.revokeObjectURL(
        downloadUrl
      )


      alert(
        'PDF files merged successfully!'
      )


      setFiles([])

    } catch (error) {

      console.error(
        'Merge PDF error:',
        error
      )


      alert(
        error.message ||
        'Could not merge PDF files.'
      )

    } finally {

      setLoading(false)

    }

  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="merge-pdf-page">

      <div className="merge-pdf-container">

        <h1>
          Merge PDF
        </h1>


        <p>
          Combine multiple PDF files into one PDF document.
        </p>


        <div className="merge-upload-box">

          <label
            htmlFor="merge-pdf-files"
            className="merge-file-label"
          >
            Select PDF Files
          </label>


          <input
            id="merge-pdf-files"
            type="file"
            accept=".pdf"
            multiple
            onChange={
              handleFileChange
            }
          />


          {files.length > 0 && (

            <div className="selected-merge-files">

              <h3>
                PDF Order
              </h3>


              <p className="order-help">
                The PDF at the top will appear first in the merged file.
              </p>


              {files.map(
                (
                  file,
                  index
                ) => (

                  <div
                    className="merge-file-item"
                    key={
                      `${file.name}-${index}`
                    }
                  >

                    <div className="merge-file-name">

                      <strong>
                        {index + 1}.
                      </strong>

                      <span>
                        {file.name}
                      </span>

                    </div>


                    <div className="merge-file-actions">

                      <button
                        type="button"
                        onClick={() =>
                          moveFileUp(
                            index
                          )
                        }
                        disabled={
                          index === 0
                        }
                      >
                        ↑
                      </button>


                      <button
                        type="button"
                        onClick={() =>
                          moveFileDown(
                            index
                          )
                        }
                        disabled={
                          index ===
                          files.length - 1
                        }
                      >
                        ↓
                      </button>


                      <button
                        type="button"
                        className="remove-file-button"
                        onClick={() =>
                          removeFile(
                            index
                          )
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          )}


          <button
            className="merge-pdf-button"
            onClick={
              handleMerge
            }
            disabled={
              files.length < 2 ||
              loading
            }
          >
            {loading
              ? 'Merging...'
              : 'Merge PDF'}
          </button>


          <p className="merge-file-info">
            Select 2 to 10 PDF files
            <br />
            Maximum file size: 10 MB per file
          </p>

        </div>

      </div>

    </div>

  )
}


export default MergePDF