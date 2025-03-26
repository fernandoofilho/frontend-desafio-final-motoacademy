import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Device } from '../../../shared/models/device.model';
import { IntelligenceBottomSheetComponent } from '../../components/intelligence-bottom-sheet/intelligence-bottom-sheet.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ApiService } from '../../services/api.service';
import getSrc from '../../shared/functions/get_src';
import { getImageDimensions } from '../../shared/functions/getImageDimensions';


@Component({
  selector: 'app-device-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    MatBottomSheetModule,
    MatButtonModule,
  ],
  templateUrl: './device-page.component.html',
  styleUrl: './device-page.component.css',
})
export class DevicePageComponent implements OnInit {
  deviceId: string | null = null;
  deviceData: Device | null = null;
  DeviceDescription: { [x: string]: string } = {};
  isLoading: boolean = false;
  private _bottomSheet = inject(MatBottomSheet);
  imageDimensions: { width: number; height: number } = { width: 0, height: 0 };

  openBottomSheet(): void {
    this._bottomSheet.open(IntelligenceBottomSheetComponent, {
      data: this.deviceData,
    });
  }
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe((params) => {
      this.deviceId = params.get('id');
    });

    this.apiService.get(this.deviceId).subscribe((response) => {
      this.deviceData = response;

      this.apiService
        .getDeviceDataIntelligence(this.deviceData.Model)
        .subscribe((response) => {
          this.DeviceDescription = response;
          this.isLoading = false;
        });
    });
  }

  getImageLink(path: string) {
    return getSrc(path);
  }
  generatePDF() {
    const element = document.getElementById('containerPage');

    if (!element) {
      console.error('Elemento não encontrado!');
      return;
    }

    html2canvas(element, { scale: 4 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 10;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imglink = this.getImageLink(this.deviceData?.src || '');
      getImageDimensions(imglink)
        .then((dimensions) => {
          let imgDeviceWidth = dimensions.width;
          let imgDeviceHeight = dimensions.height;

          if (imgDeviceHeight > 100) {
            const ratio = 100 / imgDeviceHeight;
            imgDeviceHeight = 100;
            imgDeviceWidth *= ratio;
          }

          const centerX = (pageWidth - imgDeviceWidth) / 2;

          const imageTopMargin = 10;
          const contentTopMargin = imageTopMargin + imgDeviceHeight + 10;

          pdf.addImage(
            imglink,
            'JPG',
            centerX,
            imageTopMargin,
            imgDeviceWidth,
            imgDeviceHeight
          );

          pdf.addImage(
            imgData,
            'PNG',
            5,
            contentTopMargin,
            imgWidth,
            imgHeight
          );

          pdf.save('Report.pdf');
        })
        .catch((error) => console.error('Erro ao carregar a imagem', error));
      const element = document.getElementById('containerPage');

      if (!element) {
        console.error('Elemento não encontrado!');
        return;
      }
    });
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('documento.pdf');
    });
  }
}
