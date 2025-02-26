import { Component } from '@angular/core';
import { MemoryFilterService } from '../../../services/filters/memory-filter.service';
import { Select } from '../../../shared/types/select';

@Component({
  selector: 'app-memory-filter',
  standalone: false,
  templateUrl: './memory-filter.component.html',
  styleUrl: './memory-filter.component.css',
})
export class MemoryFilterComponent {
  constructor(private memoryFilter: MemoryFilterService) {}
  selectedOption: string = '';
  selectOptions: Select[] = [
    {
      value: '8gb',
      viewValue: '8gb',
    },
    {
      value: '16gb',
      viewValue: '16gb',
    },
    {
      value: '32gb',
      viewValue: '32gb',
    },
    {
      value: '64gb',
      viewValue: '64gb',
    },
    {
      value: '128gb',
      viewValue: '128gb',
    },
    {
      value: '256gb',
      viewValue: '256gb',
    },
    {
      value: '512gb',
      viewValue: '512gb',
    },
    {
      value: '1tb',
      viewValue: '1tb',
    },
  ];
  onSelectChange(value: string) {
    // this.groupFilterService.setGroupQuery(value);
  }
}
