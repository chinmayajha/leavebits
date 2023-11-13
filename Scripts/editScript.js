
async function modifyPdf() {
    const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib
    console.log("Generating Pdf...")
    // Fetch an existing PDF document
    const url = 'leave.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    // Get the first page of the document
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    // var ID = document.getElementById("ID");
    // var name = document.getElementById("name");
    // var contact = document.getElementById("contact");
    // var room = document.getElementById("room");
    // var hostel = document.getElementById("hostel");
    // var departure = document.getElementById("DEPARTURE").valueAsNumber;
    // var returnn = document.getElementById("RETURN").valueAsNumber;
    var ID = localStorage.getItem("ID");
    var name = localStorage.getItem("name");
    var contact = localStorage.getItem("contact");
    var room = localStorage.getItem("room");
    var hostel = localStorage.getItem("hostel");
    var departure = localStorage.getItem("DEPARTURE");
    var returnn = localStorage.getItem("RETURN");
    var returnndate = new Date(returnn);
    var departuredate = new Date(departure);

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var wardens = ['Rajesh Kumar', 'Srinivas Appari', 'Nitin Chaturvedi', 'Krishnendra Shekhawat', 'Surekha Bhanot', 'Sharad Srivastava', 'Praveen Kumar A.V.', 'MM Pandey', 'Sharad Shrivastava']
    var hostels = ['Srinivasa Ramanujan Bhawan', 'Krishna Bhawan', 'Gandhi Bhawan', 'Vishwakarma Bhawan', 'Meera Bhawan', 'Shankar Bhawan', 'Vyas Bhawan', 'Ram Bhawan', 'Budh Bhawan']

    // Get the width and height of thne first page
    const { width, height } = firstPage.getSize()
    console.log(width, height)
    firstPage.drawText(ID, {
        x: 302,
        y: 710,
        size: 12.2,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    })
    firstPage.drawText(name, {
        x: 302,
        y: 688,
        size: 12.2,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    })
    firstPage.drawText(contact, {
        x: 302,
        y: 667,
        size: 12.2,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    })
    firstPage.drawText(hostel, {
        x: 302,
        y: 647,
        size: 12.2,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    })
    firstPage.drawText(room, {
        x: 302,
        y: 627,
        size: 12.2,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    })
    firstPage.drawText(wardens[hostels.indexOf(hostel)], {
        x: 302,
        y: 607,
        size: 12.2,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    })
    firstPage.drawText(departuredate.getDate().toString() + '-' + months[departuredate.getMonth()] + '-' + (departuredate.getYear() - 100 + 2000).toString(), {
        x: 302,
        y: 587,
        size: 12.2,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    })
    firstPage.drawText(returnndate.getDate().toString() + '-' + months[returnndate.getMonth()] + '-' + (returnndate.getYear() - 100 + 2000).toString(), {
        x: 302,
        y: 567,
        size: 12.2,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    })
    const pdfBytes = await pdfDoc.save()
    download(pdfBytes, ID + '.pdf', 'application/pdf');
}

