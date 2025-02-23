import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from '../../../shared/models/device.model';
import getSrc from '../../shared/functions/get_src';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-device-dialog',
  imports: [CommonModule],
  templateUrl: './device-dialog.component.html',
  styleUrl: './device-dialog.component.css',
})
export class DeviceDialogComponent implements OnInit {
  dataSource: Device | undefined;

  getImageLink(path: string) {
    return getSrc(path);
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Device
  ) {
    this.dataSource = { ...data };
  }

  generatePDF() {
    if (!this.dataSource) return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imagePath = getSrc(this.dataSource.src);
    const imgWidth = 180;
    const imgHeight = 160;
    let y = 10;
    // TODO: achar uma forma de pegar a imagem lá do site (pode ser download)
    // pdf.addImage(imagePath, 'PNG', 10, y, imgWidth, imgHeight);
    y += imgHeight + 10;

    pdf.setFontSize(18);
    pdf.text(this.dataSource.Model, 10, y);
    y += 10;

    pdf.setFontSize(12);
    const specifications = this.dataSource.specs;
    if (specifications) {
      pdf.text('Especificações:', 10, y);
      y += 10;

      Object.entries(specifications).forEach(([key, value]) => {
        if (key.length > 0 && value) {
          if (y > 270) {
            pdf.addPage();
            y = 10;
          }
          pdf.text(`${key}: ${value}`, 10, y);
          y += 10;
        }
      });
    }

    pdf.save(`${this.dataSource.Model}.pdf`);
  }

  ngOnInit(): void {}
}
