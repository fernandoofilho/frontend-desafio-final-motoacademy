import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Device } from '../../../shared/models/device.model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-compare-phones-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  templateUrl: './compare-phones-dialog.component.html',
  styleUrl: './compare-phones-dialog.component.css',
})
export class ComparePhonesDialogComponent {
  searchTerm1: string = '';
  searchTerm2: string = '';
  device1: Device | null = null;
  device2: Device | null = null;
  @ViewChild('input1')
  input1!: ElementRef<HTMLInputElement>;
  @ViewChild('input2')
  input2!: ElementRef<HTMLInputElement>;
  open = false;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
  filteredOptions: string[];
  changeState() {
    this.open = !this.open;
  }
  constructor(private apiService: ApiService) {
    this.filteredOptions = this.options.slice();
  }

  filter1(): void {
    const filterValue = this.input1.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter((o) =>
      o.toLowerCase().includes(filterValue)
    );
  }

  filter2(): void {
    const filterValue = this.input2.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter((o) =>
      o.toLowerCase().includes(filterValue)
    );
  }

  fetchDevice(searchTerm: string): Device | null {
    if (!searchTerm) return null;
    return {
      Model: `Smartphone ${searchTerm}`,
      src: 'https://via.placeholder.com/100',
      specs: {
        ram: '6GB RAM',
        storage: '128GB Storage',
        processor: 'Snapdragon 888',
      },
      _id: '',
      info: {},
    };
  }
  searchDevice(deviceNumber: number) {
    if (deviceNumber === 1) {
      this.device1 = this.fetchDevice(this.searchTerm1);
    } else {
      this.device2 = this.fetchDevice(this.searchTerm2);
    }
  }
}
