import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Device } from '../../../shared/models/device.model';
import { PhoneComparerService } from '../../services/phone-comparer.service';
import { AutocompleteMobilePhoneSelectorComponent } from '../autocomplete-mobile-phone-selector/autocomplete-mobile-phone-selector.component';
import getSrc from '../../shared/functions/get_src';
import { ApiService } from '../../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeviceDialogComponent } from '../device-dialog/device-dialog.component';

@Component({
  selector: 'app-compare-phones-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AutocompleteMobilePhoneSelectorComponent,
  ],
  templateUrl: './compare-phones-dialog.component.html',
  styleUrl: './compare-phones-dialog.component.css',
})
export class ComparePhonesDialogComponent implements OnInit {
  open = false;
  searchTerm1: string = '';
  searchTerm2: string = '';
  device1: Device | null = null;
  device2: Device | null = null;
  isLoading1 = false;
  isLoading2 = false;
  device1Description: any = null;
  device2Description: any = null;
  firstSelected: boolean = true;
  secondSelected: boolean = true;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
  filteredOptions: string[];

  constructor(
    private phoneComparerService: PhoneComparerService,
    private apiService: ApiService,
    private router: Router,
    private dialogRef: MatDialogRef<DeviceDialogComponent>
  ) {
    this.filteredOptions = this.options.slice();
  }

  ngOnInit(): void {
    this.phoneComparerService.device1$.subscribe((device) => {
      this.device1 = device;
      this.firstSelected = !!device;
      this.updateOpenState();
      if (device) this.fetchDevice1Description(device.Model);
    });

    this.phoneComparerService.device2$.subscribe((device) => {
      this.device2 = device;
      this.secondSelected = !!device;
      this.updateOpenState();
      if (device) this.fetchDevice2Description(device.Model);
    });
  }

  updateOpenState(): void {
    this.open = !!(
      this.device1 &&
      this.device2 &&
      (this.firstSelected || this.secondSelected)
    );
  }

  fetchDevice1Description(deviceId: string): void {
    this.isLoading1 = true;
    this.apiService
      .getDeviceDataIntelligence(deviceId)
      .subscribe((response) => {
        this.device1Description = response;
        this.isLoading1 = false;
      });
  }

  fetchDevice2Description(deviceId: string): void {
    this.isLoading2 = true;
    this.apiService
      .getDeviceDataIntelligence(deviceId)
      .subscribe((response) => {
        this.device2Description = response;
        this.isLoading2 = false;
      });
  }

  changeStateFirstDevice() {
    this.firstSelected = !this.firstSelected;
    if (!this.firstSelected) {
      this.device1 = null;
      this.device1Description = null;
      this.phoneComparerService.clearDevice1();
      this.open = false;
    }
  }

  changeStateSecondDevice() {
    this.secondSelected = !this.secondSelected;
    if (!this.secondSelected) {
      this.device2 = null;
      this.device2Description = null;
      this.phoneComparerService.clearDevice2();
      this.open = false;
    }
  }

  resetSearch() {
    this.changeStateFirstDevice();
    this.changeStateSecondDevice();
  }

  getSrc(str: string): string {
    return getSrc(str);
  }

  navigateToDevicePage(id: string) {
    this.dialogRef.close();
    this.router.navigateByUrl(`/device/${id}`);
  }
}
