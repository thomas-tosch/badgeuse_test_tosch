import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  downloadPDF(startDate,endDate)
  {
    //REVERSE BUTTON
    document.getElementById("submitbutton").style.display = "none"; // to undisplay
    document.getElementById("progress").style.display = ""; // to display

    // CANVAS2HTML FUNCTION
        var data = document.getElementById('contentToConvert');
        html2canvas(data).then(canvas => {
        // Few necessary setting options
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

    //GENERATE PDF FUNCTION
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save(""+ startDate.substring(0,10) +' au '+ endDate.substring(0,10) +'-badgeuseUHA40.pdf'); // Generated PDF

    // REVERSE BUTTON TO NORMAL POSITION
    document.getElementById("submitbutton").style.display = ""; // to display
    document.getElementById("progress").style.display = "none"; // to undisplay
    });
  }
}
