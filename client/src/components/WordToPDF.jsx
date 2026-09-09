import { useState } from 'react'
import './WordToPDF.css'

function WordToPDF() {

  const [file, setFile] =
    useState(null)

  const [loading, setLoading] =
    useState(false)


  function handleFileChange(event) {

    const selectedFile =
      event.target.files[0]

    if (!selectedFile) {
      return
    }

    const extension =
      selectedFile.name
        .split('.')
        .pop()
        .toLowerCase()

    if (
      extension !== 'doc' &&
      extension !== 'docx'
    ) {
      alert(
        'Please select a .doc or .docx file.'
      )

      event.target.value = ''
      return
    }

    if (
      selectedFile.size >
      10 * 1024 * 1024
    ) {
      alert(
        'File size must be less than 10 MB.'
      )

      event.target.value = ''
      return
    }

    setFile(
      selectedFile
    )
  }


  async function handleConvert() {

    if (!file) {
      alert(
        'Please select a Word file first.'
      )

      return
    }


    setLoading(true)


    try {

      const formData =
        new FormData()

      formData.append(
        'wordFile',
        file
      )


      const response =
        await fetch(
          'http://localhost:5000/api/pdf/word-to-pdf',
          {
            method: 'POST',
            body: formData
          }
        )


      if (!response.ok) {

        let message =
          'Could not convert the file.'

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
        file.name.replace(
          /\.[^/.]+$/,
          ''
        ) + '.pdf'


      document.body.appendChild(
        link
      )

      link.click()

      link.remove()


      window.URL.revokeObjectURL(
        downloadUrl
      )


      alert(
        'Word file converted to PDF successfully!'
      )


    } catch (error) {

      console.error(
        'Word to PDF error:',
        error
      )

      alert(
        error.message ||
        'Could not convert the file.'
      )

    } finally {

      setLoading(false)

    }

  }


  return (

    <div className="word-to-pdf-page">

      <div className="word-to-pdf-container">

        <h1>
          Word to PDF
        </h1>

        <p>
          Convert your Word document into a PDF file.
        </p>


        <div className="word-upload-box">

          <label
            htmlFor="word-file"
            className="word-file-label"
          >
            Select Word File
          </label>

          <input
            id="word-file"
            type="file"
            accept=".doc,.docx"
            onChange={
              handleFileChange
            }
          />


          {file && (

            <div className="selected-word-file">

              <strong>
                Selected file:
              </strong>

              <span>
                {file.name}
              </span>

            </div>

          )}


          <button
            className="convert-word-button"
            onClick={
              handleConvert
            }
            disabled={
              !file ||
              loading
            }
          >

            {loading
              ? 'Converting...'
              : 'Convert to PDF'}

          </button>


          <p className="word-file-info">
            Supported formats: .doc, .docx
            <br />
            Maximum file size: 10 MB
          </p>

        </div>

      </div>

    </div>

  )
}

export default WordToPDF