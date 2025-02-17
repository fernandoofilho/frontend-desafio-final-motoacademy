import { Component } from '@angular/core';
import { YearFilterService } from '../../services/year-filter.service';
import { MatSliderModule } from '@angular/material/slider';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-year-filter',
  standalone: true,
  imports: [MatSliderModule],
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
