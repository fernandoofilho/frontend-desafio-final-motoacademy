import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { jsPDF } from 'jspdf';
import { Device } from '../../../shared/models/device.model';
import getSrc from '../../shared/functions/get_src';
import {
  extractColorsFromImage,
  getTopColors,
} from '../../shared/functions/colors';
@Component({
  selector: 'app-device-dialog',
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './device-dialog.component.html',
  styleUrl: './device-dialog.component.css',
})
export class DeviceDialogComponent implements OnInit {
  @ViewChild('phoneImage', { static: false }) imageElement!: ElementRef;
  @ViewChild('backgroundGradient', { static: false })
  dialogContainer!: ElementRef;
  pallette: string[] = [];
  dataSource: Device | undefined;
  loadingReport: boolean = false;
  mainTextColor: string = 'black';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Device,
    private renderer: Renderer2
  ) {
    this.dataSource = { ...data };
  }

  updateGradient() {
    if (!this.pallette || this.pallette.length === 0) return;

    const gradientColors = this.pallette.join(', '); // Une as cores extraídas
    const gradientStyle = `linear-gradient(45deg, ${gradientColors})`;

    const dialogContainer = document.querySelector(
      '.dialog-container'
    ) as HTMLElement;
    if (dialogContainer) {
      dialogContainer.style.backgroundImage = gradientStyle;
    }
  }

  getImageLink(path: string) {
    return getSrc(path);
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

  async ngOnInit(): Promise<void> {
    const img = this.getImageLink(this.dataSource?.src || '');
    const colors = await extractColorsFromImage(img);
    this.pallette = getTopColors(colors, 25);
    this.mainTextColor = this.pallette[-1];
    this.updateGradient();
    console.log(this.dataSource?.specs);
  }
}
