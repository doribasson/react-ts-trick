import { PDFDocument, rgb } from 'pdf-lib';

export const generatePDF = async (data: { name: string; email: string }) => {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const { width, height } = page.getSize();
//   const pages = pdfDoc.getPages();
//   const firstPage = pages[0]; // Choose the page you want to modify

  // Add text to the PDF
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(0.75, 0.75, 0.75), // Light grey background color
  });

  // Set the font color when drawing text
  page.drawText(data.name, {
    x: 50,
    y: height - 100,
    size: 30,
    color: rgb(1, 0, 0), // Red font color
  });

  page.drawText(data.email, {
    x: 50,
    y: height - 150,
    size: 30,
    color: rgb(1, 0, 0), // Red font color
  });


  // Serialize the PDFDocument to bytes
  const pdfBytes = await pdfDoc.save();

  // Create a Blob and generate a URL
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  // Open the PDF in a new tab
  window.open(url);
};
