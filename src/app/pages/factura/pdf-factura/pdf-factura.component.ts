import { Component, Input, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { Factura } from 'src/app/domain/factura.model';
import { Persona } from '../../../domain/persona.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pdf-factura',
  templateUrl: './pdf-factura.component.html',
  styleUrls: ['./pdf-factura.component.scss']
})
export class PdfFacturaComponent implements OnInit {

  @Input() factura_pdf: Factura = { facturaid: 0,fecha:'',iva:0,persona:{},subtotal:0,ticket:{},total:0};

  @Input() idfac:number | undefined;

  constructor(
    private _snackBar: MatSnackBar,
    private dataSharingService: DataSharingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataSharingService.currentFactura.subscribe(factura => {
      if(factura){
        this.factura_pdf = factura;
      }
    });

    this.dataSharingService.currentnumFactura.subscribe(num => {
      if(num){
        this.idfac = num;
      }
    });
  }

  convertirFacturaAPDF() {
    let data = document.getElementById('contentToConvert');
    html2canvas(data!).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps= pdf.getImageProperties(contentDataURL);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Factura.pdf');
    });
    this.router.navigate(['create-factura']);
  }

}
