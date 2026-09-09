const fs = require('fs')
const path = require('path')
const { execFile } = require('child_process')
const { promisify } = require('util')

const execFileAsync =
  promisify(execFile)


// LibreOffice path
const libreOfficePath =
  'C:\\Program Files\\LibreOffice\\program\\soffice.exe'


// =====================================================
// WORD → PDF
// =====================================================

async function convertWordToPDF(
  req,
  res
) {
  let inputFilePath = null
  let outputFilePath = null

  try {
    // Check file
    if (!req.file) {
      return res.status(400).json({
        message:
          'Please upload a Word file.'
      })
    }

    inputFilePath =
      req.file.path

    const outputDirectory =
      path.dirname(
        inputFilePath
      )

    // Get original filename without extension
    const baseName =
      path.basename(
        inputFilePath,
        path.extname(
          inputFilePath
        )
      )

    // Expected PDF path
    outputFilePath =
      path.join(
        outputDirectory,
        `${baseName}.pdf`
      )

    // Convert Word → PDF using LibreOffice
    await execFileAsync(
      libreOfficePath,
      [
        '--headless',
        '--convert-to',
        'pdf',
        '--outdir',
        outputDirectory,
        inputFilePath
      ]
    )

    // Check whether PDF was created
    if (
      !fs.existsSync(
        outputFilePath
      )
    ) {
      throw new Error(
        'LibreOffice did not create the PDF file.'
      )
    }

    const outputFileName =
      `converted-${Date.now()}.pdf`

    // Send PDF to browser
    res.download(
      outputFilePath,
      outputFileName,
      error => {
        if (error) {
          console.error(
            'Download error:',
            error
          )
        }

        // Delete temporary files
        cleanupFile(
          inputFilePath
        )

        cleanupFile(
          outputFilePath
        )
      }
    )

  } catch (error) {
    console.error(
      'Word to PDF conversion error:',
      error
    )

    // Cleanup
    cleanupFile(
      inputFilePath
    )

    cleanupFile(
      outputFilePath
    )

    res.status(500).json({
      message:
        'Could not convert Word file to PDF.'
    })
  }
}


// =====================================================
// PDF → WORD
// =====================================================

async function convertPDFToWord(
  req,
  res
) {
  let inputFilePath = null
  let outputFilePath = null

  try {
    // Check file
    if (!req.file) {
      return res.status(400).json({
        message:
          'Please upload a PDF file.'
      })
    }

    inputFilePath =
      req.file.path

    const outputDirectory =
      path.dirname(
        inputFilePath
      )

    // Get PDF filename without .pdf
    const baseName =
      path.basename(
        inputFilePath,
        path.extname(
          inputFilePath
        )
      )

    // DOCX output path
    outputFilePath =
      path.join(
        outputDirectory,
        `${baseName}.docx`
      )

    // Python script path
    const pythonScriptPath =
      path.join(
        __dirname,
        '../pdf_to_word.py'
      )

    console.log(
      'Starting PDF to Word conversion...'
    )

    console.log(
      'PDF:',
      inputFilePath
    )

    console.log(
      'DOCX:',
      outputFilePath
    )

    // Run Python script
    await execFileAsync(
      'python',
      [
        pythonScriptPath,
        inputFilePath,
        outputFilePath
      ]
    )

    // Check whether DOCX was created
    if (
      !fs.existsSync(
        outputFilePath
      )
    ) {
      throw new Error(
        'Python did not create the Word file.'
      )
    }

    console.log(
      'PDF to Word conversion successful.'
    )

    const outputFileName =
      `converted-${Date.now()}.docx`

    // Send DOCX to browser
    res.download(
      outputFilePath,
      outputFileName,
      error => {
        if (error) {
          console.error(
            'Download error:',
            error
          )
        }

        // Delete temporary files
        cleanupFile(
          inputFilePath
        )

        cleanupFile(
          outputFilePath
        )
      }
    )

  } catch (error) {
    console.error(
      'PDF to Word conversion error:',
      error
    )

    // Cleanup
    cleanupFile(
      inputFilePath
    )

    cleanupFile(
      outputFilePath
    )

    res.status(500).json({
      message:
        'Could not convert PDF to Word.'
    })
  }
}


// =====================================================
// CLEANUP HELPER
// =====================================================

function cleanupFile(
  filePath
) {
  try {
    if (
      filePath &&
      fs.existsSync(
        filePath
      )
    ) {
      fs.unlinkSync(
        filePath
      )

      console.log(
        'Deleted temporary file:',
        filePath
      )
    }
  } catch (error) {
    console.error(
      'File cleanup error:',
      error
    )
  }
}


// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  convertWordToPDF,
  convertPDFToWord
}