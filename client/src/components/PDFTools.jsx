import { Link } from 'react-router-dom'
import './PDFTools.css'


function PDFTools() {
  return (
    <div className="pdf-tools-page">

      <div className="pdf-tools-container">

        {/* Header */}
        <div className="pdf-tools-header">

          <h1>
            PDF Tools
          </h1>

          <p>
            Useful tools to convert and manage your PDF files.
          </p>

        </div>


        {/* Tools Grid */}
        <div className="pdf-tools-grid">

          {/* Word to PDF */}
          <Link
            to="/pdf-tools/word-to-pdf"
            className="pdf-tool-card"
          >

            <div className="pdf-tool-icon">
              📄
            </div>

            <h2>
              Word to PDF
            </h2>

            <p>
              Convert Word documents into PDF files.
            </p>

            <span className="pdf-tool-link">
              Open Tool →
            </span>

          </Link>


          {/* PDF to Word */}
          <Link
            to="/pdf-tools/pdf-to-word"
            className="pdf-tool-card"
          >

            <div className="pdf-tool-icon">
              📝
            </div>

            <h2>
              PDF to Word
            </h2>

            <p>
              Convert PDF files into editable Word documents.
            </p>

            <span className="pdf-tool-link">
              Open Tool →
            </span>

          </Link>


          {/* Merge PDF */}
          <Link
            to="/pdf-tools/merge"
            className="pdf-tool-card"
          >

            <div className="pdf-tool-icon">
              📚
            </div>

            <h2>
              Merge PDF
            </h2>

            <p>
              Combine multiple PDF files into one document.
            </p>

            <span className="pdf-tool-link">
              Open Tool →
            </span>

          </Link>


          {/* Split PDF */}
          <div className="pdf-tool-card coming-soon">

            <div className="pdf-tool-icon">
              ✂️
            </div>

            <h2>
              Split PDF
            </h2>

            <p>
              Split a PDF into separate pages or files.
            </p>

            <span className="coming-soon-text">
              Coming Soon
            </span>

          </div>


          {/* Compress PDF */}
          <div className="pdf-tool-card coming-soon">

            <div className="pdf-tool-icon">
              🗜️
            </div>

            <h2>
              Compress PDF
            </h2>

            <p>
              Reduce the size of your PDF files.
            </p>

            <span className="coming-soon-text">
              Coming Soon
            </span>

          </div>


          {/* PDF to Image */}
          <div className="pdf-tool-card coming-soon">

            <div className="pdf-tool-icon">
              🖼️
            </div>

            <h2>
              PDF to Image
            </h2>

            <p>
              Convert PDF pages into image files.
            </p>

            <span className="coming-soon-text">
              Coming Soon
            </span>

          </div>

        </div>

      </div>

    </div>
  )
}


export default PDFTools