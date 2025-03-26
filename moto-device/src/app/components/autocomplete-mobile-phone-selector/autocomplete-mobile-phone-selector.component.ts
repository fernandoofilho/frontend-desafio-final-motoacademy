import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap, Observable, startWith } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Device } from '../../../shared/models/device.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { PhoneComparerService } from '../../services/phone-comparer.service';

@Component({
  selector: 'app-autocomplete-mobile-phone-selector',
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './autocomplete-mobile-phone-selector.component.html',
  styleUrls: ['./autocomplete-mobile-phone-selector.component.css'],
})
export class AutocompleteMobilePhoneSelectorComponent implements OnInit {
  searchControl = new FormControl('');
  filteredDevices$: Observable<Device[]>;
  @Input() modelPosition!: number;
  @Input() disabled!: boolean;
  selectedDevice: Device | null = null;

  initialDevices: Device[] = [];

  constructor(
    private apiService: ApiService,
    private phoneComparerService: PhoneComparerService
  ) {
    this.filteredDevices$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      switchMap((search) =>
        search && search.length > 0
          ? this.apiService.search({ search: search ? search : '' })
          : this.apiService.getRandom()
      )
    );
  }

  ngOnInit(): void {
    this.apiService.getRandom().subscribe((devices) => {
      this.initialDevices = devices;

      this.filteredDevices$ = this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(500),
        switchMap((search) =>
          search && search.length > 0
            ? this.apiService.search({ search: search ? search : '' })
            : new Observable<Device[]>((observer) => {
                observer.next(this.initialDevices);
                observer.complete();
              })
        )
      );
    });
  }

  displayFn(device?: Device): string {
    return device ? device.Model : '';
  }

  handleSelect(selectedDevice: Device): void {
    this.selectedDevice = selectedDevice;
    if (this.modelPosition === 1) {
      this.phoneComparerService.setDevice1(selectedDevice);
      console.log('modelo 1 selecionado', selectedDevice);
    } else {
      this.phoneComparerService.setDevice2(selectedDevice);
      console.log('modelo 2 selecionado', selectedDevice);
    }
  }
}
