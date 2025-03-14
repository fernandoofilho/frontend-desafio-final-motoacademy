import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Device } from '../../../shared/models/device.model';
import { IntelligenceBottomSheetComponent } from '../../components/intelligence-bottom-sheet/intelligence-bottom-sheet.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ApiService } from '../../services/api.service';
import getSrc from '../../shared/functions/get_src';
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
}
