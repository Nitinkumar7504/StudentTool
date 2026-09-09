const fs = require('fs')
const { PDFDocument } = require('pdf-lib')


async function mergePDFs(
  req,
  res
) {
  const uploadedFiles =
    req.files || []

  try {
    if (
      uploadedFiles.length < 2
    ) {
      return res.status(400).json({
        message:
          'Please upload at least 2 PDF files.'
      })
    }

    const mergedPdf =
      await PDFDocument.create()

    for (
      const file
      of uploadedFiles
    ) {
      const pdfBytes =
        fs.readFileSync(
          file.path
        )

      const pdf =
        await PDFDocument.load(
          pdfBytes
        )

      const pages =
        await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        )

      pages.forEach(
        page => {
          mergedPdf.addPage(
            page
          )
        }
      )
    }

    const mergedPdfBytes =
      await mergedPdf.save()

    res.setHeader(
      'Content-Type',
      'application/pdf'
    )

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="merged-${Date.now()}.pdf"`
    )

    res.send(
      Buffer.from(
        mergedPdfBytes
      )
    )

  } catch (error) {
    console.error(
      'Merge PDF error:',
      error
    )

    res.status(500).json({
      message:
        'Could not merge PDF files.'
    })

  } finally {

    // Delete uploaded temporary files
    uploadedFiles.forEach(
      file => {
        try {
          if (
            fs.existsSync(
              file.path
            )
          ) {
            fs.unlinkSync(
              file.path
            )
          }
        } catch (error) {
          console.error(
            'File cleanup error:',
            error
          )
        }
      }
    )
  }
}


module.exports = {
  mergePDFs
}