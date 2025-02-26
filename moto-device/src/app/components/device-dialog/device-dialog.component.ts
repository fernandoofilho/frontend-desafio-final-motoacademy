import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from '../../../shared/models/device.model';
import getSrc from '../../shared/functions/get_src';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-device-dialog',
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './device-dialog.component.html',
  styleUrl: './device-dialog.component.css',
})
export class DeviceDialogComponent implements OnInit {
  dataSource: Device | undefined;
  loadingReport: boolean = false;
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
    this.loadingReport = true;

    if (!this.dataSource) {
      this.loadingReport = false;
      return;
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imagePath = getSrc(this.dataSource.src);
    const imgWidth = 180;
    const imgHeight = 160;
    let y = 10;

    // Adiciona a imagem se necessário
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

    setTimeout(() => {
      pdf.save(`${this.dataSource?.Model}.pdf`);
      this.loadingReport = false; 
    }, 1000);
  }

  ngOnInit(): void {}
}
