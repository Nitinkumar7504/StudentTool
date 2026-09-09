import { useState } from 'react'
import './PDFToWord.css'

function PDFToWord() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

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

    if (extension !== 'pdf') {
      alert(
        'Please select a PDF file.'
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

    setFile(selectedFile)
  }

  async function handleConvert() {
    if (!file) {
      alert(
        'Please select a PDF file first.'
      )

      return
    }

    setLoading(true)

    try {
      const formData =
        new FormData()

      formData.append(
        'pdfFile',
        file
      )

      const response =
        await fetch(
          'https://studenttool.onrender.com/api/pdf/pdf-to-word',
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
          /\.pdf$/i,
          ''
        ) + '.docx'

      document.body.appendChild(
        link
      )

      link.click()

      link.remove()

      window.URL.revokeObjectURL(
        downloadUrl
      )

      alert(
        'PDF converted to Word successfully!'
      )
    } catch (error) {
      console.error(
        'PDF to Word error:',
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
    <div className="pdf-to-word-page">
      <div className="pdf-to-word-container">
        <h1>
          PDF to Word
        </h1>

        <p>
          Convert your PDF document into an editable Word file.
        </p>

        <div className="pdf-upload-box">
          <label
            htmlFor="pdf-file"
            className="pdf-file-label"
          >
            Select PDF File
          </label>

          <input
            id="pdf-file"
            type="file"
            accept=".pdf"
            onChange={
              handleFileChange
            }
          />

          {file && (
            <div className="selected-pdf-file">
              <strong>
                Selected file:
              </strong>

              <span>
                {file.name}
              </span>
            </div>
          )}

          <button
            className="convert-pdf-button"
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
              : 'Convert to Word'}
          </button>

          <p className="pdf-file-info">
            Supported format: .pdf
            <br />
            Maximum file size: 10 MB
          </p>
        </div>
      </div>
    </div>
  )
}

export default PDFToWord