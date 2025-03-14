import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  signal,
} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { GroupFilterService } from '../../services/filters/group-filter.service';
import { SearchService } from '../../services/filters/search.service';
import { YearFilterService } from '../../services/filters/year-filter.service';
import { FiltersModule } from '../filters/filters.module';
import { FilterManagerService } from '../../services/filters/filter-manager.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-accordion',
  imports: [MatExpansionModule, FiltersModule, CommonModule],
  templateUrl: './filter-accordion.component.html',
  styleUrl: './filter-accordion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterAccordionComponent {
  readonly panelOpenState = signal(true);
  showAccordion: boolean = false;

  constructor(
    private yearFilterService: YearFilterService,
    private groupFilterService: GroupFilterService,
    private searchService: SearchService,
    private showFilterManagerService: FilterManagerService,
    private cdr: ChangeDetectorRef 
  ) {
    this.showFilterManagerService.showFilter$.subscribe((showFilter) => {
      this.showAccordion = showFilter;
      this.cdr.detectChanges();
    });
  }

  clearFilters() {
    this.yearFilterService.setYearQuery('');
    this.groupFilterService.setGroupQuery('');
    this.searchService.setSearchQuery('');
  }
}
