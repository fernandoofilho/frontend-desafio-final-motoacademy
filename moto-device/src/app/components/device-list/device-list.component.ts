import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject, combineLatest } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Device } from '../../../shared/models/device.model';
import { ApiService } from '../../services/api.service';
import { GroupFilterService } from '../../services/filters/group-filter.service';
import { SearchService } from '../../services/filters/search.service';
import { YearFilterService } from '../../services/filters/year-filter.service';
import { searchQuery } from '../../shared/types/search';
import { DeviceCardComponent } from '../device-card/device-card.component';
import { SkeletonDeviceListComponent } from '../skeleton-device-list/skeleton-device-list.component';
import getSrc from '../../shared/functions/get_src';
import { FilterManagerService } from '../../services/filters/filter-manager.service';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, DeviceCardComponent, SkeletonDeviceListComponent],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate(
          '0.8s ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '0.8s ease-in',
          style({ transform: 'translateY(-100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent implements OnDestroy, OnInit {
  deviceLists: Device[] = [];
  searchQuery$!: Observable<string>;
  yearQuery$!: Observable<string>;
  GroupQuery$!: Observable<string>;
  AiSearch$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;
  normalSearch$!: Observable<Boolean>;
  isLoading: boolean = false;
  noContent: boolean = false;
  ifFirstLoad: boolean = true;
  private destroy$ = new Subject<void>();

  constructor(
    private searchService: SearchService,
    private FilterGroupService: GroupFilterService,
    private filterYearService: YearFilterService,
    private apiService: ApiService,
    private filterManagerService: FilterManagerService
  ) {}

  ngOnInit(): void {
    this.searchQuery$ = this.searchService.searchQuery$;
    this.GroupQuery$ = this.FilterGroupService.groupQuery$;
    this.yearQuery$ = this.filterYearService.yearQuery$;

    this.AiSearch$ = this.filterManagerService.executeAISearch$;
    this.normalSearch$ = this.filterManagerService.executeSearch$;
    this.isLoading$ = this.filterManagerService.loading$;

    combineLatest([
      this.AiSearch$.pipe(startWith(false), distinctUntilChanged()),
      this.normalSearch$.pipe(startWith(false), distinctUntilChanged()),
    ])
      .pipe(
        takeUntil(this.destroy$),
        filter(
          ([isAiSearch, isNormalSearch]) =>
            !!(isAiSearch || isNormalSearch || this.ifFirstLoad)
        ),
        switchMap(([isAiSearch, isNormalSearch]) => {
          if (this.isLoading) return EMPTY; // Evita requisições duplicadas

          this.isLoading = true;
          this.noContent = false;

          const search = this.searchService.getSearchQuery();
          const group = this.FilterGroupService.getGroupQuery();
          const year = this.filterYearService.getYearQuery();

          let request$: Observable<any>;

          if (isAiSearch) {
            request$ = this.apiService.filterIntelligence(search).pipe(
              tap(() => {
                this.filterManagerService.setExecuteAISearch(false);
                this.filterManagerService.setExecuteSearch(false);
              })
            );
          } else if (isNormalSearch) {
            this.filterManagerService.setExecuteAISearch(false);
            this.filterManagerService.setExecuteSearch(false);
            const query: searchQuery = { search, group, year };
            request$ = Object.values(query).some((value) => value?.length > 0)
              ? this.apiService.search(query)
              : this.apiService.getRandom();
          } else if (this.ifFirstLoad) {
            request$ = this.apiService.getRandom();
            this.ifFirstLoad = false;
          } else {
            return EMPTY; 
          }

          return request$.pipe(
            tap((response) => {
              this.setDeviceList(response);
              this.filterManagerService.setLoading(false);
              this.isLoading = false;
              this.noContent = this.deviceLists.length === 0;
            })
          );
        })
      )
      .subscribe();
  }

  setDeviceList(devices: Device[]) {
    this.deviceLists = devices;
    this.isLoading = false;
    this.noContent = devices.length === 0;
  }

  getImageLink(path: string) {
    return getSrc(path);
  }

  getDeviceName(device: Device): string {
    return String(device['Model']);
  }

  getDeviceDescription(device: Device): string {
    const data = {
      'Lançado em': device.info['released'],
      'Anunciado em': device.info['Announced'],
      Bluetooth: device.specs['Bluetooth'],
      'CPU Clock': device.specs['CPU Clock'],
      Dimensões: device.specs['Dimensions'],
      Plataforma: device.specs['Platform'],
      Resolução: device.specs['Resolution'],
      USB: device.specs['USB'],
    };

    const description =
      Object.entries(data)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}: ${value}`)
        .join('. ') + '.';

    return `Lançado em ${description}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
