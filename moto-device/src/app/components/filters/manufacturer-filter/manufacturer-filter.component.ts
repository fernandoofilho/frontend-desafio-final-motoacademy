import { Component } from '@angular/core';
import { DeviceManufacturer } from '../../../shared/types/deviceManufacturer';
import { ManufacturerFilterService } from '../../../services/filters/manufacturer-filter.service';

@Component({
  selector: 'app-manufacturer-filter',
  standalone: false,
  templateUrl: './manufacturer-filter.component.html',
  styleUrl: './manufacturer-filter.component.css',
})
export class ManufacturerFilterComponent {
  selectedGroup: string = '';

  constructor(private manufacturerFilterService: ManufacturerFilterService) {
    // this.manufacturerFilterService.manufacturerQuery$.subscribe((value) => {
    //   this.selectedManufacturer = value;
    // });
  }
  manufacturers: DeviceManufacturer[] = [
    {
      value: 'Lenovo',
      viewValue: 'lenovo',
    },
    {
      value: 'Motorola Mobile Devices',
      viewValue: 'Motorola',
    },
    {
      value: 'Compal Eletronics',
      viewValue: 'Compal',
    },
    {
      value: 'Motorola Enterprise Mobility Solutions',
      viewValue: 'Motorola Mobility',
    },
    {
      value: 'Commtiva',
      viewValue: 'Commtiva',
    },
    {
      value: 'Quanta Computer',
      viewValue: 'Quanta Computer',
    },
    {
      value: 'Shenzhen TINNO Mobile Technology',
      viewValue: 'TINNO Mobile Technology',
    },
  ];
  onSelectChange(value: string) {
    // this.groupFilterService.setGroupQuery(value);
  }
}
