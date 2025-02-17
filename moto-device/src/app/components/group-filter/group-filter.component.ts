import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { DeviceGroup } from '../../shared/types/deviceGroup';
import { GroupFilterService } from '../../services/group-filter.service';

@Component({
  selector: 'app-group-filter',
  imports: [MatSelectModule],
  templateUrl: './group-filter.component.html',
  styleUrl: './group-filter.component.css',
})
export class GroupFilterComponent {
  constructor(private groupFilterService: GroupFilterService) {}

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
