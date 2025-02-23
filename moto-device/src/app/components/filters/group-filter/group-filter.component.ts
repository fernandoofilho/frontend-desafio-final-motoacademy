import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { GroupFilterService } from '../../../services/filters/group-filter.service';
import { DeviceGroup } from '../../../shared/types/deviceGroup';

@Component({
  selector: 'app-group-filter',
  standalone: false,
  templateUrl: './group-filter.component.html',
  styleUrl: './group-filter.component.css',
})
export class GroupFilterComponent {
  selectedGroup: string = '';

  constructor(private groupFilterService: GroupFilterService) {
    this.groupFilterService.groupQuery$.subscribe((value) => {
      this.selectedGroup = value;
    });
  }
  groups: DeviceGroup[] = [
    {
      value: 'Moto G',
      viewValue: 'Série G',
    },
    {
      value: 'Moto E',
      viewValue: 'Série E',
    },
    {
      value: 'Moto X',
      viewValue: 'Série X',
    },
    {
      value: 'Moto Edge',
      viewValue: 'Série Edge',
    },
    {
      value: 'RAZR',
      viewValue: 'Série Razr',
    },
  ];
  onSelectChange(value: string) {
    this.groupFilterService.setGroupQuery(value);
  }
}
