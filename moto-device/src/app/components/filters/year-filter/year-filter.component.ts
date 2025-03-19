import { Component } from '@angular/core';
import { YearFilterService } from '../../../services/filters/year-filter.service';

@Component({
  selector: 'app-year-filter',
  standalone: false,
  templateUrl: './year-filter.component.html',
  styleUrl: './year-filter.component.css',
})
export class YearFilterComponent {
  selectedYear: number = 2025;
  constructor(private yearFilterService: YearFilterService) {}
  
  formatLabel(value: number): string {
    return `${value}`;
  }

  onYearChange(event: number) {
    this.selectedYear = event; 
    this.yearFilterService.setYearQuery(String(event))
  }

}
