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
  firstSelected: boolean = false;
  secondSelected: boolean = false;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
  filteredOptions: string[];

  ngOnInit(): void {
    this.phoneComparerService.device1$.subscribe((device) => {
      this.device1 = device;
      this.firstSelected = !!device;
      this.updateOpenState();
    });

    this.phoneComparerService.device2$.subscribe((device) => {
      this.device2 = device;
      this.secondSelected = !!device;
      this.updateOpenState();
    });
  }

  updateOpenState(): void {
    this.open = !!(
      this.device1 &&
      this.device2 &&
      (this.firstSelected || this.secondSelected)
    );
  }

  constructor(private phoneComparerService: PhoneComparerService) {
    this.filteredOptions = this.options.slice();
  }

  changeStateFirstDevice() {
    this.firstSelected = !this.firstSelected;
    if (!this.firstSelected) {
      this.device1 = null;
      this.phoneComparerService.clearDevice1();
      this.open = false;
    }
  }
  changeStateSecondDevice() {
    this.secondSelected = !this.secondSelected;
    if (!this.secondSelected) {
      this.device2 = null;
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
}
