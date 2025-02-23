import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { GroupFilterService } from '../../services/filters/group-filter.service';
import { SearchService } from '../../services/filters/search.service';
import { YearFilterService } from '../../services/filters/year-filter.service';
import { FiltersModule } from '../filters/filters.module';

@Component({
  selector: 'app-filter-accordion',
  imports: [MatExpansionModule, FiltersModule],
  templateUrl: './filter-accordion.component.html',
  styleUrl: './filter-accordion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterAccordionComponent {
  readonly panelOpenState = signal(false);

  constructor(
    private yearFilterService: YearFilterService,
    private groupFilterService: GroupFilterService,
    private searchService: SearchService
  ) {}

  clearFilters() {
    this.yearFilterService.setYearQuery('');
    this.groupFilterService.setGroupQuery('');
    this.searchService.setSearchQuery('');
  }
}
