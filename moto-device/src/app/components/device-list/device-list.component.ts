import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.css',
})
export class DeviceListComponent implements OnInit, OnDestroy {
  searchQuery$!: Observable<string>;
  private destroy$ = new Subject<void>();

  constructor(
    private searchService: SearchService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.searchQuery$ = this.searchService.searchQuery$;

    this.searchQuery$
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300), 
        distinctUntilChanged()
      )
      .subscribe((query) => {
        if (query) {
          this.apiService.search(query).subscribe((response) => {
            console.log('API response:', response);
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
