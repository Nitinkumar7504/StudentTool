from pdf2docx import Converter
import sys


pdf_path = sys.argv[1]
docx_path = sys.argv[2]


converter = Converter(pdf_path)

converter.convert(docx_path)

converter.close()

print("PDF converted to Word successfully")