import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { YearFilterComponent } from '../year-filter/year-filter.component';
import { GroupFilterComponent } from '../group-filter/group-filter.component';
import { YearFilterService } from '../../services/year-filter.service';
import { GroupFilterService } from '../../services/group-filter.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-filter-accordion',
  imports: [MatExpansionModule, YearFilterComponent, GroupFilterComponent],
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
