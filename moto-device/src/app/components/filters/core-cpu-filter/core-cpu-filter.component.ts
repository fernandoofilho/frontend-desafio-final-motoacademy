import { Component } from '@angular/core';
import { CoreCpuFilterService } from '../../../services/filters/core-cpu-filter.service';

@Component({
  selector: 'app-core-cpu-filter',
  standalone: false,
  templateUrl: './core-cpu-filter.component.html',
  styleUrl: './core-cpu-filter.component.css',
})
export class CoreCpuFilterComponent {
  value: number = 0;
  constructor(coreCpuFilterService: CoreCpuFilterService) {}
}
