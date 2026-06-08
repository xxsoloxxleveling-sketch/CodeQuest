import fitz # PyMuPDF
import os

def extract_pdf_text(pdf_path, txt_path):
    print(f"Extracting {pdf_path}...")
    if not os.path.exists(pdf_path):
        print(f"Error: {pdf_path} does not exist.")
        return
    
    doc = fitz.open(pdf_path)
    text = ""
    for i, page in enumerate(doc):
        text += f"\n--- PAGE {i+1} ---\n"
        text += page.get_text()
    
    with open(txt_path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"Saved text to {txt_path} ({len(text)} chars)")

# Parent directory contains the PDFs
parent_dir = "E:\\Codquest"
pdf_python = os.path.join(parent_dir, "CodeQuest_Python_3-Month_Plan.pdf")
pdf_java = os.path.join(parent_dir, "CodeQuest_Java_3-Month_Plan.pdf")

extract_pdf_text(pdf_python, "python_plan_raw.txt")
extract_pdf_text(pdf_java, "java_plan_raw.txt")
